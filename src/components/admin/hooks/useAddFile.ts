import { useState } from 'react';
import { useTypedSelector, useTypedDispatch } from '../../../shared/hooks/redux';
import { resetWatermark } from '../../../store/slices/watermarkSlice';
import { useUploadImageMutation } from '../../../shared/api/imagesApi';
import { useAddWatermark } from './images/useAddWatermark';
import { useImageCompressor } from './images/useImageCompressor';
import { useGetTagsQuery } from '../../../shared/api/tagsApi';
import { useGetCategoriesQuery } from '../../../shared/api/categoriesApi';
import type { Tag } from '../../../shared/types/tags';
import type { Category } from '../../../shared/types/Category';
import { useUploadArchiveMutation } from '../../../shared/api/archivesApi';
import { useFileInput } from './useFileInput';
import { useArchiveImagesCompressor } from './images/useArchiveImagesCompressor';
import { useArchiveImagesWatermark } from './images/useArchiveImagesWatermark'


export function useAddFile() {
  const fileInput = useFileInput({ maxSizeMB: 10 });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [downloadFree, setDownloadFree] = useState<boolean>(true)

  const settings = useTypedSelector(state => state.watermark);
  const dispatch = useTypedDispatch();

  const [uploadImage] = useUploadImageMutation();
  const [uploadArchive] = useUploadArchiveMutation();
  const { data: availableTags = [] } = useGetTagsQuery();
  const { data: availableCategories = [] } = useGetCategoriesQuery();

  const compressorFile = useImageCompressor(
    fileInput.fileType === 'image' ? fileInput.file : null
  );

  const compressorFileArchive = useArchiveImagesCompressor(
    fileInput.fileType === 'archive' ? fileInput.archiveImages : null
  );

  const watermarkFile = useAddWatermark(
    fileInput.fileType === 'image' && settings.enabled ? compressorFile : null, settings
  );

  const watermarkFileArchive = useArchiveImagesWatermark(fileInput.fileType === 'archive' ? compressorFileArchive : null, settings);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fileInput.file) {
      alert('Please select a file');
      return;
    }

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (selectedTags.length === 0) {
      alert('Please select at least one tag');
      return;
    }

    if (selectedCategories.length === 0) {
      alert('Please select category');
      return;
    }

    if (fileInput.fileType === 'archive' && fileInput.archiveImages.length === 0) {
      alert('Please upload at least one image for the selected archive');
      return;
    }

    if (fileInput.fileType === 'image') {
      const formData = new FormData();

      formData.append('file', fileInput.file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('categories', JSON.stringify(selectedCategories.map(c => c.id)));
      formData.append('tags', JSON.stringify(selectedTags.map(t => t.id)));
      formData.append('downloadFree', downloadFree.toString())

      if (watermarkFile) {
        formData.append('watermarkFile', watermarkFile);
      } else if (compressorFile) {
        formData.append('compressorFile', compressorFile);
      }

      await uploadImage(formData).unwrap();
    }

    if (fileInput.fileType === 'archive') {
      const formData = new FormData();

      formData.append('archive', fileInput.file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('categories', JSON.stringify(selectedCategories.map(c => c.id)));
      formData.append('tags', JSON.stringify(selectedTags.map(t => t.id)));
      formData.append('downloadFree', downloadFree.toString())

      if (watermarkFileArchive.length) {
        watermarkFileArchive.forEach(img => {
          formData.append('archiveImagesWatermark', img)
        })
      } else if (compressorFileArchive.length) {
        compressorFileArchive.forEach(img => {
          formData.append('archiveCompressedImages', img)
        })
      }

      await uploadArchive(formData).unwrap();
    }

    fileInput.setMessage('The file was uploaded successfully')

    fileInput.reset();
    setTitle('');
    setDescription('');
    setSelectedCategories([]);
    setSelectedTags([]);
    dispatch(resetWatermark());
  }

  function resetForm() {
    fileInput.reset();
    setTitle('');
    setDescription('');
    setSelectedCategories([]);
    setSelectedTags([]);
    dispatch(resetWatermark());
    fileInput.setMessage('');
  }

  return {
    ...fileInput,

    downloadFree,
    setDownloadFree,

    title,
    description,
    selectedCategories,
    selectedTags,
    availableTags,
    availableCategories,
    setTitle,
    setDescription,
    setSelectedCategories,
    setSelectedTags,
    watermarkFile,
    watermarkFileArchive,
    handleSubmit,
    resetForm,
  };
}


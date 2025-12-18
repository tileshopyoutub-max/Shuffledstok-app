import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } from '../../../shared/api/tagsApi';
import { usePagination } from './usePagination';

export function useTags() {

    const { data: tags = [], isLoading  } = useGetTagsQuery(undefined, {refetchOnMountOrArgChange: true});

    const [createTag] = useCreateTagMutation();
    const [updateTag] = useUpdateTagMutation();
    const [deleteTag] = useDeleteTagMutation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpenAddTag, setIsOpenAddTag] = useState<boolean>(false);
    const [tagName, setTagName] = useState('');
    const [editTag, setEditTag] = useState<{ id: number; name: string } | null>(null);
    const [deleteTagModal, setDeleteTagModal] = useState<{ id: number; name: string } | null>(null);

    const tagsQuery = searchParams.get('tags') || '';
    const tagsFilter = tags.filter(t => t.name.toLowerCase().includes(tagsQuery.toLowerCase()));

    const { page, setPage, startIndex, endIndex, pages } = usePagination({ total: tagsFilter.length, pageSize: 6 });
    const visibleTags = tagsFilter.slice(startIndex, endIndex);

    async function handleAddTag() {
        if (!tagName.trim() || tagName.includes(" ")) {
            alert('Tag cannot be empty or contain spaces');
            return;
        }
        try {
            await createTag({ name: tagName.trim() }).unwrap();
            setTagName('');
            setIsOpenAddTag(false);
        } catch {
            alert('Failed to add tag');
        }
    };

    async function handleEditTag() {
        if (!editTag?.name.trim() || editTag.name.includes(" ")) {
            alert('Tag cannot be empty or contain spaces');
            return;
        }

        const originalTag = tags.find(t => t.id === editTag.id);
        if (!originalTag || editTag.name.trim() === originalTag.name) {
            setEditTag(null);
            return;
        }
        try {
            await updateTag({ id: editTag.id, name: editTag.name.trim() }).unwrap();
            setEditTag(null);
        } catch {
            alert('Failed to update tag');
        }
    };

    async function handleDeleteTag(id: number) {
        try {
            await deleteTag({ id }).unwrap();
            setDeleteTagModal(null);
        } catch {
            alert('Failed to delete tag');
        }
    };

    return {
        isOpenAddTag,
        setIsOpenAddTag,
        tags,
        isLoading,
        tagName,
        setTagName,
        editTag,
        setEditTag,
        deleteTagModal,
        setDeleteTagModal,
        visibleTags,
        startIndex,
        endIndex,
        tagsFilter,
        page,
        setPage,
        pages,
        tagsQuery,
        setSearchParams,
        handleAddTag,
        handleEditTag,
        handleDeleteTag
    };
}
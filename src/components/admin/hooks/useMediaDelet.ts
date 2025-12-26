import { useState } from "react";
import { useDeleteImageMutation } from "../../../shared/api/imagesApi";
import { useDeleteArchiveMutation } from "../../../shared/api/archivesApi";

export function useMediaDeletion() {
    const [deleteImage] = useDeleteImageMutation();
    const [deleteArchive] = useDeleteArchiveMutation();
    const [deleteModal, setDeleteModal] = useState<{ id: number; title: string; type: 'image' | 'archive' } | null>(null);

    async function handleDelete() {
        if (!deleteModal) return;

        try {
            if (deleteModal.type === 'image') {
                await deleteImage({ id: deleteModal.id }).unwrap();
            } else {
                await deleteArchive({ id: deleteModal.id }).unwrap();
            }
        } catch (error) {
            alert(`Failed to delete ${deleteModal.type}`);
        } finally {
            setDeleteModal(null);
        }
    }

    function openDeleteModal(id: number, title: string, type: 'image' | 'archive' = 'image') {
        setDeleteModal({ id, title, type });
    }

    function closeDeleteModal() {
        setDeleteModal(null);
    }

    return {
        deleteModal,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    };
}
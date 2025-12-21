import { useState } from "react";
import { useDeleteImageMutation } from "../../../shared/api/imagesApi";

export function useMediaDeletion() {
    const [deleteImage] = useDeleteImageMutation();
    const [deleteModal, setDeleteModal] = useState<{ id: number; title: string } | null>(null);

    async function handleDelete() {
        if (!deleteModal) return;
        try {
            await deleteImage({ id: deleteModal.id }).unwrap();
        } catch {
            alert("Failed to delete file");
        } finally {
            setDeleteModal(null);
        }
    }

    function openDeleteModal(id: number, title: string) {
        setDeleteModal({ id, title });
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
import { useEffect } from "react";


interface ModalProps {
    title: string;
    handleName: string;
    handleAction: () => void;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ title, handleName, children, handleAction, onClose }: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-component-dark p-6 rounded-xl w-80">
                    <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
                    <div>
                        {children}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white" onClick={onClose}>Cancel</button>
                        <button className="px-4 py-2 bg-primary rounded hover:bg-primary/80 text-white" onClick={handleAction}>{handleName}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
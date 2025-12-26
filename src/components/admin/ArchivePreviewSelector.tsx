import { useState, useEffect } from 'react';
import type { ArchiveItem } from '../../shared/types/archives';

interface ArchivePreviewSelectorProps {
  archive: ArchiveItem;
  currentPreviewId: number;
  onSelect: (previewImageId: number) => void | Promise<void>;
}

export default function ArchivePreviewSelector({ archive, currentPreviewId, onSelect }: ArchivePreviewSelectorProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(currentPreviewId);

  async function handleSelect() {
    await onSelect(selectedId);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-1 inline-flex items-center gap-1 bg-background-dark border border-border-dark text-slate-300 text-xs rounded px-2 py-1 hover:bg-slate-800 transition-colors"
        title="Change preview image"
      >
        <span className="material-symbols-outlined text-sm">photo_library</span>
        <span>Change preview</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={handleBackdropClick}>
          <div className="bg-component-dark border border-border-dark rounded-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">
                Select preview image for <span className="text-primary">{archive.title}</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 max-h-64 overflow-y-auto">
              {archive.images.map((img, i) => (
                <button
                  key={`${img.id}-${i}`}
                  type="button"
                  onClick={() => setSelectedId(img.id)}
                  className={`relative rounded overflow-hidden border-2 ${selectedId === img.id
                    ? 'border-primary'
                    : 'border-transparent'
                    }`}
                >
                  <img
                    src={img.url}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {selectedId === img.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">
                        check_circle
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm text-slate-300 hover:text-white">
                Cancel
              </button>
              <button type="button" onClick={handleSelect} className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/80">Select</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
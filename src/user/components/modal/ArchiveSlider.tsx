import { useState } from "react";

interface ArchiveSliderProps {
  images: { url: string; key: string }[]; // массив картинок из архива
}

export const ArchiveSlider = ({ images }: ArchiveSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl flex flex-col items-center gap-4">
      {/* Основная картинка */}
      <div className="aspect-[3/4] w-full max-h-[65vh] overflow-hidden rounded-xl relative">
        <img
          src={images[currentIndex].url}
          alt={`Archive image ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Стрелки */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/75 text-white transition"
        >
          <span className="material-symbols-outlined text-xl">
            chevron_left
          </span>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/75 text-white transition"
        >
          <span className="material-symbols-outlined text-xl">
            chevron_right
          </span>
        </button>

        {/* Индикаторы */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Превьюшки */}
      <div className="flex gap-2 overflow-x-auto mt-2">
        {images.map((img, i) => (
          <img
            key={img.key}
            src={img.url}
            alt={`Preview ${i + 1}`}
            className={`h-16 w-16 object-cover rounded-lg cursor-pointer border-2 ${
              i === currentIndex ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

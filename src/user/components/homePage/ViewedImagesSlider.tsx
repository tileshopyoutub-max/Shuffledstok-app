import { openImageModal } from "../../../store/slices/imageModalSlice";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../shared/hooks/redux";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import { hideHero } from "../../../store/slices/heroSlice";

export const ViewedImagesSlider = () => {
  const { viewed } = useTypedSelector((state) => state.viewedImages);
  const { isOpen } = useTypedSelector((state) => state.sidebar);
  const dispatch = useTypedDispatch();
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const images = viewed;

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth;
      if (w < 640) setScreen("mobile");
      else if (w < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  if (!viewed.length) return null;

  const cardWidth = 230; // фиксированная ширина карточки
  const cardHeight = 300; // фиксированная высота карточки
  const gap = 12; // фиксированное расстояние между карточками
  let maxVisible: number;

  if (screen === "mobile") {
    maxVisible = 0;
  } else if (screen === "tablet") {
    maxVisible = isOpen ? 0 : 1;
  } else {
    // десктоп
    maxVisible = isOpen ? 1 : 2;
  }

  return (
    <div
      className="relative w-full overflow-hidden flex items-center"
      {...handlers}
    >
      {/* Кнопки снаружи слайдера */}
      {(screen === "tablet" || screen === "desktop") && (
        <>
          <button
            onClick={() => {
              prev(), dispatch(hideHero());
            }}
            className="absolute left-2 text-white text-4xl z-10 select-none"
          >
            ❮
          </button>
          <button
            onClick={() => {
              next(), dispatch(hideHero());
            }}
            className="absolute right-2 text-white text-4xl z-10 select-none"
          >
            ❯
          </button>
        </>
      )}

      {/* Слайды */}
      <div className="relative w-full h-[350px] flex items-center justify-center">
        {images.map((img, i) => {
          const total = images.length;
          let offset = i - index;

          // Оборачиваем индекс для бесконечного эффекта
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          // Показываем только ближайшие карточки
          if (Math.abs(offset) > 3) return null;

          const x = offset * (cardWidth + gap);

          return (
            <div
              key={i}
              className="absolute transition-all duration-500"
              style={{
                transform: `translateX(${x}px)`,
                zIndex: maxVisible - Math.abs(offset),
                opacity: 1,
              }}
            >
              <div
                className="rounded-lg overflow-hidden cursor-pointer shadow-lg"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => {
                  dispatch(openImageModal(img)), dispatch(hideHero());
                }}
              />
            </div>
          );
        })}
      </div>
      {(screen === "mobile" || (screen === "tablet" && isOpen)) && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

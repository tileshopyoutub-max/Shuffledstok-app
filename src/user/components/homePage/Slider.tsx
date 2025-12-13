import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface Slider {
  images: string[]
}

export const Slider: React.FC<Slider> = ({ images }) => {
  const [index, setIndex] = useState(0)

  const next = () => setIndex(prev => (prev + 1) % images.length)
  const prev = () => setIndex(prev => (prev - 1 + images.length) % images.length)

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  })

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-black" {...handlers}>
      {/* КНОПКИ */}
      <button onClick={prev} className="absolute left-4 text-white text-4xl z-20 select-none">
        ❮
      </button>

      <button onClick={next} className="absolute right-4 text-white text-4xl z-20 select-none">
        ❯
      </button>

      {/* СЛАЙДЫ */}
      <div className="relative flex items-center justify-center w-full h-full" style={{ perspective: '1200px' }}>
        {images.map((img, i) => {
          const total = images.length
          const offset = i - index

          // Оборачиваем индекс для бесконечного цикла
          const wrapped =
            ((offset % total) + total) % total > total / 2
              ? (((offset % total) + total) % total) - total
              : ((offset % total) + total) % total
          
          if (Math.abs(wrapped) > 3) return null;

          const x = wrapped * 150 // расстояние между карточками
          const z = Math.abs(wrapped) * -120 // глубина
          const scale = wrapped === 0 ? 1 : 0.95

          const zIndex = wrapped === 0 ? 50 : 50 - Math.abs(wrapped)

          return (
            <div
              key={i}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `
                  translateX(${x}px) 
                  translateZ(${z}px)
                  scale(${scale})
                `,
                zIndex,
                filter: `brightness(${1 - Math.min(Math.abs(wrapped) * 0.15, 0.6)})`,
                opacity: wrapped > 3 || wrapped < -3 ? 0 : 1,
              }}>
              <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden overflow-hidden">
                <img src={img} className="w-full h-full object-cover" draggable={false} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

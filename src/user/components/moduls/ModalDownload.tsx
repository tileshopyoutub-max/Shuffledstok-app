import { useEffect, useRef } from 'react'
import { useDownloadImageMutation, useGetImagesQuery } from '../../../shared/api/imagesApi'
import { findSimilarImages } from '../../utils/FilterSimilarContent'
import type { ImageItems } from '../../../shared/types/images'
import { closeImageModal, openImageModal } from '../../../store/slices/imageModalSlice'
import { useTypedDispatch } from '../../../shared/hooks/redux'
import { toggleTag } from '../../../store/slices/imagesFilterSlice'

interface ModalTypes {
  onClose: () => void
  file: ImageItems
}

export const ModalDownload = ({ onClose, file }: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const dispatch = useTypedDispatch()
  const [downloadFile] = useDownloadImageMutation()
  const { data: images = [] } = useGetImagesQuery()
  const { key, url, title, description, tags } = file

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick)
    }, 0)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  const handleDownload = async () => {
    try {
      const blob = await downloadFile(key).unwrap()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = key
      document.body.appendChild(a)
      a.click()

      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Ошибка скачивания файла', error)
    }
  }

  const similarImages = findSimilarImages(images, file)

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* Модальное окно */}
      <div
        ref={modalRef}
        className="bg-background-dark text-gray-100 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden relative max-h-[90vh]">
        {/* Кнопка закрытия */}
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition">
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Контент модалки со скроллом */}
        <div className="p-6 overflow-y-auto max-h-[90vh] scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Левая часть */}
            <div className="lg:col-span-2 flex flex-col items-center gap-4">
              <div className="relative w-full max-w-2xl group">
                <div className="aspect-[3/4] w-full max-h-[65vh] overflow-hidden rounded-xl">
                  <img alt="Preview" className="h-full w-full object-cover" src={url} />
                </div>

                {/* Стрелки */}
                <button className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/75 text-white opacity-0 group-hover:opacity-100 transition">
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 hover:bg-black/75 text-white opacity-0 group-hover:opacity-100 transition">
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>

                {/* Индикаторы */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="size-2 rounded-full bg-white"></div>
                  <div className="size-2 rounded-full bg-white/50"></div>
                  <div className="size-2 rounded-full bg-white/50"></div>
                </div>
              </div>

              {/* Превьюшки */}
            </div>

            {/* Правая часть */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                <p className="text-gray-400">{description}</p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold">
                  Download for free
                </button>

                <button className="w-full h-12 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold">
                  Buy for $2.99
                </button>

                <button className="w-full h-12 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold">
                  Download file
                </button>
              </div>
              <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-200">Tags</h3>
                {tags.map((tag, i) => {
                  return (
                    <div key={i} onClick={() => {dispatch(toggleTag(tag)), dispatch(closeImageModal())}} className="flex flex-wrap gap-2">
                      <a
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                        href="#">
                        {tag}
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-20">
            <h2 className="sticky text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
              Similar content
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
              {similarImages.map(img => {
                return (
                  <div
                    key={img.key}
                    onClick={() => {
                      dispatch(openImageModal(img))
                    }}
                    className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                    style={{
                      backgroundImage: `url(${img.url})`,
                    }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

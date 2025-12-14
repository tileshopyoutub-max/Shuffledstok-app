import { useEffect, useRef } from 'react'
import { useDownloadImageMutation } from '../../../shared/api/imagesApi'

interface ModalTypes {
  onClose: () => void
  fileKey: string
  fileUrl: string
}

export const ModalDownload = ({ onClose, fileKey, fileUrl }: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [downloadFile] = useDownloadImageMutation()

  useEffect(() => {
    downloadFile('test.png')
      .unwrap()
      .then(blob => {
        console.log(blob)
        console.log(blob.size)
      })
  }, [])

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
      const blob = await downloadFile(fileKey).unwrap()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = fileKey 
      document.body.appendChild(a)
      a.click()

      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Ошибка скачивания файла', error)
    }
  }
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
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <img
                    alt="Preview"
                    className="h-full w-full object-cover"
                    src={fileUrl}
                  />
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
                <h1 className="text-3xl md:text-4xl font-bold">Abstract Waves</h1>
                <p className="text-gray-400">A vibrant and dynamic wallpaper featuring abstract wavy lines.</p>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={handleDownload} className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold">
                  Download for free
                </button>

                <button className="w-full h-12 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold">
                  Buy for $2.99
                </button>

                <button
                  className="w-full h-12 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold">
                  Download file
                </button>
              </div>
              <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-200">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    abstract
                  </a>
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    colorful
                  </a>
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    gradient
                  </a>
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    waves
                  </a>
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    modern
                  </a>
                  <a
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    href="#">
                    wallpaper
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-20">
            <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
              Similar content
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
              <div
                className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR")',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div
                className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAADcmAIvWwSP-mJA5MaR3Nl-34BzFLPlkFLoUOEzdgSYCkQuaH3p-dfbDxmWv4iJQfm19ASkWSymaiTO8zrDyKRdoY0o-4qgQIb52mHpHwkikUjkwq1ba8Ojt_3L7uSmLQyOhhn6sYPBUVra8nCCv700fnnbM-8Kt-AN8nAqSiB8U_4zDsxQmkXTUce_tuSI528-mXhHBwQxdwJIg7MES9oJOfcffTL11YMNF4-R12Sktqk3vHDWX52w_WvCUFVYI7CN-fIr3ERuE4")',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div
                className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L")',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                    workspace_premium
                  </span>
                  <span>PRO</span>
                </div>
              </div>
              <div
                className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUEdk9c2t60humuZDgl7ycnadiJAuc6pSQBtzl_gp5yaqv2XFToyt7tuR7htBN9OkTjHAVfVEsQQvSI5WxEO4AhpaPb2VsrIXH-R6OXf4fyz2t9gPbKkfEEf-6xqtQC6PB2D3xPnKLWnkVYMoaJt8cnSqfDaJ4k3qHFZEfmFMV6zC3Y__fwgrtSW1oUY0qSgQKjMI-Gy-ecJqBt3xUhfi6ycbyfbsCnJbT04C9485NCaA4N0M-CczXegpUnUKyMcyafxUSYQAK8l6q")',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

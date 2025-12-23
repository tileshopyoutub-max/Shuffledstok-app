import { useEffect, useState, type RefObject } from 'react'
import { useDownloadImageMutation } from '../../../../shared/api/imagesApi'

interface UseImageModalParams {
  modalRef: RefObject<HTMLDivElement | null>
  onClose: () => void
  fileKey: string
}

export const useImageModal = ({
  modalRef,
  onClose,
  fileKey,
}: UseImageModalParams) => {
  const [isPurchased, setIsPurchased] = useState(false)
  const [downloadFile] = useDownloadImageMutation()

  // ESC + click outside
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
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
  }, [onClose, modalRef])

  // download
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

  // purchase
  const handleBuy = () => {
    setIsPurchased(true)
  }

  return {
    isPurchased,
    handleBuy,
    handleDownload,
  }
}

import { Header } from '../../user/components/homePage/HeaderHome'
import { FooterHomePage } from '../../user/components/homePage/FooterHome'
import { useMemo } from 'react'
import { ModalDownload } from '../../user/components/moduls/ModalDownload'
import { useGetImagesQuery } from '../../shared/api/imagesApi'
import { Slider } from '../../user/components/homePage/Slider'
import { useTypedDispatch, useTypedSelector } from '../../shared/hooks/redux'
import { closeImageModal, openImageModal } from '../../store/slices/imageModalSlice'
import { hideHero } from '../../store/slices/heroSlice'

export default function HomePage() {
  const dispatch = useTypedDispatch()
  const {isOpen, selectedImage} = useTypedSelector(state => state.imageModal)
  const {search, selectedTags} = useTypedSelector(state => state.imagesFilter)
  const { data: images = [] } = useGetImagesQuery()
  const {isVisible} = useTypedSelector(state => state.hero)

  const filteredImages = useMemo(() => {
  return images.filter(img => {
    const matchesTitle =
      !search.trim() ||
      img.title?.toLowerCase().includes(search.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => img.tags?.includes(tag))

    
    return matchesTitle && matchesTags
  })
}, [images, search, selectedTags])

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* HEADER */}
          <Header />
          {/* MAIN */}
          <main className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              {isVisible && <div className="px-4 py-10 md:py-3 flex flex-col gap-1 items-center text-center">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-gray-50 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
                    Elevate Your Digital Space
                  </h1>
                  <h2 className="text-gray-400 text-base font-normal leading-normal max-w-3xl mx-auto md:text-lg">
                    Discover high-quality wallpapers, icons, and stickers curated for modern creators.
                  </h2>
                </div>

                {/* SLIDER */}
                <div className="relative w-full max-w-5xl mx-auto overflow-hidden" style={{ perspective: '2000px' }}>
                  <Slider images={images!} />
                </div>
              </div>}

              {/* MEDIA GRID TITLE */}
              <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">All Media</h2>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {filteredImages.map(img => {
                  return (
                    <div
                      key = {img.key}
                      onClick={() => {
                        dispatch(hideHero())
                        dispatch(openImageModal(img))
                      }}
                      className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-center bg-cover flex flex-col justify-end gap-3"
                      data-alt="Minimalist desk setup with a laptop"
                      style={{
                        backgroundImage: `url(${img?.url})`,
                      }}>
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )
                })}
              </div>
              {isOpen && (
                <ModalDownload
                  onClose={() => dispatch(closeImageModal())}
                  file={selectedImage!}
                />
              )}
            </div>
          </main>
          <FooterHomePage />
        </div>
      </div>
    </div>
  )
}

import { Header } from '../../user/components/homePage/HeaderHome'
import { FooterHomePage } from '../../user/components/homePage/FooterHome'
import { ModalDownload } from '../../user/components/modal/ModalDownload'
import { Slider } from '../../user/components/homePage/Slider'
import { useTypedDispatch, useTypedSelector } from '../../shared/hooks/redux'
import { closeImageModal, openImageModal } from '../../store/slices/imageModalSlice'
import { hideHero } from '../../store/slices/heroSlice'
import { toggleTag } from '../../store/slices/imagesFilterSlice'
import { useGetTagsQuery } from '../../shared/api/tagsApi'
import { useFilteredMedia } from '../../user/hooks/useFilteredMedia'
import { addViewedImage } from '../../store/slices/viewedImagesSlice'
import { ViewedImagesSlider } from '../../user/components/homePage/ViewedImagesSlider'

import { useFeaturedMedia } from '../../user/hooks/useFeaturedMedia'

export default function HomePage() {
  const dispatch = useTypedDispatch()
  const { isOpen, selectedImage } = useTypedSelector(state => state.imageModal)
  const { selectedTags } = useTypedSelector(state => state.imagesFilter)
  const { data: tags = [] } = useGetTagsQuery()
  const { isVisible } = useTypedSelector(state => state.hero)

  const filteredImages = useFilteredMedia()
  const {featuredMedia} = useFeaturedMedia()

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* HEADER */}
          <Header />
          
          {/* MAIN */}
          <main className="flex flex-1 justify-center py-5">
            
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              {isVisible && (
                <div className="px-4 py-10 md:py-3 flex flex-col gap-1 items-center text-center hidden sm:block">
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
                    <Slider images={featuredMedia} />
                    
                  </div>
                </div>
              )}
              {/* Slider */}
                <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">Previous Images</h2>
                <ViewedImagesSlider/>
              {/* MEDIA GRID TITLE */}
              <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">All Media</h2>
              <div className="flex flex-nowrap gap-2 ml-3 lg:flex-wrap overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {tags.map(t => (
                  <label key={t.id} className="cursor-pointer group">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={selectedTags.includes(t.name)}
                      onChange={() => dispatch(toggleTag(t.name))}
                    />
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-400 transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary group-hover:border-white/40 group-hover:text-gray-200">
                      #{t.name}
                    </span>
                  </label>
                ))}
              </div>
              
              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                {filteredImages.length === 0 ? (
                  <p className="text-gray-400 col-span-full">Images not found</p>
                ) : (
                  filteredImages.map(img => {
                    return (
                      <div
                        key={`${img.type}-${img.id}`}
                        onClick={() => {
                          dispatch(hideHero())
                          dispatch(openImageModal(img))
                          dispatch(addViewedImage(img))
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
                  })
                )}
              </div>
              {isOpen && <ModalDownload onClose={() => dispatch(closeImageModal())} file={selectedImage!} />}
            </div>
          </main>
          <FooterHomePage />
        </div>
      </div>
    </div>
  )
}

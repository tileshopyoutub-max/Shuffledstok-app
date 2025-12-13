import { FooterStickersPage } from "../../user/components/stickersPage/FooterStickersPage"
import { HeaderStickersPage } from "../../user/components/stickersPage/HeaderStickersPage"

export const StickersPage = () => {
  return (
    <div className="font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-screen-xl flex-1">

              <HeaderStickersPage/>
              {/* <!-- PageHeading --> */}
              <div className="flex flex-wrap justify-between gap-3 p-4 md:p-10">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] min-w-72">
                  Stickers
                </h1>
              </div>
              {/* <!-- ImageGrid --> */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-10">
                <div
                  className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-square group relative"
                  data-alt="Vibrant abstract sticker with swirling colors"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDD0cN1upd48uOgbf8aYBPEs1jJrA1-2-oIo8-98OoMj5NKQgy67t0w91oOfgM1PC1Jj6f9MB3IK_XN9jY9GRTGuz3lrJUIKGdbVCaAtjrOiI5cKY25cXPpUjOigoZQeCh5IYGcahgbuXqHOuPHeYh4f1ylSb6ZzjTd66opiqDxxjlaJj29yStlJ8yg8Jl4P0Wmmt1DlnuEWYQprSLbxFL0qHlba1kNsHohdgr1x-iQXIKX0kjk4cgn_GxLNgXMmvG_oddLQKuLdaCH")'}}>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <p className="text-white text-base font-bold leading-tight w-full line-clamp-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Vibrant abstract sticker
                  </p>
                </div>
                
              </div>
              {/* <!-- ProgressBar / Loading Indicator --> */}
              <div className="flex flex-col gap-3 p-4 md:p-10">
                <div className="flex gap-6 justify-between">
                  <p className="text-white text-base font-medium leading-normal">Loading more stickers...</p>
                </div>
                <div className="rounded-full bg-[#3c4753]">
                  <div className="h-2 rounded-full bg-primary" style={{width: "100%"}}></div>
                </div>
              </div>
              <FooterStickersPage/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

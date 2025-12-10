import { HeaderHomePage } from '../../user/components/HomePage/HeaderHomePage'
import { FooterHomePage } from '../../user/components/HomePage/FooterHomePage'

export default function HomePage() {
  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* HEADER */}
          <HeaderHomePage />
          {/* MAIN */}
          <main className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              <div className="px-4 py-10 md:py-20 flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-gray-50 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
                    Elevate Your Digital Space
                  </h1>
                  <h2 className="text-gray-400 text-base font-normal leading-normal max-w-2xl mx-auto md:text-lg">
                    Discover high-quality wallpapers, icons, and stickers curated for modern creators.
                  </h2>
                </div>

                {/* SLIDER */}
                <div className="relative w-full overflow-hidden mt-8 py-8" style={{ perspective: '2000px' }}>
                  <div className="relative flex items-center justify-center h-[600px]">
                    <div className="absolute flex items-center justify-center w-full h-full transition-transform duration-500 ease-in-out">
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(-150%) scale(0.6) rotateY(45deg); z-index: 1; opacity: 0.5' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 1"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(-100%) scale(0.7) rotateY(35deg); z-index: 2; opacity: 0.7' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 2"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDO72WOn5qHWqNqrLYITUlsslYkTJQIPOBWTr5ot3f2tHEgm0z4uv-zZMPY7Oh8K6TvfuHgqcFsatW-ebTmXhghkYlxz6qsIObDevTC1-D3CBYbvzgnXKKO-fFxqfuPyWNOn28IFFYNFseVvewvxuvNxaWpiljWzJ80kjM1XG0HVdp35va6JvK4YfdS8xvnZNEt69ojHJKmGcW5_nMiPKWjfCK08zxHD6JK9V6lwGVtkyOFC54gZ6GALdQ7DtgwiSDY5M1jlnEm3A"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(-50%) scale(0.85) rotateY(20deg); z-index: 3; opacity: 0.9' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 3"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_Bs7Ysb2GdRDkf7GP6zNtyBgBa49LThUdj0sOxgiItIwqQ-FSt-qyIS9lQsv_NDTcGJ7So7cYgFCxA0WQSHSeKZJKmEQOLX_N0bTG6YQFkiHYa2xK2k12Tk3o2t3q0_v6ZamTOUP9YeDMCEAfrfkepHRb3zGwCXExhOSrDYW7mKGZUmD1pYvFGv9Qk9Jg5vmb1D-mXH3cSiODJqWIZ6MtvhLsxCV1GKKA1SS8ec1TJ13aWFwwXPmb3WHx8Q23lhgs-k2X7m-yrhN"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(0%) scale(1); z-index: 4' }}>
                        <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-2xl overflow-hidden">
                          <img
                            alt="Wallpaper 4"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoyTexTZEzu8Un6hjCBHUNQ2jtffQ9Hg6kAes2fmKwH7GM_acpzQJywY1GVjZXK81r3EIcQosxkByeTNndnMonbWQmPlg8t8Qfdhzy0tcO4Y8wopFsBxVHkB4u-vMJ8EzLZzqKPlw1qIATPe4t6_Okxhm_XWrHqhkYlhGtE_PlfiN6xPdkQqXV-9_eh7usj6rAzeKXJN6cbhHGyk1R59Yi6u16M4jgFAZW_qGWInVoa0VsTqZpWAfBSTsDNGPCCigX69MPEAsxkea1"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(50%) scale(0.85) rotateY(-20deg); z-index: 3; opacity: 0.9' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 5"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(100%) scale(0.7) rotateY(-35deg); z-index: 2; opacity: 0.7' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 6"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHH4a6TUbczE5B-oH755Z6Zb1bHw06r4o8e-O8fJz5epxpRQ9EQsx3JPabSm1trTwICNhq-dX4fGvORD_4YuBKFcbgJNLpVUPokrck6OLy8KMEbc17RKCveTzFgDm1XllyrBVWLvuXsRBPm1hqmx3wx94ELS2gpwwW2GB7yOLhY8xZWcU6h1u3avizF9wmNZCgJ6GMNkPTSb3rep1jUeZ8eMSG7g7RyPzrXgCLY4kLX-dmthWVnHnNFQC2CXGIrPjk3aNc-9hS-uwq"
                          />
                        </div>
                      </div>
                      <div
                        className="absolute transition-all duration-500 ease-in-out"
                        style={{ transform: 'translateX(150%) scale(0.6) rotateY(-45deg); z-index: 1; opacity: 0.5' }}>
                        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-xl overflow-hidden">
                          <img
                            alt="Wallpaper 7"
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKcz5SWVSw3egnO6iRmMUU6DAzDXIfQv1CibGkfnil7K5ea698UtJOQIQj4E8YmsPmGiYrLEsB39F7_ZR66TFwXKrHH3_BjDsqZISQqjPBdr6ZAG7ptc68VZecK3svm9U2AAH3EuTaOo7rZmVFVPYLmwasYY16StH8hb-6O42BqpNc3c_c5huol3MKGCO1Xz8q2dyNCXuPPWtl1fTpJDIxC15sp20vG2-f297VPi4ew6XMwG16BgQtLIKSSM6OuLSo-Lk_QsxiPZhY"
                          />
                        </div>
                      </div>
                    </div>
                    <button className="absolute z-20 top-1/2 -translate-y-1/2 left-4 md:left-16 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                      <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <button className="absolute z-20 top-1/2 -translate-y-1/2 right-4 md:right-16 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                      <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MEDIA GRID TITLE */}
              <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">All Media</h2>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                <div
                  className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-center bg-cover flex flex-col justify-end gap-3"
                  data-alt="Minimalist desk setup with a laptop"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR")',
                  }}>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </main>
          <FooterHomePage />
        </div>
      </div>
    </div>
  )
}

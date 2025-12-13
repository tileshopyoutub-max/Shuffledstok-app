import { useEffect, useRef } from "react";

export const ModalDownload = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
    }, 0);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* Модальное окно */}
      <div ref={modalRef} className="bg-background-dark text-gray-100 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden relative max-h-[90vh]">

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Контент модалки со скроллом */}
        <div className="p-6 overflow-y-auto max-h-[90vh] scrollbar-none" style={{scrollbarWidth: 'none'}}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Левая часть */}
            <div className="lg:col-span-2 flex flex-col items-center gap-4">
              <div className="relative w-full max-w-2xl group">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <img
                    alt="Preview"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoyTexTZEzu8Un6hjCBHUNQ2jtffQ9Hg6kAes2fmKwH7GM_acpzQJywY1GVjZXK81r3EIcQosxkByeTNndnMonbWQmPlg8t8Qfdhzy0tcO4Y8wopFsBxVHkB4u-vMJ8EzLZzqKPlw1qIATPe4t6_Okxhm_XWrHqhkYlhGtE_PlfiN6xPdkQqXV-9_eh7usj6rAzeKXJN6cbhHGyk1R59Yi6u16M4jgFAZW_qGWInVoa0VsTqZpWAfBSTsDNGPCCigX69MPEAsxkea1"
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
              <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
                <button className="aspect-square w-full rounded-lg overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background-dark">
                  <img
                    className="w-full h-full object-cover"
                    alt="Thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoyTexTZEzu8Un6hjCBHUNQ2jtffQ9Hg6kAes2fmKwH7GM_acpzQJywY1GVjZXK81r3EIcQosxkByeTNndnMonbWQmPlg8t8Qfdhzy0tcO4Y8wopFsBxVHkB4u-vMJ8EzLZzqKPlw1qIATPe4t6_Okxhm_XWrHqhkYlhGtE_PlfiN6xPdkQqXV-9_eh7usj6rAzeKXJN6cbhHGyk1R59Yi6u16M4jgFAZW_qGWInVoa0VsTqZpWAfBSTsDNGPCCigX69MPEAsxkea1"
                  />
                </button>

                <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                  <img
                    className="w-full h-full object-cover"
                    alt="Thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR"
                  />
                </button>

                <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                  <img
                    className="w-full h-full object-cover"
                    alt="Thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAADcmAIvWwSP-mJA5MaR3Nl-34BzFLPlkFLoUOEzdgSYCkQuaH3p-dfbDxmWv4iJQfm19ASkWSymaiTO8zrDyKRdoY0o-4qgQIb52mHpHwkikUjkwq1ba8Ojt_3L7uSmLQyOhhn6sYPBUVra8nCCv700fnnbM-8Kt-AN8nAqSiB8U_4zDsxQmkXTUce_tuSI528-mXhHBwQxdwJIg7MES9oJOfcffTL11YMNF4-R12Sktqk3vHDWX52w_WvCUFVYI7CN-fIr3ERuE4"
                  />
                </button>

                <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                  <img
                    className="w-full h-full object-cover"
                    alt="Thumbnail"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L"
                  />
                </button>
              </div>
            </div>

            {/* Правая часть */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-bold">Abstract Waves</h1>
                <p className="text-gray-400">
                  A vibrant and dynamic wallpaper featuring abstract wavy lines.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold">
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
  );
};

// export const ModalDownload = () => {
//   return (
//     <div className="font-display bg-background-dark text-gray-100">
//       <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
//         <div className="layout-container flex h-full grow flex-col">
//           <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-800/80 bg-background-dark/80 backdrop-blur-sm px-6 py-3">
//             <div className="flex items-center gap-8">
//               <a className="flex items-center gap-2 text-gray-100" href="#">
//                 <div className="size-6 text-primary">
//                   <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       clip-rule="evenodd"
//                       d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
//                       fill="currentColor"
//                       fill-rule="evenodd"></path>
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-bold tracking-tighter">ShuffledStock</h2>
//               </a>
//               <div className="hidden md:flex items-center gap-8">
//                 <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
//                   Wallpaper
//                 </a>
//                 <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
//                   Instagram Icons
//                 </a>
//                 <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
//                   Stickers
//                 </a>
//                 <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
//                   Collections
//                 </a>
//               </div>
//             </div>
//             <div className="flex flex-1 justify-end items-center gap-4">
//               <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
//                 <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
//                   <div className="text-gray-400 flex bg-background-dark/50 items-center justify-center pl-3 rounded-l-lg border border-gray-700 border-r-0">
//                     <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
//                       search
//                     </span>
//                   </div>
//                   <input
//                     className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 ring-inset border-gray-700 bg-background-dark/50 h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
//                     placeholder="Search"
//                     value=""
//                   />
//                 </div>
//               </label>
//               <div className="flex gap-2">
//                 <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
//                   <span className="truncate">Login</span>
//                 </button>
//                 <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
//                   <span className="truncate">Sign Up</span>
//                 </button>
//               </div>
//             </div>
//           </header>
//           <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
//               <div className="lg:col-span-2 flex flex-col items-center gap-4">
//                 <div className="relative w-full max-w-2xl group">
//                   <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
//                     <div className="flex h-full w-full">
//                       <img
//                         alt="Abstract colorful geometric shapes"
//                         className="h-full w-full object-cover"
//                         src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoyTexTZEzu8Un6hjCBHUNQ2jtffQ9Hg6kAes2fmKwH7GM_acpzQJywY1GVjZXK81r3EIcQosxkByeTNndnMonbWQmPlg8t8Qfdhzy0tcO4Y8wopFsBxVHkB4u-vMJ8EzLZzqKPlw1qIATPe4t6_Okxhm_XWrHqhkYlhGtE_PlfiN6xPdkQqXV-9_eh7usj6rAzeKXJN6cbhHGyk1R59Yi6u16M4jgFAZW_qGWInVoa0VsTqZpWAfBSTsDNGPCCigX69MPEAsxkea1"
//                       />
//                     </div>
//                   </div>
//                   <button className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
//                     <span className="material-symbols-outlined text-xl">chevron_left</span>
//                   </button>
//                   <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
//                     <span className="material-symbols-outlined text-xl">chevron_right</span>
//                   </button>
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
//                     <button className="size-2 rounded-full bg-white"></button>
//                     <button className="size-2 rounded-full bg-white/50 hover:bg-white/75"></button>
//                     <button className="size-2 rounded-full bg-white/50 hover:bg-white/75"></button>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
//                   <button className="aspect-square w-full rounded-lg overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background-dark">
//                     <img
//                       alt="Thumbnail 1"
//                       className="w-full h-full object-cover"
//                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoyTexTZEzu8Un6hjCBHUNQ2jtffQ9Hg6kAes2fmKwH7GM_acpzQJywY1GVjZXK81r3EIcQosxkByeTNndnMonbWQmPlg8t8Qfdhzy0tcO4Y8wopFsBxVHkB4u-vMJ8EzLZzqKPlw1qIATPe4t6_Okxhm_XWrHqhkYlhGtE_PlfiN6xPdkQqXV-9_eh7usj6rAzeKXJN6cbhHGyk1R59Yi6u16M4jgFAZW_qGWInVoa0VsTqZpWAfBSTsDNGPCCigX69MPEAsxkea1"
//                     />
//                   </button>
//                   <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
//                     <img
//                       alt="Thumbnail 2"
//                       className="w-full h-full object-cover"
//                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR"
//                     />
//                   </button>
//                   <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
//                     <img
//                       alt="Thumbnail 3"
//                       className="w-full h-full object-cover"
//                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuAADcmAIvWwSP-mJA5MaR3Nl-34BzFLPlkFLoUOEzdgSYCkQuaH3p-dfbDxmWv4iJQfm19ASkWSymaiTO8zrDyKRdoY0o-4qgQIb52mHpHwkikUjkwq1ba8Ojt_3L7uSmLQyOhhn6sYPBUVra8nCCv700fnnbM-8Kt-AN8nAqSiB8U_4zDsxQmkXTUce_tuSI528-mXhHBwQxdwJIg7MES9oJOfcffTL11YMNF4-R12Sktqk3vHDWX52w_WvCUFVYI7CN-fIr3ERuE4"
//                     />
//                   </button>
//                   <button className="aspect-square w-full rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
//                     <img
//                       alt="Thumbnail 4"
//                       className="w-full h-full object-cover"
//                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L"
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-col gap-6">
//                 <div className="flex flex-col gap-3">
//                   <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-50">Abstract Waves</h1>
//                   <p className="text-gray-400 text-base">
//                     A vibrant and dynamic wallpaper featuring abstract wavy lines in a colorful gradient. Perfect for
//                     adding a modern and energetic touch to your phone screen.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-4">
//                   <div className="flex flex-col items-start gap-4">
//                     <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors">
//                       <span className="truncate">Download for free</span>
//                     </button>
//                     <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 text-base font-bold leading-normal tracking-[0.015em] transition-colors">
//                       <span className="truncate">Buy for $2.99</span>
//                     </button>
//                     <button className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-700 hover:bg-gray-600 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors">
//                       <span className="truncate">Download file</span>
//                     </button>
//                   </div>
//                   <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
//                     <h3 className="text-lg font-semibold text-gray-200">Tags</h3>
//                     <div className="flex flex-wrap gap-2">
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         abstract
//                       </a>
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         colorful
//                       </a>
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         gradient
//                       </a>
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         waves
//                       </a>
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         modern
//                       </a>
//                       <a
//                         className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
//                         href="#">
//                         wallpaper
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-12 md:mt-20">
//               <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
//                 Similar content
//               </h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
//                 <div
//                   className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
//                   style={{
//                     backgroundImage:
//                       'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR")',
//                   }}>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </div>
//                 <div
//                   className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
//                   style={{
//                     backgroundImage:
//                       'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAADcmAIvWwSP-mJA5MaR3Nl-34BzFLPlkFLoUOEzdgSYCkQuaH3p-dfbDxmWv4iJQfm19ASkWSymaiTO8zrDyKRdoY0o-4qgQIb52mHpHwkikUjkwq1ba8Ojt_3L7uSmLQyOhhn6sYPBUVra8nCCv700fnnbM-8Kt-AN8nAqSiB8U_4zDsxQmkXTUce_tuSI528-mXhHBwQxdwJIg7MES9oJOfcffTL11YMNF4-R12Sktqk3vHDWX52w_WvCUFVYI7CN-fIr3ERuE4")',
//                   }}>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </div>
//                 <div
//                   className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
//                   style={{
//                     backgroundImage:
//                       'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L")',
//                   }}>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
//                     <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
//                       workspace_premium
//                     </span>
//                     <span>PRO</span>
//                   </div>
//                 </div>
//                 <div
//                   className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
//                   style={{
//                     backgroundImage:
//                       'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUEdk9c2t60humuZDgl7ycnadiJAuc6pSQBtzl_gp5yaqv2XFToyt7tuR7htBN9OkTjHAVfVEsQQvSI5WxEO4AhpaPb2VsrIXH-R6OXf4fyz2t9gPbKkfEEf-6xqtQC6PB2D3xPnKLWnkVYMoaJt8cnSqfDaJ4k3qHFZEfmFMV6zC3Y__fwgrtSW1oUY0qSgQKjMI-Gy-ecJqBt3xUhfi6ycbyfbsCnJbT04C9485NCaA4N0M-CczXegpUnUKyMcyafxUSYQAK8l6q")',
//                   }}>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </div>
//               </div>
//             </div>
//           </main>
//           <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-gray-800 bg-background-dark">
//             <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
//               <a
//                 className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
//                 href="#">
//                 About
//               </a>
//               <a
//                 className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
//                 href="#">
//                 Contact
//               </a>
//               <a
//                 className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
//                 href="#">
//                 FAQ
//               </a>
//               <a
//                 className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
//                 href="#">
//                 Terms of Service
//               </a>
//               <a
//                 className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
//                 href="#">
//                 Privacy Policy
//               </a>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4">
//               <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
//                 <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path
//                     clip-rule="evenodd"
//                     d="M12.315 2c-4.42 0-7.784 3.295-7.784 7.625 0 2.213.91 4.225 2.394 5.625.078.078.156.156.234.234 1.484 1.406 3.36 2.39 5.234 2.39 4.42 0 7.785-3.295 7.785-7.625S16.734 2 12.315 2zM4 9.625C4 5.32 7.734 2 12.08 2c4.347 0 7.92 3.32 7.92 7.406 0 4.086-3.573 7.406-7.92 7.406-1.953 0-3.75-.781-5.156-2.031C5.625 13.594 4 11.64 4 9.624z"
//                     fill-rule="evenodd"></path>
//                   <path d="M11.8 7.313c-2.58 0-4.688 2.11-4.688 4.688S9.22 16.69 11.8 16.69s4.688-2.11 4.688-4.688S14.38 7.312 11.8 7.312zm0 7.5a2.813 2.813 0 110-5.625 2.813 2.813 0 010 5.625zM16.95 6.375a.938.938 0 11-1.875 0 .938.938 0 011.875 0z"></path>
//                 </svg>
//               </a>
//               <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
//                 <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.06-.337-.1-1.023.034-1.424.14-1.58.93-3.952.93-3.952s-.234-.468-.234-1.154c0-1.082.624-1.89 1.4-1.89.66 0 1.055.495 1.055 1.095 0 .66-.422 1.65-.648 2.564-.188.773.39 1.4 1.172 1.4 1.4 0 2.473-1.48 2.473-3.628 0-1.92-1.232-3.25-2.925-3.25-2.02 0-3.187 1.51-3.187 3.02 0 .57.215 1.18.484 1.524.05.07.06.135.047.2-.047.165-.156.625-.188.75-.03.14-.14.17-.312.1-.88-.35-1.44-1.72-1.44-2.863 0-2.34 1.67-4.32 4.95-4.32 2.61 0 4.628 1.86 4.628 4.417 0 2.65-1.656 4.7-3.9 4.7-.77 0-1.5-.39-1.742-.855 0 0-.375 1.48-.468 1.84-.14.56-.562 1.29-.844 1.74C10.04 21.6 11.004 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
//                 </svg>
//               </a>
//               <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
//                 <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                 </svg>
//               </a>
//             </div>
//             <p className="text-gray-400 text-sm font-normal leading-normal">
//               © 2024 ShuffledStock. All rights reserved.
//             </p>
//           </footer>
//         </div>
//       </div>
//     </div>
//   )
// }

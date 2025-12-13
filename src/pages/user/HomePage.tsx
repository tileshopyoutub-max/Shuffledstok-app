import { HeaderHomePage } from '../../user/components/homePage/HeaderHome'
import { FooterHomePage } from '../../user/components/homePage/FooterHome'
import { useState } from 'react';
import { ModalDownload } from '../../user/components/moduls/ModalDownload';
import { useGetImagesQuery } from '../../shared/api/imagesApi';
import { Slider } from '../../user/components/homePage/Slider';

const imageses = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB80T2za701EgPtusg77DOnfZGSuM7WWlvbCL1BmdjQgCrBXijxGsbbQNSHNhSj6qnbPgRw8cwuD2UYZkrKVGNu2e50Q0zij9Zr2hhAfA8tn_ejd10OBEoqwZVeR8c9FNTAw-o9JQ79Sd-_KHmNwNtOJf_ReWOuTnU39lCsr8O_LPtc25fqfLKlFvegqg6XswoxOpH-GGDJTn7ozcFYk29IAUBWkD8rL9v9xjerDrQNdfghtMsVkAYuKbVInjfEq_XsP08JD5DkODQR",
]

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const {data: images} = useGetImagesQuery()
  console.log(images)
  const obj = images?.[0]
  console.log(obj?.url)
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
                  <Slider images={imageses}/>
                </div>
              </div>

              {/* MEDIA GRID TITLE */}
              <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">All Media</h2>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                <div
                  onClick={() => setOpenModal(true)}
                  className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-center bg-cover flex flex-col justify-end gap-3"
                  data-alt="Minimalist desk setup with a laptop"
                  style={{
                    backgroundImage:
                      `url(${obj?.url})`,
                  }}>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* <img src={`${obj?.url}`} alt="" /> */}
              </div>
              {openModal && <ModalDownload onClose={() => setOpenModal(false)} />}
            </div>
          </main>
          <FooterHomePage />
        </div>
      </div>
    </div>
  )
}

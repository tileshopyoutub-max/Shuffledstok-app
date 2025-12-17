import { Header } from '../../user/components/homePage/HeaderHome'

export function WallpapersPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-black">
      <div className="layout-container flex h-full grow flex-col">
        {/* HEADER */}
        <Header />
        {/* MAIN */}
        <main className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-10">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Wallpapers
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Explore an endless collection of high-quality wallpapers for your desktop.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Abstract swirling colors of pink and blue paint in water."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-teG-on7Csy_vdzynjQr2hLDIKISLNj99ktPfUF40OIzs_XPvQ8jCkKh6UO_wvI6DJhrpww-mLslh3gDce0JvuSDpZLezqzknYjYooU7Eht-sXS7xdpE0Ku9OmhSeP-WN2BSVnXZxbi9ePcDrwascSIaHWT9gU6_ty3TH2OAufxYCw6W9w1oosk1Z7XUWGExav8WEl2rr0GTPfmwrum5hglbw4t_FRoBkDR9JV70Hz6vP5qD-r_jLL2O_B4mIyDs0V3CJYZNvouB3"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Vibrant desert landscape with sand dunes under a starry night sky."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgAwmch3jJYyBhjOvs7RMLLur5z2wvZ2RHn_A-_amjhxaS2D5UXFE3ZuOPAxayYIi62xK8TetVFZCOQBekkh0TUC_JbIQwuQG0TEVO2wpNnxUNyxcn5VwJkTqoUnrAVZDUfiEdpSv6KfyNyJRC8DEp4Ga7G5bwfwnyNc47utWB4IP5nPfO3A3ntRUsV021YtEJrY69o4zarB-fum6PA_uyltYtze39WXX2A4EVr2SNnEOzRacdD4Za0xsAu8aVtI__1_gNX9o54pkh"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Green rolling hills and a winding river under a blue sky in a pastoral landscape."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIL-9KGuU1axgAtPBf4xibEFrlLvbF19sa7H4icmYckIWMDNhryVeU9pYWmxQS9YhgwuPKedIyS2Fvo_tzcbVek6Xd_NnV5Zt8DGnXCHdA5PZHDi2MXQ_Nkd-R1vUr2DM0VThY2_W-7L8EBFtPMOgon4bRL3LBGx1m_2XZLjM12YCiDmN7n2QszQr8fGIl2m_XSW8g4V0ncMCX6GlAELFYwzZRszT17e5sW1R3BsuJ9LBSM2aQkIWENlekoctecgKXFeBP4X8HKvDA"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Geometric black and gold abstract pattern with repeating lines and shapes."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6AuFTscrY-EY03_EF1oXfv3FqDNC39nB3O-ktL9XjcnWbh93p3J6oJTZ3xGypTLgyFDkUUbqJj7h1FTP5kjqHunkMUSpmbU3M4zqALKATJt3YXI_Y2Y3jLd8mRZ719DwR0GJFLr0egqwN6Fq1_rblvfqD1DLZXTawquKJazgbcsDCHZkHPgKJVvKhCPxydPFipKz_onu_vw8HQYVHjbCgUM1JmnopBUeQqkaHvr8lDBAu1XNo9ah1vbaDStaB5lLr6M54v4YVekk"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Soft pastel gradient background blending from pink to blue."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIQn6-OiBBSp3e_aDONl01Geoi7p2Mfmvp-xVaGm-WLcIZj5tEpCdA6kkY_p5syrh6smKAiafpNv750Tn9cVMd3vtAbwQbhqK_8ktwWUJFimvK6at9AjfMP7gnQM9u4Su8hN6qfTk0KOU1iD1UFggVcR6mIXlWT7JB0TGvkFRG7IuF5HHQN-XbcVNZ7z9o6UZ_L6s3udbi1miExNMgjJq1HoJtrkbYm980ZBXq1l1_U4zh1plU9bjQAkQvW9Fz91LNjmZCJZ1uwIBl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Futuristic cityscape at night with neon lights and flying vehicles."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFkgyWN8zWkV7kRjUVxS2cLX5sI7Db2oCdanqLNmVzBl5GRbUoQR70LqVddTX0uXECLUe2cWG78qSdSPKS6O63jhR1W0RXBGDoHuRXO8ldiIr5V4oIMayWOe8Bzk7wRAr9jfrNhkHM4p13kNNAcJTmWXNc4jDva2DF-ycseHMXPuJK4qsib5AAh3Oyib81LYNalf_nhK_SiKX7ZClQTmcY5IG0cB7e27tIz5M7Ona_E87C12dN00zia1v8xMwtImuKlfJM_3wuCG-W"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="A tranquil forest scene with sunbeams filtering through tall trees."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSSYaxApn7hJBDCSGvRYOPcBzyRDfRs9OY_K4uZj63KU3rxIZcg9Za8IjRynCtaO8-Z1WU_-Bd-RBFv77mWI82AOjoG9gEMTqWZfTJ0FfRf861qk1HdJ7_LHhBZE9D7rwuIaGVp6CB90NFgw8C5LQs62kEZ_HDYx4uO2PV2YzCOnz-aVbDCCGKspKxAAlWvpMuac9crlH5442djqmbPpwTOY5jLQFarXfW4-E6OzhuwzQ3Nh1aOKU3wNeQARBhU9Zafynnng4z3Sy_"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Close-up of a colorful nebula in deep space with bright stars."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmt1jRkoeqVcvEG74XiOXHJ-dK4wThvoFbqIb8pwiXVKPyyG7P60jbSS2fErTaiyOUicGxratozHQeJNlJG1xu0aQl-rK6IbdZD6pTsul5sZ7zIbvr4XuQgapDoArkSTFszsUSR72YK-1uatOETyn0zue-A7HDBkJW-252vnA8wh3xmN0wdlvqgwdJkduqsafzgYsaLXK7z8gMzd-2ag-n2IQBEWCLzt4Zlr0IU9s_Yv2eLdw1fh5B_XhWA-e7sSgHMKnjsJvXXwyV"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="Tropical beach with white sand, turquoise water, and palm trees."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcEMFNNoEN7EI3QCMusgbO_fLH9iNKBLB1YnkR-SwdwZDVdILhVSoVL14FeLY4R6cF-YQgQp0XHpgRL5cbGyzTIFhpDPp9aifq_twPehdnI13dcxAkQ-oLRRTHeJTkJW8jSCeRkgwd4gKedy29c-NhGXZ1MRA0eiyZAgwEr7vmIxMrOcyiE5_esdXXhZ6LhBZdDfWo3P9-qP9G2Tv3DX3WF2B9LMvlNUcWLjXK-NHWz9ocXroARCjD6ZSZ35WhoJUHyRNxlHjz-gA2"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="A smooth, colorful abstract gradient blending yellow, purple, and blue."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARvla9_J1l_KzsZcvHMh7RSMOYzvjgISEdIyRQ_oEHvDKJFpLVI0ReZGlH0sCodqNJyE-FWG89EsZUv9FOdu8hD_eOXZmTvBSCjqdohfHN0PnUrnXD6bWQQYejFXV6edFvWbJDfp13EAbK8svAA3MvmsJ-y14OIkYmPZ-g60ERFA1MTYbpPXhmcIE4koIOJGQwY5iihDdV1Kd0ZDkpQD8A7duj8qHztX8wUegQytrbpjJJlDJ_1Y4rhZta12T7ksWnlbL68rNVoXzo"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="A wavy liquid marble texture with pink and white colors."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWcX8aRjRp_fjCZgrf1YL7-j9Wly9gse3MjahhWdlBCoA62iMfjFZmw6K1PCHiPGYiCbt-pPZn0_vs-6OC0kkBTeJmUO-kVfR5gNOCgLbBtoEf2HAhVQb0tUU5qFmwv3YGEfpxhI_6R-pDfP9ceuo1JBPlRVJ5pAAt42TfpXmUb-jNnj4A4FNOeR74QEF8vtkzOFxotQ6qh8lgV7frAEKZ5ZH0f01s90Lri5VZm65DDPp5qLi7-i1o-qDE8h9mMcW0brrMgRnT2H7S"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="relative group image-card overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                  data-alt="A majestic mountain range at sunrise with misty valleys."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqbmkfNhkVQ8ES3kCl2kd7LZfN_8DOWLU8hRxxK4GrWgwwkmIaVazAbawlOFlNimMuqdxyrSoGDe-RP4iuGL4YRC8DwWzzYJHNjSnV3_jxeKu2DxyppcYDlGd0BPcvPDSIew2z37iGLfOSDyd-j9gLd7RAeD-Daz8j0duttO8g7nD1nYDYBxumJmt_j2nLpEJIu2L6aAloQfMVS9xW3Yms4ogneK8B2d45Nc5PnAtqmirtoJMveO4U5CankTL_wVyFPM0iS00l1BCy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity overlay flex items-end p-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/90 text-slate-900 h-10 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="download">
                      download
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 my-10">
              <div className="flex gap-6 justify-between">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                  Loading new wallpapers...
                </p>
              </div>
              <div className="rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-2 rounded-full bg-primary animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

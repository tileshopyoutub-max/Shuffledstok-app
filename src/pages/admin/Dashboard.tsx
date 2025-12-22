import AdminPageHeader from "../../components/admin/layout/AdminPageHeader";

export default function Dashboard() {
    return (
        <>
            <AdminPageHeader title="Purchase Statistics"/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-background-dark-secondary p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Total Revenue</h2>
                    <div className="h-80">
                        <img alt="Revenue chart" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTWOsbvDFKUN9sivZi-2VDeqCojS13Qi1yT3HgFAzb0z7f1N54cpfcYci6CPoRoHk_bklX-OZvqxHyIGfm2kX2nJfxRRRoqXPPQISS6b0ccR-EhXQkWjAI60ZqVWZrEBX7DHXjKpFhm4kfrB3u27ZGIUuQdaWmXmvgw_AG6UBASnRrjjjY6OvyEvtCSzATz0oxUBQRPfiG8FJPCY1ISANRZGWPKT5nCzcVDbnvHX4SrRO9yVqo1KNAzX0mh3jfqQLCs_lRP1w4XgTw" />
                    </div>
                </div>
                <div className="bg-background-dark-secondary p-6 rounded-lg flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-md font-medium text-text-light-secondary">Total Sales</h3>
                            <p className="text-3xl font-bold mt-1">$12,845.50</p>
                        </div>
                        <span className="material-symbols-outlined text-green-400">trending_up</span>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-md font-medium text-text-light-secondary">New Subscriptions</h3>
                            <p className="text-3xl font-bold mt-1">2,350</p>
                        </div>
                        <span className="material-symbols-outlined text-green-400">trending_up</span>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-md font-medium text-text-light-secondary">Active Users</h3>
                            <p className="text-3xl font-bold mt-1">18,209</p>
                        </div>
                        <span className="material-symbols-outlined text-blue-400">trending_flat</span>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-md font-medium text-text-light-secondary">Downloads</h3>
                            <p className="text-3xl font-bold mt-1">78,142</p>
                        </div>
                        <span className="material-symbols-outlined text-green-400">trending_up</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-background-dark-secondary p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-dark">
                                <th className="p-3 text-sm font-semibold text-text-light-secondary">User</th>
                                <th className="p-3 text-sm font-semibold text-text-light-secondary">Item</th>
                                <th className="p-3 text-sm font-semibold text-text-light-secondary">Date</th>
                                <th className="p-3 text-sm font-semibold text-text-light-secondary">Amount</th>
                                <th className="p-3 text-sm font-semibold text-text-light-secondary">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border-dark hover:bg-background-dark transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGJCWfTGxwtUAxKqQ1KpREJln8OTIL3np7RHxjn-rhXymey5taP1d75UTZTxiZ9YO_5O2Nzp4Bm7fe23EVTR85fOicdsteiOlZWhBJAKAgld-KRuFkTrGwFhHUCSlxdnbiwgSnJfTexkN6oa65bd23aM0RJ42tV4pOrKQImUJCYunrVaGjXB0ET67OyGt99FaUHTPe9MgDRRHDxcU0ofP_763ikkQ9-dfVWX1U6G5uUfmJ-kLL9tJeYu23VcbL9LNi4M0RG1u0ZT7L" />
                                        <span>Olivia Martin</span>
                                    </div>
                                </td>
                                <td className="p-3">PRO Subscription (1 Year)</td>
                                <td className="p-3 text-text-light-secondary">2023-11-23</td>
                                <td className="p-3">$99.00</td>
                                <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 text-xs font-medium rounded-full">Completed</span></td>
                            </tr>
                            <tr className="border-b border-border-dark hover:bg-background-dark transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLOrv6m6YG5k0gf6sIvFR3u5vwRFmtAg_ev4bpTXKse3LNo6DZPsZvPLeEPT1HsLQzgDZ-JdHaw3wizl-7L4-J2SYbelhfqfLGuuXreHEhZlGlDwfhUlfRZkabZUMegBZzNG6TLF8O8e6m79gInphK9X3sgPn7-neixr5lu7P1V3_8YfTgB7dJ3jelLwNijitvMtiV_kyx0QFbSQGHtL4x8Sjjiz81sgVcF1E-9mFQ6S1zLCug0tFy1d6v34rj7iopxcA1B7tW8S94" />
                                        <span>Liam Johnson</span>
                                    </div>
                                </td>
                                <td className="p-3">Sticker Pack Vol. 3</td>
                                <td className="p-3 text-text-light-secondary">2023-11-22</td>
                                <td className="p-3">$12.50</td>
                                <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 text-xs font-medium rounded-full">Completed</span></td>
                            </tr>
                            <tr className="border-b border-border-dark hover:bg-background-dark transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_Bs7Ysb2GdRDkf7GP6zNtyBgBa49LThUdj0sOxgiItIwqQ-FSt-qyIS9lQsv_NDTcGJ7So7cYgFCxA0WQSHSeKZJKmEQOLX_N0bTG6YQFkiHYa2xK2k12Tk3o2t3q0_v6ZamTOUP9YeDMCEAfrfkepHRb3zGwCXExhOSrDYW7mKGZUmD1pYvFGv9Qk9Jg5vmb1D-mXH3cSiODJqWIZ6MtvhLsxCV1GKKA1SS8ec1TJ13aWFwwXPmb3WHx8Q23lhgs-k2X7m-yrhN" />
                                        <span>Noah Williams</span>
                                    </div>
                                </td>
                                <td className="p-3">Icon Set - "Minimal"</td>
                                <td className="p-3 text-text-light-secondary">2023-11-21</td>
                                <td className="p-3">$25.00</td>
                                <td className="p-3"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 text-xs font-medium rounded-full">Pending</span></td>
                            </tr>
                            <tr className="border-b border-border-dark hover:bg-background-dark transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYkDMQwhZ7NnGfrihoiHUnbLLQxtwXeyZfipjtxs71UDQzsynzBfVnv1o-X680diDaaOY14DXTYJp7EiFFBRDZL6WM-6vwZy0nToSykctKNYfeiGCj7bsHQwSgvY60jhpktcBOyaXSOCZISODc5MSrsz4z1uBcZi9Qcko70ExMK23eDDsRsj6k8EUceSCxZjWqwZ8IYANFJu_Ju7EgEpyS6ksMIeocQCH5uaYGHTGF4vZMVHKbUm6sahK4-pBNh1KBQvzUu5ZFTMY0" />
                                        <span>Emma Brown</span>
                                    </div>
                                </td>
                                <td className="p-3">PRO Subscription (1 Month)</td>
                                <td className="p-3 text-text-light-secondary">2023-11-21</td>
                                <td className="p-3">$15.00</td>
                                <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 text-xs font-medium rounded-full">Completed</span></td>
                            </tr>
                            <tr className="hover:bg-background-dark transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDO72WOn5qHWqNqrLYITUlsslYkTJQIPOBWTr5ot3f2tHEgm0z4uv-zZMPY7Oh8K6TvfuHgqcFsatW-ebTmXhghkYlxz6qsIObDevTC1-D3CBYbvzgnXKKO-fFxqfuPyWNOn28IFFYNFseVvewvxuvNxaWpiljWzJ80kjM1XG0HVdp35va6JvK4YfdS8xvnZNEt69ojHJKmGcW5_nMiPKWjfCK08zxHD6JK9V6lwGVtkyOFC54gZ6GALdQ7DtgwiSDY5M1jlnEm3A" />
                                        <span>Ava Jones</span>
                                    </div>
                                </td>
                                <td className="p-3">Wallpaper Collection - "Nature"</td>
                                <td className="p-3 text-text-light-secondary">2023-11-20</td>
                                <td className="p-3">$30.00</td>
                                <td className="p-3"><span className="bg-red-500/20 text-red-400 px-2 py-1 text-xs font-medium rounded-full">Failed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
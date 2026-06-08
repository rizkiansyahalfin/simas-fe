import {
    AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Wallet, CalendarDays, ArrowRight, Clock } from 'lucide-react'
import { KPI, KEUANGAN, PIE_DATA, PIE_COLORS, AKTIVITAS } from '@/dashboard/data/dashboardData'

/* ─── Data ─── */

/* ─── Recharts custom tooltips ─── */
const TooltipKeuangan = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
    if (!active || !payload?.length) return null
    const fmt = (v: number) => 'Rp ' + (v / 1000000).toFixed(1) + ' Jt'
    return (
        <div className="db-tooltip dark:bg-slate-900 dark:border-slate-700 shadow-xl rounded-lg p-3 border">
            <p className="db-tooltip-label dark:text-slate-400 text-xs mb-2 font-semibold">{label}</p>
            {payload.map((p: { name: string; value: number }) => (
                <div key={p.name} className="db-tooltip-row flex items-center gap-2 text-sm">
                    <span className="db-tooltip-dot w-2 h-2 rounded-full" style={{ backgroundColor: p.name === 'Pemasukan' ? '#10b981' : '#f59e0b' }} />
                    <span className="text-gray-500 dark:text-slate-400">{p.name}:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{fmt(p.value)}</span>
                </div>
            ))}
        </div>
    )
}

const TooltipPie = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="db-tooltip dark:bg-slate-900 dark:border-slate-700 shadow-lg rounded-lg p-2 border">
            <p className="font-bold text-gray-800 dark:text-white text-sm">{payload[0].name}</p>
            <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">{payload[0].value}%</p>
        </div>
    )
}

/* ─── Page ─── */
export default function AdminDashboardPage() {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Ringkasan data masjid hari ini.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">{today}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Data diperbarui realtime</p>
                </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI.map(k => (
                    <div key={k.label} className="stat-card dark:bg-slate-900 border dark:border-slate-800 dark:shadow-none p-5 rounded-xl bg-white">
                        <div className={`icon-wrap ${k.iconBg} p-2 rounded-lg inline-flex mb-3`}>
                            <k.Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider truncate">{k.label}</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white leading-tight mt-1">{k.value}</p>
                            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                {k.up
                                    ? <TrendingUp className="size-3 text-emerald-500 shrink-0" />
                                    : <TrendingDown className="size-3 text-red-400 shrink-0" />
                                }
                                <span className={`text-xs font-bold ${k.up ? 'text-emerald-500' : 'text-red-400'}`}>{k.trend}</span>
                                <span className="text-xs text-gray-400 dark:text-slate-500">{k.sub}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Area chart — 2/3 */}
                <div className="lg:col-span-2 card p-6 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-black text-gray-900 dark:text-white">Arus Keuangan</h2>
                            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Pemasukan vs Pengeluaran — 8 bulan terakhir</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="db-legend-dot bg-emerald-500 w-2.5 h-2.5 rounded-full" />
                                <span className="text-xs text-gray-500 dark:text-slate-400">Pemasukan</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="db-legend-dot bg-amber-400 w-2.5 h-2.5 rounded-full" />
                                <span className="text-xs text-gray-500 dark:text-slate-400">Pengeluaran</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={KEUANGAN} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gPemasukan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gPengeluaran" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {/* Pakai warna netral ber-opacity untuk Grid biar aman di terang & gelap */}
                            <CartesianGrid strokeDasharray="3 3" stroke="#888888" strokeOpacity={0.15} vertical={false} />
                            <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'Jt'} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
                            <Tooltip content={<TooltipKeuangan />} />
                            <Area type="monotone" dataKey="pemasukan" name="Pemasukan" stroke="#10b981" strokeWidth={2} fill="url(#gPemasukan)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#f59e0b" strokeWidth={2} fill="url(#gPengeluaran)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart — 1/3 */}
                <div className="card p-6 flex flex-col bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div className="mb-4">
                        <h2 className="text-base font-black text-gray-900 dark:text-white">Distribusi Donasi</h2>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Berdasarkan kategori bulan ini</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                                    {PIE_DATA.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<TooltipPie />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {PIE_DATA.map((d, i) => (
                            <div key={d.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                                    <span className="text-xs text-gray-600 dark:text-slate-400">{d.name}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-800 dark:text-white">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Bar chart — 2/3 */}
                <div className="lg:col-span-2 card p-6 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div className="mb-5">
                        <h2 className="text-base font-black text-gray-900 dark:text-white">Donasi per Bulan</h2>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Nominal donasi masuk per bulan</p>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={KEUANGAN} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={24}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#888888" strokeOpacity={0.15} vertical={false} />
                            <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'Jt'} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
                            <Tooltip content={<TooltipKeuangan />} />
                            <Bar dataKey="pemasukan" name="Pemasukan" radius={[6, 6, 0, 0]} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Aktivitas — 1/3 */}
                <div className="card p-6 flex flex-col bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-black text-gray-900 dark:text-white">Aktivitas Terbaru</h2>
                        <button className="btn-outline-sm py-1 px-3 text-xs border border-gray-200 dark:border-slate-700 rounded-md text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors">
                            Semua <ArrowRight className="size-3" />
                        </button>
                    </div>
                    <div className="flex-1 space-y-4 mt-2">
                        {AKTIVITAS.map((a, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={`icon-wrap shrink-0 ${a.bg} ${a.color} p-2 rounded-lg`}>
                                    <a.Icon className="size-4" />
                                </div>
                                <div className="min-w-0 flex-1 border-b border-gray-100 dark:border-slate-800 pb-3">
                                    <p className="text-xs font-medium text-gray-700 dark:text-slate-200 leading-snug">{a.label}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-sm p-5 flex items-center justify-between bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Donasi Menunggu</p>
                        <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">8</p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Perlu diverifikasi segera</p>
                    </div>
                    <div className="icon-wrap bg-amber-50 dark:bg-amber-900/30 text-amber-500 p-3 rounded-xl">
                        <Clock className="size-6" />
                    </div>
                </div>

                <div className="card-sm p-5 flex items-center justify-between bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Jadwal Jumat Terisi</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">2/4</p>
                        <div className="w-24 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-1/2" />
                        </div>
                    </div>
                    <div className="icon-wrap bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 p-3 rounded-xl">
                        <CalendarDays className="size-6" />
                    </div>
                </div>

                <div className="card-sm p-5 flex items-center justify-between bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Saldo ZIS Tersedia</p>
                        <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">Rp 83,6 Jt</p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Siap untuk didistribusikan</p>
                    </div>
                    <div className="icon-wrap bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 p-3 rounded-xl">
                        <Wallet className="size-6" />
                    </div>
                </div>
            </div>

        </div>
    )
}
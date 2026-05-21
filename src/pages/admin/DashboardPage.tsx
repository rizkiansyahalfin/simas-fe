import {
    AreaChart, Area, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'
import {
    TrendingUp, TrendingDown, Wallet,
    CalendarDays, ArrowRight, Clock,
} from 'lucide-react'
import { KPI, KEUANGAN, PIE_DATA, PIE_COLORS, AKTIVITAS } from '@/data/dashboardData'

/* ─── Data ─── */

/* ─── Recharts custom tooltips (hanya text, bukan styling) ─── */
const TooltipKeuangan = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
    if (!active || !payload?.length) return null
    const fmt = (v: number) => 'Rp ' + (v / 1000000).toFixed(1) + ' Jt'
    return (
        <div className="db-tooltip">
            <p className="db-tooltip-label">{label}</p>
            {payload.map((p: { name: string; value: number }) => (
                <div key={p.name} className="db-tooltip-row">
                    <span className="db-tooltip-dot" data-color={p.name} />
                    <span className="text-gray-500">{p.name}:</span>
                    <span className="font-bold text-gray-800">{fmt(p.value)}</span>
                </div>
            ))}
        </div>
    )
}

const TooltipPie = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="db-tooltip">
            <p className="font-bold text-gray-800">{payload[0].name}</p>
            <p className="text-gray-500">{payload[0].value}%</p>
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
                    <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-400 mt-1">Ringkasan data masjid hari ini.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">{today}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Data diperbarui realtime</p>
                </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI.map(k => (
                    <div key={k.label} className="stat-card">
                        <div className={`icon-wrap ${k.iconBg}`}>
                            <k.Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">{k.label}</p>
                            <p className="text-xl font-black text-gray-900 leading-tight">{k.value}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                {k.up
                                    ? <TrendingUp className="size-3 text-emerald-500 shrink-0" />
                                    : <TrendingDown className="size-3 text-red-400 shrink-0" />
                                }
                                <span className={k.up ? 'db-trend-up' : 'db-trend-down'}>{k.trend}</span>
                                <span className="text-xs text-gray-400">{k.sub}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Area chart — 2/3 */}
                <div className="lg:col-span-2 card p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-black text-gray-900">Arus Keuangan</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Pemasukan vs Pengeluaran — 8 bulan terakhir</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="db-legend-dot bg-simas-primary" />
                                <span className="text-xs text-gray-500">Pemasukan</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="db-legend-dot bg-amber-400" />
                                <span className="text-xs text-gray-500">Pengeluaran</span>
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
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                            <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'Jt'} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
                            <Tooltip content={<TooltipKeuangan />} />
                            <Area type="monotone" dataKey="pemasukan" name="Pemasukan" stroke="#10b981" strokeWidth={2} fill="url(#gPemasukan)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#f59e0b" strokeWidth={2} fill="url(#gPengeluaran)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart — 1/3 */}
                <div className="card p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-base font-black text-gray-900">Distribusi Donasi</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Berdasarkan kategori bulan ini</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                                    {PIE_DATA.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />
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
                                    <span className="db-legend-dot" style={{}} data-idx={i}
                                        /* Recharts perlu hex — pakai CSS var lewat class khusus */
                                        ref={el => { if (el) el.style.background = PIE_COLORS[i] }}
                                    />
                                    <span className="text-xs text-gray-600">{d.name}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-800">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Bar chart — 2/3 */}
                <div className="lg:col-span-2 card p-6">
                    <div className="mb-5">
                        <h2 className="text-base font-black text-gray-900">Donasi per Bulan</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Nominal donasi masuk per bulan</p>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={KEUANGAN} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={24}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                            <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'Jt'} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
                            <Tooltip content={<TooltipKeuangan />} />
                            <Bar dataKey="pemasukan" name="Pemasukan" radius={[6, 6, 0, 0]} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Aktivitas — 1/3 */}
                <div className="card p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-black text-gray-900">Aktivitas Terbaru</h2>
                        <button className="btn-outline-sm py-1 px-2 text-xs">
                            Semua <ArrowRight className="size-3" />
                        </button>
                    </div>
                    <div className="flex-1 space-y-3">
                        {AKTIVITAS.map((a, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={`icon-wrap shrink-0 ${a.bg} ${a.color}`}>
                                    <a.Icon className="size-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-700 leading-snug">{a.label}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-sm p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Donasi Menunggu</p>
                        <p className="text-2xl font-black text-amber-600 mt-0.5">8</p>
                        <p className="text-xs text-gray-400">Perlu diverifikasi segera</p>
                    </div>
                    <div className="icon-wrap icon-wrap-amber">
                        <Clock className="size-5" />
                    </div>
                </div>

                <div className="card-sm p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Jadwal Jumat Terisi</p>
                        <p className="text-2xl font-black text-simas-primary mt-0.5">2/4</p>
                        <div className="progress-track w-24 mt-2">
                            <div className="progress-fill progress-fill-green db-progress-half" />
                        </div>
                    </div>
                    <div className="icon-wrap icon-wrap-green">
                        <CalendarDays className="size-5" />
                    </div>
                </div>

                <div className="card-sm p-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Saldo ZIS Tersedia</p>
                        <p className="text-2xl font-black text-simas-primary-dark mt-0.5">Rp 83,6 Jt</p>
                        <p className="text-xs text-gray-400">Siap untuk didistribusikan</p>
                    </div>
                    <div className="icon-wrap icon-wrap-green">
                        <Wallet className="size-5" />
                    </div>
                </div>
            </div>

        </div>
    )
}
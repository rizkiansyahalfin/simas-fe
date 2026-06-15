import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { KEUANGAN } from '../data/dashboardData'
import { TooltipKeuangan } from './TooltipKeuangan'
 
export default function FinanceChart() {
    return (
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
    )
}
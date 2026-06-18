import { ArrowRight } from 'lucide-react'
import { AKTIVITAS } from '@/dashboard/data/dashboardData'

export default function RecentActivity() {
    return (
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
    )
}
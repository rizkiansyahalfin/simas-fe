import { TrendingUp, TrendingDown } from "lucide-react"
import { KPI } from "../data/dashboardData"

export default function KpiCard() {
    return (
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
    )
}

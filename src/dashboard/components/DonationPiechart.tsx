import {
    PieChart, Pie, Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { PIE_DATA, PIE_COLORS } from '@/dashboard/data/dashboardData'
import { TooltipPie } from '../components/tooltip'

export default function DonationPiechart() {
    return (   

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
    )
}
import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { KEUANGAN } from '../data/dashboardData'
import { TooltipKeuangan } from './TooltipKeuangan'


export default function MonthlyChart() {
    return (
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
    )
}
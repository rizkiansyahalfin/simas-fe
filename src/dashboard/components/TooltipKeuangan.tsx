export const TooltipKeuangan = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
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

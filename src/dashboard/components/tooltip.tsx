export const TooltipPie = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="db-tooltip dark:bg-slate-900 dark:border-slate-700 shadow-lg rounded-lg p-2 border">
            <p className="font-bold text-gray-800 dark:text-white text-sm">{payload[0].name}</p>
            <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">{payload[0].value}%</p>
        </div>
    )
}
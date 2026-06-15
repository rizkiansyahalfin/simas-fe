interface HeaderProps {
    activeTab: "dashboard" | "annual"
    setActiveTab: React.Dispatch<
        React.SetStateAction<"dashboard" | "annual">
    >
}
export default function Header({ activeTab, setActiveTab }: HeaderProps) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    return (
        <div className="flex items-start justify-between">
            <div className="flex gap-2 mt-3 justify-end">
                <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`px-3 py-2 rounded-lg text-sm ${activeTab === "dashboard"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => setActiveTab("annual")}
                    className={`px-3 py-2 rounded-lg text-sm ${activeTab === "annual"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Annual Report
                </button>
            </div>
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Ringkasan data masjid hari ini.</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">{today}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Data diperbarui realtime</p>
            </div>
        </div>
    )
}
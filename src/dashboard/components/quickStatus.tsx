import { CalendarDays, Clock, Wallet } from "lucide-react"

export default function QuickStatus() {
    return (
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
    )
}

import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstallBannerProps {
  onInstall: () => void
  onDismiss: () => void
}

export function InstallBanner({ onInstall, onDismiss }: InstallBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-simas-primary dark:text-emerald-400 shrink-0">
          <Download className="size-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-white">Pasang Aplikasi SIMAS</h4>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-tight mt-0.5">
            Akses cepat tanpa browser & bisa dibuka saat offline.
          </p>
        </div>
        <button onClick={onDismiss} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 sm:hidden">
          <X className="size-5" />
        </button>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
        <Button variant="outline" className="flex-1 sm:flex-none border-gray-200 dark:border-slate-700 dark:text-white" onClick={onDismiss}>
          Nanti Saja
        </Button>
        <Button className="flex-1 sm:flex-none bg-simas-primary text-white hover:bg-emerald-700" onClick={onInstall}>
          Pasang Sekarang
        </Button>
      </div>
    </div>
  )
}
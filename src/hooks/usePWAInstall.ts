import { useState, useEffect } from "react"

// Interface agar TypeScript tidak merah
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [visitCount, setVisitCount] = useState(0)
  const [hasDismissed, setHasDismissed] = useState(false)

  useEffect(() => {
    // Hitung kunjungan user
    const currentVisits = parseInt(localStorage.getItem("simas_visits") || "0", 10)
    const newVisits = currentVisits + 1
    localStorage.setItem("simas_visits", newVisits.toString())
    setVisitCount(newVisits)

    // Cek apakah user pernah menutup banner
    const dismissed = localStorage.getItem("simas_install_dismissed") === "true"
    setHasDismissed(dismissed)

    // Tangkap event siap install dari browser
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return
    
    // Tampilkan prompt bawaan browser
    await deferredPrompt.prompt()
    
    // Tunggu pilihan user
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsInstallable(false)
    }
    
    // Reset prompt agar tidak dipanggil dua kali
    setDeferredPrompt(null)
  }

  const dismissPrompt = () => {
    localStorage.setItem("simas_install_dismissed", "true")
    setHasDismissed(true)
  }

  // Banner muncul jika: bisa di-install AND kunjungan >= 2 AND belum di-dismiss
  const showBanner = isInstallable && visitCount >= 2 && !hasDismissed

  return { isInstallable, showBanner, installApp, dismissPrompt }
}
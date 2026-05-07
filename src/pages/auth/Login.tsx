import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login berhasil! Nanti ini diarahkan ke Dashboard.");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Kolom Kiri - Area Branding (Hidden di Mobile) */}
      <div className="hidden md:flex md:w-[45%] bg-simas-primary relative flex-col justify-center items-center text-white p-10 overflow-hidden">
        
        {/* Dekorasi Background: Pola Grid Samar & Efek Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-6 max-w-lg">
          {/* Efek Glassmorphism pada Logo */}
          <div className="w-28 h-28 bg-white/10 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 transition-transform hover:scale-105 duration-300">
            <span className="text-5xl drop-shadow-md">🕌</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight drop-shadow-sm">SIMAS</h1>
            <p className="text-lg font-medium text-emerald-50/90 tracking-wide">Sistem Informasi Masjid</p>
          </div>
          
          <div className="mt-12 pt-10 border-t border-emerald-400/30 relative">
            <p className="text-2xl font-arabic mb-4 leading-relaxed drop-shadow-sm" dir="rtl">
              إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
            </p>
            <p className="text-sm text-emerald-100/90 italic px-4 leading-relaxed">
              "Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."
            </p>
            <p className="text-xs text-emerald-200/70 mt-3 font-medium">(QS. At-Taubah: 18)</p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Area Form Login */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-6 sm:p-12 relative">
        {/* Kontainer Form Dibuat Seperti Floating Card */}
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 space-y-8 z-10">
          
          <div className="text-center md:text-left space-y-3">
            <div className="md:hidden w-16 h-16 bg-simas-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-simas-primary/20">
              <span className="text-3xl">🕌</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Selamat Datang</h2>
            <p className="text-gray-500 font-medium">Masuk ke panel administrasi SIMAS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3 h-5 w-5 text-gray-400 group-focus-within:text-simas-primary transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@masjid.com" 
                  className="pl-11 h-12 rounded-xl bg-gray-50/50 border-gray-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3 h-5 w-5 text-gray-400 group-focus-within:text-simas-primary transition-colors" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-11 pr-11 h-12 rounded-xl bg-gray-50/50 border-gray-200 focus-visible:ring-simas-primary/20 focus-visible:border-simas-primary transition-all"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2.5">
                <Checkbox id="remember" className="rounded-md border-gray-300 data-[state=checked]:bg-simas-primary" />
                <Label htmlFor="remember" className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                  Ingat Saya
                </Label>
              </div>
              <a href="#" className="text-sm font-semibold text-simas-primary hover:text-emerald-700 hover:underline underline-offset-4 transition-colors">
                Lupa Password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-simas-primary hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk Dashboard"}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
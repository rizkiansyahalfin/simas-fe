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
    <div className="min-h-screen flex">
      {/* Kolom Kiri - Area Branding (Hidden di Mobile) */}
      <div className="hidden md:flex md:w-[40%] bg-simas-primary relative flex-col justify-center items-center text-white p-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="w-24 h-24 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm">
            <span className="text-4xl">🕌</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">SIMAS</h1>
          <p className="text-lg font-medium text-emerald-100">Sistem Informasi Masjid</p>
          
          <div className="mt-12 pt-12 border-t border-emerald-500/50">
            <p className="text-2xl font-arabic mb-3" dir="rtl">
              إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
            </p>
            <p className="text-sm text-emerald-200 italic px-8">
              "Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan hari kemudian..."
            </p>
            <p className="text-xs text-emerald-300 mt-2">(QS. At-Taubah: 18)</p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Area Form Login */}
      <div className="w-full md:w-[60%] bg-white flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center md:text-left space-y-2">
            <div className="md:hidden w-16 h-16 bg-simas-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🕌</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
            <p className="text-gray-500">Masuk ke panel administrasi SIMAS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@masjid.com" 
                  className="pl-10"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10 pr-10"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-gray-600 cursor-pointer">
                  Ingat Saya
                </Label>
              </div>
              <a href="#" className="text-sm font-medium text-simas-primary hover:underline">
                Lupa Password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-simas-primary hover:bg-emerald-700 text-white"
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
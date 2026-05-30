import { useState } from "react";
import { User, Mail, Lock, Save, Settings } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  // State Profil
  const [profileData, setProfileData] = useState({
    name: "Admin SIMAS",
    email: "admin@simas.com",
  });

  // State Password
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    
    setTimeout(() => {
      setIsLoadingProfile(false);
      toast.success("Profil berhasil diperbarui!");
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Gagal! Konfirmasi password tidak cocok.");
      return;
    }

    setIsLoadingPassword(true);
    
    setTimeout(() => {
      setIsLoadingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password berhasil diubah! Silakan gunakan password baru untuk login selanjutnya.");
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50 shrink-0">
          <Settings className="h-8 w-8 text-simas-primary" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Profil Akun
          </h1>
          <p className="text-slate-500 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
            Kelola informasi data diri dan keamanan akun administrator Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: EDIT PROFIL */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-600" /> Informasi Umum
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start">
            {/* Foto Profil Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                <span className="text-3xl font-bold text-emerald-600">AD</span>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-slate-800 text-white rounded-full hover:bg-simas-primary transition-colors shadow-md">
                <Settings className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center sm:text-left mt-2">
              <h3 className="font-bold text-slate-800">Foto Profil</h3>
              <p className="text-sm text-slate-500 mt-1">Format JPG, GIF atau PNG. Ukuran maksimal 2MB.</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold">Nama Lengkap</Label>
              <Input 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:border-simas-primary"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" /> Email
              </Label>
              <Input 
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:border-simas-primary"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="h-12 mt-4 bg-simas-primary hover:bg-emerald-700 text-white px-8 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
              disabled={isLoadingProfile}
            >
              <Save className="mr-2 h-5 w-5" />
              {isLoadingProfile ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </div>

        {/* KOLOM KANAN: GANTI PASSWORD */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-500" /> Ganti Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold">Password Saat Ini</Label>
              <Input 
                type="password"
                placeholder="Masukkan password lama"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:border-amber-500"
                required
              />
            </div>
            
            <div className="space-y-3 pt-2">
              <Label className="text-slate-700 font-bold">Password Baru</Label>
              <Input 
                type="password"
                placeholder="Minimal 8 karakter"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:border-amber-500"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-bold">Konfirmasi Password Baru</Label>
              <Input 
                type="password"
                placeholder="Ketik ulang password baru"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:border-amber-500"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="h-12 w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-md transition-all"
              disabled={isLoadingPassword}
            >
              <Lock className="mr-2 h-5 w-5" />
              {isLoadingPassword ? "Memperbarui..." : "Update Password"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
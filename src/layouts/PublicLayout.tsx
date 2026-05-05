import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 scroll-smooth">
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🕌</span>
            <span className="text-xl font-bold text-simas-primary">SIMAS</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#beranda" className="text-gray-600 hover:text-simas-primary font-medium transition-colors">Beranda</a>
            <a href="#profil" className="text-gray-600 hover:text-simas-primary font-medium transition-colors">Profil</a>
            <a href="#visi-misi" className="text-gray-600 hover:text-simas-primary font-medium transition-colors">Visi Misi</a>
          </nav>

          <div>
            <Link to="/login">
              <Button variant="outline" className="border-simas-primary text-simas-primary hover:bg-emerald-50">
                Login Pengurus
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="mb-2 text-white font-semibold text-lg flex items-center justify-center gap-2">
            <span>🕌</span> SIMAS
          </p>
          <p className="text-sm">&copy; {new Date().getFullYear()} Sistem Informasi Masjid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
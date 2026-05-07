import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Mendeteksi path url saat ini

  // Efek glassmorphism saat layar di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data menu navigasi
  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Agenda", path: "/agenda" },
    { name: "Artikel", path: "/artikel" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Navbar Premium */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-lg shadow-[0_4px_30px_rgb(0,0,0,0.03)] border-b border-gray-100 py-3" 
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between max-w-7xl">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled ? 'w-10 h-10 bg-emerald-50' : 'w-12 h-12 bg-white shadow-sm border border-emerald-50'}`}>
              <span className="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform">🕌</span>
            </div>
            <span className="text-2xl font-extrabold text-simas-primary tracking-tight">SIMAS</span>
          </Link>
          
          {/* Menu Navigasi Tengah */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/60 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-gray-200/60 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? "text-white shadow-md shadow-emerald-500/25" 
                      : "text-gray-500 hover:text-simas-primary hover:bg-emerald-50/50"
                  }`}
                >
                  {/* Background hijau untuk menu yang aktif */}
                  {isActive && (
                    <div className="absolute inset-0 bg-simas-primary rounded-full -z-10"></div>
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div>
            <Link to="/login">
              <Button 
                className={`font-bold rounded-xl transition-all duration-300 border-0 ${
                  isScrolled 
                    ? "bg-emerald-100 text-simas-primary hover:bg-simas-primary hover:text-white shadow-none hover:shadow-lg hover:shadow-emerald-500/30"
                    : "bg-white text-simas-primary shadow-sm hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                Login Pengurus
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 pt-24 md:pt-28">
        {children}
      </main>

      {/* Footer Premium */}
      <footer className="bg-[#0f172a] border-t border-slate-800 text-slate-400 py-12 md:py-16 text-center relative overflow-hidden">
        {/* Glow effect di background footer */}
        <div className="absolute top-0 left-1/2 w-full max-w-2xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0f172a] to-[#0f172a] -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="w-14 h-14 bg-slate-800/80 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center mb-6 border border-slate-700/50 shadow-inner">
            <span className="text-3xl opacity-90">🕌</span>
          </div>
          <h3 className="mb-3 text-white font-extrabold text-2xl tracking-wide">
            SIMAS
          </h3>
          <p className="text-sm font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            &copy; {new Date().getFullYear()} Sistem Informasi Masjid. <br className="hidden sm:block" /> All rights reserved.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
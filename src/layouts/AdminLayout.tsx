import { useState } from "react";
import { 
  LayoutDashboard, Wallet, HeartHandshake, FileText, 
  CalendarDays, Archive, Users, Settings, Bell, Menu 
} from "lucide-react";

import { Button } from "@/components/ui/button";
// Tambahkan SheetTitle di baris ini
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import { canAccess } from "@/lib/rbac";
import type { Role } from "@/lib/rbac";

const MENU_ITEMS = [
  { title: "Dashboard", icon: LayoutDashboard, resource: "dashboard", path: "/admin" },
  { title: "Keuangan", icon: Wallet, resource: "keuangan", path: "/admin/keuangan" },
  { title: "Donasi", icon: HeartHandshake, resource: "donasi", path: "/admin/donasi" },
  { title: "Artikel", icon: FileText, resource: "artikel", path: "/admin/artikel" },
  { title: "Kegiatan", icon: CalendarDays, resource: "kegiatan", path: "/admin/kegiatan" },
  { title: "Inventaris", icon: Archive, resource: "inventaris", path: "/admin/inventaris" },
  { title: "Jamaah", icon: Users, resource: "jamaah", path: "/admin/jamaah" },
  { title: "Pengaturan", icon: Settings, resource: "pengaturan", path: "/admin/pengaturan" },
];

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  const [activeRole] = useState<Role>("superadmin"); 
  const [activePath, setActivePath] = useState("/admin"); 

  const filteredMenu = MENU_ITEMS.filter(item => canAccess(activeRole, item.resource));

  // Tambahkan w-full agar lebarnya maksimal mengisi container
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-100/80 shadow-[4px_0_24px_rgba(0,0,0,0.01)] w-full">
      <div className="h-20 flex items-center px-6 md:px-8 border-b border-slate-50/50">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mr-3 border border-emerald-100/50 shrink-0">
          <span className="text-2xl drop-shadow-sm">🕌</span>
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-slate-800">SIMAS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 md:px-4 custom-scrollbar overflow-x-hidden">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Menu Utama
        </div>
        <ul className="space-y-1.5 w-full">
          {filteredMenu.map((item) => {
            const isActive = activePath === item.path;
            return (
              <li key={item.title} className="w-full">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePath(item.path);
                  }}
                  className={`group flex items-center px-3 md:px-4 py-3 rounded-xl transition-all duration-300 w-full ${
                    isActive 
                      ? "bg-simas-primary text-white font-bold shadow-lg shadow-emerald-500/25 md:translate-x-1" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium md:hover:translate-x-1"
                  }`}
                >
                  <item.icon 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`h-5 w-5 mr-3.5 shrink-0 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-simas-primary"
                    }`} 
                  />
                  {/* Gunakan span truncate agar teks tidak hilang/terpotong aneh di layar kecil */}
                  <span className="truncate">{item.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-[260px] fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:pl-[260px] transition-all duration-300 w-full overflow-hidden">
        
        {/* Topbar Premium */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 transition-all">
          
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100 rounded-xl shrink-0">
                  <Menu className="h-5 w-5 text-slate-600" />
                </Button>
              </SheetTrigger>
              {/* Set bg-white eksplisit dan p-0 w-[280px] agar aman di mobile */}
              <SheetContent side="left" className="p-0 w-[280px] sm:max-w-[280px] border-r-0 bg-white">
                {/* Judul wajib ada untuk Radix UI (bisa disembunyikan via sr-only) */}
                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div>
              {/* Teks dashboard saya munculkan juga di HP, pakai text-xl agar muat */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight truncate max-w-[150px] sm:max-w-none">
                {filteredMenu.find(m => m.path === activePath)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-5 shrink-0">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-emerald-50 transition-colors">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </Button>

            <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 h-12 pl-2 pr-2 sm:pr-4 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9 bg-simas-primary shadow-sm shrink-0">
                    <AvatarFallback className="text-white bg-simas-primary font-bold text-xs tracking-wider">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col text-left">
                    <p className="text-sm font-bold text-slate-800 leading-none mb-1">Tsaqif Muwaffaq</p>
                    <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">{activeRole}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 shadow-xl shadow-slate-200/50 border-slate-100">
                <DropdownMenuLabel className="px-3 py-2 text-xs text-slate-400 uppercase tracking-wider">Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 mb-1" />
                <DropdownMenuItem className="rounded-xl cursor-pointer px-3 py-2.5 text-slate-600 font-medium focus:bg-slate-50 focus:text-slate-900">
                  <Settings className="w-4 h-4 mr-2 text-slate-400" />
                  Pengaturan Akun
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer px-3 py-2.5 text-red-600 font-medium focus:bg-red-50 focus:text-red-700 mt-1">
                  <span className="w-4 h-4 mr-2 flex items-center justify-center text-red-500">🚪</span>
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto h-full">
            {children ? (
              children
            ) : (
              <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-4 p-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                  <LayoutDashboard className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-600">Halaman Kosong</p>
                  <p className="text-sm font-medium mt-1">
                    Konten <span className="text-simas-primary font-bold">"{filteredMenu.find(m => m.path === activePath)?.title}"</span> akan tampil di sini
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  LayoutDashboard, Wallet, HeartHandshake, FileText, 
  CalendarDays, Archive, Users, Settings, Bell, Menu 
} from "lucide-react";

// Pastikan ada /ui/ di setiap path komponen Shadcn
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Gunakan 'import type' untuk Role agar tidak error di Vite terbaru
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-2xl mr-2">🕌</span>
        <span className="text-xl font-bold tracking-tight text-gray-900">SIMAS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {filteredMenu.map((item) => {
            const isActive = activePath === item.path;
            return (
              <li key={item.title}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePath(item.path);
                  }}
                  className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? "bg-emerald-50 text-simas-primary font-bold border-l-4 border-simas-primary" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-simas-primary" : "text-gray-500"}`} />
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-simas-bg-admin flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
          <div className="flex items-center">
            {/* Hamburger Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <h1 className="text-xl font-semibold text-gray-800">
              {filteredMenu.find(m => m.path === activePath)?.title || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 pl-2 pr-0 hover:bg-transparent">
                  <Avatar className="h-8 w-8 bg-simas-primary">
                    <AvatarFallback className="text-white bg-simas-primary font-medium text-xs">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700 leading-none">Tsaqif Muwaffaq</p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{activeRole}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Pengaturan Akun</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6">
          {children ? (
            children
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-simas-admin h-96 flex items-center justify-center text-gray-400">
              Konten Halaman "{filteredMenu.find(m => m.path === activePath)?.title}" akan tampil di sini
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
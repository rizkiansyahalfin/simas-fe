import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Wallet,
    HeartHandshake,
    Megaphone,
    FileText,
    FileSpreadsheet,
    CalendarDays,
    CalendarClock, 
    Archive,
    Users,
    Settings,
    Menu,
    HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { canAccess } from "@/lib/rbac";
import { useAuthStore } from "@/stores";
import NotificationBell from "@/components/NotificationBell";
import { ThemeToggle } from "@/components/ThemeToggle";

const MENU_ITEMS = [
    { title: "Dashboard", icon: LayoutDashboard, resource: "dashboard", path: "/admin" },
    { title: "Keuangan", icon: Wallet, resource: "keuangan", path: "/admin/kas" },
    { title: "Pengurus", icon: Users, resource: "pengurus", path: "/admin/pengurus" },
    { title: "Donasi", icon: HeartHandshake, resource: "donasi", path: "/admin/donasi" },
    { title: "Campaign", icon: Megaphone, resource: "donasi", path: "/admin/campaigns" },
    { title: "Laporan", icon: FileSpreadsheet, resource: "laporan", path: "/admin/laporan" },
    { title: "Audit Log", icon: FileText, resource: "audit-log", path: "/admin/audit-log" },
    { title: "Artikel", icon: FileText, resource: "artikel", path: "/admin/artikel" },
    { title: "Kegiatan", icon: CalendarDays, resource: "kegiatan", path: "/admin/kegiatan" },
    { title: "Sesi Absensi", icon: CalendarClock, resource: "kegiatan", path: "/admin/attendance" },
    { title: "Inventaris", icon: Archive, resource: "inventaris", path: "/admin/inventaris" },
    { title: "Jamaah", icon: Users, resource: "jamaah", path: "/admin/jamaah" },
    { title: "Pusat Bantuan", icon: HelpCircle, resource: "dashboard", path: "/admin/help-center" },
    { title: "Pengaturan", icon: Settings, resource: "profil-masjid", path: "/admin/pengaturan" },
    
];

function SidebarContent({
    filteredMenu,
    activePath,
}: {
    filteredMenu: typeof MENU_ITEMS;
    activePath: string;
}) {
    return (
        <div className='flex flex-col h-full bg-white dark:bg-slate-900 border-r dark:border-slate-800 transition-colors'>
            <div className='h-16 flex items-center px-6 border-b dark:border-slate-800 shrink-0'>
                <Link
                    to='/admin'
                    className='flex items-center rounded-md text-left transition-colors hover:text-simas-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/40'
                    aria-label='Ke dashboard admin'
                >
                    <span className='text-2xl mr-2'>🕌</span>
                    <span className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>SIMAS</span>
                </Link>
            </div>

            <nav className='flex-1 overflow-y-auto py-4'>
                <ul className='space-y-1 px-3'>
                    {filteredMenu.map((item) => {
                        const isActive = activePath === item.path;
                        return (
                            <li key={item.title}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                                        isActive
                                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-simas-primary font-bold border-l-4 border-simas-primary"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 mr-3 ${isActive ? "text-simas-primary" : "text-gray-500 dark:text-gray-400"}`}
                                    />
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
    const { user, role, logout } = useAuthStore();
    const location = useLocation();
    const activePath = location.pathname;
    
    const initials = user?.name
        ? user.name
                .split(" ")
                .map((name: string) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
        : "AD";

    const filteredMenu = role ? MENU_ITEMS.filter((item) => canAccess(role, item.resource)) : [];
    const pageTitle = filteredMenu.find((m) => m.path === activePath)?.title || "Dashboard";

    return (
        <div className='fixed inset-0 overflow-auto flex bg-simas-bg-admin dark:bg-slate-950 transition-colors'>
            {/* Sidebar Desktop */}
            <aside className='hidden md:flex md:w-64 shrink-0 flex-col h-full'>
                <SidebarContent filteredMenu={filteredMenu} activePath={activePath} />
            </aside>

            {/* Content Area */}
            <div className='flex-1 flex flex-col min-w-0 overflow-auto'>
                {/* Topbar */}
                <header className='h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-40 transition-colors'>
                    <div className='flex items-center gap-2'>
                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant='ghost' size='icon' className='md:hidden text-gray-600 dark:text-gray-300'>
                                    <Menu className='h-5 w-5' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side='left' className='p-0 w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800'>
                                <SheetTitle className='sr-only'>Menu Navigasi</SheetTitle>
                                <SidebarContent
                                    filteredMenu={filteredMenu}
                                    activePath={activePath}
                                />
                            </SheetContent>
                        </Sheet>

                        <h1 className='text-xl font-semibold text-gray-800 dark:text-white' style={{ margin: 0 }}>
                            {pageTitle}
                        </h1>
                    </div>

                    <div className='flex items-center gap-3'>
                        {/* Theme Toggle Button */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <NotificationBell />

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    className='flex items-center gap-2 px-2 hover:bg-gray-100 dark:hover:bg-slate-800'
                                >
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback className='text-white bg-simas-primary font-medium text-xs'>
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='hidden sm:block text-left'>
                                        <p className='text-sm font-medium text-gray-700 dark:text-gray-200 leading-none'>
                                            {user?.name ?? "Admin SIMAS"}
                                        </p>
                                        <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize'>{role ?? "admin"}</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-56 mt-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'>
                                <DropdownMenuLabel className="dark:text-white">Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator className="dark:bg-slate-800" />
                                <DropdownMenuItem className="dark:text-gray-300 dark:focus:bg-slate-800">Pengaturan Akun</DropdownMenuItem>
                                <DropdownMenuItem
                                    className='text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/50 focus:text-red-700 dark:focus:text-red-300'
                                    onClick={() => logout({ redirectTo: "/login" })}
                                >
                                    Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-1 p-6'>
                    {children ?? (
                        <div className='border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl h-96 flex items-center justify-center text-gray-400 dark:text-slate-500'>
                            Konten halaman "{pageTitle}" akan tampil di sini
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarDays, FileText, Home, Menu, MoonStar } from "lucide-react";

import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { title: "Beranda", path: "/", icon: Home },
  { title: "Agenda", path: "/agenda", icon: CalendarDays },
  { title: "Jadwal Shalat", path: "/jadwal-shalat", icon: MoonStar },
  { title: "Artikel", path: "/artikel", icon: FileText },
];

function PublicNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors md:gap-2 md:py-2",
              isActive
                ? "bg-emerald-50 text-simas-primary"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            ].join(" ")
          }
        >
          <item.icon className="size-4 shrink-0" />
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-simas-primary/40"
            aria-label="Ke beranda SIMAS"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              🕌
            </span>
            <span className="truncate text-lg font-black tracking-tight text-gray-900">SIMAS</span>
          </Link>

          <div className="hidden md:block">
            <PublicNav />
          </div>

          <div className="hidden md:flex">
            <Button asChild className="bg-simas-primary px-4 font-bold text-white hover:bg-emerald-700">
              <Link to="/login">Masuk Admin</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buka menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,calc(100vw-2rem))] p-0">
              <SheetTitle className="sr-only">Menu publik</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                    🕌
                  </span>
                  <span className="text-lg font-black tracking-tight text-gray-900">SIMAS</span>
                </div>
                <div className="flex-1 px-3 py-4">
                  <PublicNav />
                </div>
                <div className="border-t border-gray-100 p-4">
                  <Button asChild className="h-11 w-full bg-simas-primary font-bold text-white hover:bg-emerald-700">
                    <Link to="/login">Masuk Admin</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="min-w-0">{children}</main>

      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-semibold text-gray-700">SIMAS - Sistem Informasi Masjid</p>
          <p>Portal kegiatan, artikel, dan jadwal shalat masjid.</p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Info, AlertCircle, CheckCircle2 } from "lucide-react";

// Tipe data notifikasi
interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: "info" | "warning" | "success";
  createdAt: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    // Data dummy awal sebelum server ngirim data asli
    {
      id: "1",
      title: "Donasi Masuk",
      message: "Hamba Allah berdonasi sebesar Rp 500.000",
      isRead: false,
      type: "success",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Stok Inventaris",
      message: "Sajadah Karpet tersisa 2 barang",
      isRead: false,
      type: "warning",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 jam lalu
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah notif yang belum dibaca
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Tutup dropdown kalau nge-klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // KONEKSI SSE (Server-Sent Events) UNTUK REAL-TIME
  useEffect(() => {
    // Sesuaikan URL ini dengan endpoint backend lu nanti
    const eventSource = new EventSource("http://localhost:5000/api/notifications/stream");

    eventSource.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      // Tambahkan notif baru ke urutan paling atas
      setNotifications((prev) => [newNotification, ...prev]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close(); // Tutup koneksi kalau error biar ga looping brutal
    };

    // Bersihkan koneksi pas komponen di-unmount
    return () => {
      eventSource.close();
    };
  }, []);

  // Fungsi tandai satu notif sudah dibaca
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  // Fungsi tandai semua sudah dibaca
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  // Fungsi buat nentuin icon berdasarkan tipe notif
  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tombol Lonceng */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
      >
        <Bell className="h-6 w-6" />
        
        {/* Badge Angka Merah (muncul kalau ada unread) */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          
          {/* Header Dropdown */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-gray-50/50 rounded-t-xl">
            <h3 className="font-semibold text-gray-800">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <Check className="h-3 w-3" /> Tandai semua dibaca
              </button>
            )}
          </div>

          {/* List Notifikasi */}
          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-4 transition-colors hover:bg-gray-50 ${
                      !notif.isRead ? "bg-emerald-50/30" : ""
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm font-medium ${!notif.isRead ? "text-gray-900" : "text-gray-600"}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {new Date(notif.createdAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="shrink-0 p-1 rounded-full text-emerald-600 hover:bg-emerald-100"
                        title="Tandai sudah dibaca"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500 block"></span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                <p className="text-sm">Belum ada notifikasi baru.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
 export function JumatBanner() {
  return (
 <div className="lg:col-span-2 jumat-banner">
          {/* Geo pattern */}
          <svg className="geo-overlay opacity-10">
            <defs>
              <pattern id="jgeo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
                <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jgeo)"/>
          </svg>
          <div className="absolute -top-8 -right-8 size-40 rounded-full bg-white/10 blur-2xl pointer-events-none"/>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-6 p-7">
            <div className="flex-1">
              <h3 className="text-xl font-black text-white mb-2">Persiapan Shalat Jum'at</h3>
              <p className="text-emerald-100 text-sm leading-relaxed max-w-md">
                Pastikan seluruh petugas telah dikonfirmasi kehadirannya minimal 24 jam
                sebelum waktu pelaksanaan untuk menjaga kelancaran ibadah.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex -space-x-2">
                  {['SB','AY','NH','RF'].map(i => (
                    <div key={i} className="size-8 rounded-full border-2 border-simas-primary-deep bg-emerald-700 flex items-center justify-center text-white text-xs font-black">{i}</div>
                  ))}
                  <div className="size-8 rounded-full border-2 border-simas-primary-deep bg-white/20 flex items-center justify-center text-white text-xs font-bold">+12</div>
                </div>
                <span className="text-emerald-200 text-sm font-medium">Petugas Terdaftar</span>
              </div>
            </div>

            {/* Mosque SVG illustration */}
            <div className="shrink-0 opacity-30">
              <svg viewBox="0 0 120 90" className="w-32 h-24 text-white" fill="none">
                <path d="M30 90 L30 50 Q60 15 90 50 L90 90 Z" stroke="white" strokeWidth="1.5"/>
                <path d="M40 90 L40 55 Q60 25 80 55 L80 90 Z" fill="white" opacity="0.2"/>
                <rect x="14" y="40" width="10" height="50" stroke="white" strokeWidth="1.2" rx="1"/>
                <ellipse cx="19" cy="40" rx="5" ry="9" stroke="white" strokeWidth="1.2"/>
                <line x1="19" y1="31" x2="19" y2="20" stroke="white" strokeWidth="1.5"/>
                <circle cx="19" cy="19" r="2.5" fill="white"/>
                <rect x="96" y="40" width="10" height="50" stroke="white" strokeWidth="1.2" rx="1"/>
                <ellipse cx="101" cy="40" rx="5" ry="9" stroke="white" strokeWidth="1.2"/>
                <line x1="101" y1="31" x2="101" y2="20" stroke="white" strokeWidth="1.5"/>
                <circle cx="101" cy="19" r="2.5" fill="white"/>
                <line x1="0" y1="90" x2="120" y2="90" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
    )
 }


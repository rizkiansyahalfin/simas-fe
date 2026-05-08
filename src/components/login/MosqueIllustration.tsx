const CURTAIN_COUNT = 20

export default function MosqueIllustration() {
  return (
    <div className="w-64 h-40 rounded-2xl overflow-hidden shadow-xl">
      <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" className="size-full">
        {/* Background */}
        <rect width="280" height="160" fill="#065f46" rx="16" />

        {/* Curtain lines */}
        {Array.from({ length: CURTAIN_COUNT }).map((_, i) => (
          <line key={i} x1={i * 14} y1="0" x2={i * 14} y2="160" stroke="#047857" strokeWidth="7" />
        ))}

        {/* Main arch — 3 layers for depth */}
        <path d="M70 160 L70 80 Q140 15 210 80 L210 160 Z"  fill="#047857" stroke="#34d399" strokeWidth="1.5" />
        <path d="M88 160 L88 87 Q140 35 192 87 L192 160 Z"  fill="#059669" opacity=".6" />
        <path d="M104 160 L104 95 Q140 55 176 95 L176 160 Z" fill="#065f46" opacity=".8" />

        {/* Minaret Left */}
        <rect x="28" y="55" width="16" height="105" fill="#065f46" rx="2" />
        <ellipse cx="36" cy="55" rx="8" ry="12" fill="#047857" stroke="#34d399" strokeWidth="1" />
        <line x1="36" y1="43" x2="36" y2="28" stroke="#6ee7b7" strokeWidth="1.5" />
        <circle cx="36" cy="27" r="3" fill="#a7f3d0" />

        {/* Minaret Right */}
        <rect x="236" y="55" width="16" height="105" fill="#065f46" rx="2" />
        <ellipse cx="244" cy="55" rx="8" ry="12" fill="#047857" stroke="#34d399" strokeWidth="1" />
        <line x1="244" y1="43" x2="244" y2="28" stroke="#6ee7b7" strokeWidth="1.5" />
        <circle cx="244" cy="27" r="3" fill="#a7f3d0" />

        {/* Star */}
        <polygon
          points="140,55 143,64 152,64 145,69 148,78 140,73 132,78 135,69 128,64 137,64"
          fill="#a7f3d0"
          opacity=".6"
        />

        {/* Door */}
        <path d="M122 160 L122 130 Q140 115 158 130 L158 160 Z" fill="#034732" />
        <rect x="0" y="153" width="280" height="7" fill="#034732" />
      </svg>
    </div>
  )
}

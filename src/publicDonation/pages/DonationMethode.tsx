import { useState } from 'react'
import { Building2, CreditCard, Check, Download, TrendingUp, Shield } from 'lucide-react'

const BANKS = [
  { name: 'Bank Syariah Indonesia', short: 'BSI', no: '7722 0044 1122', strip: 'bank-strip-bsi', logo: 'bank-logo bank-logo-bsi' },
  { name: 'BCA',                    short: 'BCA', no: '1234 5678 9012', strip: 'bank-strip-bca', logo: 'bank-logo bank-logo-bca' },
  { name: 'Bank Mandiri',           short: 'MDR', no: '9876 5432 1011', strip: 'bank-strip-mdr', logo: 'bank-logo bank-logo-mdr' },
]

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text.replace(/\s/g,'')); setOk(true); setTimeout(()=>setOk(false),2000) }}
      className={`copy-btn ${ok ? 'copied' : ''}`}>
      {ok ? <><Check className="size-3"/> Tersalin</> : 'Salin'}
    </button>
  )
}

const PIE_CELLS = [
  { label: 'Fakir & Miskin',  pct: 60, fill: 'progress-fill-green' },
  { label: 'Operasional',     pct: 25, fill: 'progress-fill-yellow' },
  { label: 'Fi Sabilillah',   pct: 15, fill: 'progress-fill-blue' },
]

export default function DonationMethod() {
  const [activeTab, setActiveTab] = useState<'transfer' | 'qris'>('transfer')

  /* deterministic QRIS cells */
  const cells = Array.from({length:9},(_,r)=>Array.from({length:9},(_,c)=>((r*5+c*11+r*c)%3)!==0))

  return (
    <div className="space-y-5">

      {/* ── Payment card ── */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-gray-100">
          {(['transfer','qris'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pay-tab ${activeTab === tab ? 'active' : ''}`}>
              {tab === 'transfer' ? <><Building2 className="size-4"/> Transfer Bank</> : <><CreditCard className="size-4"/> Scan QRIS</>}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'transfer' ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pilih rekening tujuan:</p>
              {BANKS.map(b => (
                <div key={b.no} className="bank-card">
                  <div className={b.strip}/>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={b.logo}>{b.short}</div>
                      <div>
                        <p className="text-xs text-gray-400">{b.name}</p>
                        <p className="text-lg font-black text-gray-900 tracking-widest">{b.no}</p>
                        <p className="text-xs text-gray-400">a.n. Yayasan Masjid Al-Ikhlas</p>
                      </div>
                    </div>
                    <CopyBtn text={b.no}/>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="relative">
                <div className="qris-glow"/>
                <div className="qris-card">
                  <p className="text-center text-xs font-black tracking-widest text-simas-primary mb-3">QRIS</p>
                  <svg viewBox="0 0 180 180" className="w-44 h-44">
                    <rect x="10" y="10" width="48" height="48" rx="4" fill="none" stroke="#10b981" strokeWidth="5"/>
                    <rect x="20" y="20" width="28" height="28" rx="2" fill="#10b981"/>
                    <rect x="122" y="10" width="48" height="48" rx="4" fill="none" stroke="#10b981" strokeWidth="5"/>
                    <rect x="132" y="20" width="28" height="28" rx="2" fill="#10b981"/>
                    <rect x="10" y="122" width="48" height="48" rx="4" fill="none" stroke="#10b981" strokeWidth="5"/>
                    <rect x="20" y="132" width="28" height="28" rx="2" fill="#10b981"/>
                    {cells.map((row,r)=>row.map((on,c)=>on?<rect key={`a${r}${c}`} x={74+c*8} y={10+r*8} width="7" height="7" rx="1" fill="#10b981"/>:null))}
                    {cells.map((row,r)=>row.map((on,c)=>on?<rect key={`b${r}${c}`} x={10+c*8} y={74+r*8} width="7" height="7" rx="1" fill="#10b981"/>:null))}
                    {cells.map((row,r)=>row.map((_,c)=>((r+c)%2===0)?<rect key={`d${r}${c}`} x={74+c*8} y={74+r*8} width="7" height="7" rx="1" fill="#10b981"/>:null))}
                    <rect x="76" y="76" width="28" height="28" rx="6" fill="white" stroke="#10b981" strokeWidth="2"/>
                    <text x="90" y="95" textAnchor="middle" fontSize="13" fontWeight="900" fill="#10b981">S</text>
                  </svg>
                  <p className="text-center text-xs text-gray-400 mt-2">NMID: ID2025SIMAS</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-800 text-sm">SIMAS Masjid Al-Ikhlas</p>
                <p className="text-xs text-gray-400 mt-0.5">Berlaku untuk semua e-wallet & m-banking</p>
              </div>
              <button className="btn-outline-sm">
                <Download className="size-3.5"/> Unduh QRIS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Progress card ── */}
      <div className="progress-card">
        <svg className="geo-overlay opacity-10">
          <defs>
            <pattern id="don-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#don-geo)"/>
        </svg>
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">Dana Terkumpul Bulan Ini</p>
          <p className="text-3xl font-black text-white mb-0.5">Rp 128.840.200</p>
          <p className="text-xs text-emerald-300 flex items-center gap-1 mb-5">
            <TrendingUp className="size-3"/> 12% lebih tinggi dari bulan lalu
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">Distribusi Dana</p>
          <div className="space-y-3">
            {PIE_CELLS.map(d => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-emerald-200">{d.label}</span>
                  <span className="text-white font-bold">{d.pct}%</span>
                </div>
                <div className="progress-track">
                  <div className={`progress-fill ${d.fill} don-pct-${d.pct}`}/>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2">
            <Shield className="size-4 text-emerald-300"/>
            <p className="text-xs text-emerald-200">Laporan keuangan diaudit & transparan</p>
          </div>
        </div>
      </div>

    </div>
  )
}
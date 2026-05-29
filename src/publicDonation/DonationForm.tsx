import { useState, useRef } from 'react'
import { Upload, X, Check, ChevronDown, Send, Heart } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Category = 'INFAQ' | 'ZAKAT' | 'ANAK_YATIM' | 'RENOVASI'

const CATEGORIES: { key: Category; label: string; desc: string; icon: string }[] = [
  { key: 'INFAQ',      label: 'Infaq Umum',   desc: 'Untuk kebutuhan masjid',   icon: '🕌' },
  { key: 'ZAKAT',      label: 'Zakat Maal',   desc: 'Wajib atas harta',         icon: '💰' },
  { key: 'ANAK_YATIM', label: 'Anak Yatim',   desc: 'Santunan & pendidikan',     icon: '🤲' },
  { key: 'RENOVASI',   label: 'Renovasi',     desc: 'Pembangunan masjid',        icon: '🏗' },
]

const PRESETS = [50000, 100000, 250000, 500000]
const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

interface Props {
  onSuccess: (data: { name: string; nominal: number; category: string; anonymous: boolean }) => void
}

export default function DonationForm({ onSuccess }: Props) {
  const [category,  setCategory]  = useState<Category>('INFAQ')
  const [nominal,   setNominal]   = useState(100000)
  const [customVal, setCustomVal] = useState('')
  const [name,      setName]      = useState('')
  const [phone,     setPhone]     = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [bukti,     setBukti]     = useState<File | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [showCat,   setShowCat]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const finalNominal = customVal ? Number(customVal.replace(/\D/g, '')) : nominal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    onSuccess({ name: anonymous ? 'Hamba Allah' : name, nominal: finalNominal, category, anonymous })
  }

  const selectedCat = CATEGORIES.find(c => c.key === category)!

  return (
    <form onSubmit={handleSubmit} className="card overflow-hidden">

      {/* Form header */}
      <div className="form-header">
        <div className="absolute right-4 top-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-28 h-28 text-simas-primary">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.8"/>
          </svg>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="form-header-icon"><Heart className="size-4"/></div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">Form Donasi</h2>
            <p className="text-gray-400 text-xs mt-0.5">
              "Perumpamaan orang yang menafkahkan hartanya di jalan Allah seperti sebutir biji..."
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Kategori */}
        <div>
          <label className="jumat-label">Kategori Donasi</label>
          <div className="relative">
            <button type="button" onClick={() => setShowCat(v => !v)}
              className={`kat-trigger ${showCat ? 'open' : ''}`}>
              <span className="flex items-center gap-2">
                <span>{selectedCat.icon}</span>
                <span className="font-semibold text-gray-800">{selectedCat.label}</span>
                <span className="text-gray-400 text-xs">— {selectedCat.desc}</span>
              </span>
              <ChevronDown className={`size-4 text-gray-400 transition-transform ${showCat ? 'rotate-180' : ''}`}/>
            </button>
            {showCat && (
              <div className="absolute z-20 mt-1 w-full bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {CATEGORIES.map(c => (
                  <button key={c.key} type="button"
                    onClick={() => { setCategory(c.key); setShowCat(false) }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${category === c.key ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{c.label}</p>
                      <p className="text-xs text-gray-400">{c.desc}</p>
                    </div>
                    {category === c.key && <Check className="size-4 text-simas-primary ml-auto shrink-0"/>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nominal */}
        <div>
          <label className="jumat-label">Nominal Donasi</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESETS.map(p => (
              <button key={p} type="button" onClick={() => { setNominal(p); setCustomVal('') }}
                className={`preset-btn text-center ${!customVal && nominal === p ? 'selected' : ''}`}>
                {fmt(p)}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="rp-badge">Rp</span>
            <Input
              placeholder="Nominal lainnya..."
              value={customVal ? Number(customVal.replace(/\D/g,'')).toLocaleString('id-ID') : ''}
              onChange={e => { setCustomVal(e.target.value.replace(/\D/g,'')); setNominal(0) }}
              className="jumat-input h-11 pl-14"
            />
          </div>
        </div>

        {/* Nama & HP */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="jumat-label">Nama Donatur</label>
            <Input value={name} onChange={e => setName(e.target.value)}
              placeholder="Nama lengkap" disabled={anonymous}
              className="jumat-input h-11"/>
          </div>
          <div>
            <label className="jumat-label">No HP / WhatsApp</label>
            <Input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className="jumat-input h-11"/>
          </div>
        </div>

        {/* Anonymous toggle */}
        <label className="jamaah-toggle-box cursor-pointer select-none">
          <Heart className="size-4 text-simas-accent shrink-0"/>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Sembunyikan Nama</p>
            <p className="text-xs text-gray-400">Donasi akan tercatat sebagai "Hamba Allah"</p>
          </div>
          <button type="button" onClick={() => setAnonymous(v => !v)}
            className={`jamaah-toggle ${anonymous ? 'jamaah-toggle-on' : 'jamaah-toggle-off'}`}>
            <span className={`jamaah-toggle-thumb ${anonymous ? 'jamaah-toggle-thumb-on' : 'jamaah-toggle-thumb-off'}`}/>
          </button>
        </label>

        {/* Upload */}
        <div>
          <label className="jumat-label">Bukti Transfer</label>
          <input title='upload bukti' ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
            onChange={e => setBukti(e.target.files?.[0] ?? null)}/>
          {bukti ? (
            <div className="upload-success">
              <div className="flex items-center gap-3">
                <div className="upload-success-icon"><Check className="size-4 text-white"/></div>
                <div>
                  <p className="text-sm font-medium text-gray-800 max-w-[200px] truncate">{bukti.name}</p>
                  <p className="text-xs text-gray-400">{(bukti.size/1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button title="Hapus" type="button" onClick={() => setBukti(null)} className="upload-remove-btn">
                <X className="size-3.5"/>
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="upload-area group">
              <div className="upload-icon"><Upload className="size-5"/></div>
              <p className="text-sm font-medium">Klik untuk upload bukti transfer</p>
              <p className="text-xs">JPG, PNG, atau PDF · maks 5 MB</p>
            </button>
          )}
        </div>

        {/* Info */}
        <div className="info-box">
          <div className="info-box-icon">
            <Heart className="size-4 text-amber-600"/>
          </div>
          <p className="text-xs text-amber-700 leading-relaxed">
            Donasi akan diverifikasi oleh tim bendahara dalam <strong>1×24 jam</strong>.
            Laporan penggunaan dana tersedia di halaman <strong>Transparansi Keuangan</strong>.
          </p>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading || (!finalNominal)} className="btn-primary-full">
          {loading
            ? <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            : <Send className="size-4"/>
          }
          {loading ? 'Mengirim...' : `Donasi ${finalNominal ? fmt(finalNominal) : ''} Sekarang`}
        </button>

      </div>
    </form>
  )
}
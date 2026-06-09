import { useState, useRef, type FormEvent } from 'react'
import { Upload, X, Check, ChevronDown, Send, Heart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { useTranslate } from "@/i18n/hooks/useTranslate"

type Category = 'INFAQ' | 'ZAKAT' | 'ANAK_YATIM' | 'RENOVASI'

type MidtransResult = {
  transaction_id?: string
  order_id?: string
  status_code?: string
  status_message?: string
}

declare global {
  interface Window {
    snap?: {
      pay: (token: string, callbacks: {
        onSuccess?: (result: MidtransResult) => void
        onPending?: (result: MidtransResult) => void
        onError?: (result: MidtransResult) => void
        onClose?: () => void
      }) => void
    }
  }

  interface ImportMetaEnv {
    readonly VITE_MIDTRANS_CLIENT_KEY?: string
  }
}

const SNAP_JS_URL = 'https://app.sandbox.midtrans.com/snap/snap.js'
const SNAP_SCRIPT_ID = 'midtrans-snap-js'

const loadSnapScript = async () => {
  if (window.snap) return
  const existing = document.getElementById(SNAP_SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    await new Promise<void>((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Gagal memuat Midtrans Snap.js')), { once: true })
    })
    return
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SNAP_SCRIPT_ID
    script.src = SNAP_JS_URL
    script.async = true
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    if (clientKey) {
      script.setAttribute('data-client-key', clientKey)
    }
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Gagal memuat Midtrans Snap.js'))
    document.body.appendChild(script)
  })
}

const createSnapTransaction = async (payload: {
  name: string
  phone: string
  nominal: number
  category: Category
  anonymous: boolean
}) => {
  const endpoints = [
    '/public-donation/midtrans/snap',
    '/donations/midtrans/snap',
    '/donasi/midtrans/snap',
    '/midtrans/snap',
    '/snap-token',
    '/public-donation/snap-token',
  ]

  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, payload)
      const token = (
        response.data?.token ||
        response.data?.transactionToken ||
        response.data?.snapToken ||
        response.data?.snap_token
      ) as string | undefined
      if (token) return token
    } catch (error) {
      // ignore and try next endpoint
    }
  }

  return undefined
}

const CATEGORIES: { key: Category; label: string; desc: string; icon: string }[] = [
  { key: 'INFAQ',      label: 'Infaq Umum',   desc: 'Untuk kebutuhan masjid',   icon: '🕌' },
  { key: 'ZAKAT',      label: 'Zakat Maal',   desc: 'Wajib atas harta',         icon: '💰' },
  { key: 'ANAK_YATIM', label: 'Anak Yatim',   desc: 'Santunan & pendidikan',     icon: '🤲' },
  { key: 'RENOVASI',   label: 'Renovasi',     desc: 'Pembangunan masjid',        icon: '🏗' },
]

const PRESETS = [50000, 100000, 250000, 500000]
const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

interface Props {
  onSuccess: (data: { name: string; nominal: number; category: string; anonymous: boolean; refId?: string }) => void
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
  const [errors,    setErrors]    = useState<Record<string, string>>({})
  const [statusMessage, setStatusMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const finalNominal = customVal ? Number(customVal.replace(/\D/g, '')) : nominal

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!anonymous && !name.trim()) newErrors.name = 'Nama donatur wajib diisi.'
    if (!finalNominal || finalNominal <= 0) newErrors.nominal = 'Pilih nominal donasi.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatusMessage('Menyiapkan pembayaran Midtrans...')
    setLoading(true)

    const donorName = anonymous ? 'Hamba Allah' : name.trim()
    const donationPayload = {
      name: donorName,
      phone,
      nominal: finalNominal,
      category,
      anonymous,
    }

    try {
      await loadSnapScript()
      const snapToken = await createSnapTransaction(donationPayload)
      if (!snapToken) {
        throw new Error('Token Midtrans Snap tidak tersedia. Pastikan backend merespons dengan snap token.')
      }

      setStatusMessage('Menampilkan popup pembayaran...')
      window.snap?.pay(snapToken, {
        onSuccess: (result) => {
          setStatusMessage('Pembayaran berhasil. Terima kasih!')
          setLoading(false)
          onSuccess({ ...donationPayload, refId: result.order_id ?? result.transaction_id })
        },
        onPending: (result) => {
          setStatusMessage('Pembayaran tertunda. Silakan selesaikan transaksi di halaman Midtrans.')
          setLoading(false)
          onSuccess({ ...donationPayload, refId: result.order_id ?? result.transaction_id })
        },
        onError: (result) => {
          setStatusMessage(result.status_message || 'Pembayaran gagal. Silakan coba kembali.')
          setLoading(false)
          console.error('Midtrans error', result)
        },
        onClose: () => {
          setStatusMessage('Popup pembayaran ditutup. Silakan coba kembali jika belum selesai.')
          setLoading(false)
        },
      })
    } catch (error) {
      setLoading(false)
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memproses pembayaran.'
      )
    }
  }

  const selectedCat = CATEGORIES.find(c => c.key === category)!
  const { t } = useTranslate()

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
            <h2 className="font-bold text-gray-900 text-base">{t('donation.form.badge')}</h2>
            <p className="text-gray-400 text-xs mt-0.5">
              {t('donation.form.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Kategori */}
        <div>
          <label className="jumat-label">{t('donation.form.categoryLabel')}</label>
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
          <label className="jumat-label">{t('donation.form.amountLabel')}</label>
          {errors.nominal && <p className="text-sm text-red-500 mb-2">{errors.nominal}</p>}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESETS.map(p => (
              <button key={p} type="button" onClick={() => { setNominal(p); setCustomVal(''); if (errors.nominal) setErrors(p => { const n = { ...p }; delete n.nominal; return n }) }}
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
            <label className="jumat-label">{t('donation.form.nameLabel')}</label>
            <Input value={name} onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => { const n = { ...p }; delete n.name; return n }) }}
              placeholder="Nama lengkap" disabled={anonymous}
              className={`jumat-input h-11 ${errors.name ? 'border-red-400' : ''}`}/>
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="jumat-label">{t('donation.form.phoneLabel')}</label>
            <Input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className="jumat-input h-11"/>
          </div>
        </div>

        {/* Anonymous toggle */}
        <label className="jamaah-toggle-box cursor-pointer select-none">
          <Heart className="size-4 text-simas-accent shrink-0"/>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{t('donation.form.anonymousLabel')}</p>
            <p className="text-xs text-gray-400">{t('donation.form.anonymousDescription')}</p>
          </div>
          <button type="button" onClick={() => setAnonymous(v => !v)}
            className={`jamaah-toggle ${anonymous ? 'jamaah-toggle-on' : 'jamaah-toggle-off'}`}>
            <span className={`jamaah-toggle-thumb ${anonymous ? 'jamaah-toggle-thumb-on' : 'jamaah-toggle-thumb-off'}`}/>
          </button>
        </label>

        {/* Upload */}
        <div>
          <label className="jumat-label">{t('donation.form.proofLabel')}</label>
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

        {statusMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {statusMessage}
          </div>
        )}

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
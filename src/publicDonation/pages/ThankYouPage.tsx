import { CheckCircle2, Heart, Share2, Home, ArrowRight, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslate } from '@/i18n/hooks/useTranslate'

/* ─── Types ─── */
export interface DonationSummary {
    name: string
    nominal: number
    category: string
    anonymous: boolean
    refId?: string
}

interface Props {
    summary: DonationSummary
    onDonateAgain: () => void
}

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

const CAT_LABELS: Record<string, string> = {
    INFAQ: 'Infaq Umum',
    ZAKAT: 'Zakat Maal',
    ANAK_YATIM: 'Anak Yatim',
    RENOVASI: 'Renovasi Masjid',
}

function CopyRefBtn({ refId }: { refId: string }) {
    const [ok, setOk] = useState(false)
    const { t } = useTranslate()
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(refId); setOk(true); setTimeout(() => setOk(false), 2000) }}
            className={`copy-btn ${ok ? 'copied' : ''}`}
        >
            {ok ? <><Check className="size-3" /> {t('donation.form.copied')}</> : <><Copy className="size-3" /> {t('donation.form.copy')}</>}
        </button>
    )
}

export default function ThankYouPage({ summary, onDonateAgain }: Props) {
    const { name, nominal, category, refId } = summary
    const generatedRefId = useState(() => `DON-${Date.now().toString().slice(-8)}`)[0]
    const finalRefId = refId ?? generatedRefId
    const { t } = useTranslate()
    const shareText = `Alhamdulillah, saya baru saja berdonasi ${fmt(nominal)} untuk ${CAT_LABELS[category] ?? category} di Masjid Al-Ikhlas melalui SIMAS. Mari berbagi kebaikan! 🕌`
    

    const SHARE_LINKS = [
        {
            label: 'WhatsApp',
            icon: '💬',
            cls: 'ty-share-wa',
            href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
        },
        {
            label: 'Twitter/X',
            icon: '𝕏',
            cls: 'ty-share-x',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        },
        {
            label: 'Facebook',
            icon: 'f',
            cls: 'ty-share-fb',
            href: `https://www.facebook.com/sharer/sharer.php?u=https://simas.id&quote=${encodeURIComponent(shareText)}`,
        },
    ]

    return (
        <div className="ty-page">

            {/* ── Geo pattern bg ── */}
            <svg className="geo-overlay opacity-5 pointer-events-none">
                <defs>
                    <pattern id="ty-geo" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
                        <path d="M36 0 L72 36 L36 72 L0 36 Z" fill="none" stroke="#10b981" strokeWidth="1" />
                        <circle cx="36" cy="36" r="10" fill="none" stroke="#10b981" strokeWidth="0.6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ty-geo)" />
            </svg>

            <div className="ty-content">

                {/* ── Icon & header ── */}
                <div className="ty-hero">
                    <div className="ty-check-ring">
                        <div className="success-icon">
                            <CheckCircle2 className="size-10 text-white" />
                        </div>
                    </div>

                    <div className="badge badge-ok ty-badge">
                        <Heart className="size-3 text-emerald-600 fill-emerald-600" /> Jazakallahu Khairan
                    </div>

                    <h1 className="ty-title">{t('donation.thankYou.title')}</h1>
                    <p className="ty-subtitle">
                        {t('donation.thankYou.subtitle')}
                    </p>
                </div>

                {/* ── Summary card ── */}
                <div className="card-sm ty-summary">

                    <div className="ty-summary-header">
                        <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Ringkasan Donasi</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-emerald-200">Ref:</p>
                            <p className="text-xs font-mono font-bold text-white">{refId}</p>
                            <CopyRefBtn refId={finalRefId} />
                        </div>
                    </div>

                    <div className="ty-summary-body">
                        <div className="ty-summary-row">
                            <span className="ty-summary-label">{t('donation.form.nameLabel')}</span>
                            <span className="ty-summary-value">{name}</span>
                        </div>
                        <div className="ty-summary-divider" />
                        <div className="ty-summary-row">
                            <span className="ty-summary-label">{t('donation.form.categoryLabel')}</span>
                            <span className="pill">{CAT_LABELS[category] ?? category}</span>
                        </div>
                        <div className="ty-summary-divider" />
                        <div className="ty-summary-row">
                            <span className="ty-summary-label">{t('donation.form.amountLabel')}</span>
                            <span className="ty-summary-nominal">{fmt(nominal)}</span>
                        </div>
                        <div className="ty-summary-divider" />
                        <div className="ty-summary-row">
                            <span className="ty-summary-label">{t('donation.form.statusLabel')}</span>
                            <span className="badge badge-waiting">
                                <span className="badge-dot dot-waiting" /> Menunggu Verifikasi
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Share section ── */}
                <div className="ty-share-section">
                    <div className="flex items-center gap-2 mb-3">
                        <Share2 className="size-4 text-gray-400" />
                        <p className="text-sm font-bold text-gray-700">{t('donation.thankYou.share')}</p>
                    </div>
                    <div className="flex gap-3">
                        {SHARE_LINKS.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                className={s.cls}>
                                <span className="ty-share-icon">{s.icon}</span>
                                <span>{s.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Ayat ── */}
                <div className="info-box ty-ayat">
                    <div className="info-box-icon">
                        <Heart className="size-4 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-simas-accent uppercase tracking-wider mb-1">{t('donation.thankYou.motivation')}</p>
                        <p className="text-xs text-amber-800 italic leading-relaxed">
                            "Perumpamaan orang-orang yang menafkahkan hartanya di jalan Allah adalah serupa dengan sebutir benih yang menumbuhkan tujuh bulir, pada tiap-tiap bulir seratus biji." <strong>(QS. Al-Baqarah: 261)</strong>
                        </p>
                    </div>
                </div>

                {/* ── Actions ── */}
                <div className="ty-actions">
                    <button onClick={onDonateAgain} className="btn-primary-full">
                        <Heart className="size-4" /> {t('donation.thankYou.donateAgain')}
                    </button>
                    <Link to="/" className="ty-home-btn">
                        <Home className="size-4" /> {t('donation.thankYou.home')}
                    </Link>
                    <Link to="/transparansi" className="ty-link">
                        {t('donation.thankYou.transparency')} <ArrowRight className="size-3" />
                    </Link>
                </div>

            </div>
        </div>
    )
}
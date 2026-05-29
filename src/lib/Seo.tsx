import { Helmet } from "react-helmet-async"

interface SeoProps {
  title: string
  description: string
  url?: string
  image?: string
  type?: string
}

const DEFAULT_TITLE = "SIMAS - Sistem Informasi Manajemen Masjid"
const DEFAULT_DESCRIPTION =
  "SIMAS memudahkan pengelolaan masjid dengan informasi donasi, artikel, jadwal sholat, galeri, dan agenda kegiatan."
const DEFAULT_URL = "http://localhost:5173"
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop"

export default function Seo({
  title,
  description,
  url,
  image,
  type = "website",
}: SeoProps) {
  const canonical =
    url ?? (typeof window !== "undefined" ? window.location.href : DEFAULT_URL)

  return (
    <Helmet>
      <title>{title ? `${title} | SIMAS` : DEFAULT_TITLE}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta property="og:description" content={description || DEFAULT_DESCRIPTION} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || DEFAULT_TITLE} />
      <meta name="twitter:description" content={description || DEFAULT_DESCRIPTION} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />
    </Helmet>
  )
}

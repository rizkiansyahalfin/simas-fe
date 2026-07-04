# I18Next - Penggunaan Optimal

## 📋 Struktur File Translation

```
src/i18n/
├── config.ts                    # Konfigurasi i18next
└── locales/
    ├── en.json                  # English translations
    └── id.json                  # Indonesian translations
```

## 🎯 Best Practices

### 1. **Menggunakan Hook Custom untuk Consistency**

```tsx
import { useTranslate } from '@/hooks/useTranslate'

export function MyComponent() {
  const { t, navItems } = useTranslate()
  
  return <h1>{t('home.title')}</h1>
}
```

### 2. **Struktur Translation Keys yang Konsisten**

```json
{
  "section": {
    "subsection": "Translation text"
  }
}
```

Contoh:
- `nav.home` - Navigation items
- `footer.description` - Footer content
- `common.save` - Common buttons

### 3. **Interpolation (Dynamic Values)**

```tsx
// Translation file (en.json)
{
  "greeting": "Hello, {{name}}!"
}

// Component
const { t } = useTranslate()
<p>{t('greeting', { name: 'John' })}</p>
```

### 4. **Plural Handling**

```json
{
  "items": "You have {{count}} item",
  "items_plural": "You have {{count}} items"
}
```

```tsx
const { t } = useTranslate()
t('items', { count: 5 }) // "You have 5 items"
```

### 5. **Lazy Loading (Optional - untuk app besar)**

Jika app memiliki banyak bahasa/terjemahan, gunakan:

```tsx
// i18n/config.ts
import HttpBackend from 'i18next-http-backend'

i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init({
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  }
})
```

## 🔄 Workflow Menambah Translation Baru

### 1. **Tambah key di `en.json` dan `id.json`:**

```json
// en.json
{
  "donations": {
    "title": "Donations",
    "description": "Help us maintain the mosque"
  }
}

// id.json
{
  "donations": {
    "title": "Donasi",
    "description": "Bantu kami menjaga masjid"
  }
}
```

### 2. **Gunakan di component:**

```tsx
import { useTranslate } from '@/hooks/useTranslate'

export function DonationPage() {
  const { t } = useTranslate()
  
  return (
    <div>
      <h1>{t('donations.title')}</h1>
      <p>{t('donations.description')}</p>
    </div>
  )
}
```

## 🎨 Advanced Features

### Namespace (untuk organisasi lebih baik)

```tsx
// config.ts
import pages from './locales/pages/en.json'
import errors from './locales/errors/en.json'

const resources = {
  en: { 
    pages,
    errors 
  }
}

// component
const { t } = useTranslation('pages')
t('home.title')
```

### Language Switcher dengan Preference

```tsx
import { useLanguage } from '@/hooks/useTranslate'

export function Settings() {
  const { current, isEnglish, isIndonesian, changeLanguage } = useLanguage()
  
  return (
    <div>
      <p>Current: {current}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('id')}>Bahasa Indonesia</button>
    </div>
  )
}
```

## 🚀 Performance Tips

1. **Use `useMemo` saat membuat dynamic nav items** (sudah diimplementasikan di hook)
2. **Jangan translate di loop**, gunakan `.map()` dengan key yang stabil
3. **Cache translations** - i18next sudah handle ini otomatis

## 🔍 Debugging

### Cek current language:

```tsx
const { i18n } = useTranslation()
console.log(i18n.language) // 'en' atau 'id'
```

### Cek translation value:

```tsx
const { t } = useTranslation()
console.log(t('nav.home', { defaultValue: 'Home' }))
```

## 📱 Responsive Translation Keys

Gunakan yang sama untuk semua screen size, styling handle responsiveness:

```tsx
export function DonationCard() {
  const { t } = useTranslate()
  
  return (
    <div className="p-4 md:p-8">
      <h3 className="text-lg md:text-2xl">{t('donations.title')}</h3>
      <p className="text-sm md:text-base">{t('donations.description')}</p>
    </div>
  )
}
```

## ✅ Checklist Before Production

- [ ] Semua hardcoded text sudah di-translate
- [ ] Translations di-test di kedua bahasa
- [ ] LocalStorage preference working
- [ ] LanguageSwitcher accessible di semua page
- [ ] Plural & interpolation bekerja dengan benar
- [ ] No console warnings

// DonationForm.tsx
import { useState } from 'react'

export default function DonationForm() {
  const [amount, setAmount] = useState<number | null>(100000)
  const [category, setCategory] = useState('INFAQ')

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h1 className="text-2xl font-semibold mb-2">Form Donasi</h1>
      <p className="text-sm text-gray-500 mb-6">
        "Perumpamaan orang-orang yang menafkahkan hartanya..."
      </p>

      {/* CATEGORY */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {['INFAQ', 'ZAKAT', 'ANAK_YATIM', 'RENOVASI'].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`border rounded-xl p-4 text-left ${
              category === item ? 'border-green-600 bg-green-50' : ''
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* NOMINAL */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Nominal Donasi</p>

        <div className="flex gap-2 mb-3">
          {[50000, 100000, 250000, 500000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`px-4 py-2 rounded-full border ${
                amount === val ? 'bg-green-600 text-white' : ''
              }`}
            >
              {val / 1000}k
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Masukkan nominal"
          className="w-full border rounded-lg p-3"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      {/* NAME + PHONE */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input placeholder="Nama Lengkap" className="border p-3 rounded-lg" />
        <input placeholder="No HP" className="border p-3 rounded-lg" />
      </div>

      {/* ANONYMOUS */}
      <div className="flex items-center justify-between mb-4">
        <span>Sembunyikan Nama</span>
        <input type="checkbox" />
      </div>

      {/* UPLOAD */}
      <div className="border-dashed border-2 rounded-xl p-6 text-center mb-6">
        <p>Upload Bukti Transfer</p>
        <input type="file" className="mt-2" />
      </div>

      {/* SUBMIT */}
      <button className="w-full bg-green-700 text-white py-3 rounded-xl">
        Kirim Donasi Sekarang →
      </button>
    </div>
  )
}
// DonationMethod.tsx
export default function DonationMethod() {
  return (
    <div className="space-y-6">

      {/* BANK */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Transfer ke Rekening Masjid</h2>

        <p className="text-sm text-gray-500">Nomor Rekening</p>
        <p className="text-xl font-bold mb-2">7722 0044 1122</p>

        <p className="text-sm text-gray-500">Atas Nama</p>
        <p className="font-medium">Yayasan Masjid Al-Ikhlas</p>
      </div>

      {/* QRIS */}
      <div className="bg-white border rounded-2xl p-6 text-center">
        <h2 className="mb-4 font-semibold">Scan QRIS</h2>

        <div className="w-40 h-40 mx-auto bg-gray-100 flex items-center justify-center">
          QRIS
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Scan via GoPay / OVO / Dana
        </p>
      </div>

    </div>
  )
}
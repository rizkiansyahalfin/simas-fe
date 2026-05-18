import { MapPin, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function JadwalSholatPage() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const jadwal = [
    { name: "Subuh", time: "04:42" },
    { name: "Dzuhur", time: "12:01" },
    { name: "Ashar", time: "15:22" },
    { name: "Maghrib", time: "17:58" },
    { name: "Isya", time: "19:09" },
  ]

  const getNextPrayer = () => {
    const current = now.getHours() * 60 + now.getMinutes()

    for (const j of jadwal) {
      const [h, m] = j.time.split(':').map(Number)
      const total = h * 60 + m
      if (total > current) return j
    }

    return jadwal[0]
  }

  const next = getNextPrayer()

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg">

        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-emerald-200" />
              <h2 className="text-lg font-semibold">
                Jakarta Selatan, DKI Jakarta
              </h2>
            </div>

            <p className="text-sm text-emerald-100">
              Sabtu, 2 Mei 2026
            </p>
            <p className="text-xs text-emerald-200">
              15 Dzulqa’dah 1447 H
            </p>
          </div>

          <div className="text-right text-xs">
            <p className="text-emerald-200">METODE</p>
            <p className="font-semibold">Kemenag RI</p>
          </div>
        </div>

        {/* NEXT PRAYER */}
        <div className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl">
          <Clock className="w-5 h-5" />
          <div>
            <p className="text-xs text-emerald-100">Berikutnya</p>
            <p className="font-semibold">
              {next.name} - {next.time}
            </p>
          </div>
        </div>
      </div>

    {/* JADWAL HARI INI */}
<div>
  <h3 className="font-semibold mb-3">Jadwal Hari Ini</h3>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {jadwal.map((item) => (
      <div
        key={item.name}
        className="
          p-4 rounded-2xl text-center
          bg-white border border-gray-200
          hover:border-emerald-400 hover:shadow-md
          transition-all
        "
      >
        <p className="text-sm text-gray-500">{item.name}</p>
        <p className="text-xl font-bold text-gray-800 mt-1">
          {item.time}
        </p>
      </div>
    ))}
  </div>
</div>

      {/* TABLE */}
      <div>
  <h3 className="font-semibold mb-3">Jadwal Mingguan</h3>

  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <table className="w-full text-sm">

      {/* HEADER */}
      <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
        <tr>
          <th className="px-4 py-3 text-left w-40">Hari</th>
          <th className="px-3 py-3 text-center">Subuh</th>
          <th className="px-3 py-3 text-center">Dzuhur</th>
          <th className="px-3 py-3 text-center">Ashar</th>
          <th className="px-3 py-3 text-center">Maghrib</th>
          <th className="px-3 py-3 text-center">Isya</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {Array.from({ length: 7 }).map((_, i) => (
          <tr
            key={i}
            className={`
              border-t
              ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              hover:bg-emerald-50 transition
            `}
          >
            <td className="px-4 py-3 text-left font-medium">
              Hari {i + 1}
            </td>

            <td className="px-3 py-3 text-center">04:42</td>
            <td className="px-3 py-3 text-center">12:01</td>
            <td className="px-3 py-3 text-center">15:22</td>
            <td className="px-3 py-3 text-center">17:58</td>
            <td className="px-3 py-3 text-center">19:09</td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

      {/* JUMAT CARD */}
      <div className="rounded-sm bg-linear-to-r from-yellow-100 to-yellow-50 p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm">

        <div className="flex-1">
        </div>

        <div className="w-full md:w-64 h-40 rounded-xl bg-[url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f')] bg-cover bg-center shadow-md" />
      </div>

    </div>
  )
}
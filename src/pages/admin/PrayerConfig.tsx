import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Save } from "lucide-react";

export default function PrayerConfig() {
  // State dummy untuk koordinat, nanti bisa disambungin ke API
  const [city, setCity] = useState("Yogyakarta");
  const [lat, setLat] = useState("-7.7956");
  const [lng, setLng] = useState("110.3695");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading simpan data ke database
    setTimeout(() => {
      setIsLoading(false);
      alert("Konfigurasi lokasi shalat berhasil disimpan!");
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-simas-primary rounded-lg">
            <MapPin className="h-6 w-6" />
          </div>
          Konfigurasi Lokasi Shalat
        </h1>
        <p className="text-gray-500 mt-2">
          Atur nama kota dan titik koordinat masjid untuk penyesuaian jadwal shalat otomatis di halaman depan.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="city">Nama Kota / Kabupaten</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Contoh: Jakarta Selatan"
              className="max-w-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude (Garis Lintang)</Label>
              <Input
                id="lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="-6.2088"
                required
              />
              <p className="text-xs text-gray-400">Contoh format: -7.7956</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lng">Longitude (Garis Bujur)</Label>
              <Input
                id="lng"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="106.8456"
                required
              />
              <p className="text-xs text-gray-400">Contoh format: 110.3695</p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t flex justify-end">
            <Button
              type="submit"
              className="bg-simas-primary hover:bg-emerald-700 text-white px-8"
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
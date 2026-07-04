export type Status = 'menunggu' | 'terverifikasi' | 'ditolak'

export interface Donasi {
  id: string
  nama: string
  inisial: string
  avatarBg: string
  nominal: number
  kategori: string
  tanggal: string
  waktu: string
  wa: string
  catatan: string
  status: Status
  metode: string
}
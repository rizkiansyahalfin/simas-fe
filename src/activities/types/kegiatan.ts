export interface JadwalJumat {
  id: string
  minggu: number
  tanggal: string
  status: 'mendatang' | 'selesai' | 'berlangsung'
  khatib: string
  imam: string
  muadzin: string
  tema: string
}


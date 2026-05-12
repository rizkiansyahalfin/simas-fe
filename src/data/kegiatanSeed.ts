import { type JadwalJumat } from "@/types/kegiatan"

/* ─── Seed data ─── */

export const SEED: JadwalJumat[] = [
  { id:'J001', minggu:1, tanggal:"Jum'at, 6 Okt 2026",  status:'selesai',    khatib:'Ust. Adi Hidayat',            imam:'Imam Masjid',          muadzin:'Hasan',          tema:'Pentingnya Adab Sebelum Ilmu' },
  { id:'J002', minggu:2, tanggal:"Jum'at, 13 Okt 2026", status:'mendatang',  khatib:'Prof. Dr. KH. Nasaruddin Umar',imam:'Ust. Muzammil Hasballah',muadzin:'Ahmad Fauzi',   tema:'Menjaga Ukhuwah di Tengah Perbedaan' },
  { id:'J003', minggu:3, tanggal:"Jum'at, 20 Okt 2026", status:'mendatang',  khatib:'',                            imam:'',                     muadzin:'',               tema:'' },
  { id:'J004', minggu:4, tanggal:"Jum'at, 27 Okt 2026", status:'mendatang',  khatib:'',                            imam:'',                     muadzin:'',               tema:'' },
]

export const STATUS_CFG = {
  mendatang:   { label:'Mendatang',   cls:'badge badge-waiting',  dot:'badge-dot dot-waiting' },
  selesai:     { label:'Selesai',     cls:'badge badge-ok',       dot:'badge-dot dot-ok' },
  berlangsung: { label:'Berlangsung', cls:'badge badge-rejected', dot:'badge-dot dot-rejected' },
} as const
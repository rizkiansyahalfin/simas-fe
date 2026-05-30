export interface ImportRow {
  row: number

  nama: string
  nik: string
  alamat: string
  nomorHp: string

  jenisKelamin: 'L' | 'P'

  isValid: boolean

  error?: string
}

export interface ImportResult {
  row: number

  nama: string

  status: 'success' | 'failed'

  message: string
}

export interface ImportSummary {
  total: number
  valid: number
  invalid: number
}

export interface CongregationImportResponse {
  successCount: number
  failedCount: number
  results: ImportResult[]
}
import * as XLSX from 'xlsx'

import type {
  CongregationImportResponse,
  ImportResult,
  ImportRow,
} from '../congregationImport'

function validateRow(
  row: ImportRow,
): ImportRow {
  const errors: string[] = []

  if (!row.nama?.trim()) {
    errors.push('Nama wajib diisi')
  }

  if (!row.nik?.trim()) {
    errors.push('NIK wajib diisi')
  }

  if (
    row.nik &&
    row.nik.length < 16
  ) {
    errors.push(
      'NIK minimal 16 digit',
    )
  }

  if (!row.alamat?.trim()) {
    errors.push(
      'Alamat wajib diisi',
    )
  }

  if (
    !['L', 'P'].includes(
      row.jenisKelamin,
    )
  ) {
    errors.push(
      'Jenis kelamin harus L atau P',
    )
  }

  return {
    ...row,
    isValid: errors.length === 0,
    error: errors.join(', '),
  }
}

export async function parseExcelFile(
  file: File,
): Promise<ImportRow[]> {
  const buffer =
    await file.arrayBuffer()

  const workbook = XLSX.read(
    buffer,
    {
      type: 'array',
    },
  )

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ]

  const rows =
    XLSX.utils.sheet_to_json<
      Record<string, unknown>
    >(sheet)

  const mappedRows =
    rows.map((item, index) =>
      validateRow({
        row: index + 1,

        nama:
          String(
            item.nama ??
              item.Nama ??
              '',
          ) || '',

        nik:
          String(
            item.nik ??
              item.NIK ??
              '',
          ) || '',

        alamat:
          String(
            item.alamat ??
              item.Alamat ??
              '',
          ) || '',

        nomorHp:
          String(
            item.nomorHp ??
              item.noHp ??
              item.hp ??
              '',
          ) || '',

        jenisKelamin:
          String(
            item.jenisKelamin ??
              item.jk ??
              'L',
          )
            .toUpperCase()
            .trim() === 'P'
            ? 'P'
            : 'L',

        isValid: true,
      }),
    )

  return mappedRows
}

/**
 * MOCK IMPORT API
 *
 * nanti ganti ke endpoint backend:
 * POST /congregations/import
 */
export async function importCongregations(
  rows: ImportRow[],
): Promise<CongregationImportResponse> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500),
  )

  const results: ImportResult[] =
    rows.map((row) => {
      if (!row.isValid) {
        return {
          row: row.row,
          nama: row.nama,
          status: 'failed',
          message:
            row.error ??
            'Data tidak valid',
        }
      }

      const randomFail =
        Math.random() < 0.15

      return {
        row: row.row,
        nama: row.nama,
        status: randomFail
          ? 'failed'
          : 'success',
        message: randomFail
          ? 'NIK sudah terdaftar'
          : 'Berhasil diimport',
      }
    })

  return {
    successCount:
      results.filter(
        (r) =>
          r.status === 'success',
      ).length,

    failedCount:
      results.filter(
        (r) =>
          r.status === 'failed',
      ).length,

    results,
  }
}
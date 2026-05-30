import { useMemo, useState } from 'react'

import {
  importCongregations,
  parseExcelFile,
} from '../utils/congregationImportService'

import type {
  CongregationImportResponse,
  ImportRow,
  ImportSummary,
} from '../types/congregationImport'

export function useCongregationImport() {
  const [file, setFile] =
    useState<File | null>(null)

  const [
    previewData,
    setPreviewData,
  ] = useState<ImportRow[]>([])

  const [
    importResult,
    setImportResult,
  ] =
    useState<CongregationImportResponse | null>(
      null,
    )

  const [isParsing, setIsParsing] =
    useState(false)

  const [
    isImporting,
    setIsImporting,
  ] = useState(false)

  const summary =
    useMemo<ImportSummary>(() => {
      const total =
        previewData.length

      const valid =
        previewData.filter(
          (item) => item.isValid,
        ).length

      const invalid =
        total - valid

      return {
        total,
        valid,
        invalid,
      }
    }, [previewData])

  async function handleFile(
    selectedFile: File,
  ) {
    try {
      setIsParsing(true)

      const rows =
        await parseExcelFile(
          selectedFile,
        )

      setFile(selectedFile)

      setPreviewData(rows)

      setImportResult(null)
    } finally {
      setIsParsing(false)
    }
  }

  async function handleImport() {
    if (
      previewData.length === 0
    ) {
      return
    }

    try {
      setIsImporting(true)

      const response =
        await importCongregations(
          previewData,
        )

      setImportResult(response)
    } finally {
      setIsImporting(false)
    }
  }

  function resetImport() {
    setFile(null)

    setPreviewData([])

    setImportResult(null)
  }

  return {
    file,

    previewData,

    importResult,

    summary,

    isParsing,

    isImporting,

    handleFile,

    handleImport,

    resetImport,
  }
}
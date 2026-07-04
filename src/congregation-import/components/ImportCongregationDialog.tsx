import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import UploadExcelZone from './UploadExcelZone'
import ImportPreviewTable from './ImportPreviewTable'
import ImportResultTable from './ImportResultTable'
import ImportSummaryCard from './ImportSummaryCard'
import ImportSkeleton from './ImportSkeleton'

import { useCongregationImport } from '../hooks/useCongregationImport'

interface ImportCongregationDialogProps {
  trigger?: React.ReactNode
}

export default function ImportCongregationDialog({
  trigger,
}: ImportCongregationDialogProps) {
  const {
    previewData,
    importResult,
    summary,
    isParsing,
    isImporting,
    handleFile,
    handleImport,
  } = useCongregationImport()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            Import Jamaah
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Import Data Jamaah
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <UploadExcelZone
            onFileSelect={handleFile}
          />

          {isParsing && (
            <ImportSkeleton />
          )}

          {!isParsing &&
            previewData.length >
              0 && (
              <>
                <ImportSummaryCard
                  summary={summary}
                />

                <ImportPreviewTable
                  data={previewData}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={
                      handleImport
                    }
                    disabled={
                      isImporting
                    }
                  >
                    {isImporting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    Import Sekarang
                  </Button>
                </div>
              </>
            )}

          {importResult && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">
                    Berhasil
                  </p>

                  <p className="text-2xl font-bold text-emerald-700">
                    {
                      importResult.successCount
                    }
                  </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-700">
                    Gagal
                  </p>

                  <p className="text-2xl font-bold text-red-700">
                    {
                      importResult.failedCount
                    }
                  </p>
                </div>
              </div>

              <ImportResultTable
                results={
                  importResult.results
                }
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface UploadExcelZoneProps {
  onFileSelect: (file: File) => void
}

export default function UploadExcelZone({
  onFileSelect,
}: UploadExcelZoneProps) {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      multiple: false,
      accept: {
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          ['.xlsx'],
      },
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]

        if (file) {
          onFileSelect(file)
        }
      },
    })

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer
        rounded-lg
        border-2
        border-dashed
        p-10
        text-center
        transition-colors
        ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-300 bg-white hover:border-emerald-400'
        }
      `}
    >
      <input {...getInputProps()} />

      <Upload className="mx-auto mb-4 h-10 w-10 text-emerald-600" />

      <h3 className="mb-2 text-lg font-semibold">
        Upload File Excel
      </h3>

      <p className="text-sm text-gray-500">
        Drag & drop file Excel atau klik untuk memilih
      </p>

      <p className="mt-2 text-xs text-gray-400">
        Format: .xlsx atau .xls
      </p>
    </div>
  )
}
// src/features/congregation-detail/components/RevealNikButton.tsx

import { useState } from "react"

import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
  nik: string
}

export default function RevealNikButton({
  nik,
}: Props) {

  const [show,
    setShow] =
    useState(false)

  const maskedNik =
    nik.replace(
      /^(\d{4})\d+(\\d{4})$/,
      '$1********$2'
    )

  return (
    <div
      className="
        flex flex-wrap items-center gap-3
      "
    >

      <span
        className="
          font-mono text-sm font-medium
          tracking-normal text-gray-900
        "
      >
        {show ? nik : maskedNik}
      </span>

      <Button
        size="icon"
        variant="outline"
        aria-label={show ? "Sembunyikan NIK" : "Tampilkan NIK"}
        onClick={() =>
          setShow(!show)
        }
        className="size-8 border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-emerald-700 active:bg-gray-100"
      >

        {show
          ? <EyeOff className="size-4" />
          : <Eye className="size-4" />
        }

      </Button>

    </div>
  )
}

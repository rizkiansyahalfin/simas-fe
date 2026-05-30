// src/components/states/EmptyState.tsx

import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface Props {
  title: string

  description: string

  action?: ReactNode
}

export default function EmptyState({
  title,
  description,
  action,
}: Props) {
  return (
    <div
      className="
        flex flex-col items-center
        justify-center
        rounded-xl border
        bg-white px-6 py-16
        text-center
      "
    >
      <div
        className="
          rounded-full
          bg-emerald-50 p-4
        "
      >
        <Inbox
          className="
            h-8 w-8
            text-emerald-600
          "
        />
      </div>

      <h3
        className="
          mt-5 text-lg
          font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2 max-w-md
          text-sm text-muted-foreground
        "
      >
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}

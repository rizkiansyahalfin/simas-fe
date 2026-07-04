// src/features/campaigns/components/DonorCountBadge.tsx

interface Props {
  total: number
}

export default function DonorCountBadge({
  total,
}: Props) {
  return (
    <div
      className="
        inline-flex items-center
        rounded-full
        bg-emerald-100
        px-3 py-1
        text-sm
        font-medium
        text-emerald-700
      "
    >
      {total} Donatur
    </div>
  )
}
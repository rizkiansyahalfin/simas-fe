// src/features/campaigns/components/CampaignProgress.tsx

interface Props {
  collected: number
  target: number
}

export default function CampaignProgress({
  collected,
  target,
}: Props) {

  const percentage =
    Math.min(
      (collected / target) * 100,
      100
    )

  return (
    <div className="space-y-2">

      <div
        className="
          h-3 overflow-hidden
          rounded-full
          bg-gray-200
        "
      >
        <div
          className="
            h-full rounded-full
            bg-emerald-600
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div
        className="
          flex items-center
          justify-between
          text-sm
        "
      >
        <span
          className="
            font-semibold
            text-emerald-700
          "
        >
          Rp
          {collected.toLocaleString()}
        </span>

        <span
          className="
            text-muted-foreground
          "
        >
          Target Rp
          {target.toLocaleString()}
        </span>
      </div>

    </div>
  )
}
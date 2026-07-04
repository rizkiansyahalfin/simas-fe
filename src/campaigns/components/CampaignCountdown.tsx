// src/features/campaigns/components/CampaignCountdown.tsx

interface Props {
  deadline: string
}

export default function CampaignCountdown({
  deadline,
}: Props) {

  const now =
    new Date()

  const end =
    new Date(deadline)

  const diff =
    end.getTime() -
    now.getTime()

  const days =
    Math.max(
      Math.ceil(
        diff /
        (1000 * 60 * 60 * 24)
      ),
      0
    )

  return (
    <div
      className="
        text-sm
        text-amber-700
      "
    >
      ⏳ {days} hari lagi
    </div>
  )
}
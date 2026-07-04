// src/features/campaigns/components/CampaignSkeleton.tsx

export default function CampaignSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border bg-white
      "
    >

      <div
        className="
          aspect-video
          animate-pulse
          bg-gray-200
        "
      />

      <div className="space-y-4 p-5">

        <div className="space-y-2">

          <div
            className="
              h-5 w-2/3
              animate-pulse
              rounded bg-gray-200
            "
          />

          <div
            className="
              h-4 w-full
              animate-pulse
              rounded bg-gray-100
            "
          />

          <div
            className="
              h-4 w-4/5
              animate-pulse
              rounded bg-gray-100
            "
          />

        </div>

        <div
          className="
            h-3 w-full
            animate-pulse
            rounded-full
            bg-gray-200
          "
        />

        <div
          className="
            flex items-center
            justify-between
          "
        >

          <div
            className="
              h-8 w-24
              animate-pulse
              rounded-full
              bg-gray-200
            "
          />

          <div
            className="
              h-4 w-20
              animate-pulse
              rounded
              bg-gray-100
            "
          />

        </div>

      </div>

    </div>
  )
}
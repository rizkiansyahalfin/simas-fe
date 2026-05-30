import { Mic } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import type { Speaker } from '../types/eventTypes'

interface Props {
  speaker: Speaker
}

export default function SpeakerCard({
  speaker,
}: Props) {
  return (
    <Card
      className="
        flex-row items-center gap-4
        rounded-2xl border border-slate-200
        bg-white p-4 py-4 shadow-none
        transition-colors hover:border-emerald-200
      "
    >
      <Avatar className="h-16 w-16 border border-emerald-100">
        <AvatarImage src={speaker.photo} alt={speaker.name} />
        <AvatarFallback className="bg-emerald-50 text-sm font-bold text-[#059669]">
          {speaker.name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div>

        <h3
          className="
            font-bold text-slate-900
          "
        >
          {speaker.name}
        </h3>

        <p
          className="
            mt-1 flex items-center gap-1.5
            text-sm text-slate-500
          "
        >
          <Mic className="h-4 w-4 text-[#B45309]" />
          {speaker.role}
        </p>

      </div>

    </Card>
  )
}

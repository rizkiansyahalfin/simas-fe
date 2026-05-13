// src/features/congregation/components/GenderRadioGroup.tsx

import type { Gender } from "../typesCongregation"


interface Props {
  value: Gender

  onChange: (
    value: Gender
  ) => void
}

export default function GenderRadioGroup({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-6">

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={value === 'MALE'}
          onChange={() =>
            onChange('MALE')
          }
        />

        <span>Laki-laki</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={value === 'FEMALE'}
          onChange={() =>
            onChange('FEMALE')
          }
        />

        <span>Perempuan</span>
      </label>

    </div>
  )
}
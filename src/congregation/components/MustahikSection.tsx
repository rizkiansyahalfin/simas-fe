// src/features/congregation/components/MustahikSection.tsx

import { Textarea }
from '@/components/ui/textarea'
import type { Congregation, MustahikCategory } from '../typesCongregation'



interface Props {
  form: Congregation

  updateField: <K extends keyof Congregation>(
    key: K,
    value: Congregation[K]
  ) => void
}

export default function MustahikSection({
  form,
  updateField,
}: Props) {
  return (
    <div className="space-y-5">

      {/* switch */}
      <div
        className="
          rounded-2xl border
          bg-green-50
          p-4
        "
      >
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <div>
            <h3 className="font-semibold">
              Daftarkan sebagai
              Mustahik
            </h3>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Aktifkan jika jamaah
              berhak menerima
              bantuan
            </p>
          </div>

          <input
            type="checkbox"
            checked={form.isMustahik}
            onChange={(e) =>
              updateField(
                'isMustahik',
                e.target.checked
              )
            }
          />
        </div>
      </div>

      {/* conditional */}
      {form.isMustahik && (
        <>
          <div className="space-y-2">

            <label className="font-medium">
              Kategori Mustahik
            </label>

            <select
              value={
                form.mustahikCategory
              }
              onChange={(e) =>
                updateField(
                  'mustahikCategory',
                  e.target.value as MustahikCategory
                )
              }
              className="
                w-full rounded-xl
                border p-3
              "
            >
              <option value="MISKIN">
                Miskin
              </option>

              <option value="DUAFA">
                Duafa
              </option>

              <option value="YATIM">
                Yatim
              </option>

              <option value="FISABILILLAH">
                Fisabilillah
              </option>
            </select>

          </div>

          <div className="space-y-2">

            <label className="font-medium">
              Catatan Mustahik
            </label>

            <Textarea
              rows={4}
              value={
                form.mustahikNotes
              }
              onChange={(e) =>
                updateField(
                  'mustahikNotes',
                  e.target.value
                )
              }
              placeholder="
              Tambahkan catatan...
              "
            />

          </div>
        </>
      )}

    </div>
  )
}
export type ValidationRule<T> = {
  validate: (value: T, formData: Record<string, string>) => string | null
}

export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<string>[]>>

export function validateForm<T extends Record<string, string>>(
  formData: T,
  rules: ValidationRules<T>
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [field, fieldRules] of Object.entries(rules)) {
    if (!fieldRules) continue
    const value = formData[field] ?? ""
    for (const rule of fieldRules as ValidationRule<string>[]) {
      const error = rule.validate(value, formData)
      if (error) {
        errors[field] = error
        break
      }
    }
  }

  return errors
}

export const required = (label: string): ValidationRule<string> => ({
  validate: (value) => (value.trim() ? null : `${label} wajib diisi.`),
})

export const minLength = (label: string, min: number): ValidationRule<string> => ({
  validate: (value) =>
    value.length >= min ? null : `${label} minimal ${min} karakter.`,
})

export const email: ValidationRule<string> = {
  validate: (value) =>
    !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? null
      : "Format email tidak valid.",
}

export const phone: ValidationRule<string> = {
  validate: (value) =>
    !value || /^[0-9+\-\s()]{8,15}$/.test(value)
      ? null
      : "Format nomor telepon tidak valid.",
}

export const positiveNumber = (label: string): ValidationRule<string> => ({
  validate: (value) => {
    const num = Number(value)
    return !value || (num > 0 && !Number.isNaN(num))
      ? null
      : `${label} harus berupa angka positif.`
  },
})

export const matchField = (label: string, otherField: string): ValidationRule<string> => ({
  validate: (value, formData) =>
    value === formData[otherField] ? null : `${label} tidak cocok.`,
})

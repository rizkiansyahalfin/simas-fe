// src/lib/mask.ts

export function maskNik(
  nik: string
) {
  if (nik.length < 8)
    return nik

  return `${nik.slice(
    0,
    4
  )}********${nik.slice(-4)}`
}
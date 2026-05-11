// src/features/congregation/types.ts

export type Gender =
  | 'MALE'
  | 'FEMALE'

export type MustahikCategory =
  | 'MISKIN'
  | 'DUAFA'
  | 'YATIM'
  | 'FISABILILLAH'

export interface Congregation {
  id?: string

  fullName: string

  nik: string

  address: string

  phone: string

  birthDate: string

  gender: Gender

  isMustahik: boolean

  mustahikCategory?: MustahikCategory

  mustahikNotes?: string
}
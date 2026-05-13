// src/features/congregation/hooks/useCongregationForm.ts

import { useState } from 'react'
import type { Congregation } from '../typesCongregation'



const initialValues: Congregation = {
  fullName: '',
  nik: '',
  address: '',
  phone: '',
  birthDate: '',
  gender: 'MALE',

  isMustahik: false,

  mustahikCategory: 'MISKIN',

  mustahikNotes: '',
}

export function useCongregationForm() {
  const [form, setForm] =
    useState(initialValues)

  function updateField<
    K extends keyof Congregation,
  >(
    key: K,
    value: Congregation[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function resetForm() {
    setForm(initialValues)
  }

  return {
    form,

    updateField,

    resetForm,
  }
}
import { useEffect, useState } from 'react'

import { paymentService } from '../services/paymentService'
import type { Payment, PaymentStatus } from '../paymentsTypes'



export function usePayments() {
  const [payments, setPayments] =
    useState<Payment[]>([])

  const [loading, setLoading] =
    useState(true)

  const [statusFilter, setStatusFilter] =
    useState<PaymentStatus | 'all'>(
      'all',
    )

  async function loadPayments() {
    setLoading(true)

    const data =
      await paymentService.getPayments(
        statusFilter,
      )

    setPayments(data)

    setLoading(false)
  }

  useEffect(() => {
    loadPayments()
  }, [statusFilter])

  return {
    payments,
    loading,

    statusFilter,
    setStatusFilter,

    refresh: loadPayments,
  }
}
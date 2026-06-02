import type { Payment, PaymentStatus } from "../paymentsTypes"


const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: 'TRX-001',
    donorName: 'Ahmad Fauzi',
    amount: 250000,
    paymentMethod: 'QRIS',
    status: 'settlement',
    transactionTime: '2026-06-10',
  },
  {
    id: '2',
    orderId: 'TRX-002',
    donorName: 'Siti Aminah',
    amount: 100000,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    transactionTime: '2026-06-11',
  },
]

export const paymentService = {
  async getPayments(
    status?: PaymentStatus | 'all',
  ): Promise<Payment[]> {
    await new Promise((r) =>
      setTimeout(r, 500),
    )

    if (!status || status === 'all') {
      return mockPayments
    }

    return mockPayments.filter(
      (item) => item.status === status,
    )
  },

  async checkStatus(id: string) {
    await new Promise((r) =>
      setTimeout(r, 1000),
    )

    console.log(
      'Check payment status:',
      id,
    )
  },

  async refund(id: string) {
    await new Promise((r) =>
      setTimeout(r, 1000),
    )

    console.log('Refund:', id)
  },
}
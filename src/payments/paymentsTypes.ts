export type PaymentStatus =
  | 'pending'
  | 'settlement'
  | 'capture'
  | 'expire'
  | 'cancel'
  | 'refund'

export interface Payment {
  id: string
  orderId: string

  donorName: string

  amount: number

  paymentMethod: string

  status: PaymentStatus

  transactionTime: string
}
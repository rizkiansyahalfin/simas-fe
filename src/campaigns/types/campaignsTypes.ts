// src/features/campaigns/types.ts

export interface Campaign {
  id: string

  title: string

  description: string

  imageUrl: string

  collectedAmount: number

  targetAmount: number

  donorCount: number

  deadline: string
}
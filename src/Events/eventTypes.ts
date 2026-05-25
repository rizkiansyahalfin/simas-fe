// src/features/events/types.ts

export interface Speaker {
  id: string
  name: string
  role: string
  photo: string
}

export interface EventPhoto {
  id: string
  imageUrl: string
}

export interface EventDetail {
  id: string

  title: string

  type: string

  status: 'verified' | 'active' | 'pending' | 'upcoming' | 'rejected' | 'inactive' | 'draft' | 'completed'

  description: string

  banner: string

  location: string

  startDate: string

  endDate: string

  speakers: Speaker[]

  gallery: EventPhoto[]
}

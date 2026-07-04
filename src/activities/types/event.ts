export type EventStatus =
  | "upcoming"
  | "ongoing"
  | "finished";

export interface EventItem {
  id: number
  title: string
  date: string
  location: string
  description: string
  status: EventStatus
}
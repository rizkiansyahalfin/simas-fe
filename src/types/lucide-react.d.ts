declare module 'lucide-react' {
  import type { ComponentType, SVGProps } from 'react'

  export type LucideIcon = ComponentType<
    SVGProps<SVGSVGElement> & {
      size?: string | number
      absoluteStrokeWidth?: boolean
    }
  >

  export const AlertCircle: LucideIcon
  export const Archive: LucideIcon
  export const ArrowLeft: LucideIcon
  export const ArrowRight: LucideIcon
  export const Bell: LucideIcon
  export const BookOpen: LucideIcon
  export const Calendar: LucideIcon
  export const CalendarDays: LucideIcon
  export const CheckCircle2: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronRightIcon: LucideIcon
  export const Clock: LucideIcon
  export const Download: LucideIcon
  export const ExternalLink: LucideIcon
  export const Eye: LucideIcon
  export const EyeOff: LucideIcon
  export const FileText: LucideIcon
  export const Globe: LucideIcon
  export const HeartHandshake: LucideIcon
  export const Home: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const Lock: LucideIcon
  export const Mail: LucideIcon
  export const MapPin: LucideIcon
  export const Menu: LucideIcon
  export const MoonStar: LucideIcon
  export const MoreVertical: LucideIcon
  export const Newspaper: LucideIcon
  export const Phone: LucideIcon
  export const Save: LucideIcon
  export const Settings: LucideIcon
  export const Search: LucideIcon
  export const Tag: LucideIcon
  export const Target: LucideIcon
  export const User: LucideIcon
  export const Users: LucideIcon
  export const Wallet: LucideIcon
  export const X: LucideIcon
  export const XCircle: LucideIcon
  export const XIcon: LucideIcon
}

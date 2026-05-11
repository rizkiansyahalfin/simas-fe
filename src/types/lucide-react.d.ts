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
  export const Bell: LucideIcon
  export const CalendarDays: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronDownIcon: LucideIcon
  export const ChevronRightIcon: LucideIcon
  export const ClipboardPenIcon: LucideIcon
  export const Clock: LucideIcon
  export const Eye: LucideIcon
  export const EyeOff: LucideIcon
  export const FileText: LucideIcon
  export const HeartHandshake: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const Lock: LucideIcon
  export const Mail: LucideIcon
  export const MapPin: LucideIcon
  export const Menu: LucideIcon
  export const PlusIcon: LucideIcon
  export const Settings: LucideIcon
  export const Users: LucideIcon
  export const Wallet: LucideIcon
  export const XIcon: LucideIcon
}

declare module "lucide-react" {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react"

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string
    absoluteStrokeWidth?: boolean
    color?: string
    strokeWidth?: number | string
  }

  export type LucideIcon = ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  >

  export type IconNode = [elementName: string, attrs: Record<string, string>][]

  declare const defaultIcon: LucideIcon
  export default defaultIcon

  export const Activity: LucideIcon
  export const ActivitySquare: LucideIcon
  export const AlertCircle: LucideIcon
  export const AlertTriangle: LucideIcon
  export const Archive: LucideIcon
  export const ArrowDownCircle: LucideIcon
  export const ArrowLeft: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowUpCircle: LucideIcon
  export const Bell: LucideIcon
  export const BookOpen: LucideIcon
  export const Box: LucideIcon
  export const Building2: LucideIcon
  export const Calendar: LucideIcon
  export const CalendarDays: LucideIcon
  export const CalendarIcon: LucideIcon
  export const Check: LucideIcon
  export const CheckCircle2: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronDownIcon: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronRightIcon: LucideIcon
  export const ClipboardPenIcon: LucideIcon
  export const Clock: LucideIcon
  export const Download: LucideIcon
  export const ExternalLink: LucideIcon
  export const Eye: LucideIcon
  export const EyeOff: LucideIcon
  export const FileSpreadsheet: LucideIcon
  export const FileText: LucideIcon
  export const Globe: LucideIcon
  export const Heart: LucideIcon
  export const HeartHandshake: LucideIcon
  export const History: LucideIcon
  export const Home: LucideIcon
  export const Icon: LucideIcon
  export const ImagePlus: LucideIcon
  export const Inbox: LucideIcon
  export const Info: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const LinkIcon: LucideIcon
  export const Lock: LucideIcon
  export const Mail: LucideIcon
  export const MailCheck: LucideIcon
  export const MapPin: LucideIcon
  export const Menu: LucideIcon
  export const Mic: LucideIcon
  export const MoreVertical: LucideIcon
  export const Newspaper: LucideIcon
  export const Pencil: LucideIcon
  export const Phone: LucideIcon
  export const Plus: LucideIcon
  export const PlusIcon: LucideIcon
  export const RefreshCcw: LucideIcon
  export const RefreshCw: LucideIcon
  export const Save: LucideIcon
  export const Search: LucideIcon
  export const SearchX: LucideIcon
  export const Send: LucideIcon
  export const ServerCrash: LucideIcon
  export const Settings: LucideIcon
  export const ShieldAlert: LucideIcon
  export const Tag: LucideIcon
  export const Target: LucideIcon
  export const Trash2: LucideIcon
  export const TrendingDown: LucideIcon
  export const TrendingUp: LucideIcon
  export const Upload: LucideIcon
  export const User: LucideIcon
  export const UserRound: LucideIcon
  export const Users: LucideIcon
  export const Volume2: LucideIcon
  export const Wallet: LucideIcon
  export const X: LucideIcon
  export const XCircle: LucideIcon
  export const XIcon: LucideIcon
  export const ZoomIn: LucideIcon
  export const CalendarPlus: LucideIcon
  export const Clock3: LucideIcon
  export const CalendarX2: LucideIcon

  export function createLucideIcon(
    name: string,
    iconNode: IconNode,
  ): LucideIcon
  export const icons: Record<string, LucideIcon>
  export function useLucideContext(): Record<string, unknown>
}

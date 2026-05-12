interface Props {
  category: string
}

const colors: Record<string, string> = {
  Fakir: 'bg-red-100 text-red-700',
  Miskin: 'bg-orange-100 text-orange-700',
  Fisabilillah: 'bg-green-100 text-green-700',
  'Ibnu Sabil': 'bg-blue-100 text-blue-700',
  Muallaf: 'bg-purple-100 text-purple-700',
}

export default function MustahikStatusBadge({
  category,
}: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[category] ??
        'bg-gray-100 text-gray-700'
      }`}
    >
      {category}
    </span>
  )
}
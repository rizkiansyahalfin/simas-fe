interface Props {
  status: 'Selesai' | 'Pending'
}

export default function DistributionStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === 'Selesai'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {status}
    </span>
  )
}
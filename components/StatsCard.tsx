interface StatsCardProps {
  icon: string
  label: string
  value: number | string
}

export function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}


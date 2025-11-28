import { Category } from '@/types'
import Link from 'next/link'

interface CategoryCardProps {
  category: Category
  locationCount?: number
  checkInCount?: number
}

export function CategoryCard({ category, locationCount, checkInCount }: CategoryCardProps) {
  return (
    <Link href={`/explore?category=${category.slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="text-5xl mb-4 text-center">{category.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {category.name}
        </h3>
        <div className="text-sm text-gray-600 text-center space-y-1">
          {locationCount !== undefined && (
            <p>{locationCount} locations</p>
          )}
          {checkInCount !== undefined && (
            <p>{checkInCount} check-ins</p>
          )}
        </div>
      </div>
    </Link>
  )
}


import { Location, Category } from '@/types'
import Link from 'next/link'

interface LocationCardProps {
  location: Location & {
    category?: Category
    check_in_count?: number
    user_checked_in?: boolean
  }
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link href={`/locations/${location.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {location.image_url && (
          <div className="h-48 overflow-hidden">
            <img
              src={location.image_url}
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">
              {location.name}
            </h3>
            {location.user_checked_in && (
              <span className="text-green-600 ml-2">✓</span>
            )}
          </div>
          
          {location.state && (
            <p className="text-sm text-gray-600 mb-2">{location.state}</p>
          )}
          
          {location.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {location.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            {location.category && (
              <span className="flex items-center gap-1">
                <span>{location.category.icon}</span>
                <span>{location.category.name}</span>
              </span>
            )}
            {location.check_in_count !== undefined && (
              <span>{location.check_in_count} check-ins</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}


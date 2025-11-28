import { CheckIn, Location, Category } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface CheckInItemProps {
  checkIn: CheckIn & {
    location: Location & {
      category?: Category
    }
  }
}

export function CheckInItem({ checkIn }: CheckInItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {checkIn.location.image_url && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={checkIn.location.image_url}
              alt={checkIn.location.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <Link
            href={`/locations/${checkIn.location.id}`}
            className="font-semibold text-gray-900 hover:text-blue-600"
          >
            {checkIn.location.name}
          </Link>
          
          {checkIn.location.state && (
            <p className="text-sm text-gray-600">{checkIn.location.state}</p>
          )}
          
          {checkIn.notes && (
            <p className="text-sm text-gray-700 mt-2">{checkIn.notes}</p>
          )}
          
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {checkIn.location.category && (
              <span className="flex items-center gap-1">
                <span>{checkIn.location.category.icon}</span>
                <span>{checkIn.location.category.name}</span>
              </span>
            )}
            <span>
              {formatDistanceToNow(new Date(checkIn.checked_at), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


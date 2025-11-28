import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckInButton } from '@/components/CheckInButton'
import { CheckInItem } from '@/components/CheckInItem'
import Link from 'next/link'
import type { LocationWithCategory, CheckInWithLocation } from '@/types'

interface LocationPageProps {
  params: Promise<{ id: string }>
}

interface UserCheckIn {
  id: string
  notes: string | null
  checked_at: string
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch location details
  const { data: location } = await supabase
    .from('locations')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single()

  if (!location) {
    notFound()
  }

  // Cast to proper type
  const typedLocation = location as LocationWithCategory

  // Get check-in count
  const { count: checkInCount } = await supabase
    .from('check_ins')
    .select('*', { count: 'exact', head: true })
    .eq('location_id', id)

  // Check if user has checked in
  const { data: userCheckIn } = user ? await supabase
    .from('check_ins')
    .select('id, notes, checked_at')
    .eq('location_id', id)
    .eq('user_id', user.id)
    .single() : { data: null }

  const typedUserCheckIn = userCheckIn as UserCheckIn | null

  // Get recent check-ins from other users
  const { data: recentCheckIns } = await supabase
    .from('check_ins')
    .select(`
      *,
      location:locations(
        *,
        category:categories(*)
      )
    `)
    .eq('location_id', id)
    .order('checked_at', { ascending: false })
    .limit(5)

  const typedRecentCheckIns = recentCheckIns as CheckInWithLocation[] | null

  return (
    <div>
      <Link
        href="/explore"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to Explore
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {typedLocation.image_url && (
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={typedLocation.image_url}
                alt={typedLocation.name}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {typedLocation.name}
                </h1>
                {typedLocation.state && (
                  <p className="text-xl text-gray-600">{typedLocation.state}</p>
                )}
              </div>
              {typedUserCheckIn && (
                <span className="text-green-600 text-3xl">✓</span>
              )}
            </div>

            {typedLocation.category && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span className="text-2xl">{typedLocation.category.icon}</span>
                <span className="font-medium">{typedLocation.category.name}</span>
              </div>
            )}

            {typedLocation.description && (
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {typedLocation.description}
              </p>
            )}

            {typedLocation.latitude && typedLocation.longitude && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Coordinates:</span>{' '}
                {typedLocation.latitude}, {typedLocation.longitude}
              </div>
            )}
          </div>

          {/* User's check-in notes */}
          {typedUserCheckIn && typedUserCheckIn.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Your Notes</h3>
              <p className="text-gray-700">{typedUserCheckIn.notes}</p>
              <p className="text-xs text-gray-500 mt-2">
                Checked in on {new Date(typedUserCheckIn.checked_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Recent Check-ins */}
          {typedRecentCheckIns && typedRecentCheckIns.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recent Check-ins ({checkInCount || 0})
              </h2>
              <div className="space-y-4">
                {typedRecentCheckIns
                  .filter(checkIn => checkIn.location !== null)
                  .map(checkIn => (
                  <CheckInItem key={checkIn.id} checkIn={checkIn as any} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Visit This Location
            </h3>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Total Check-ins</span>
                <span className="font-semibold text-gray-900">
                  {checkInCount || 0}
                </span>
              </div>
            </div>

            <CheckInButton
              locationId={typedLocation.id}
              isCheckedIn={!!typedUserCheckIn}
              checkInId={typedUserCheckIn?.id}
            />

            <p className="text-xs text-gray-500 mt-4 text-center">
              {typedUserCheckIn
                ? 'Click to remove your check-in'
                : 'Share your experience with the community'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckInButton } from '@/components/CheckInButton'
import { CheckInItem } from '@/components/CheckInItem'
import Link from 'next/link'

interface LocationPageProps {
  params: Promise<{ id: string }>
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

  // Get check-in count
  const { count: checkInCount } = await supabase
    .from('check_ins')
    .select('*', { count: 'only', head: true })
    .eq('location_id', id)

  // Check if user has checked in
  const { data: userCheckIn } = user ? await supabase
    .from('check_ins')
    .select('id, notes, checked_at')
    .eq('location_id', id)
    .eq('user_id', user.id)
    .single() : { data: null }

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
          {location.image_url && (
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={location.image_url}
                alt={location.name}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {location.name}
                </h1>
                {location.state && (
                  <p className="text-xl text-gray-600">{location.state}</p>
                )}
              </div>
              {userCheckIn && (
                <span className="text-green-600 text-3xl">✓</span>
              )}
            </div>

            {location.category && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span className="text-2xl">{location.category.icon}</span>
                <span className="font-medium">{location.category.name}</span>
              </div>
            )}

            {location.description && (
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {location.description}
              </p>
            )}

            {location.latitude && location.longitude && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Coordinates:</span>{' '}
                {location.latitude}, {location.longitude}
              </div>
            )}
          </div>

          {/* User's check-in notes */}
          {userCheckIn && userCheckIn.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Your Notes</h3>
              <p className="text-gray-700">{userCheckIn.notes}</p>
              <p className="text-xs text-gray-500 mt-2">
                Checked in on {new Date(userCheckIn.checked_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Recent Check-ins */}
          {recentCheckIns && recentCheckIns.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recent Check-ins ({checkInCount || 0})
              </h2>
              <div className="space-y-4">
                {recentCheckIns.map(checkIn => (
                  <CheckInItem key={checkIn.id} checkIn={checkIn} />
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
              locationId={location.id}
              isCheckedIn={!!userCheckIn}
              checkInId={userCheckIn?.id}
            />

            <p className="text-xs text-gray-500 mt-4 text-center">
              {userCheckIn
                ? 'Click to remove your check-in'
                : 'Share your experience with the community'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


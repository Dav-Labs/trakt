import { createClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/StatsCard'
import { CategoryCard } from '@/components/CategoryCard'
import { CheckInItem } from '@/components/CheckInItem'
import { EmptyState } from '@/components/EmptyState'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Fetch user's check-ins
  const { data: checkIns } = await supabase
    .from('check_ins')
    .select(`
      *,
      location:locations(
        *,
        category:categories(*)
      )
    `)
    .eq('user_id', user.id)
    .order('checked_at', { ascending: false })
    .limit(10)

  // Fetch categories with user's check-in counts
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  // Get total locations count
  const { count: totalLocations } = await supabase
    .from('locations')
    .select('*', { count: 'only', head: true })

  // Get unique categories checked in
  const uniqueCategoriesCheckedIn = new Set(
    checkIns?.map(ci => ci.location?.category_id).filter(Boolean) || []
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.user_metadata?.name || 'Explorer'}!
        </h1>
        <p className="text-gray-600">Here's your adventure summary</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon="✅"
          label="Total Check-ins"
          value={checkIns?.length || 0}
        />
        <StatsCard
          icon="🏆"
          label="Categories Explored"
          value={uniqueCategoriesCheckedIn.size}
        />
        <StatsCard
          icon="📍"
          label="Locations Available"
          value={totalLocations || 0}
        />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <Link
            href="/explore"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Explore All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.map(category => {
            const categoryCheckIns = checkIns?.filter(
              ci => ci.location?.category_id === category.id
            ).length || 0

            return (
              <CategoryCard
                key={category.id}
                category={category}
                checkInCount={categoryCheckIns}
              />
            )
          })}
        </div>
      </div>

      {/* Recent Check-ins */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Check-ins</h2>
        {checkIns && checkIns.length > 0 ? (
          <div className="space-y-4">
            {checkIns.map(checkIn => (
              <CheckInItem key={checkIn.id} checkIn={checkIn} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🗺️"
            title="No check-ins yet"
            description="Start exploring and check in at your first location!"
            action={
              <Link
                href="/explore"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Explore Locations
              </Link>
            }
          />
        )}
      </div>
    </div>
  )
}


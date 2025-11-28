import { createClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/StatsCard'
import { CheckInItem } from '@/components/CheckInItem'
import { EmptyState } from '@/components/EmptyState'
import type { User, Category, CheckInWithLocation } from '@/types'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch all check-ins with location details
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

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')

  // Cast to proper types
  const typedProfile = profile as User | null
  const typedCheckIns = checkIns as CheckInWithLocation[] | null
  const typedCategories = categories as Category[] | null

  // Calculate stats
  const totalCheckIns = typedCheckIns?.length || 0
  const uniqueCategoriesCheckedIn = new Set(
    typedCheckIns?.map(ci => ci.location?.category_id).filter(Boolean) || []
  )
  
  // Get states visited
  const statesVisited = new Set(
    typedCheckIns?.map(ci => ci.location?.state).filter(Boolean) || []
  )

  // Calculate completion percentage for each category
  const categoryStats = await Promise.all(
    (typedCategories || []).map(async (category) => {
      const { count: totalInCategory } = await supabase
        .from('locations')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)

      const checkedInCategory = typedCheckIns?.filter(
        ci => ci.location?.category_id === category.id
      ).length || 0

      return {
        category,
        checkedIn: checkedInCategory,
        total: totalInCategory || 0,
        percentage: totalInCategory ? (checkedInCategory / totalInCategory) * 100 : 0,
      }
    })
  )

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          {typedProfile?.avatar_url && (
            <img
              src={typedProfile.avatar_url}
              alt={typedProfile.name || 'User'}
              className="w-20 h-20 rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {typedProfile?.name || 'Explorer'}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon="✅"
          label="Total Check-ins"
          value={totalCheckIns}
        />
        <StatsCard
          icon="🏆"
          label="Categories"
          value={uniqueCategoriesCheckedIn.size}
        />
        <StatsCard
          icon="📍"
          label="States Visited"
          value={statesVisited.size}
        />
        <StatsCard
          icon="🎯"
          label="Avg Completion"
          value={`${Math.round(categoryStats.reduce((acc, cat) => acc + cat.percentage, 0) / categoryStats.length) || 0}%`}
        />
      </div>

      {/* Category Progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Progress</h2>
        <div className="space-y-4">
          {categoryStats.map(({ category, checkedIn, total, percentage }) => (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {checkedIn} / {total} ({Math.round(percentage)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Check-ins */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          All Check-ins ({totalCheckIns})
        </h2>
        {typedCheckIns && typedCheckIns.length > 0 ? (
          <div className="space-y-4">
            {typedCheckIns
              .filter(checkIn => checkIn.location !== null)
              .map(checkIn => (
              <CheckInItem key={checkIn.id} checkIn={checkIn as any} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🗺️"
            title="No check-ins yet"
            description="Start exploring and check in at your first location!"
          />
        )}
      </div>
    </div>
  )
}


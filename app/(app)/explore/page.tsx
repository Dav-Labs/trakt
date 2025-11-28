import { createClient } from '@/lib/supabase/server'
import { LocationCard } from '@/components/LocationCard'
import { EmptyState } from '@/components/EmptyState'
import { ExploreFilters } from '@/components/ExploreFilters'
import type { Category, LocationWithCategoryAndCheckIns, LocationWithCategory } from '@/types'

interface ExplorePageProps {
  searchParams: Promise<{ category?: string; state?: string }>
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch categories
  const categoriesQuery = await supabase
    .from('categories')
    .select('*')
    .order('name')
  const categories = categoriesQuery.data as Category[] | null

  // Build query for locations
  let query = supabase
    .from('locations')
    .select(`
      *,
      category:categories(*),
      check_ins(count)
    `)
    .order('name')

  if (params.category) {
    const categoryQuery = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.category)
      .single()
    const category = categoryQuery.data as { id: string } | null
    
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  if (params.state) {
    query = query.eq('state', params.state)
  }

  const locationsQuery = await query
  const locations = locationsQuery.data as any[] | null

  // Get user's check-ins to mark locations
  const userCheckInsQuery = await supabase
    .from('check_ins')
    .select('location_id')
    .eq('user_id', user?.id || '')
  const userCheckIns = userCheckInsQuery.data as { location_id: string }[] | null

  const checkedInLocationIds = new Set(userCheckIns?.map(ci => ci.location_id) || [])

  // Get unique states
  const statesQuery = await supabase
    .from('locations')
    .select('state')
    .not('state', 'is', null)
    .order('state')
  const statesData = statesQuery.data as { state: string }[] | null

  const uniqueStates = [...new Set(statesData?.map(l => l.state).filter(Boolean) || [])]

  const locationsWithCheckIns = locations?.map((location: any) => ({
    ...location,
    user_checked_in: checkedInLocationIds.has(location.id),
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Locations</h1>
        <p className="text-gray-600">
          Discover amazing places to visit and check in
        </p>
      </div>

      {/* Filters */}
      <ExploreFilters 
        categories={categories || []} 
        uniqueStates={uniqueStates} 
      />

      {/* Locations Grid */}
      {locationsWithCheckIns && locationsWithCheckIns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationsWithCheckIns.map((location: any) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No locations found"
          description="Try adjusting your filters to see more locations"
        />
      )}
    </div>
  )
}


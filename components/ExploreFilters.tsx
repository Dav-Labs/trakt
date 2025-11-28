'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Category } from '@/types'

interface ExploreFiltersProps {
  categories: Category[]
  uniqueStates: string[]
}

export function ExploreFilters({ categories, uniqueStates }: ExploreFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get('category') || ''
  const currentState = searchParams.get('state') || ''

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    router.push(`/explore?${params.toString()}`)
  }

  const handleStateChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('state', value)
    } else {
      params.delete('state')
    }
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.slug}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentState}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {(currentCategory || currentState) && (
          <div className="flex items-end">
            <Link
              href="/explore"
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}


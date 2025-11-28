import { Database } from './database'

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Entity types
export type User = Tables<'users'>
export type Category = Tables<'categories'>
export type Location = Tables<'locations'>
export type CheckIn = Tables<'check_ins'>

// Extended types with relations
export type LocationWithCategory = Location & {
  category: Category | null
  check_in_count?: number
  user_checked_in?: boolean
  check_ins?: CheckIn[]
}

export type CheckInWithLocation = CheckIn & {
  location: LocationWithCategory | null
}

export type LocationWithCategoryAndCheckIns = Location & {
  category: Category
  check_ins: { user_id: string }[]
}

export type UserWithStats = User & {
  total_check_ins: number
  categories_completed: number
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  name: string
}

export interface CheckInFormData {
  notes?: string
}


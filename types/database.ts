// Database Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string | null
          state: string | null
          latitude: number | null
          longitude: number | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description?: string | null
          state?: string | null
          latitude?: number | null
          longitude?: number | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string | null
          state?: string | null
          latitude?: number | null
          longitude?: number | null
          image_url?: string | null
          created_at?: string
        }
      }
      check_ins: {
        Row: {
          id: string
          user_id: string
          location_id: string
          checked_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          location_id: string
          checked_at?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          location_id?: string
          checked_at?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


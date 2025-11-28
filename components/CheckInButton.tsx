'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface CheckInButtonProps {
  locationId: string
  isCheckedIn: boolean
  checkInId?: string
}

export function CheckInButton({ locationId, isCheckedIn, checkInId }: CheckInButtonProps) {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleCheckIn = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in to check in')
        return
      }

      const { error: insertError } = await supabase
        .from('check_ins')
        .insert({
          user_id: user.id,
          location_id: locationId,
          notes: notes || null,
        } as any)

      if (insertError) {
        setError(insertError.message)
      } else {
        router.refresh()
        setShowNotes(false)
        setNotes('')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveCheckIn = async () => {
    if (!checkInId) return

    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase
        .from('check_ins')
        .delete()
        .eq('id', checkInId)

      if (deleteError) {
        setError(deleteError.message)
      } else {
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (isCheckedIn) {
    return (
      <div>
        <button
          onClick={handleRemoveCheckIn}
          disabled={loading}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <span>✓</span>
          <span>{loading ? 'Removing...' : 'Checked In'}</span>
        </button>
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </div>
    )
  }

  if (showNotes) {
    return (
      <div className="space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about your visit (optional)"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-3">
          <button
            onClick={handleCheckIn}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Checking in...' : 'Confirm Check-in'}
          </button>
          <button
            onClick={() => {
              setShowNotes(false)
              setNotes('')
            }}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setShowNotes(true)}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Check In
      </button>
    </div>
  )
}


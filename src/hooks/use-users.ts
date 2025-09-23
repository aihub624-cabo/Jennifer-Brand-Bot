import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  getOrganizationProfiles, 
  updateUserRole, 
  toggleUserActive,
  getUserUsageStats,
  getOrganizationUsageStats
} from '@/lib/database/queries'
import { useAuth } from './use-auth'
import type { Profile, UserRole } from '@/types/database'

export function useUsers() {
  const { profile, permissions } = useAuth()
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchUsers = useCallback(async () => {
    if (!profile?.organization_id || !permissions.canManageUsers()) {
      setUsers([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getOrganizationProfiles(supabase, profile.organization_id)
      setUsers(data)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [profile?.organization_id, permissions, supabase])

  const updateRole = useCallback(async (userId: string, role: UserRole) => {
    if (!permissions.canManageUsers()) {
      throw new Error('Insufficient permissions')
    }

    try {
      const updatedUser = await updateUserRole(supabase, userId, role)
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? updatedUser : user
        )
      )
      return updatedUser
    } catch (err) {
      console.error('Error updating user role:', err)
      throw err
    }
  }, [permissions, supabase])

  const toggleActive = useCallback(async (userId: string, isActive: boolean) => {
    if (!permissions.canManageUsers()) {
      throw new Error('Insufficient permissions')
    }

    try {
      const updatedUser = await toggleUserActive(supabase, userId, isActive)
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? updatedUser : user
        )
      )
      return updatedUser
    } catch (err) {
      console.error('Error toggling user active status:', err)
      throw err
    }
  }, [permissions, supabase])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateRole,
    toggleActive,
  }
}

export function useUserStats(userId?: string, days = 30) {
  const { user } = useAuth()
  const [stats, setStats] = useState<{
    totalMessages: number
    conversationsCount: number
    averageResponseTime: number
    quotaUsage: { used: number; limit: number; resetDate: string }
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const targetUserId = userId || user?.id

  const fetchStats = useCallback(async () => {
    if (!targetUserId) {
      setStats(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getUserUsageStats(supabase, targetUserId, days)
      setStats(data)
    } catch (err) {
      console.error('Error fetching user stats:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }, [targetUserId, days, supabase])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

export function useOrganizationStats(days = 30) {
  const { profile, permissions } = useAuth()
  const [stats, setStats] = useState<{
    messagesSent: number
    conversationsCreated: number
    activeUsers: number
    totalActions: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchStats = useCallback(async () => {
    if (!profile?.organization_id || !permissions.canViewAnalytics()) {
      setStats(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getOrganizationUsageStats(supabase, profile.organization_id, days)
      setStats(data)
    } catch (err) {
      console.error('Error fetching organization stats:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }, [profile?.organization_id, permissions, days, supabase])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
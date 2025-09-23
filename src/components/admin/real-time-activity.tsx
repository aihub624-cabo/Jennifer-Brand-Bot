'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { formatRelativeTime } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'
import type { UsageLog } from '@/types/database'

interface ActivityEvent extends UsageLog {
  user_name?: string
  user_email?: string
}

export function RealTimeActivity() {
  const { profile } = useAuth()
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!profile?.organization_id) return

    // Fetch initial activities
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('usage_logs')
          .select(`
            *,
            profiles!inner(full_name, email)
          `)
          .eq('organization_id', profile.organization_id)
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) throw error

        const transformedData = data.map((item: any) => ({
          ...item,
          user_name: item.profiles?.full_name,
          user_email: item.profiles?.email,
        }))

        setActivities(transformedData)
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    }

    fetchActivities()

    // Set up real-time subscription
    const channel = supabase
      .channel('usage_logs_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'usage_logs',
          filter: `organization_id=eq.${profile.organization_id}`,
        },
        async (payload) => {
          const newActivity = payload.new as UsageLog

          // Fetch user details for the new activity
          try {
            const { data: userData } = await supabase
              .from('profiles')
              .select('full_name, email')
              .eq('id', newActivity.user_id)
              .single()

            const activityWithUser: ActivityEvent = {
              ...newActivity,
              user_name: userData?.full_name,
              user_email: userData?.email,
            }

            setActivities(prev => [activityWithUser, ...prev.slice(0, 19)])
          } catch (error) {
            console.error('Error fetching user data for activity:', error)
            setActivities(prev => [newActivity, ...prev.slice(0, 19)])
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [profile?.organization_id, supabase])

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'message_sent':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        )
      case 'conversation_created':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        )
      case 'user_signup':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        )
      case 'user_login':
        return (
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
    }
  }

  const getActivityDescription = (activity: ActivityEvent) => {
    const userName = activity.user_name || activity.user_email || 'Unknown user'
    
    switch (activity.action) {
      case 'message_sent':
        return `${userName} sent a message`
      case 'conversation_created':
        return `${userName} started a new conversation`
      case 'user_signup':
        return `${userName} joined the organization`
      case 'user_login':
        return `${userName} signed in`
      default:
        return `${userName} performed ${activity.action}`
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Real-time Activity
          </h3>
          <div className="flex items-center space-x-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isConnected ? 'bg-green-400' : 'bg-red-400'
            )} />
            <span className={cn(
              'text-xs font-medium',
              isConnected ? 'text-green-600' : 'text-red-600'
            )}>
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                  )}
                  <div className="relative flex space-x-3">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.action)}
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {getActivityDescription(activity)}
                        </p>
                        {activity.details && (
                          <p className="text-xs text-gray-400 mt-1">
                            {typeof activity.details === 'object' 
                              ? JSON.stringify(activity.details)
                              : String(activity.details)
                            }
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {formatRelativeTime(activity.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {activities.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
              <p className="text-gray-500">Activity will appear here as users interact with the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
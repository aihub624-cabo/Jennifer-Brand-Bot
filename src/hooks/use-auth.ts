import { useAuth as useAuthContext } from '@/lib/auth/auth-context'
import { hasPermission, canAccessAdminPanel, canManageUsers, canViewAnalytics } from '@/lib/auth/auth-utils'
import type { UserRole } from '@/types/database'

export function useAuth() {
  const auth = useAuthContext()

  const permissions = {
    hasPermission: (requiredRole: UserRole) => 
      auth.profile ? hasPermission(auth.profile.role, requiredRole) : false,
    
    canAccessAdmin: () => 
      auth.profile ? canAccessAdminPanel(auth.profile.role) : false,
    
    canManageUsers: () => 
      auth.profile ? canManageUsers(auth.profile.role) : false,
    
    canViewAnalytics: () => 
      auth.profile ? canViewAnalytics(auth.profile.role) : false,
    
    isAdmin: () => 
      auth.profile?.role === 'admin',
  }

  return {
    ...auth,
    permissions,
    isAuthenticated: !!auth.user,
    isLoading: auth.loading,
    userRole: auth.profile?.role,
    organization: auth.profile?.organization,
  }
}
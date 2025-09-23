import type { UserRole } from '@/types/database'

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    admin: 4,
    team_lead: 3,
    team_member: 2,
    user: 1,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'admin'
}

export function isTeamLead(userRole: UserRole): boolean {
  return userRole === 'team_lead'
}

export function canManageUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, 'team_lead')
}

export function canViewAnalytics(userRole: UserRole): boolean {
  return hasPermission(userRole, 'team_lead')
}

export function canAccessAdminPanel(userRole: UserRole): boolean {
  return hasPermission(userRole, 'team_lead')
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    admin: 'Administrator',
    team_lead: 'Team Lead',
    team_member: 'Team Member',
    user: 'User',
  }

  return roleNames[role]
}

export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: 'bg-red-100 text-red-800 border-red-200',
    team_lead: 'bg-blue-100 text-blue-800 border-blue-200',
    team_member: 'bg-green-100 text-green-800 border-green-200',
    user: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  return colors[role]
}
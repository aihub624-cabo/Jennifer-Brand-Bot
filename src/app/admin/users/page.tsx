'use client'

import { AdminLayout } from '@/components/layout/admin-layout'
import { UserManagementTable } from '@/components/admin/user-management-table'

export default function UsersPage() {
  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-gray-900">
            User Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts, roles, and permissions for your organization.
          </p>
        </div>

        <UserManagementTable />
      </div>
    </AdminLayout>
  )
}
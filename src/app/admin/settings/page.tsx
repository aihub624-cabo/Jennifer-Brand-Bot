'use client'

import { AdminLayout } from '@/components/layout/admin-layout'
import { OrganizationSettings } from '@/components/admin/organization-settings'

export default function SettingsPage() {
  return (
    <AdminLayout currentPage="settings">
      <OrganizationSettings />
    </AdminLayout>
  )
}
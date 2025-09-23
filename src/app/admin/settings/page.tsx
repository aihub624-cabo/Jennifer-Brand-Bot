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

export const metadata = {
  title: 'Settings - Jennifer Brand Bot Admin',
  description: 'Organization settings and configuration',
}
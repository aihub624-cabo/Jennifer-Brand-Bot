'use client'

import { AdminLayout } from '@/components/layout/admin-layout'
import { AnalyticsCharts } from '@/components/admin/analytics-charts'

export default function AnalyticsPage() {
  return (
    <AdminLayout currentPage="analytics">
      <AnalyticsCharts />
    </AdminLayout>
  )
}
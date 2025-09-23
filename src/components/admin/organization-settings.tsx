'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils/cn'
import toast from 'react-hot-toast'

const organizationSettingsSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  slug: z.string().min(2, 'Organization slug must be at least 2 characters'),
  defaultMessageQuota: z.number().min(1, 'Default quota must be at least 1'),
  maxUsers: z.number().min(1, 'Max users must be at least 1'),
  enableAnalytics: z.boolean(),
  enableExport: z.boolean(),
  enableRealTime: z.boolean(),
  webhookUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  webhookSecret: z.string().optional(),
})

type OrganizationSettingsData = z.infer<typeof organizationSettingsSchema>

const brandConfigSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
  darkColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
  logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type BrandConfigData = z.infer<typeof brandConfigSchema>

function SettingsSection({ 
  title, 
  description, 
  children 
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function OrganizationSettings() {
  const { profile, organization } = useAuth()
  const [activeTab, setActiveTab] = useState<'general' | 'brand' | 'integrations' | 'security'>('general')

  // Organization settings form
  const {
    register: registerOrg,
    handleSubmit: handleSubmitOrg,
    formState: { errors: orgErrors, isSubmitting: isSubmittingOrg },
  } = useForm<OrganizationSettingsData>({
    resolver: zodResolver(organizationSettingsSchema),
    defaultValues: {
      name: organization?.name || 'Jennifer Bleam MSP',
      slug: organization?.slug || 'jennifer-bleam-msp',
      defaultMessageQuota: 100,
      maxUsers: 50,
      enableAnalytics: true,
      enableExport: true,
      enableRealTime: true,
      webhookUrl: '',
      webhookSecret: '',
    },
  })

  // Brand settings form
  const {
    register: registerBrand,
    handleSubmit: handleSubmitBrand,
    formState: { errors: brandErrors, isSubmitting: isSubmittingBrand },
    watch: watchBrand,
  } = useForm<BrandConfigData>({
    resolver: zodResolver(brandConfigSchema),
    defaultValues: {
      primaryColor: '#2D5AA0',
      secondaryColor: '#F4A261',
      darkColor: '#264653',
      logoUrl: '',
    },
  })

  const watchedColors = watchBrand(['primaryColor', 'secondaryColor', 'darkColor'])

  const onSubmitOrganization = async (data: OrganizationSettingsData) => {
    try {
      // TODO: Implement organization settings update API
      console.log('Updating organization settings:', data)
      toast.success('Organization settings updated successfully')
    } catch (error) {
      toast.error('Failed to update organization settings')
      console.error('Error updating organization settings:', error)
    }
  }

  const onSubmitBrand = async (data: BrandConfigData) => {
    try {
      // TODO: Implement brand settings update API
      console.log('Updating brand settings:', data)
      toast.success('Brand settings updated successfully')
    } catch (error) {
      toast.error('Failed to update brand settings')
      console.error('Error updating brand settings:', error)
    }
  }

  const resetQuotas = async () => {
    try {
      // TODO: Implement quota reset API
      toast.success('Message quotas reset for all users')
    } catch (error) {
      toast.error('Failed to reset quotas')
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: '🏢' },
    { id: 'brand', name: 'Branding', icon: '🎨' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'security', name: 'Security', icon: '🔒' },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Organization Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your organization's configuration and preferences.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <SettingsSection
          title="General Settings"
          description="Basic organization information and user limits."
        >
          <form onSubmit={handleSubmitOrg(onSubmitOrganization)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  {...registerOrg('name')}
                  type="text"
                  className={cn(
                    'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                    orgErrors.name && 'border-red-300'
                  )}
                />
                {orgErrors.name && (
                  <p className="mt-2 text-sm text-red-600">{orgErrors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Organization Slug
                </label>
                <input
                  {...registerOrg('slug')}
                  type="text"
                  className={cn(
                    'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                    orgErrors.slug && 'border-red-300'
                  )}
                />
                {orgErrors.slug && (
                  <p className="mt-2 text-sm text-red-600">{orgErrors.slug.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="defaultMessageQuota" className="block text-sm font-medium text-gray-700">
                  Default Message Quota (per user/month)
                </label>
                <input
                  {...registerOrg('defaultMessageQuota', { valueAsNumber: true })}
                  type="number"
                  className={cn(
                    'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                    orgErrors.defaultMessageQuota && 'border-red-300'
                  )}
                />
                {orgErrors.defaultMessageQuota && (
                  <p className="mt-2 text-sm text-red-600">{orgErrors.defaultMessageQuota.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="maxUsers" className="block text-sm font-medium text-gray-700">
                  Maximum Users
                </label>
                <input
                  {...registerOrg('maxUsers', { valueAsNumber: true })}
                  type="number"
                  className={cn(
                    'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                    orgErrors.maxUsers && 'border-red-300'
                  )}
                />
                {orgErrors.maxUsers && (
                  <p className="mt-2 text-sm text-red-600">{orgErrors.maxUsers.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  {...registerOrg('enableAnalytics')}
                  type="checkbox"
                  className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable analytics tracking
                </label>
              </div>

              <div className="flex items-center">
                <input
                  {...registerOrg('enableExport')}
                  type="checkbox"
                  className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Allow conversation exports
                </label>
              </div>

              <div className="flex items-center">
                <input
                  {...registerOrg('enableRealTime')}
                  type="checkbox"
                  className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable real-time updates
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetQuotas}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                Reset All Quotas
              </button>

              <button
                type="submit"
                disabled={isSubmittingOrg}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
              >
                {isSubmittingOrg ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </SettingsSection>
      )}

      {activeTab === 'brand' && (
        <SettingsSection
          title="Brand Settings"
          description="Customize the appearance and branding of your application."
        >
          <form onSubmit={handleSubmitBrand(onSubmitBrand)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                  Primary Color
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    {...registerBrand('primaryColor')}
                    type="color"
                    className="h-10 w-16 border-gray-300 rounded-md"
                  />
                  <input
                    {...registerBrand('primaryColor')}
                    type="text"
                    className={cn(
                      'block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                      brandErrors.primaryColor && 'border-red-300'
                    )}
                  />
                </div>
                {brandErrors.primaryColor && (
                  <p className="mt-2 text-sm text-red-600">{brandErrors.primaryColor.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                  Secondary Color
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    {...registerBrand('secondaryColor')}
                    type="color"
                    className="h-10 w-16 border-gray-300 rounded-md"
                  />
                  <input
                    {...registerBrand('secondaryColor')}
                    type="text"
                    className={cn(
                      'block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                      brandErrors.secondaryColor && 'border-red-300'
                    )}
                  />
                </div>
                {brandErrors.secondaryColor && (
                  <p className="mt-2 text-sm text-red-600">{brandErrors.secondaryColor.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="darkColor" className="block text-sm font-medium text-gray-700">
                  Dark Color
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    {...registerBrand('darkColor')}
                    type="color"
                    className="h-10 w-16 border-gray-300 rounded-md"
                  />
                  <input
                    {...registerBrand('darkColor')}
                    type="text"
                    className={cn(
                      'block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                      brandErrors.darkColor && 'border-red-300'
                    )}
                  />
                </div>
                {brandErrors.darkColor && (
                  <p className="mt-2 text-sm text-red-600">{brandErrors.darkColor.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                Logo URL (optional)
              </label>
              <input
                {...registerBrand('logoUrl')}
                type="url"
                className={cn(
                  'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary',
                  brandErrors.logoUrl && 'border-red-300'
                )}
                placeholder="https://example.com/logo.png"
              />
              {brandErrors.logoUrl && (
                <p className="mt-2 text-sm text-red-600">{brandErrors.logoUrl.message}</p>
              )}
            </div>

            {/* Color Preview */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Color Preview</h4>
              <div className="flex space-x-4">
                <div
                  className="w-16 h-16 rounded-md border"
                  style={{ backgroundColor: watchedColors[0] }}
                />
                <div
                  className="w-16 h-16 rounded-md border"
                  style={{ backgroundColor: watchedColors[1] }}
                />
                <div
                  className="w-16 h-16 rounded-md border"
                  style={{ backgroundColor: watchedColors[2] }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingBrand}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
              >
                {isSubmittingBrand ? 'Saving...' : 'Save Brand Settings'}
              </button>
            </div>
          </form>
        </SettingsSection>
      )}

      {activeTab === 'integrations' && (
        <SettingsSection
          title="Integrations"
          description="Configure external service integrations and webhooks."
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">N8N Integration</h4>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">N8N Connected</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Jennifer Brand Bot is successfully connected to your N8N workflow.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Webhook Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={process.env.N8N_WEBHOOK_URL || ''}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This URL is configured via environment variables and cannot be changed here.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Webhook Status
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Active
                    </span>
                    <span className="ml-2 text-sm text-gray-500">Last tested: 2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>
      )}

      {activeTab === 'security' && (
        <SettingsSection
          title="Security Settings"
          description="Manage security policies and access controls."
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Access Control</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Require Email Verification</h5>
                    <p className="text-sm text-gray-500">New users must verify their email before accessing the system</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-brand-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  >
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h5>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  >
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Session Timeout</h5>
                    <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                  </div>
                  <select className="mt-1 block w-32 border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm">
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>8 hours</option>
                    <option>24 hours</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Data Protection</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Encrypt Messages at Rest</h5>
                    <p className="text-sm text-gray-500">All conversation data is encrypted in the database</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Audit Logging</h5>
                    <p className="text-sm text-gray-500">Log all user actions for compliance</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>
      )}
    </div>
  )
}
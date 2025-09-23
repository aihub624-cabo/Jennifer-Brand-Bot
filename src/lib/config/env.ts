/**
 * Environment configuration for Jennifer Brand Bot
 * Validates and exports environment variables with proper types
 */

// Supabase configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
} as const

// N8N configuration
export const n8nConfig = {
  webhookUrl: process.env.N8N_WEBHOOK_URL!,
  webhookSecret: process.env.N8N_WEBHOOK_SECRET!,
} as const

// Application configuration
export const appConfig = {
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  secret: process.env.NEXTAUTH_SECRET!,
} as const

// Brand configuration
export const brandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Jennifer Bleam MSP',
  colors: {
    primary: process.env.NEXT_PUBLIC_BRAND_PRIMARY_COLOR || '#2D5AA0',
    secondary: process.env.NEXT_PUBLIC_BRAND_SECONDARY_COLOR || '#F4A261',
    dark: process.env.NEXT_PUBLIC_BRAND_DARK_COLOR || '#264653',
  },
} as const

// Rate limiting configuration
export const rateLimitConfig = {
  requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '30'),
  requestsPerHour: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_HOUR || '500'),
} as const

// Feature flags
export const featureFlags = {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableRealTime: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME === 'true',
  enableExport: process.env.NEXT_PUBLIC_ENABLE_EXPORT === 'true',
} as const

// OpenAI configuration (optional)
export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
} as const

// Validation function to check required environment variables
export function validateEnvironment() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'N8N_WEBHOOK_URL',
    'NEXTAUTH_SECRET',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    )
  }
}

// Organization configuration
export const organizationConfig = {
  defaultSlug: 'jennifer-bleam-msp',
  adminEmail: 'jennifer@jenniferbleam.com',
} as const
import { AuthLayout } from '@/components/auth/auth-layout'

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams

  return <AuthLayout initialMode="login" redirectTo={redirectTo} />
}

export const metadata = {
  title: 'Sign In - Jennifer Brand Bot',
  description: 'Sign in to your Jennifer Brand Bot account',
}
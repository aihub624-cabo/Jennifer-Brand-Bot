import { AuthLayout } from '@/components/auth/auth-layout'

interface RegisterPageProps {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { redirectTo } = await searchParams

  return <AuthLayout initialMode="register" redirectTo={redirectTo} />
}

export const metadata = {
  title: 'Create Account - Jennifer Brand Bot',
  description: 'Create your Jennifer Brand Bot account',
}
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = ['/chat', '/admin', '/profile']

// Define admin routes that require admin role
const adminRoutes = ['/admin']

// Define public routes that don't require authentication
const publicRoutes = ['/auth', '/auth/login', '/auth/register', '/auth/verify-email']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  try {
    const { supabase, response } = await createMiddlewareSupabaseClient(request)
    
    // Get the session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the route is protected and user is not authenticated
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to chat if accessing auth routes while authenticated
    if (isPublicRoute && session) {
      return NextResponse.redirect(new URL('/chat', request.url))
    }

    // Check admin permissions for admin routes
    if (isAdminRoute && session) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!profile || (profile.role !== 'admin' && profile.role !== 'team_lead')) {
          return NextResponse.redirect(new URL('/chat', request.url))
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    }

    // Redirect root to appropriate page
    if (pathname === '/') {
      if (session) {
        return NextResponse.redirect(new URL('/chat', request.url))
      } else {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    
    // If there's an error and it's a protected route, redirect to login
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TEMPORARILY DISABLED FOR TESTING - ALLOWS ALL ACCESS
export async function middleware(request: NextRequest) {
  // Allow all requests through for testing
  return NextResponse.next()
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
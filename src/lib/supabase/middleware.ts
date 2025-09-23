import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function createMiddlewareSupabaseClient(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient<Database>({ req: request, res: response })

  await supabase.auth.getSession()

  return { supabase, response }
}
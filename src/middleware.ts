import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First, run next-intl middleware to handle locales and get the base response
  const response = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()
  const mockRole = request.cookies.get('mock_role')?.value

  // Protect dashboard and account routes
  const isProtectedRoute = /^\/([a-z]{2}\/)?(dashboard|account)/.test(request.nextUrl.pathname)
  if (isProtectedRoute && !user && !mockRole) {
    const url = request.nextUrl.clone()
    url.pathname = '/th/login'
    return NextResponse.redirect(url)
  }

  // If user is already logged in, prevent accessing login or register
  const isAuthPage = request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/register')
  if (isAuthPage && (user || mockRole)) {
    const url = request.nextUrl.clone()
    url.pathname = '/th/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

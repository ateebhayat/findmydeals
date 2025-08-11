import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server'
import { getCookie } from './lib/cookie-utils';

// JWT Secret for verification
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  id: string
  email: string
  role: string
  type: 'user' | 'brand'
  iat?: number
  exp?: number
}

// Define route patterns
const CUSTOMER_ROUTES = [
  '/customer',
  '/customer/dashboard'
]

const BRAND_ROUTES = [
  '/dashboard',
  '/dashboard/analytics',
  '/dashboard/offers',
  '/dashboard/settings'
]

const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/customer/login',
  '/auth/customer/register',
  '/auth/forgot-password'
]

// Routes that require authentication but are accessible to both user types
const PROTECTED_ROUTES = [
  ...CUSTOMER_ROUTES,
  ...BRAND_ROUTES
]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/offers',
  '/brands',
  '/categories',
  '/deals',
  '/contact',
  '/help',
  '/pricing',
  '/offers/[id]',
  '/brands/[id]'
]

// Helper function to verify JWT token
async function verifyToken(token: string): Promise<any | null> {
  try {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Helper function to check if path matches pattern
function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    // Handle exact matches
    if (pattern === pathname) return true
    
    // Handle dynamic routes like /offers/[id]
    if (pattern.includes('[id]')) {
      const patternRegex = pattern.replace(/\[id\]/g, '[^/]+')
      const regex = new RegExp(`^${patternRegex}$`)
      return regex.test(pathname)
    }
    
    // Handle prefix matches (e.g., /customer matches /customer/dashboard)
    return pathname.startsWith(pattern + '/') || pathname === pattern
  })
}

// Helper function to get user from cookies/headers
async function getUserFromRequest(request: NextRequest): Promise<{ user: JWTPayload | null, token: string | null }> {
  // First try to get token from cookies (for browser requests)
  let token = await getCookie('accessToken')
  
  // If no cookie, try Authorization header (for API requests)
  if (!token) {
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }
  
  if (!token) {
    return { user: null, token: null }
  }

  const user = await verifyToken(token)
  console.log({user})
  return { user, token }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { user, token } = await getUserFromRequest(request)

  // Allow API routes to handle their own authentication
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // // Check if user is authenticated and valid
  const isAuthenticated = user && token
  
  // // Handle authentication redirects for logged-in users
  if (isAuthenticated) {
    console.log('Token is authenticated')
    // If user is trying to access auth pages while logged in, redirect to appropriate dashboard
    if (matchesPattern(pathname, AUTH_ROUTES)) {
      console.log('Token is authenticated and trying to access auth routes')
      if (user.type === 'user') {
        console.log('Token is authenticated and trying to access customer routes')
        return NextResponse.redirect(new URL('/customer/dashboard', request.url))
      } else if (user.type === 'brand') {
        console.log('Token is authenticated and trying to access brand routes')
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }
    
    // Check role-based access for protected routes
    if (matchesPattern(pathname, CUSTOMER_ROUTES) && user?.type !== 'user') {
      // Brand trying to access customer routes
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (matchesPattern(pathname, BRAND_ROUTES) && user?.type !== 'brand') {
        // Customer trying to access brand routes
        return NextResponse.redirect(new URL('/customer/dashboard', request.url))
      }
  
  // // Handle unauthenticated users
  if (!isAuthenticated) {
    console.log('Token is not authenticated')
    // If trying to access protected routes without authentication
    if (matchesPattern(pathname, PROTECTED_ROUTES)) {
      console.log('Token is not authenticated and trying to access protected routes')
      // Determine which login page to redirect to based on the route
      if (matchesPattern(pathname, CUSTOMER_ROUTES)) {
        console.log('Token is not authenticated and trying to access customer routes')
        const loginUrl = new URL('/auth/customer/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      } else if (matchesPattern(pathname, BRAND_ROUTES)) {  
        console.log('Token is not authenticated and trying to access brand routes')
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
    }
  }

  // Add user info to response headers for client-side use
  const response = NextResponse.next()
  
  if (isAuthenticated && user) {
    response.headers.set('x-user-id', user.id)
    response.headers.set('x-user-type', user.type)
    response.headers.set('x-user-email', user.email)
  }

  return response
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
# Middleware Authentication and Route Protection Documentation

## Overview

The `middleware.ts` file implements comprehensive authentication and route protection for the Brand Offers application. It handles token validation, role-based redirects, and route protection for both customer and brand users.

## Features

### 1. **Token Validation**
- Validates JWT tokens from both cookies and Authorization headers
- Supports both browser requests (cookies) and API requests (headers)
- Automatically handles token verification using the JWT secret

### 2. **Role-Based Route Protection**
- **Customer Routes**: `/customer/*` - Only accessible to authenticated customers
- **Brand Routes**: `/dashboard/*` - Only accessible to authenticated brands
- **Public Routes**: Home, offers, brands, categories, etc. - Accessible to all users
- **Auth Routes**: Login/register pages - Redirects authenticated users to their dashboards

### 3. **Automatic Redirects**
- **Authenticated users accessing auth pages**: Redirected to appropriate dashboard
- **Unauthenticated users accessing protected routes**: Redirected to appropriate login page
- **Wrong user type accessing protected routes**: Redirected to correct dashboard

## Route Configuration

### Protected Routes

#### Customer Routes
```typescript
const CUSTOMER_ROUTES = [
  '/customer',
  '/customer/dashboard'
]
```

#### Brand Routes
```typescript
const BRAND_ROUTES = [
  '/dashboard',
  '/dashboard/analytics',
  '/dashboard/offers',
  '/dashboard/settings'
]
```

#### Authentication Routes
```typescript
const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/customer/login',
  '/auth/customer/register',
  '/auth/forgot-password'
]
```

#### Public Routes
```typescript
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
```

## Redirect Logic

### 1. Authenticated Users

| Current Route | User Type | Redirect To |
|---------------|-----------|-------------|
| `/auth/login` | Customer | `/customer/dashboard` |
| `/auth/login` | Brand | `/dashboard` |
| `/customer/*` | Brand | `/dashboard` |
| `/dashboard/*` | Customer | `/customer/dashboard` |

### 2. Unauthenticated Users

| Attempted Route | Redirect To |
|----------------|-------------|
| `/customer/*` | `/auth/customer/login?redirect=<original-path>` |
| `/dashboard/*` | `/auth/login?redirect=<original-path>` |

## Token Handling

### Cookie Support
- Primary method for browser-based authentication
- Sets secure, httpOnly cookies for production
- Automatic expiration handling

### Header Support
- Fallback for API requests
- Supports standard `Authorization: Bearer <token>` format
- Used by API client for programmatic access

### Token Verification
```typescript
function verifyToken(token: string): JWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
```

## Implementation Details

### Middleware Configuration
The middleware runs on all routes except:
- API routes (`/api/*`)
- Static files (`/_next/static/*`, `/_next/image/*`)
- Favicon and image files
- Next.js internal routes

### Response Headers
For authenticated requests, the middleware adds user information to response headers:
- `x-user-id`: User's unique identifier
- `x-user-type`: Either "user" or "brand"
- `x-user-email`: User's email address

## Integration with Authentication System

### Cookie Utilities (`lib/cookie-utils.ts`)
- `setAuthCookies(accessToken, refreshToken)`: Sets authentication cookies
- `clearAuthCookies()`: Removes authentication cookies
- `getAuthTokens()`: Retrieves current tokens from cookies

### Auth Context Integration
The middleware works seamlessly with the AuthContext:
- Automatically redirects based on authentication state
- Preserves redirect URLs for post-login navigation
- Maintains consistency between client and server-side auth states

### API Client Integration
- Supports both cookie and header-based authentication
- Automatic token refresh handling
- Graceful fallback when tokens expire

## Security Features

### 1. **Secure Cookie Configuration**
- HttpOnly cookies (when implemented server-side)
- Secure flag for HTTPS environments
- SameSite protection against CSRF

### 2. **Token Validation**
- Server-side JWT verification
- Protection against token tampering
- Automatic expiration handling

### 3. **Route Protection**
- Prevents unauthorized access to protected routes
- Role-based access control
- Redirect preservation for user experience

## Usage Examples

### 1. Protecting a New Customer Route
Add the route to `CUSTOMER_ROUTES`:
```typescript
const CUSTOMER_ROUTES = [
  '/customer',
  '/customer/dashboard',
  '/customer/profile', // New route
  '/customer/settings'  // New route
]
```

### 2. Adding a New Brand Route
Add the route to `BRAND_ROUTES`:
```typescript
const BRAND_ROUTES = [
  '/dashboard',
  '/dashboard/analytics',
  '/dashboard/offers',
  '/dashboard/settings',
  '/dashboard/reports'  // New route
]
```

### 3. Making a Route Public
Add the route to `PUBLIC_ROUTES`:
```typescript
const PUBLIC_ROUTES = [
  '/',
  '/offers',
  '/brands',
  '/categories',
  '/about',  // New public route
  '/terms'   // New public route
]
```

## Testing Scenarios

### 1. **Unauthenticated User**
- Accessing `/customer/dashboard` → Redirected to `/auth/customer/login?redirect=/customer/dashboard`
- Accessing `/dashboard` → Redirected to `/auth/login?redirect=/dashboard`
- Accessing `/offers` → Allowed (public route)

### 2. **Authenticated Customer**
- Accessing `/auth/login` → Redirected to `/customer/dashboard`
- Accessing `/dashboard` → Redirected to `/customer/dashboard`
- Accessing `/customer/dashboard` → Allowed

### 3. **Authenticated Brand**
- Accessing `/auth/login` → Redirected to `/dashboard`
- Accessing `/customer/dashboard` → Redirected to `/dashboard`
- Accessing `/dashboard` → Allowed

## Troubleshooting

### Common Issues

1. **Infinite Redirect Loops**
   - Ensure JWT_SECRET is properly set
   - Check token format and expiration
   - Verify route classifications are correct

2. **Middleware Not Running**
   - Check `next.config.js` for middleware configuration
   - Verify file is named `middleware.ts` in root directory
   - Check matcher configuration

3. **Token Not Found**
   - Verify cookies are being set correctly
   - Check Authorization header format
   - Ensure HTTPS for secure cookies in production

### Debug Headers
The middleware adds debug information to response headers for troubleshooting:
- `x-user-id`: Present if user is authenticated
- `x-user-type`: Shows user type (user/brand)
- `x-user-email`: Shows user email for verification

## Performance Considerations

- JWT verification is synchronous and lightweight
- Middleware runs on every request - keep logic minimal
- Route matching uses efficient prefix and regex patterns
- No database calls in middleware for optimal performance

## Future Enhancements

1. **Enhanced Security**
   - Rate limiting per user/IP
   - Suspicious activity detection
   - Enhanced token rotation

2. **Advanced Routing**
   - Dynamic route permissions
   - Role-based feature flags
   - Conditional route access

3. **Monitoring**
   - Authentication event logging
   - Performance metrics
   - Security audit trails
'use server'
import { cookies } from 'next/headers'

// Set a cookie (server-side)
export async function setCookie(name: string, value: string, days: number = 7) {
  const cookieStore = await cookies()
 
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  cookieStore.set({
    name,
    value,
    expires,
    path: '/',
    httpOnly: true, // safer for tokens
    secure: true,
    sameSite: 'lax'
  })
}

// Get a cookie (server-side)
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

// Delete a cookie (server-side)
export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}

// Set auth cookies
export async function setAuthCookies(accessToken: string, refreshToken: string) {
  await setCookie('accessToken', accessToken, 1) // 1 day for access token
  await setCookie('refreshToken', refreshToken, 7) // 7 days for refresh token
}

// Clear auth cookies
export async function clearAuthCookies() {
  await deleteCookie('accessToken')
  await deleteCookie('refreshToken')
}

// Get auth tokens
export async function getAuthTokens() {
  return {
    accessToken: await getCookie('accessToken'),
    refreshToken: await getCookie('refreshToken')
  }
}

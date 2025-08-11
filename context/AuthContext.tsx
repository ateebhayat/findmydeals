import { useState, useEffect, createContext, useContext } from "react"
import { apiClient, ApiResponse } from "@/lib/api-client"
import { useCustomerLogin, useCustomerRegister } from "../hooks/useApi"
import { useRouter, useSearchParams } from "next/navigation"
import { setAuthCookies, clearAuthCookies, getAuthTokens } from "@/lib/cookie-utils"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  avatar?: string
  phone?: string
  membershipLevel: string
  nextLevelProgress?: number
  joinDate: string
  totalSavings: number
  claimedOffers: number
  favoriteOffers: number
  rewardPoints: number
  notifications: number
  preferences?: any
}

interface Brand {
  id: string
  name: string
  email: string
  website?: string
  category?: string
  description?: string
  location?: any
  phone?: string
  logo?: string
  coverImage?: string
  verified: boolean
  rating: number
  totalReviews: number
  activeOffers: number
  totalOffers: number
  followers: number
  joinedDate: string
  status: string
}

interface AuthContextType {
  user: User | null
  brand: Brand | null
  isLoading: boolean
  isAuthenticated: boolean
  userType: "user" | "brand" | null
  login: (email: string, password: string, type: "user" | "brand") => Promise<ApiResponse>
  register: (data: any, type: "user" | "brand") => Promise<ApiResponse>
  logout: () => void
  refreshUser: () => Promise<void>,
  registrationPending: boolean,
  loginError: any,
  loginPending: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState<"user" | "brand" | null>(null)
  const registerMutation = useCustomerRegister();
  const router = useRouter();
  const loginMutation = useCustomerLogin();
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect")

  useEffect(() => {
    // Check for existing tokens on mount
    const checkAuth = async () => {
      try {
        const { accessToken } = getAuthTokens()
        if (accessToken) {
          // Try to get user dashboard to verify token
          const response = await apiClient.getCustomerDashboard()
          if (response.success && response.data?.user) {
            setUser(response.data.user)
            setUserType("user")
          } else {
            // Try brand dashboard
            const brandResponse = await apiClient.getBrands({ limit: 1 })
            if (brandResponse.success) {
              // This is a simplified check - in a real app you'd have a brand dashboard endpoint
              setUserType("brand")
            } else {
              // Token is invalid, clear it
              clearAuthCookies()
              localStorage.removeItem("accessToken")
              localStorage.removeItem("refreshToken")
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        clearAuthCookies()
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, type: "user" | "brand"): Promise<ApiResponse> => {
    try {
      let response: ApiResponse

      if (type === "user") {
        response = await loginMutation.mutateAsync(
          { email, password },
          {
            onSuccess: (response:any) => {
              if (response.success) {
                // Redirect
                  setAuthCookies(response.token, response.refreshToken)
                  localStorage.setItem("accessToken", response.token)
                  localStorage.setItem("refreshToken", response.refreshToken)
                if (redirectUrl) {
                  router.push(redirectUrl);
                } else {
                  router.push("/customer/dashboard");
                }
              }
            },
            onError: (error: any) => {
              console.error("Login error:", error);
              
            },
          }
        );
      
      } else {
        response = await apiClient.brandLogin({ email, password })
        if (response.success && response.data?.brand) {
          setBrand(response.data.brand)
          setUserType("brand")
          // Set both cookies and localStorage for backward compatibility
          setAuthCookies(response.data.token, response.data.refreshToken)
          localStorage.setItem("accessToken", response.data.token)
          localStorage.setItem("refreshToken", response.data.refreshToken)
        }
      }

      return response
    } catch (error) {
      console.error("Login failed:", error)
      return {
        success: false,
        error: {
          code: "LOGIN_FAILED",
          message: "Login failed. Please try again.",
        },
      }
    }
  }

  const register = async (data: any, type: "user" | "brand"): Promise<ApiResponse> => {
    try {
      if (type === "user") {
          return await registerMutation.mutateAsync(
            data,
            {
              onSuccess: (response: any) => {
                if (response.success) {
                  setUser(response.user)
                  setUserType("user")
                  // Set both cookies and localStorage for backward compatibility
                  setAuthCookies(response.token, response.refreshToken)
                  localStorage.setItem("accessToken", response.token)
                  localStorage.setItem("refreshToken", response.refreshToken)
                  router.push("/customer/dashboard");
                } 
              },
              onError: (error: any) => {
                console.error("Registration error:", error);
              },
            }
          );
      } else {
        // Brand registration not implemented yet
        return {
          success: false,
          error: {
            code: "NOT_IMPLEMENTED",
            message: "Brand registration not implemented yet",
          },
        }
      }
    } catch (error) {
      console.error("Registration failed:", error)
      return {
        success: false,
        error: {
          code: "REGISTRATION_FAILED",
          message: "Registration failed. Please try again.",
        },
      }
    }
  }

  const logout = () => {
    setUser(null)
    setBrand(null)
    setUserType(null)
    // Clear both cookies and localStorage
    clearAuthCookies()
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  const refreshUser = async () => {
    if (userType === "user") {
      try {
        const response = await apiClient.getCustomerDashboard()
        if (response.success && response.data?.user) {
          setUser(response.data.user)
        }
      } catch (error) {
        console.error("Failed to refresh user data:", error)
      }
    }
  }

  const value: AuthContextType = {
    user,
    brand,
    isLoading,
    isAuthenticated: !!(user || brand),
    userType,
    login,
    register,
    logout,
    refreshUser,
    registrationPending: registerMutation.isPending,
    loginError: loginMutation.error,
    loginPending: loginMutation.isPending,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
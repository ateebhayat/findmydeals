import axios, { AxiosInstance, AxiosResponse } from "axios"
import { getAuthTokens, setAuthCookies, clearAuthCookies } from "./cookie-utils"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any[]
  }
  message?: string
}
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        if (typeof window !== "undefined") {
          // Try cookies first, fallback to localStorage
          const { accessToken } = await getAuthTokens()
          const token = accessToken || localStorage.getItem("accessToken")
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
       (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            // Try cookies first, fallback to localStorage
            const { refreshToken } = await getAuthTokens()
            const token = refreshToken || localStorage.getItem("refreshToken")
            
            if (token) {
              const response = await axios.post("/api/auth/refresh-token", {
                refreshToken: token,
              })

              const { token: newAccessToken } = response.data
              // Update both cookies and localStorage
              setAuthCookies(newAccessToken, token)
              localStorage.setItem("accessToken", newAccessToken)

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return this.client(originalRequest)
            }
          } catch (refreshError) {
            console.log('Refresh token failed', refreshError)
            // Refresh token failed, clear all auth data
            if (typeof window !== "undefined") {
              // clearAuthCookies()
              // localStorage.removeItem("accessToken")
              // localStorage.removeItem("refreshToken")
              // // Let middleware handle the redirect
              // window.location.reload()
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // Authentication
  async customerRegister(data: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
    preferences?: any
  }): Promise<ApiResponse> {
    const response = await this.client.post("/api/auth/customer/register", data)
    return response.data
  }

  async customerLogin(data: {
    email: string
    password: string
    rememberMe?: boolean
  }): Promise<ApiResponse> {
    const response = await this.client.post("/api/auth/customer/login", data)
    return response.data
  }

  async brandRegister(data: {
    brandName: string
    email: string
    password: string
    website?: string
    category?: string
    description?: string
    location?: string
    phone?: string
    businessRegistration?: string
  }): Promise<ApiResponse> {
    const response = await this.client.post("/api/auth/brand/register", data)
    return response.data
  }

  async brandLogin(data: {
    email: string
    password: string
    rememberMe?: boolean
  }): Promise<ApiResponse> {
    const response = await this.client.post("/api/auth/brand/login", data)
    return response.data
  }

  // Offers
  async getOffers(params?: {
    category?: string
    sort?: string
    limit?: number
    page?: number
    search?: string
    discount_min?: number
    discount_max?: number
    location?: string
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/offers", { params })
    return response.data
  }

  async getOffer(id: string): Promise<ApiResponse> {
    const response = await this.client.get(`/api/offers/${id}`)
    return response.data
  }

  async claimOffer(id: string, data: { userId: string }): Promise<ApiResponse> {
    const response = await this.client.post(`/api/offers/${id}/claim`, data)
    return response.data
  }

  async viewOffer(id: string, data: { userId: string }): Promise<ApiResponse> {
    const response = await this.client.post(`/api/offers/${id}/view`, data)
    return response.data
  }

  // Hot Deals
  async getHotDeals(params?: {
    limit?: number
    category?: string
    urgency?: string
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/deals/hot", { params })
    return response.data
  }

  // Categories
  async getCategories(): Promise<ApiResponse> {
    const response = await this.client.get("/api/categories")
    return response.data
  }

  async getCategory(slug: string): Promise<ApiResponse> {
    const response = await this.client.get(`/api/categories/${slug}`)
    return response.data
  }

  async getCategoryOffers(slug: string, params?: {
    subcategory?: string
    sort?: string
    limit?: number
    page?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get(`/api/categories/${slug}/offers`, { params })
    return response.data
  }

  // Customer Dashboard
  async getCustomerDashboard(): Promise<ApiResponse> {
    const response = await this.client.get("/api/customer/dashboard")
    return response.data
  }

  async getClaimedOffers(params?: {
    status?: string
    limit?: number
    page?: number
    sort?: string
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/customer/claimed-offers", { params })
    return response.data
  }

  async getFavorites(params?: {
    limit?: number
    page?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/customer/favorites", { params })
    return response.data
  }

  async getActivity(params?: {
    type?: string
    limit?: number
    page?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/customer/activity", { params })
    return response.data
  }

  // Brands
  async getBrands(params?: {
    category?: string
    verified?: boolean
    limit?: number
    page?: number
    sort?: string
    search?: string
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/brands", { params })
    return response.data
  }

  async getBrand(id: string): Promise<ApiResponse> {
    const response = await this.client.get(`/api/brands/${id}`)
    return response.data
  }

  async followBrand(id: string, data: { userId: string; action: string }): Promise<ApiResponse> {
    const response = await this.client.post(`/api/brands/${id}/follow`, data)
    return response.data
  }

  // Favorites
  async addToFavorites(data: { offerId: string; action: string }): Promise<ApiResponse> {
    const response = await this.client.post("/api/customer/favorites", data)
    return response.data
  }

  async removeFromFavorites(favoriteId: string): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/customer/favorites/${favoriteId}`)
    return response.data
  }

  async checkFavorite(offerId: string): Promise<ApiResponse> {
    const response = await this.client.get(`/api/customer/favorites/check/${offerId}`)
    return response.data
  }

  // Notifications
  async getNotifications(params?: {
    unread?: boolean
    type?: string
    limit?: number
    page?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/customer/notifications", { params })
    return response.data
  }

  async markNotificationRead(id: string): Promise<ApiResponse> {
    const response = await this.client.put(`/api/customer/notifications/${id}/read`)
    return response.data
  }

  async markAllNotificationsRead(): Promise<ApiResponse> {
    const response = await this.client.post("/api/customer/notifications/mark-all-read")
    return response.data
  }

  // Reviews
  async submitReview(offerId: string, data: {
    userId: string
    rating: number
    comment: string
    claimId?: string
  }): Promise<ApiResponse> {
    const response = await this.client.post(`/api/offers/${offerId}/reviews`, data)
    return response.data
  }

  async getOfferReviews(offerId: string, params?: {
    sort?: string
    rating?: number
    limit?: number
    page?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get(`/api/offers/${offerId}/reviews`, { params })
    return response.data
  }

  // Search
  async search(query: string, params?: {
    filters?: any
    sort?: string
    limit?: number
  }): Promise<ApiResponse> {
    const response = await this.client.get("/api/search", {
      params: { q: query, ...params }
    })
    return response.data
  }

  async getSearchSuggestions(query: string): Promise<ApiResponse> {
    const response = await this.client.get("/api/search/suggestions", {
      params: { q: query }
    })
    return response.data
  }

  async getTrendingSearches(): Promise<ApiResponse> {
    const response = await this.client.get("/api/search/trending")
    return response.data
  }
}

// Create singleton instance
export const apiClient = new ApiClient() 
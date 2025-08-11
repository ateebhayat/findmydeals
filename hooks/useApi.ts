import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// Query Keys
export const queryKeys = {
  offers: (params?: any) => ['offers', params],
  offer: (id: string) => ['offer', id],
  hotDeals: (params?: any) => ['hotDeals', params],
  categories: () => ['categories'],
  category: (slug: string) => ['category', slug],
  categoryOffers: (slug: string, params?: any) => ['categoryOffers', slug, params],
  brands: (params?: any) => ['brands', params],
  brand: (id: string) => ['brand', id],
  customerDashboard: () => ['customerDashboard'],
  claimedOffers: (params?: any) => ['claimedOffers', params],
  favorites: (params?: any) => ['favorites', params],
  activity: (params?: any) => ['activity', params],
  notifications: (params?: any) => ['notifications', params],
  offerReviews: (offerId: string, params?: any) => ['offerReviews', offerId, params],
  search: (query: string, params?: any) => ['search', query, params],
  searchSuggestions: (query: string) => ['searchSuggestions', query],
  trendingSearches: () => ['trendingSearches'],
}

// Offers
export const useOffers = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.offers(params),
    queryFn: () => apiClient.getOffers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useOffer = (id: string) => {
  return useQuery({
    queryKey: queryKeys.offer(id),
    queryFn: () => apiClient.getOffer(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useClaimOffer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { userId: string } }) =>
      apiClient.claimOffer(id, data),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['customerDashboard'] })
      queryClient.invalidateQueries({ queryKey: ['claimedOffers'] })
    },
  })
}

export const useViewOffer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { userId: string } }) =>
      apiClient.viewOffer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })
}

// Hot Deals
export const useHotDeals = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.hotDeals(params),
    queryFn: () => apiClient.getHotDeals(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for hot deals
    gcTime: 5 * 60 * 1000,
  })
}

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: () => apiClient.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.category(slug),
    queryFn: () => apiClient.getCategory(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  })
}

export const useCategoryOffers = (slug: string, params?: any) => {
  return useQuery({
    queryKey: queryKeys.categoryOffers(slug, params),
    queryFn: () => apiClient.getCategoryOffers(slug, params),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

// Brands
export const useBrands = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.brands(params),
    queryFn: () => apiClient.getBrands(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000,
  })
}

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: queryKeys.brand(id),
    queryFn: () => apiClient.getBrand(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useFollowBrand = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { userId: string; action: string } }) =>
      apiClient.followBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
      queryClient.invalidateQueries({ queryKey: ['brand'] })
    },
  })
}

// Customer Dashboard
export const useCustomerDashboard = () => {
  return useQuery({
    queryKey: queryKeys.customerDashboard(),
    queryFn: () => apiClient.getCustomerDashboard(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
  })
}

export const useClaimedOffers = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.claimedOffers(params),
    queryFn: () => apiClient.getClaimedOffers(params),
    staleTime: 2 * 60 * 1000,
  })
}

export const useFavorites = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.favorites(params),
    queryFn: () => apiClient.getFavorites(params),
    staleTime: 2 * 60 * 1000,
  })
}

export const useActivity = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.activity(params),
    queryFn: () => apiClient.getActivity(params),
    staleTime: 2 * 60 * 1000,
  })
}

// Favorites Mutations
export const useAddToFavorites = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { offerId: string; action: string }) =>
      apiClient.addToFavorites(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })
}

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (favoriteId: string) => apiClient.removeFromFavorites(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })
}

export const useCheckFavorite = (offerId: string) => {
  return useQuery({
    queryKey: ['favoriteCheck', offerId],
    queryFn: () => apiClient.checkFavorite(offerId),
    enabled: !!offerId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Notifications
export const useNotifications = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.notifications(params),
    queryFn: () => apiClient.getNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiClient.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['customerDashboard'] })
    },
  })
}

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => apiClient.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['customerDashboard'] })
    },
  })
}

// Reviews
export const useOfferReviews = (offerId: string, params?: any) => {
  return useQuery({
    queryKey: queryKeys.offerReviews(offerId, params),
    queryFn: () => apiClient.getOfferReviews(offerId, params),
    enabled: !!offerId,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSubmitReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ offerId, data }: { offerId: string; data: any }) =>
      apiClient.submitReview(offerId, data),
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offerReviews', offerId] })
      queryClient.invalidateQueries({ queryKey: ['offer', offerId] })
    },
  })
}

// Search
export const useSearch = (query: string, params?: any) => {
  return useQuery({
    queryKey: queryKeys.search(query, params),
    queryFn: () => apiClient.search(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: queryKeys.searchSuggestions(query),
    queryFn: () => apiClient.getSearchSuggestions(query),
    enabled: !!query && query.length > 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTrendingSearches = () => {
  return useQuery({
    queryKey: queryKeys.trendingSearches(),
    queryFn: () => apiClient.getTrendingSearches(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Authentication Mutations
export const useCustomerRegister = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) => apiClient.customerRegister(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerDashboard'] })
    },
  })
}

export const useCustomerLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) => apiClient.customerLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerDashboard'] })
      queryClient.invalidateQueries({ queryKey: ['claimedOffers'] })
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export const useBrandRegister = () => {
  return useMutation({
    mutationFn: (data: any) => apiClient.brandRegister(data),
  })
}

export const useBrandLogin = () => {
  return useMutation({
    mutationFn: (data: any) => apiClient.brandLogin(data),
  })
} 
import { NextRequest, NextResponse } from "next/server"
import { HotDealService, OfferService, BrandService, CategoryService } from "@/lib/db/service"
import { optionalAuth, AuthenticatedRequest } from "@/lib/middleware"

export const GET = optionalAuth(async (request: AuthenticatedRequest) => {
  try {
   

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const urgency = searchParams.get("urgency")

    // Get hot deals
    const hotDeals = await HotDealService.findMany({
      limit,
      category,
      urgency,
    })

    // Format deals response
    const formattedDeals = await Promise.all(hotDeals.map(async (hotDeal) => {
      const offer = await OfferService.findById(hotDeal.offerId)
      if (!offer) return null

      const brand = await BrandService.findById(offer.brandId)
      const category = offer.categoryId ? await CategoryService.findById(offer.categoryId) : null

      const now = new Date()
      const expiry = new Date(offer.endDate)
      const timeLeftSeconds = Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / 1000))
      
      const days = Math.floor(timeLeftSeconds / (24 * 60 * 60))
      const hours = Math.floor((timeLeftSeconds % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((timeLeftSeconds % (60 * 60)) / 60)
      
      let timeLeft = ""
      if (days > 0) timeLeft = `${days}d ${hours}h`
      else if (hours > 0) timeLeft = `${hours}h ${minutes}m`
      else timeLeft = `${minutes}m`

      return {
        id: hotDeal.id,
        title: offer.title,
        description: offer.description,
        discountValue: offer.discountValue,
        discountType: offer.discountType,
        originalPrice: offer.originalPrice,
        finalPrice: offer.finalPrice,
        startDate: offer.startDate,
        endDate: offer.endDate,
        brand: brand ? {
          id: brand.id,
          name: brand.name,
          logo: brand.logo,
          verified: brand.verified,
          rating: brand.rating,
          location: brand.location?.city,
        } : null,
        category: category?.name,
        views: offer.views,
        currentClaims: offer.currentClaims,
        maxClaims: offer.maxClaims,
        isHot: offer.isHot,
        timeLeft,
        timeLeftSeconds,
        priority: hotDeal.priority,
        isActive: hotDeal.isActive,
      }
    }))

    const validDeals = formattedDeals.filter(deal => deal !== null)

    // Get urgency levels
    const urgencyLevels = [
      { level: "flash", description: "Ending in hours", count: 0 },
      { level: "today", description: "Ending today", count: 0 },
      { level: "weekend", description: "Weekend only", count: 0 },
    ]

    // Get metadata
    const allHotDeals = await HotDealService.findMany()

    return NextResponse.json({
      success: true,
      data: {
        deals: validDeals,
        metadata: {
          totalDeals: allHotDeals.length,
          averageDiscount: "30%",
          totalSavings: "$0",
          hotDealsCount: validDeals.length,
          flashSalesCount: 0,
          lastUpdated: new Date().toISOString(),
        },
        urgencyLevels,
      },
    })

  } catch (error) {
    console.error("Error fetching hot deals:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error"
        }
      },
      { status: 500 }
    )
  }
}) 
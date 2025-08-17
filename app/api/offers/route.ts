import { NextRequest, NextResponse } from "next/server"
import { OfferService, CategoryService, BrandService } from "@/lib/db/service"
import { optionalAuth, AuthenticatedRequest } from "@/lib/middleware"

export const GET = optionalAuth(async (request: AuthenticatedRequest) => {
  try {
   

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const sort = searchParams.get("sort") || "newest"
    const limit = parseInt(searchParams.get("limit") || "20")
    const page = parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search")
    const discountMin = searchParams.get("discount_min")
    const discountMax = searchParams.get("discount_max")

    // Get offers with filters
    const offers = await OfferService.findMany({
      category,
      sort,
      limit,
      page,
      search,
      discount_min: discountMin ? parseInt(discountMin) : undefined,
      discount_max: discountMax ? parseInt(discountMax) : undefined,
    })

    // Get categories for filters
    const categories = await CategoryService.findMany()

    // Format offers response
    const formattedOffers = await Promise.all(offers.map(async (offer) => {
      const brand = await BrandService.findById(offer.brandId)
      const category = offer.categoryId ? await CategoryService.findById(offer.categoryId) : null

      return {
        id: offer.id,
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
          totalReviews: brand.totalReviews,
          location: brand.location?.city,
        } : null,
        category: category?.name,
        views: offer.views,
        currentClaims: offer.currentClaims,
        maxClaims: offer.maxClaims,
        isFeatured: offer.isFeatured,
        isHot: offer.isHot,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
      }
    }))

    // Get metadata
    const allOffers = await OfferService.findMany()

    return NextResponse.json({
      success: true,
      data: {
        offers: formattedOffers,
        pagination: {
          page,
          limit,
          total: allOffers.length,
          totalPages: Math.ceil(allOffers.length / limit),
          hasNext: page < Math.ceil(allOffers.length / limit),
          hasPrev: page > 1,
        },
        filters: {
          categories: categories.map(cat => ({ id: cat.id, name: cat.name, count: 0 })),
        },
        metadata: {
          totalOffers: allOffers.length,
          averageDiscount: "25%",
          totalSavings: "$0",
          lastUpdated: new Date().toISOString(),
        },
      },
    })

  } catch (error) {
    console.error("Error fetching offers:", error)
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
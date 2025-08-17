import { NextRequest, NextResponse } from "next/server"
import { CategoryService, OfferService, BrandService } from "@/lib/db/service"
import { optionalAuth, AuthenticatedRequest } from "@/lib/middleware"

export const GET = optionalAuth(async (request: AuthenticatedRequest) => {
  try {
   

    // Get all active categories
    const categories = await CategoryService.findMany()

    // Get categories with additional data
    const categoriesWithData = await Promise.all(
      categories.map(async (category) => {
        // Get offers for this category
        const categoryOffers = await OfferService.findMany({ category: category.id })
        
        // Get unique brands for this category
        const brandIds = [...new Set(categoryOffers.map(offer => offer.brandId))]
        const brands = await Promise.all(brandIds.map(id => BrandService.findById(id)))
        const validBrands = brands.filter(brand => brand !== null)

        // Get featured offers for this category
        const featuredOffers = categoryOffers.filter(offer => offer.isFeatured).slice(0, 3)

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color,
          offerCount: categoryOffers.length,
          brandCount: validBrands.length,
          topBrands: validBrands.slice(0, 3).map(brand => ({
            id: brand!.id,
            name: brand!.name,
            logo: brand!.logo,
          })),
          featuredOffers: featuredOffers.map(offer => ({
            id: offer.id,
            title: offer.title,
            discountValue: offer.discountValue,
          })),
        }
      })
    )

    // Get metadata
    const totalCategories = categories.length
    const allOffers = await OfferService.findMany()
    const allBrands = await BrandService.findMany()

    return NextResponse.json({
      success: true,
      data: {
        categories: categoriesWithData,
        metadata: {
          totalCategories,
          totalOffers: allOffers.length,
          totalBrands: allBrands.length,
        },
      },
    })

  } catch (error) {
    console.error("Error fetching categories:", error)
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
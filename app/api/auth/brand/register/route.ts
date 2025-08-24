import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth"
import { BrandService } from "@/lib/db/service"

const registerSchema = z.object({
  brandName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  website: z.string().url().optional(),
  category: z.string().optional(),
  description: z.string().max(500).optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  businessRegistration: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if brand already exists
    const existingBrand = await BrandService.findByEmail(validatedData.email)

    if (existingBrand) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONFLICT",
            message: "Brand with this email already exists"
          }
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(validatedData.password)

    // Create brand
    const brand = await BrandService.create({
      name: validatedData.brandName,
      email: validatedData.email,
      password: hashedPassword,
      website: validatedData.website,
      description: validatedData.description,
      location: validatedData.location ? {
        city: validatedData.location,
        state: "",
        country: "USA"
      } : undefined,
      phone: validatedData.phone,
      businessRegistration: validatedData.businessRegistration,
      status: "pending_verification",
      verified: false,
    })

    // Generate tokens
    const tokens = AuthService.generateTokens(brand, "brand")

    // Return brand data (without password)
    const brandResponse = {
      id: brand.id,
      name: brand.name,
      email: brand.email,
      website: brand.website,
      // category: brand.category, // Removed as it's not in the schema
      description: brand.description,
      location: brand.location,
      phone: brand.phone,
      logo: brand.logo,
      coverImage: brand.coverImage,
      verified: brand.verified,
      rating: brand.rating,
      totalReviews: brand.totalReviews,
      activeOffers: brand.activeOffers,
      totalOffers: brand.totalOffers,
      followers: brand.followers,
      joinedDate: brand.createdAt,
      status: brand.status,
    }

    return NextResponse.json({
      success: true,
      brand: brandResponse,
      token: tokens.accessToken,
      message: "Brand registered successfully! Verification pending."
    })

  } catch (error) {
    console.error("Brand registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: error.errors.map(err => ({
              field: err.path.join("."),
              message: err.message
            }))
          }
        },
        { status: 400 }
      )
    }

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
} 
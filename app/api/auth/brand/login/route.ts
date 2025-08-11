import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth"
import { BrandService } from "@/lib/db/service"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = loginSchema.parse(body)


    // Find brand by email
    const brand = await BrandService.findByEmail(email)

    if (!brand) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      )
    }

    // Check if brand is verified and active
    if (!brand.verified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BRAND_NOT_VERIFIED",
            message: "Brand account is not verified. Please contact support.",
          },
        },
        { status: 403 }
      )
    }

    if (brand.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BRAND_INACTIVE",
            message: "Brand account is inactive. Please contact support.",
          },
        },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await AuthService.comparePassword(password, brand.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      )
    }

    // Update last login
    await BrandService.update(brand.id, { lastLoginAt: new Date() })

    // Generate tokens
    const { accessToken, refreshToken } = AuthService.generateTokens(brand, "brand")

    // Set token expiry based on remember me
    const tokenExpiry = rememberMe ? "30d" : "24h"

    return NextResponse.json(
      {
        success: true,
        data: {
          brand: {
            id: brand.id,
            name: brand.name,
            email: brand.email,
            verified: brand.verified,
            status: brand.status,
            logo: brand.logo,
            website: brand.website,
            location: brand.location,
            description: brand.description,
            rating: brand.rating,
            followers: brand.followers,
            lastLoginAt: brand.lastLoginAt,
          },
          accessToken,
          refreshToken,
          tokenExpiry,
        },
        message: "Brand login successful",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60}`,
        },
      }
    )
  } catch (error) {
    console.error("Brand login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred during login",
        },
      },
      { status: 500 }
    )
  }
} 
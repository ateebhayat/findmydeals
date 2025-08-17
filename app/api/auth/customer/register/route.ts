import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth"
import { UserService } from "@/lib/db/service"

const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().optional(),
  preferences: z.object({
    categories: z.array(z.string()).optional(),
    notifications: z.boolean().optional(),
    newsletter: z.boolean().optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await UserService.findByEmail(validatedData.email)

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONFLICT",
            message: "User with this email already exists"
          }
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(validatedData.password)

    // Create user
    const user = await UserService.create({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      phone: validatedData.phone,
      role: "customer",
      membershipLevel: "Bronze",
      rewardPoints: 100, // Welcome bonus
      preferences: {
        categories: validatedData.preferences?.categories || [],
        notifications: {
          email: true,
          push: true,
          sms: false,
          offerExpiry: true,
          newDeals: true,
          brandUpdates: true,
        },
        newsletter: validatedData.preferences?.newsletter || true,
        language: "en",
        currency: "USD",
        timezone: "America/New_York",
      },
    })

    // Generate tokens
    const tokens = AuthService.generateTokens(user, "user")

    // Return user data (without password)
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      phone: user.phone,
      membershipLevel: user.membershipLevel,
      joinDate: user.createdAt,
      totalSavings: user.totalSavings,
      rewardPoints: user.rewardPoints,
      preferences: user.preferences,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: "Account created successfully! Welcome to BrandOffers!"
    })

  } catch (error) {
    console.error("Registration error:", error)
    
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
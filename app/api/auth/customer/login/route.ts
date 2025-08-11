import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AuthService } from "@/lib/auth"
import { UserService } from "@/lib/db/service"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user with password
    const user = await UserService.findByEmail(validatedData.email)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid email or password"
          }
        },
        { status: 401 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "Account is deactivated"
          }
        },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await AuthService.comparePassword(validatedData.password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid email or password"
          }
        },
        { status: 401 }
      )
    }

    // Update last login
    await UserService.update(user.id, { lastLoginAt: new Date() })

    // Generate tokens
    const tokens = AuthService.generateTokens(user, "user")

    // Return user data
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      phone: user.phone,
      membershipLevel: user.membershipLevel,
      nextLevelProgress: 0, // TODO: Calculate based on membership level
      joinDate: user.createdAt,
      totalSavings: user.totalSavings,
      claimedOffers: user.claimedOffers,
      favoriteOffers: user.favoriteOffers,
      rewardPoints: user.rewardPoints,
      notifications: 0, // TODO: Get actual notification count
      preferences: user.preferences,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: "Login successful! Welcome back!"
    })

  } catch (error) {
    console.error("Login error:", error)
    
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
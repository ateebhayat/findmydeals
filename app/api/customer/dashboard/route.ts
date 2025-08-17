import { NextRequest, NextResponse } from "next/server"
import { ClaimService, UserActivityService, NotificationService, OfferService } from "@/lib/db/service"
import { requireUserType, AuthenticatedRequest } from "@/lib/middleware"

export const GET = requireUserType("user")(async (request: AuthenticatedRequest) => {
  try {
   

    if (!request.user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "User not found" } },
        { status: 401 }
      )
    }

    const user = request.user

    // Get user stats
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)

    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)

    // This month stats
    const thisMonthClaims = await ClaimService.findByUser(user.id)
    const thisMonthFilteredClaims = thisMonthClaims.filter(claim => 
      new Date(claim.createdAt) >= thisMonth
    )
    const thisMonthSavings = thisMonthFilteredClaims.reduce((sum, claim) => sum + Number(claim.savings || 0), 0)
    const thisMonthRewardPoints = thisMonthFilteredClaims.length * 50 // 50 points per claim

    // This week stats
    const thisWeekFilteredClaims = thisMonthClaims.filter(claim => 
      new Date(claim.createdAt) >= thisWeek
    )
    const thisWeekSavings = thisWeekFilteredClaims.reduce((sum, claim) => sum + Number(claim.savings || 0), 0)
    const thisWeekRewardPoints = thisWeekFilteredClaims.length * 50

    // Recent activity
    const recentActivities = await UserActivityService.findByUser(user.id, { limit: 10 })

    const formattedActivities = await Promise.all(recentActivities.map(async (activity) => {
      let title = ""
      let icon = ""
      let color = ""
      let savings = null

      switch (activity.activityType) {
        case "claim":
          title = "Claimed offer"
          icon = "gift"
          color = "green"
          savings = activity.metadata?.savings
          break
        case "favorite":
          title = "Added offer to favorites"
          icon = "heart"
          color = "red"
          break
        case "review":
          title = "Reviewed offer"
          icon = "star"
          color = "yellow"
          break
        case "view":
          title = "Viewed offer"
          icon = "eye"
          color = "blue"
          break
        default:
          title = "Activity"
          icon = "activity"
          color = "gray"
      }

      return {
        id: activity.id,
        type: activity.activityType,
        title,
        brand: "Unknown Brand", // TODO: Get brand name from offer
        timestamp: activity.createdAt,
        icon,
        color,
        savings,
      }
    }))

    // Upcoming expirations
    const upcomingExpirations = thisMonthClaims.filter(claim => 
      claim.status === "pending" && 
      claim.expiresAt && 
      new Date(claim.expiresAt) > new Date() &&
      new Date(claim.expiresAt) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).slice(0, 5)

    const formattedExpirations = upcomingExpirations.map(claim => {
      const daysLeft = Math.ceil((new Date(claim.expiresAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      
      return {
        claimId: claim.id,
        offerTitle: "Offer", // TODO: Get offer title
        brand: "Brand", // TODO: Get brand name
        expiryDate: claim.expiresAt,
        daysLeft,
      }
    })

    // Recommendations (simple implementation)
    const recommendations = await OfferService.findMany({ limit: 5 })

    const formattedRecommendations = recommendations.map(offer => ({
      id: offer.id,
      title: offer.title,
      brand: "Brand", // TODO: Get brand name
      discount: offer.discountValue,
      reason: "Based on trending offers",
    }))

    // Unread notifications count
    const unreadNotifications = (await NotificationService.findByUser(user.id, { unread: true })).length

    // User response with computed properties
    const userResponse = {
      id: user.id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
      membershipLevel: user.membershipLevel,
      nextLevelProgress: user.nextLevelProgress,
      nextLevelRequirement: getNextLevelRequirement(user.membershipLevel, user.totalSavings),
      joinDate: user.createdAt,
      totalSavings: user.totalSavings,
      claimedOffers: user.claimedOffers,
      favoriteOffers: user.favoriteOffers,
      rewardPoints: user.rewardPoints,
      notifications: unreadNotifications,
      preferences: user.preferences,
    }

    return NextResponse.json({
      success: true,
      data: {
        user: userResponse,
        stats: {
          thisMonth: {
            savings: thisMonthSavings,
            claimedOffers: thisMonthClaims.length,
            rewardPoints: thisMonthRewardPoints,
            viewedOffers: 0, // TODO: Implement view tracking
          },
          thisWeek: {
            savings: thisWeekSavings,
            claimedOffers: thisWeekClaims.length,
            rewardPoints: thisWeekRewardPoints,
            viewedOffers: 0, // TODO: Implement view tracking
          },
          allTime: {
            totalSavings: user.totalSavings,
            totalClaims: user.claimedOffers,
            totalPoints: user.rewardPoints,
            favoriteOffers: user.favoriteOffers,
          },
        },
        recentActivity: formattedActivities,
        upcomingExpirations: formattedExpirations,
        recommendations: formattedRecommendations,
      },
    })

  } catch (error) {
    console.error("Error fetching dashboard:", error)
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

function getNextLevelRequirement(membershipLevel: string, totalSavings: number): string {
  const levels = {
    "Bronze": 1000,
    "Silver": 5000,
    "Gold": 15000,
    "Platinum": 50000,
    "Diamond": 100000,
  }

  const currentLevel = levels[membershipLevel as keyof typeof levels] || 0
  const nextLevel = Object.values(levels).find(level => level > currentLevel) || currentLevel
  const remaining = nextLevel - totalSavings

  if (remaining <= 0) return "Maximum level reached"
  return `$${remaining.toLocaleString()} more to reach next level`
} 
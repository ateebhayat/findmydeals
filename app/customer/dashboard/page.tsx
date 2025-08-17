"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Store,
  Gift,
  Heart,
  TrendingUp,
  Calendar,
  Users,
  Eye,
  Settings,
  Bell,
  CreditCard,
  Award,
  Zap,
  ChevronRight,
  Download,
  Share2,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCustomerDashboard, useClaimedOffers } from "@/hooks/useApi"
import { useAuth } from "@/context/AuthContext"

// Mock user data
const userData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "/placeholder.svg?height=80&width=80&text=SJ",
  joinDate: "2024-01-15",
  totalSavings: 2156,
  claimedOffers: 23,
  favoriteOffers: 12,
  membershipLevel: "Gold",
  nextLevelProgress: 75,
  notifications: 3,
  rewardPoints: 1250,
}

const claimedOffers = [
  {
    id: 1,
    title: "50% Off Summer Collection",
    brand: {
      name: "Fashion Forward",
      logo: "/placeholder.svg?height=40&width=40&text=FF",
      verified: true,
    },
    discount: "50%",
    savings: 125,
    claimedDate: "2024-07-20",
    status: "active",
    expiryDate: "2024-08-31",
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=300&text=Summer+Sale",
    code: "SUMMER50",
    usageCount: 1,
    maxUsage: 3,
  },
  {
    id: 2,
    title: "Free Premium Shipping",
    brand: {
      name: "TechHub Pro",
      logo: "/placeholder.svg?height=40&width=40&text=TH",
      verified: true,
    },
    discount: "Free Shipping",
    savings: 25,
    claimedDate: "2024-07-18",
    status: "used",
    expiryDate: "2024-07-28",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=300&text=Free+Shipping",
    code: "FREESHIP",
    usageCount: 1,
    maxUsage: 1,
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Coffee",
    brand: {
      name: "Artisan Brew Co.",
      logo: "/placeholder.svg?height=40&width=40&text=AB",
      verified: true,
    },
    discount: "33%",
    savings: 15,
    claimedDate: "2024-07-15",
    status: "expired",
    expiryDate: "2024-07-20",
    category: "Food & Beverage",
    image: "/placeholder.svg?height=200&width=300&text=Coffee+Deal",
    code: "COFFEE3FOR2",
    usageCount: 2,
    maxUsage: 5,
  },
]

const favoriteOffers = [
  {
    id: 4,
    title: "20% Off First Spa Visit",
    brand: {
      name: "Serenity Spa",
      logo: "/placeholder.svg?height=40&width=40&text=SS",
      verified: true,
    },
    discount: "20%",
    validUntil: "2024-12-31",
    category: "Health & Beauty",
    image: "/placeholder.svg?height=200&width=300&text=Spa+Treatment",
    trending: false,
    views: 432,
    claims: 12,
  },
  {
    id: 5,
    title: "Student Discount - 25% Off",
    brand: {
      name: "Book Haven",
      logo: "/placeholder.svg?height=40&width=40&text=BH",
      verified: false,
    },
    discount: "25%",
    validUntil: "2024-09-30",
    category: "Education",
    image: "/placeholder.svg?height=200&width=300&text=Student+Discount",
    trending: true,
    views: 789,
    claims: 67,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "claim",
    title: "Claimed 50% Off Summer Collection",
    brand: "Fashion Forward",
    timestamp: "2 hours ago",
    icon: Gift,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "favorite",
    title: "Added Spa Treatment to favorites",
    brand: "Serenity Spa",
    timestamp: "1 day ago",
    icon: Heart,
    color: "text-red-600",
  },
  {
    id: 3,
    type: "achievement",
    title: "Reached Gold membership level",
    brand: "FindMyDeals",
    timestamp: "3 days ago",
    icon: Award,
    color: "text-yellow-600",
  },
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
const {user} = useAuth()
  // React Query hooks
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useCustomerDashboard()
  const { data: claimedOffersData, isLoading: claimedOffersLoading, error: claimedOffersError } = useClaimedOffers({ limit: 10 })

  // Extract data with fallbacks
  const dashboard = dashboardData?.data || null
  const claimedOffers = claimedOffersData?.data?.offers || []
  const isLoading = dashboardLoading || claimedOffersLoading

 console.log({user})

  const getDaysLeft = (validUntil: string) => {
    const days = Math.ceil((new Date(validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "used":
        return "bg-blue-500"
      case "expired":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "used":
        return "Used"
      case "expired":
        return "Expired"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FindMyDeals
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link
                href="/offers"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Browse Offers
              </Link>
              <Link href="/customer/dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
            
              <Avatar className="w-8 h-8">
                <AvatarImage src={dashboard?.avatar || "/placeholder.svg"} alt={dashboard?.name || "User"} />
                <AvatarFallback>
                  {dashboard?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {dashboard?.name?.split(" ")[0] || "User"}! 👋</h1>
                                      <p className="text-blue-100 text-lg">
                      You've saved ${dashboard?.totalSavings?.toLocaleString() || "0"} so far this year!
                    </p>
                </div>
                <div className="hidden md:block">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{userData.membershipLevel}</div>
                    <div className="text-blue-100">Member</div>
                  </div>
                </div>
              </div>

              {/* Membership Progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100">Progress to Platinum</span>
                  <span className="text-white font-medium">{userData.nextLevelProgress}%</span>
                </div>
                <Progress value={userData.nextLevelProgress} className="h-2 bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Savings</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
                              <div className="text-3xl font-bold text-green-900">${dashboard?.totalSavings?.toLocaleString() || "0"}</div>
              <p className="text-xs text-green-600">+$234 this month</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Claimed Offers</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Gift className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{userData.claimedOffers}</div>
              <p className="text-xs text-blue-600">+3 this week</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Reward Points</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{userData.rewardPoints.toLocaleString()}</div>
              <p className="text-xs text-purple-600">+150 this month</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Favorite Offers</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">{userData.favoriteOffers}</div>
              <p className="text-xs text-orange-600">2 expiring soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="claimed"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Claimed Offers
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className={`p-2 rounded-lg bg-white shadow-sm ${activity.color}`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">
                            {activity.brand} • {activity.timestamp}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <Link href="/offers">
                        <Gift className="w-4 h-4 mr-2" />
                        Browse New Offers
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/deals">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Hot Deals
                      </Link>
                    </Button>
                    
                  </CardContent>
                </Card>

                {/* Membership Status */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>Membership Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">{userData.membershipLevel}</div>
                      <p className="text-sm text-gray-600 mb-4">
                        Member since {new Date(userData.joinDate).toLocaleDateString()}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Platinum</span>
                          <span>{userData.nextLevelProgress}%</span>
                        </div>
                        <Progress value={userData.nextLevelProgress} className="h-2" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Spend $500 more to reach Platinum</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Claimed Offers Tab */}
          <TabsContent value="claimed" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Your Claimed Offers</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedOffers.map((offer:any, index:number) => (
                <Card
                  key={offer.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={offer.image || "/placeholder.svg"}
                      alt={offer.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getStatusColor(offer.status)} text-white`}>
                        {getStatusText(offer.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {offer.discount}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{offer.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={offer.brand.logo || "/placeholder.svg"} alt={offer.brand.name} />
                        <AvatarFallback>{offer.brand.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{offer.brand.name}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Claimed:</span>
                        <div className="font-medium">{new Date(offer.claimedDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Expires:</span>
                        <div className="font-medium">{new Date(offer.expiryDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Savings:</span>
                        <div className="font-medium text-green-600">${offer.savings}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Usage:</span>
                        <div className="font-medium">
                          {offer.usageCount}/{offer.maxUsage}
                        </div>
                      </div>
                    </div>

                    {offer.status === "active" && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-700 font-medium mb-1">Promo Code:</div>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono bg-white px-2 py-1 rounded border">{offer.code}</code>
                          <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(offer.code)}>
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/offers/${offer.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Your Favorite Offers</h3>
              <Button variant="outline" asChild>
                <Link href="/offers">
                  <Heart className="w-4 h-4 mr-2" />
                  Find More Offers
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteOffers.map((offer, index) => (
                <Card
                  key={offer.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={offer.image || "/placeholder.svg"}
                      alt={offer.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        {offer.discount} OFF
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {offer.trending && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {getDaysLeft(offer.validUntil)} days left
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{offer.title}</CardTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={offer.brand.logo || "/placeholder.svg"} alt={offer.brand.name} />
                          <AvatarFallback>{offer.brand.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{offer.brand.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {offer.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{offer.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{offer.claims} claimed</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <Link href={`/offers/${offer.id}`}>
                        <Gift className="w-4 h-4 mr-2" />
                        Claim Offer
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Activity Timeline</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Activity
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {recentActivity
                    .concat([
                      {
                        id: 4,
                        type: "view",
                        title: "Viewed Electronics Sale offer",
                        brand: "TechHub Pro",
                        timestamp: "5 days ago",
                        icon: Eye,
                        color: "text-blue-600",
                      },
                      {
                        id: 5,
                        type: "share",
                        title: "Shared Coffee Deal with friends",
                        brand: "Artisan Brew Co.",
                        timestamp: "1 week ago",
                        icon: Share2,
                        color: "text-purple-600",
                      },
                      {
                        id: 6,
                        type: "join",
                        title: "Joined FindMyDeals community",
                        brand: "FindMyDeals",
                        timestamp: "2 weeks ago",
                        icon: Users,
                        color: "text-green-600",
                      },
                    ])
                    .map((activity, index) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg bg-white shadow-sm ${activity.color} flex-shrink-0`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">
                            {activity.brand} • {activity.timestamp}
                          </p>
                        </div>
                        {index < recentActivity.length + 5 && (
                          <div className="absolute left-6 mt-8 w-px h-6 bg-gray-200"></div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

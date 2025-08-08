"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Store,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  LogOut,
  Settings,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for demonstration
const mockBrand = {
  name: "Fashion Forward",
  email: "contact@fashionforward.com",
  category: "Clothing & Fashion",
}

const mockOffers = [
  {
    id: 1,
    title: "50% Off Summer Collection",
    description: "Get 50% off on all summer clothing items. Limited time offer!",
    discount: "50%",
    validUntil: "2024-08-31",
    isActive: true,
    views: 1250,
    clicks: 89,
    trending: true,
  },
  {
    id: 2,
    title: "Free Shipping Weekend",
    description: "Enjoy free shipping on all orders this weekend only.",
    discount: "Free Shipping",
    validUntil: "2024-07-28",
    isActive: true,
    views: 890,
    clicks: 45,
    trending: false,
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Accessories",
    description: "Purchase any two accessories and get the third one free.",
    discount: "33%",
    validUntil: "2024-07-15",
    isActive: false,
    views: 567,
    clicks: 23,
    trending: false,
  },
]

export default function DashboardPage() {
  const [offers, setOffers] = useState(mockOffers)

  const handleDeleteOffer = (offerId: number) => {
    setOffers(offers.filter((offer) => offer.id !== offerId))
  }

  const handleToggleOffer = (offerId: number) => {
    setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer)))
  }

  const totalViews = offers.reduce((sum, offer) => sum + offer.views, 0)
  const totalClicks = offers.reduce((sum, offer) => sum + offer.clicks, 0)
  const activeOffers = offers.filter((offer) => offer.isActive).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BrandOffers
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                Dashboard
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden md:block">Welcome, {mockBrand.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {mockBrand.name}! 👋</h1>
                  <p className="text-blue-100 text-lg">Here's what's happening with your offers today.</p>
                </div>
                <div className="hidden md:block">
                  <Sparkles className="h-16 w-16 text-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Active Offers</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Store className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{activeOffers}</div>
              <p className="text-xs text-blue-600">{offers.length - activeOffers} inactive</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Views</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total Clicks</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{totalClicks}</div>
              <p className="text-xs text-purple-600">
                {totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0}% click rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Engagement</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">2.4K</div>
              <p className="text-xs text-orange-600">This month's score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Offers List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Offers</h2>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/dashboard/offers/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Offer
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <Card
                  key={offer.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg text-gray-900">{offer.title}</CardTitle>
                          {offer.trending && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2 text-gray-600">{offer.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/offers/${offer.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleOffer(offer.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            {offer.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteOffer(offer.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={offer.isActive ? "default" : "secondary"}
                          className={offer.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {offer.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {offer.discount}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Valid until {new Date(offer.validUntil).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{offer.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{offer.clicks}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {offers.length === 0 && (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
                  <CardContent className="text-center py-16">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <Store className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">No offers yet</h3>
                    <p className="text-gray-600 mb-6">Create your first offer to start attracting customers</p>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <Link href="/dashboard/offers/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Offer
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Brand Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Brand Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand Name</p>
                  <p className="text-sm text-gray-600">{mockBrand.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  <p className="text-sm text-gray-600">{mockBrand.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{mockBrand.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/offers/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Offer
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-gray-200 hover:border-green-300 hover:bg-green-50 bg-transparent"
                  asChild
                >
                  <Link href="/">
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Page
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">Offer "Summer Sale" activated</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">89 new views today</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Profile updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

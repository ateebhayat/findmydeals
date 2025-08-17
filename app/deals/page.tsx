"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Store,
  Search,
  Clock,
  Users,
  TrendingUp,
  Filter,
  ArrowRight,
  Gift,
  Eye,
  Sparkles,
  Heart,
  Share2,
  Zap,
  FlameIcon as Fire,
  Timer,
  Target,
  Star,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useHotDeals } from "@/hooks/useApi"

const hotDeals = [
  {
    id: 1,
    title: "⚡ Flash Sale: 70% Off Designer Watches",
    description:
      "Limited time flash sale on premium designer watches. Only 50 pieces available at this incredible price!",
    discount: "70%",
    originalPrice: 500,
    salePrice: 150,
    validUntil: "2024-07-30T23:59:59",
    brand: {
      id: 1,
      name: "Luxury Time",
      logo: "/placeholder.svg?height=40&width=40&text=LT",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=300&width=400&text=Designer+Watches",
    category: "Fashion & Accessories",
    views: 25600,
    claims: 1250,
    maxClaims: 2000,
    location: "New York, NY",
    urgency: "flash",
    timeLeft: "2h 15m",
    hotness: 95,
    tags: ["Flash Sale", "Limited Stock", "Designer", "Premium"],
  },
  {
    id: 2,
    title: "🔥 Today Only: Buy 1 Get 2 Free Gourmet Meals",
    description:
      "Incredible deal on gourmet meal kits. Perfect for food lovers who want restaurant-quality meals at home.",
    discount: "67%",
    originalPrice: 90,
    salePrice: 30,
    validUntil: "2024-07-29T23:59:59",
    brand: {
      id: 2,
      name: "Gourmet Kitchen",
      logo: "/placeholder.svg?height=40&width=40&text=GK",
      verified: true,
      rating: 4.8,
    },
    image: "/placeholder.svg?height=300&width=400&text=Gourmet+Meals",
    category: "Food & Dining",
    views: 18900,
    claims: 890,
    maxClaims: 1500,
    location: "Los Angeles, CA",
    urgency: "today",
    timeLeft: "18h 45m",
    hotness: 88,
    tags: ["Today Only", "Food", "Gourmet", "Buy 1 Get 2"],
  },
  {
    id: 3,
    title: "💥 Weekend Blowout: 60% Off Tech Gadgets",
    description:
      "Massive weekend sale on the latest tech gadgets including smartphones, tablets, and smart home devices.",
    discount: "60%",
    originalPrice: 800,
    salePrice: 320,
    validUntil: "2024-07-31T23:59:59",
    brand: {
      id: 3,
      name: "TechWorld Pro",
      logo: "/placeholder.svg?height=40&width=40&text=TW",
      verified: true,
      rating: 4.7,
    },
    image: "/placeholder.svg?height=300&width=400&text=Tech+Gadgets",
    category: "Electronics & Tech",
    views: 32100,
    claims: 1560,
    maxClaims: 3000,
    location: "San Francisco, CA",
    urgency: "weekend",
    timeLeft: "2d 18h",
    hotness: 92,
    tags: ["Weekend Sale", "Tech", "Gadgets", "Smart Home"],
  },
  {
    id: 4,
    title: "🎯 Clearance: 80% Off Fitness Equipment",
    description:
      "End of season clearance on premium fitness equipment. Transform your home gym with professional-grade gear.",
    discount: "80%",
    originalPrice: 1200,
    salePrice: 240,
    validUntil: "2024-08-05T23:59:59",
    brand: {
      id: 4,
      name: "FitPro Elite",
      logo: "/placeholder.svg?height=40&width=40&text=FP",
      verified: true,
      rating: 4.6,
    },
    image: "/placeholder.svg?height=300&width=400&text=Fitness+Equipment",
    category: "Sports & Fitness",
    views: 15400,
    claims: 670,
    maxClaims: 1000,
    location: "Chicago, IL",
    urgency: "clearance",
    timeLeft: "6d 12h",
    hotness: 85,
    tags: ["Clearance", "Fitness", "Home Gym", "Professional"],
  },
  {
    id: 5,
    title: "✨ Exclusive: 50% Off Luxury Skincare Set",
    description:
      "Exclusive offer on premium skincare collection. Includes cleanser, serum, moisturizer, and anti-aging cream.",
    discount: "50%",
    originalPrice: 300,
    salePrice: 150,
    validUntil: "2024-08-10T23:59:59",
    brand: {
      id: 5,
      name: "Radiance Beauty",
      logo: "/placeholder.svg?height=40&width=40&text=RB",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Skincare",
    category: "Beauty & Wellness",
    views: 22800,
    claims: 1120,
    maxClaims: 2500,
    location: "Miami, FL",
    urgency: "exclusive",
    timeLeft: "11d 8h",
    hotness: 78,
    tags: ["Exclusive", "Luxury", "Skincare", "Anti-aging"],
  },
  {
    id: 6,
    title: "🚀 Launch Special: 45% Off Smart Home Bundle",
    description:
      "New product launch special on complete smart home automation bundle. Control your entire home with one app.",
    discount: "45%",
    originalPrice: 600,
    salePrice: 330,
    validUntil: "2024-08-15T23:59:59",
    brand: {
      id: 6,
      name: "SmartHome Hub",
      logo: "/placeholder.svg?height=40&width=40&text=SH",
      verified: true,
      rating: 4.8,
    },
    image: "/placeholder.svg?height=300&width=400&text=Smart+Home",
    category: "Home & Garden",
    views: 19600,
    claims: 780,
    maxClaims: 1800,
    location: "Austin, TX",
    urgency: "launch",
    timeLeft: "16d 4h",
    hotness: 82,
    tags: ["Launch Special", "Smart Home", "Automation", "Bundle"],
  },
]

export default function HotDealsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [likedDeals, setLikedDeals] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})
  const { user, isAuthenticated } = useAuth()

  // React Query hook
  // const { data: dealsData, isLoading: dealsLoading, error: dealsError } = useHotDeals({
  //   limit: 20,
  //   category: searchQuery || undefined,
  // })

  // Extract data with fallback
  const deals =hotDeals
  // const isLoading = dealsLoading

  // Update countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: { [key: number]: string } = {}
      deals.forEach((deal) => {
        const now = new Date().getTime()
        const endTime = new Date(deal.validUntil).getTime()
        const difference = endTime - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

          if (days > 0) {
            newTimeLeft[deal.id] = `${days}d ${hours}h`
          } else if (hours > 0) {
            newTimeLeft[deal.id] = `${hours}h ${minutes}m`
          } else {
            newTimeLeft[deal.id] = `${minutes}m`
          }
        } else {
          newTimeLeft[deal.id] = "Expired"
        }
      })
      setTimeLeft(newTimeLeft)
    }

    updateTimers()
    const interval = setInterval(updateTimers, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [deals])

  const handleLikeDeal = (dealId: number) => {
    setLikedDeals((prev) => (prev.includes(dealId) ? prev.filter((id) => id !== dealId) : [...prev, dealId]))
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "flash":
        return <Zap className="w-4 h-4" />
      case "today":
        return <Fire className="w-4 h-4" />
      case "weekend":
        return <Calendar className="w-4 h-4" />
      case "clearance":
        return <Target className="w-4 h-4" />
      case "exclusive":
        return <Sparkles className="w-4 h-4" />
      case "launch":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Gift className="w-4 h-4" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "flash":
        return "from-yellow-500 to-orange-500"
      case "today":
        return "from-red-500 to-pink-500"
      case "weekend":
        return "from-purple-500 to-indigo-500"
      case "clearance":
        return "from-green-500 to-teal-500"
      case "exclusive":
        return "from-blue-500 to-cyan-500"
      case "launch":
        return "from-indigo-500 to-purple-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getHotnessColor = (hotness: number) => {
    if (hotness >= 90) return "from-red-500 to-orange-500"
    if (hotness >= 80) return "from-orange-500 to-yellow-500"
    if (hotness >= 70) return "from-yellow-500 to-green-500"
    return "from-green-500 to-blue-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 text-lg font-bold animate-pulse">
                🔥 HOT DEALS - LIMITED TIME ONLY!
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Blazing Hot
              </span>
              <br />
              <span className="text-gray-900">Deals & Offers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Don't miss these incredible limited-time offers! Save up to 80% on your favorite brands.
              <span className="block mt-2 text-lg text-red-600 font-medium">
                ⏰ Hurry! These deals won't last long!
              </span>
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-red-500 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search hot deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-20 py-4 text-lg border-2 border-gray-200 focus:border-red-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl h-16"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="hover:bg-gray-100 transition-colors duration-300">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform rounded-xl px-6">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {hotDeals.length}+
                </div>
                <div className="text-gray-600">Hot Deals</div>
                <div className="text-xs text-red-600 font-medium">Live Now!</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  80%
                </div>
                <div className="text-gray-600">Max Discount</div>
                <div className="text-xs text-orange-600 font-medium">Incredible Savings!</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  24H
                </div>
                <div className="text-gray-600">Flash Sales</div>
                <div className="text-xs text-yellow-600 font-medium">Don't Miss Out!</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  $5M+
                </div>
                <div className="text-gray-600">Total Savings</div>
                <div className="text-xs text-green-600 font-medium">This Week!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">🔥 Hottest Deals Right Now</h2>
              <p className="text-xl text-gray-600">These deals are flying off the shelves!</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 animate-pulse">
                <Timer className="w-4 h-4 mr-2" />
                Limited Time
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotDeals.map((deal, index) => (
              <Card
                key={deal.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-white animate-fade-in-up group overflow-hidden relative"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                {/* Hotness Indicator */}
                <div className="absolute top-2 left-2 z-10">
                  <div
                    className={`bg-gradient-to-r ${getHotnessColor(deal.hotness)} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1`}
                  >
                    <Fire className="w-3 h-3" />
                    <span>{deal.hotness}% HOT</span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Timer className="w-3 h-3" />
                    <span>{timeLeft[deal.id] || deal.timeLeft}</span>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Floating Badges */}
                  <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
                    <Badge className={`bg-gradient-to-r ${getUrgencyColor(deal.urgency)} text-white animate-pulse`}>
                      {getUrgencyIcon(deal.urgency)}
                      <span className="ml-1">{deal.discount} OFF</span>
                    </Badge>
                  </div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLikeDeal(deal.id)
                      }}
                    >
                      <Heart className={`w-4 h-4 ${likedDeals.includes(deal.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Savings Highlight */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center shadow-2xl">
                      <div className="text-2xl font-bold text-green-600">${deal.originalPrice - deal.salePrice}</div>
                      <div className="text-sm text-gray-600">You Save</div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                        {deal.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                        {deal.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Enhanced Brand Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={deal.brand.logo || "/placeholder.svg"} alt={deal.brand.name} />
                        <AvatarFallback>{deal.brand.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 text-sm">{deal.brand.name}</p>
                          {deal.brand.verified && (
                            <div className="bg-blue-500 rounded-full p-1">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(deal.brand.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{deal.brand.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      {deal.category}
                    </Badge>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-1">
                    {deal.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{deal.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{deal.claims} claimed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{deal.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-red-600">
                      <Clock className="w-4 h-4" />
                      <span>{timeLeft[deal.id] || deal.timeLeft} left</span>
                    </div>
                  </div>

                  {/* Enhanced Claim Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Claim Progress</span>
                      <span className="text-gray-500">
                        {deal.claims}/{deal.maxClaims}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                        style={{ width: `${(deal.claims / deal.maxClaims) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                    {deal.claims / deal.maxClaims > 0.8 && (
                      <p className="text-xs text-red-600 font-medium animate-pulse">⚠️ Almost sold out!</p>
                    )}
                  </div>

                  {/* Enhanced Price Display */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                    <div>
                      <div className="text-sm text-gray-500 line-through">${deal.originalPrice}</div>
                      <div className="text-2xl font-bold text-red-600">${deal.salePrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">You Save</div>
                      <div className="text-xl font-bold text-green-600">${deal.originalPrice - deal.salePrice}</div>
                      <div className="text-xs text-green-600">({deal.discount} off)</div>
                    </div>
                  </div>

                  {/* Enhanced Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group-hover:from-orange-600 group-hover:to-yellow-600 text-lg py-6"
                    asChild
                  >
                    <Link href={`/offers/${deal.id}`}>
                      <Fire className="w-5 h-5 mr-2" />
                      Claim Hot Deal Now!
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-red-300 hover:border-red-400 hover:bg-red-50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105 transform bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              Load More Hot Deals
              <Fire className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 text-xl font-bold animate-pulse">
                🚨 ALERT: New Hot Deals Added Every Hour!
              </Badge>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Don't Miss Out!</h3>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our VIP list to get instant notifications when new hot deals go live.
              <span className="block mt-2 text-lg">Be the first to grab the best deals before they're gone!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform text-lg px-10 py-6"
                asChild
              >
                <Link href="/auth/customer/register">
                  <Fire className="w-6 h-6 mr-3" />
                  Join VIP List Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform text-lg px-10 py-6 bg-transparent"
                asChild
              >
                <Link href="/offers">
                  <Gift className="w-6 h-6 mr-3" />
                  Browse All Offers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

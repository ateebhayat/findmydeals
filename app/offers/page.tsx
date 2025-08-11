"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Store,
  Search,
  Calendar,
  MapPin,
  TrendingUp,
  Filter,
  ArrowRight,
  Gift,
  Clock,
  Users,
  Eye,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const offers = [
  {
    id: 1,
    title: "50% Off Summer Collection",
    description:
      "Get 50% off on all summer clothing items including dresses, tops, shorts, and accessories. Limited time offer!",
    discount: "50%",
    discountType: "percentage",
    validUntil: "2024-08-31",
    brand: {
      id: 1,
      name: "Fashion Forward",
      logo: "/placeholder.svg?height=40&width=40&text=FF",
      verified: true,
      rating: 4.8,
    },
    image: "/placeholder.svg?height=200&width=300&text=Summer+Sale",
    category: "Fashion",
    views: 1250,
    claims: 89,
    maxClaims: 500,
    trending: true,
    location: "New York",
    originalPrice: 200,
    discountedPrice: 100,
    tags: ["Summer", "Clothing", "Fashion"],
  },
  {
    id: 2,
    title: "Free Shipping Weekend",
    description: "Enjoy free shipping on all orders this weekend only. No minimum purchase required.",
    discount: "Free Shipping",
    discountType: "shipping",
    validUntil: "2024-07-28",
    brand: {
      id: 2,
      name: "Tech Store",
      logo: "/placeholder.svg?height=40&width=40&text=TS",
      verified: true,
      rating: 4.7,
    },
    image: "/placeholder.svg?height=200&width=300&text=Free+Shipping",
    category: "Electronics",
    views: 890,
    claims: 45,
    maxClaims: 200,
    trending: false,
    location: "California",
    originalPrice: 15,
    discountedPrice: 0,
    tags: ["Shipping", "Electronics", "Weekend"],
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Coffee",
    description:
      "Purchase any two premium coffee drinks and get the third one absolutely free. Valid at all locations.",
    discount: "33%",
    discountType: "percentage",
    validUntil: "2024-08-15",
    brand: {
      id: 3,
      name: "Brew Masters",
      logo: "/placeholder.svg?height=40&width=40&text=BM",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=200&width=300&text=Coffee+Deal",
    category: "Food & Beverage",
    views: 567,
    claims: 23,
    maxClaims: 100,
    trending: true,
    location: "San Francisco",
    originalPrice: 15,
    discountedPrice: 10,
    tags: ["Coffee", "Buy 2 Get 1", "Beverage"],
  },
  {
    id: 4,
    title: "20% Off First Spa Visit",
    description: "New customers get 20% off their first spa treatment session. Book your relaxation session today!",
    discount: "20%",
    discountType: "percentage",
    validUntil: "2024-12-31",
    brand: {
      id: 4,
      name: "Serenity Spa",
      logo: "/placeholder.svg?height=40&width=40&text=SS",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=200&width=300&text=Spa+Treatment",
    category: "Health & Beauty",
    views: 432,
    claims: 12,
    maxClaims: 50,
    trending: false,
    location: "Los Angeles",
    originalPrice: 150,
    discountedPrice: 120,
    tags: ["Spa", "First Visit", "Wellness"],
  },
  {
    id: 5,
    title: "Student Discount - 25% Off",
    description: "Students get 25% off with valid student ID. Perfect for back-to-school shopping!",
    discount: "25%",
    discountType: "percentage",
    validUntil: "2024-09-30",
    brand: {
      id: 5,
      name: "Book Haven",
      logo: "/placeholder.svg?height=40&width=40&text=BH",
      verified: false,
      rating: 4.6,
    },
    image: "/placeholder.svg?height=200&width=300&text=Student+Discount",
    category: "Education",
    views: 789,
    claims: 67,
    maxClaims: 300,
    trending: true,
    location: "Austin",
    originalPrice: 100,
    discountedPrice: 75,
    tags: ["Student", "Education", "Books"],
  },
  {
    id: 6,
    title: "Fitness Equipment Sale",
    description: "Up to 40% off on premium fitness equipment. Build your home gym with quality gear.",
    discount: "40%",
    discountType: "percentage",
    validUntil: "2024-08-20",
    brand: {
      id: 6,
      name: "Fitness First",
      logo: "/placeholder.svg?height=40&width=40&text=FF",
      verified: true,
      rating: 4.5,
    },
    image: "/placeholder.svg?height=200&width=300&text=Fitness+Equipment",
    category: "Sports & Recreation",
    views: 1100,
    claims: 34,
    maxClaims: 150,
    trending: false,
    location: "Miami",
    originalPrice: 500,
    discountedPrice: 300,
    tags: ["Fitness", "Equipment", "Home Gym"],
  },
]

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const getDaysLeft = (validUntil: string) => {
    const days = Math.ceil((new Date(validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  const getClaimPercentage = (claims: number, maxClaims: number) => {
    return (claims / maxClaims) * 100
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
                href="/categories"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Categories
              </Link>
              <Link
                href="/brands"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Brands
              </Link>
              <Link href="/offers" className="text-blue-600 font-semibold">
                All Offers
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                asChild
              >
                <Link href="/auth/customer/login">Customer Login</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                asChild
              >
                <Link href="/auth/register">
                  Register Brand
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Exclusive Offers
              </span>
              <br />
              <span className="text-gray-900">& Deals</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing deals from your favorite brands. Save money on everything you love.
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{offers.length}+</div>
                <div className="text-gray-600">Active Offers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {offers.reduce((sum, offer) => sum + offer.claims, 0)}+
                </div>
                <div className="text-gray-600">Claims Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {offers.reduce((sum, offer) => sum + offer.views, 0).toLocaleString()}+
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">70%</div>
                <div className="text-gray-600">Max Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search offers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 border-2 border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="beauty">Health & Beauty</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-2 border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-white/80 backdrop-blur-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <div className="text-sm text-gray-600 font-medium">Showing {offers.length} offers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card
                key={offer.id}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-fade-in-up group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                      <Sparkles className="w-3 h-3 mr-1" />
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
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700">
                      {getDaysLeft(offer.validUntil)} days left
                    </Badge>
                  </div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs text-gray-500 line-through">${offer.originalPrice}</div>
                      <div className="text-sm font-bold text-green-600">${offer.discountedPrice}</div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {offer.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                        {offer.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Brand Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={offer.brand.logo || "/placeholder.svg"}
                        alt={offer.brand.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{offer.brand.name}</p>
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.floor(offer.brand.rating) ? "bg-yellow-400" : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{offer.brand.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {offer.category}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {offer.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{offer.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{offer.claims} claimed</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.location}</span>
                    </div>
                  </div>

                  {/* Claim Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Claims Progress</span>
                      <span className="text-gray-500">
                        {offer.claims}/{offer.maxClaims}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getClaimPercentage(offer.claims, offer.maxClaims)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span>{getDaysLeft(offer.validUntil)} days left</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                    asChild
                  >
                    <Link href={`/offers/${offer.id}`}>
                      <Gift className="w-4 h-4 mr-2" />
                      View & Claim Offer
                      <ArrowRight className="w-4 h-4 ml-2" />
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
              className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105 transform bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              Load More Offers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Miss Out!</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of smart shoppers who save money every day with exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 hover:scale-105 transform"
                asChild
              >
                <Link href="/auth/customer/register">
                  <Gift className="w-5 h-5 mr-3" />
                  Start Saving Now
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 hover:scale-105 transform bg-transparent"
                asChild
              >
                <Link href="/auth/register">
                  <Store className="w-5 h-5 mr-3" />
                  List Your Brand
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

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

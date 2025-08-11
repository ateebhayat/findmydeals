"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, Search, MapPin, Globe, Star, ExternalLink, Users, TrendingUp, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useBrands } from "@/hooks/useApi"

const brands = [
  {
    id: 1,
    name: "Fashion Forward",
    description: "Trendy clothing for the modern lifestyle. Sustainable fashion with a focus on quality and style.",
    category: "Clothing & Fashion",
    location: "New York, NY",
    website: "https://fashionforward.com",
    activeOffers: 3,
    totalOffers: 8,
    rating: 4.8,
    verified: true,
    joinedDate: "2023-01-15",
    logo: "/placeholder.svg?height=80&width=80&text=FF",
    followers: 12500,
    totalSavings: "$125,000",
    trending: true,
  },
  {
    id: 2,
    name: "Brew Masters",
    description: "Artisanal coffee roasted to perfection. From bean to cup, we deliver exceptional coffee experiences.",
    category: "Food & Beverage",
    location: "San Francisco, CA",
    website: "https://brewmasters.com",
    activeOffers: 2,
    totalOffers: 5,
    rating: 4.9,
    verified: true,
    joinedDate: "2023-03-22",
    logo: "/placeholder.svg?height=80&width=80&text=BM",
    followers: 8900,
    totalSavings: "$89,000",
    trending: false,
  },
  {
    id: 3,
    name: "Tech Gadgets Pro",
    description: "Latest technology and gadgets at unbeatable prices. Your one-stop shop for all things tech.",
    category: "Electronics",
    location: "Austin, TX",
    website: "https://techgadgetspro.com",
    activeOffers: 4,
    totalOffers: 12,
    rating: 4.7,
    verified: true,
    joinedDate: "2022-11-08",
    logo: "/placeholder.svg?height=80&width=80&text=TG",
    followers: 15600,
    totalSavings: "$234,000",
    trending: true,
  },
  {
    id: 4,
    name: "Serenity Spa",
    description: "Relaxation and wellness services in a tranquil environment. Rejuvenate your mind, body, and soul.",
    category: "Health & Beauty",
    location: "Los Angeles, CA",
    website: "https://serenityspa.com",
    activeOffers: 1,
    totalOffers: 3,
    rating: 4.9,
    verified: true,
    joinedDate: "2023-05-10",
    logo: "/placeholder.svg?height=80&width=80&text=SS",
    followers: 6700,
    totalSavings: "$67,000",
    trending: false,
  },
  {
    id: 5,
    name: "Green Thumb Gardens",
    description:
      "Everything you need for your garden. From plants to tools, we help you create beautiful outdoor spaces.",
    category: "Home & Garden",
    location: "Portland, OR",
    website: "https://greenthumbgardens.com",
    activeOffers: 2,
    totalOffers: 6,
    rating: 4.6,
    verified: false,
    joinedDate: "2023-07-01",
    logo: "/placeholder.svg?height=80&width=80&text=GT",
    followers: 4300,
    totalSavings: "$43,000",
    trending: false,
  },
  {
    id: 6,
    name: "Fitness First",
    description: "Premium fitness equipment and supplements. Achieve your fitness goals with our quality products.",
    category: "Sports & Recreation",
    location: "Miami, FL",
    website: "https://fitnessfirst.com",
    activeOffers: 3,
    totalOffers: 9,
    rating: 4.5,
    verified: true,
    joinedDate: "2022-09-15",
    logo: "/placeholder.svg?height=80&width=80&text=FF",
    followers: 9800,
    totalSavings: "$156,000",
    trending: true,
  },
]

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const { user, isAuthenticated } = useAuth()

  // React Query hook
  const { data: brandsData, isLoading, error } = useBrands({
    search: searchQuery || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    sort: sortBy,
  })

  // Extract data with fallback
  const brandsList = brandsData?.data?.brands || brands

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
                BrandOffers
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
              <Link href="/brands" className="text-blue-600 font-semibold">
                Brands
              </Link>
              <Link
                href="/offers"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
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
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="text-gray-900">Brands</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Explore our curated collection of trusted brands offering exclusive deals and discounts.
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{brands.length}+</div>
                <div className="text-gray-600">Verified Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {brands.reduce((sum, brand) => sum + brand.totalOffers, 0)}+
                </div>
                <div className="text-gray-600">Total Offers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                  {brands.reduce((sum, brand) => sum + brand.followers, 0).toLocaleString()}+
                </div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">$2M+</div>
                <div className="text-gray-600">Total Savings</div>
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
                  placeholder="Search brands..."
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
                  <SelectItem value="clothing">Clothing & Fashion</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="beauty">Health & Beauty</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-2 border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="offers">Most Offers</SelectItem>
                  <SelectItem value="followers">Most Followers</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
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
              <div className="text-sm text-gray-600 font-medium">Showing {brands.length} brands</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {brandsList.map((brand: any, index: number) => (
              <Card
                key={brand.id}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-fade-in-up group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          {brand.verified && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {brand.name}
                            </CardTitle>
                            {brand.trending && (
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{brand.rating}</span>
                            <span className="text-sm text-gray-500">• {brand.totalOffers} offers</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors duration-300"
                          >
                            {brand.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </div>

                <CardContent className="space-y-6 relative">
                  <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                    {brand.description}
                  </CardDescription>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="text-lg font-bold text-blue-600">{brand.activeOffers}</div>
                      <div className="text-xs text-blue-700">Active Offers</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-lg font-bold text-purple-600">{brand.followers.toLocaleString()}</div>
                      <div className="text-xs text-purple-700">Followers</div>
                    </div>
                  </div>

                  {/* Location and Website */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                      <span>{brand.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-3 text-green-500" />
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-300 flex items-center"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-3 text-purple-500" />
                      <span>{brand.totalSavings} total savings</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                      asChild
                    >
                      <Link href={`/brands/${brand.id}`}>
                        <Store className="w-4 h-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                      Follow
                    </Button>
                  </div>
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
              Load More Brands
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Want to Join Our Brand Network?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of customers and grow your business with our platform.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 hover:scale-105 transform"
              asChild
            >
              <Link href="/auth/register">
                <Store className="w-5 h-5 mr-3" />
                Register Your Brand
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, Search, Shirt, Coffee, Smartphone, Heart, Home, Car, Dumbbell, Wrench, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useCategories } from "@/hooks/useApi"

const categories = [
  {
    id: "clothing",
    name: "Clothing & Fashion",
    description: "Trendy apparel, accessories, and fashion items",
    icon: Shirt,
    offerCount: 45,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
  },
  {
    id: "food",
    name: "Food & Beverage",
    description: "Restaurants, cafes, and food delivery services",
    icon: Coffee,
    offerCount: 32,
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Gadgets, computers, and electronic devices",
    icon: Smartphone,
    offerCount: 28,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    id: "beauty",
    name: "Health & Beauty",
    description: "Skincare, cosmetics, and wellness services",
    icon: Heart,
    offerCount: 23,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    id: "home",
    name: "Home & Garden",
    description: "Furniture, decor, and gardening supplies",
    icon: Home,
    offerCount: 19,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Car services, parts, and accessories",
    icon: Car,
    offerCount: 15,
    gradient: "from-gray-500 to-slate-500",
    bgGradient: "from-gray-50 to-slate-50",
  },
  {
    id: "sports",
    name: "Sports & Recreation",
    description: "Fitness, sports equipment, and outdoor activities",
    icon: Dumbbell,
    offerCount: 21,
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-50 to-orange-50",
  },
  {
    id: "services",
    name: "Services",
    description: "Professional and personal services",
    icon: Wrench,
    offerCount: 17,
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
  },
]

export default function CategoriesPage() {
  const { user, isAuthenticated } = useAuth()

  // React Query hook
  const { data: categoriesData, isLoading, error } = useCategories()

  // Extract data with fallback
  const categoriesList = categoriesData?.data?.categories || categories

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Store className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BrandOffers
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/brands" className="text-gray-600 hover:text-blue-600 transition-colors">
                Brands
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                asChild
              >
                <Link href="/auth/login">Brand Login</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/auth/register">Register Brand</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200&text=Category+Pattern')] opacity-5"></div>

        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Explore by category
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Browse by
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Find the perfect deals in your favorite categories. Discover offers from top brands across all industries.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search categories..."
                  className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoriesList.map((category: any) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-white overflow-hidden"
                >
                  <Link href={`/categories/${category.id}`}>
                    <div className={`h-2 bg-gradient-to-r ${category.gradient}`}></div>

                    <CardHeader className="text-center pb-4 pt-8">
                      <div
                        className={`mx-auto mb-6 p-6 rounded-3xl bg-gradient-to-br ${category.bgGradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.gradient} shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center pt-0 pb-8">
                      <Badge className={`bg-gradient-to-r ${category.gradient} text-white shadow-lg px-4 py-2`}>
                        {category.offerCount} offers
                      </Badge>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Can't Find What You're Looking For?</h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Browse all offers or suggest a new category. We're always adding new brands and categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4"
              asChild
            >
              <Link href="/">View All Offers</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/contact">Suggest Category</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

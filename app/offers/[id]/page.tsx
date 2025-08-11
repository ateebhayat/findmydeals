"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Store,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Eye,
  Share2,
  Heart,
  MapPin,
  Tag,
  Sparkles,
  Shield,
  CheckCircle,
  Gift,
  Star,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

// Mock data for demonstration
const mockOffer = {
  id: 1,
  title: "50% Off Summer Collection",
  description:
    "Get 50% off on all summer clothing items including dresses, tops, shorts, and accessories. This exclusive offer is perfect for updating your wardrobe with the latest summer trends. Don't miss out on this limited-time opportunity to save big on premium fashion items.",
  discount: "50%",
  discountType: "percentage",
  originalPrice: 200,
  discountedPrice: 100,
  validFrom: "2024-07-01",
  validUntil: "2024-08-31",
  isActive: true,
  views: 1250,
  claims: 89,
  maxClaims: 500,
  category: "Fashion & Clothing",
  tags: ["Summer", "Clothing", "Fashion", "Sale"],
  terms: [
    "Valid on all summer collection items",
    "Cannot be combined with other offers",
    "Valid for online and in-store purchases",
    "Minimum purchase of $50 required",
    "Offer expires on August 31, 2024",
  ],
  brand: {
    id: 1,
    name: "Fashion Forward",
    logo: "/placeholder.svg?height=80&width=80&text=FF",
    description: "Premium fashion brand offering trendy and affordable clothing for modern lifestyle.",
    rating: 4.8,
    totalReviews: 1250,
    verified: true,
    location: "New York, NY",
    website: "https://fashionforward.com",
  },
  images: [
    "/placeholder.svg?height=400&width=600&text=Summer+Collection+1",
    "/placeholder.svg?height=400&width=600&text=Summer+Collection+2",
    "/placeholder.svg?height=400&width=600&text=Summer+Collection+3",
  ],
}

export default function OfferDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [offer] = useState(mockOffer)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ type: "brand" | "customer" | null }>({ type: null })

  // Simulate user authentication check
  useEffect(() => {
    // In a real app, this would check the actual user session
    const userType = localStorage.getItem("userType") // 'brand', 'customer', or null
    setUser({ type: userType as "brand" | "customer" | null })
  }, [])

  const handleClaimOffer = () => {
    if (!user.type) {
      // Redirect to customer login
      router.push("/auth/customer/login?redirect=/offers/" + params.id)
      return
    }

    if (user.type === "brand") {
      alert("Brands cannot claim offers. Please login as a customer.")
      return
    }

    setIsLoading(true)
    // Simulate claim process
    setTimeout(() => {
      setIsLoading(false)
      alert("Offer claimed successfully! Check your email for the discount code.")
    }, 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: offer.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const daysLeft = Math.ceil((new Date(offer.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const claimPercentage = (offer.claims / offer.maxClaims) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()} className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FindMyDeals
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-all duration-300 hover:scale-105 ${
                  isLiked ? "bg-red-50 border-red-200 text-red-600" : "hover:bg-gray-50"
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-gray-50 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="border-0 shadow-lg overflow-hidden animate-fade-in-up">
              <div className="relative">
                <img
                  src={offer.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${offer.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {offer.discount} OFF
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {daysLeft} days left
                  </Badge>
                </div>
              </div>
              {offer.images.length > 1 && (
                <div className="flex space-x-2 p-4 bg-gray-50">
                  {offer.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Offer Details */}
            <Card className="border-0 shadow-lg animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900">{offer.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {offer.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{offer.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{offer.claims} claimed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">${offer.discountedPrice}</div>
                    <div className="text-lg text-gray-500 line-through">${offer.originalPrice}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-700 leading-relaxed mb-6">
                  {offer.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Validity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Valid From</p>
                      <p className="text-sm text-green-600">{new Date(offer.validFrom).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">Valid Until</p>
                      <p className="text-sm text-red-600">{new Date(offer.validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Claim Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Claims Progress</span>
                    <span className="text-sm text-gray-500">
                      {offer.claims} / {offer.maxClaims}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${claimPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card className="border-0 shadow-lg animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Terms & Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {offer.terms.map((term, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Claim Button */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Gift className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Save?</h3>
                  <p className="text-gray-600">Claim this exclusive offer now!</p>
                </div>

                <Button
                  onClick={handleClaimOffer}
                  disabled={isLoading || !offer.isActive}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 py-4 text-lg font-semibold hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Claiming...</span>
                    </div>
                  ) : !user.type ? (
                    "Login to Claim"
                  ) : user.type === "brand" ? (
                    "Brands Cannot Claim"
                  ) : (
                    "Claim Offer"
                  )}
                </Button>

                {!user.type && (
                  <p className="text-sm text-gray-500 text-center mt-3">
                    New customer?{" "}
                    <Link href="/auth/customer/register" className="text-blue-600 hover:underline">
                      Sign up here
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Brand Info */}
            <Card className="border-0 shadow-lg animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle>About the Brand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={offer.brand.logo || "/placeholder.svg"} alt={offer.brand.name} />
                    <AvatarFallback>{offer.brand.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{offer.brand.name}</h4>
                      {offer.brand.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{offer.brand.rating}</span>
                      <span className="text-sm text-gray-500">({offer.brand.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{offer.brand.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.brand.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ExternalLink className="w-4 h-4" />
                    <a
                      href={offer.brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/brands/${offer.brand.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Offers */}
            <Card className="border-0 shadow-lg animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>Similar Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                  >
                    <img
                      src={`/placeholder.svg?height=60&width=60&text=Offer+${i}`}
                      alt={`Similar offer ${i}`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">Summer Sale {i}</p>
                      <p className="text-xs text-gray-500">Fashion Brand {i}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {20 + i * 10}% OFF
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
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
      `}</style>
    </div>
  )
}

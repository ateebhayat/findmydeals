'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Store,
  Search,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Gift,
  Heart,
  Eye,
  Bell,
  Star,
  MapPin,
  Filter,
  ChevronRight,
  Bookmark,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Enhanced mock data with more realistic content
const featuredOffers = [
  {
    id: 1,
    title: '50% Off Summer Collection',
    description: 'Get 50% off on all summer clothing items including dresses, tops, shorts, and accessories. Limited time offer with free shipping on orders over $75!',
    discount: '50%',
    discountType: 'percentage',
    validUntil: '2024-08-31',
    brand: {
      id: 1,
      name: 'Fashion Forward',
      logo: '/placeholder.svg?height=40&width=40&text=FF',
      verified: true,
      rating: 4.8,
      totalReviews: 2340,
    },
    image: '/placeholder.svg?height=300&width=400&text=Summer+Fashion+Collection',
    category: 'Fashion & Clothing',
    views: 12500,
    claims: 890,
    maxClaims: 2000,
    trending: true,
    location: 'New York, NY',
    originalPrice: 200,
    discountedPrice: 100,
    tags: ['Summer', 'Clothing', 'Fashion', 'Free Shipping'],
    urgency: 'high',
    featured: true,
    savings: '$2.1M',
  },
  {
    id: 2,
    title: 'Free Premium Shipping + 20% Off Electronics',
    description: 'Enjoy free premium shipping on all electronics plus an additional 20% off. Perfect for upgrading your tech setup with the latest gadgets.',
    discount: '20%',
    discountType: 'percentage',
    validUntil: '2024-07-28',
    brand: {
      id: 2,
      name: 'TechHub Pro',
      logo: '/placeholder.svg?height=40&width=40&text=TH',
      verified: true,
      rating: 4.7,
      totalReviews: 1890,
    },
    image: '/placeholder.svg?height=300&width=400&text=Electronics+Sale',
    category: 'Electronics & Tech',
    views: 8900,
    claims: 456,
    maxClaims: 1000,
    trending: false,
    location: 'San Francisco, CA',
    originalPrice: 500,
    discountedPrice: 400,
    tags: ['Electronics', 'Tech', 'Free Shipping', 'Premium'],
    urgency: 'medium',
    featured: true,
    savings: '$890K',
  },
  {
    id: 3,
    title: 'Buy 2 Get 1 Free Gourmet Coffee',
    description: 'Purchase any two premium coffee blends and get the third one absolutely free. Includes our award-winning single-origin beans from around the world.',
    discount: '33%',
    discountType: 'bogo',
    validUntil: '2024-08-15',
    brand: {
      id: 3,
      name: 'Artisan Brew Co.',
      logo: '/placeholder.svg?height=40&width=40&text=AB',
      verified: true,
      rating: 4.9,
      totalReviews: 3450,
    },
    image: '/placeholder.svg?height=300&width=400&text=Gourmet+Coffee+Beans',
    category: 'Food & Beverage',
    views: 5670,
    claims: 234,
    maxClaims: 500,
    trending: true,
    location: 'Portland, OR',
    originalPrice: 45,
    discountedPrice: 30,
    tags: ['Coffee', 'Gourmet', 'Buy 2 Get 1', 'Premium'],
    urgency: 'low',
    featured: true,
    savings: '$156K',
  },
];

const categories = [
  {
    name: 'Fashion',
    icon: '👗',
    count: 2450,
    color: 'from-pink-500 to-rose-500',
    description: 'Clothing, accessories, and style',
    trending: true,
  },
  {
    name: 'Electronics',
    icon: '📱',
    count: 1890,
    color: 'from-blue-500 to-cyan-500',
    description: 'Gadgets, tech, and devices',
    trending: true,
  },
  {
    name: 'Beauty',
    icon: '💄',
    count: 1560,
    color: 'from-purple-500 to-pink-500',
    description: 'Skincare, makeup, and wellness',
    trending: false,
  },
  {
    name: 'Food',
    icon: '🍕',
    count: 1340,
    color: 'from-orange-500 to-red-500',
    description: 'Restaurants, groceries, and treats',
    trending: true,
  },
  {
    name: 'Travel',
    icon: '✈️',
    count: 980,
    color: 'from-green-500 to-teal-500',
    description: 'Hotels, flights, and experiences',
    trending: false,
  },
  {
    name: 'Health',
    icon: '🏥',
    count: 870,
    color: 'from-emerald-500 to-green-500',
    description: 'Fitness, supplements, and care',
    trending: false,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg?height=60&width=60&text=SJ',
    role: 'Fashion Enthusiast',
    content: "I've saved over $2,000 this year using FindMyDeals! The deals are incredible and the platform is so easy to use.",
    rating: 5,
    savings: '$2,156',
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: '/placeholder.svg?height=60&width=60&text=MC',
    role: 'Tech Professional',
    content: 'Found amazing deals on electronics here. The verification system gives me confidence in every purchase.',
    rating: 5,
    savings: '$1,890',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: '/placeholder.svg?height=60&width=60&text=ER',
    role: 'Small Business Owner',
    content: 'As a brand owner, this platform has helped us reach thousands of new customers. Highly recommended!',
    rating: 5,
    savings: '$5,670',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [likedOffers, setLikedOffers] = useState<number[]>([]);
  const [bookmarkedOffers, setBookmarkedOffers] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLikeOffer = (offerId: number) => {
    setLikedOffers(prev => (prev.includes(offerId) ? prev.filter(id => id !== offerId) : [...prev, offerId]));
  };

  const handleBookmarkOffer = (offerId: number) => {
    setBookmarkedOffers(prev => (prev.includes(offerId) ? prev.filter(id => id !== offerId) : [...prev, offerId]));
  };

  const getDaysLeft = (validUntil: string) => {
    const days = Math.ceil((new Date(validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'from-red-500 to-orange-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'low':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Enhanced Responsive Header with Mobile Menu */}

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-medium animate-pulse">🚀 Join smart shoppers saving daily!</Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Discover Amazing</span>
              <br />
              <span className="text-gray-900">Deals and Offers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Connect with your favorite brands and unlock exclusive deals, discounts, and offers tailored just for you.
              <span className="block mt-2 text-lg text-blue-600 font-medium">Join 500,000+ smart shoppers saving money daily!</span>
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-blue-500 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search for brands, offers, or categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-12 pr-20 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl h-16"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="hover:bg-gray-100 transition-colors duration-300">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform rounded-xl px-6">
                    Search
                  </Button>
                </div>
              </div>

              {/* Search Suggestions */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-10 animate-fade-in-up">
                  <div className="p-4 space-y-2">
                    <div className="text-sm text-gray-500 font-medium">Popular searches</div>
                    {['Fashion deals', 'Electronics sale', 'Food delivery', 'Travel offers'].map(suggestion => (
                      <div key={suggestion} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Stats */}
            {/* <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  2,500+
                </div>
                <div className="text-gray-600">Verified Brands</div>
                <div className="text-xs text-green-600 font-medium">+12% this month</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  15,000+
                </div>
                <div className="text-gray-600">Live Offers</div>
                <div className="text-xs text-green-600 font-medium">+8% this week</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  500K+
                </div>
                <div className="text-gray-600">Happy Customers</div>
                <div className="text-xs text-green-600 font-medium">+15% this month</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  $10M+
                </div>
                <div className="text-gray-600">Savings Generated</div>
                <div className="text-xs text-green-600 font-medium">This month alone!</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find offers from your favorite categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur-sm group overflow-hidden"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <CardContent className="p-6 text-center relative">
                  {category.trending && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs animate-pulse">Hot</Badge>
                    </div>
                  )}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{category.count.toLocaleString()} offers</p>
                  <p className="text-xs text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Offers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Offers</h2>
              <p className="text-xl text-gray-600">Don't miss these trending deals</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent" asChild>
              <Link href="/offers">
                View All Offers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredOffers.map((offer, index) => (
              <Card
                key={offer.id}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white animate-fade-in-up group overflow-hidden"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img src={offer.image || '/placeholder.svg'} alt={offer.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Enhanced Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <Badge className={`bg-gradient-to-r ${getUrgencyColor(offer.urgency)} text-white animate-pulse`}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      {offer.discount} OFF
                    </Badge>
                    {offer.featured && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">⭐ Featured</Badge>}
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

                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={e => {
                        e.preventDefault();
                        handleLikeOffer(offer.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${likedOffers.includes(offer.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={e => {
                        e.preventDefault();
                        handleBookmarkOffer(offer.id);
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedOffers.includes(offer.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Savings Badge */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">💰 {offer.savings} saved by users</Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">{offer.title}</CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">{offer.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Enhanced Brand Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={offer.brand.logo || '/placeholder.svg'} alt={offer.brand.name} />
                        <AvatarFallback>{offer.brand.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 text-sm">{offer.brand.name}</p>
                          {offer.brand.verified && <Shield className="w-3 h-3 text-blue-500" />}
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(offer.brand.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {offer.brand.rating} ({offer.brand.totalReviews.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {offer.category}
                    </Badge>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-1">
                    {offer.tags.slice(0, 4).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{offer.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{offer.claims} claimed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{offer.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span>{getDaysLeft(offer.validUntil)} days left</span>
                    </div>
                  </div>

                  {/* Enhanced Claim Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Claim Progress</span>
                      <span className="text-gray-500">
                        {offer.claims}/{offer.maxClaims}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(offer.claims / offer.maxClaims) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Enhanced Price Display */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500 line-through">${offer.originalPrice}</div>
                      <div className="text-lg font-bold text-green-600">${offer.discountedPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">You Save</div>
                      <div className="text-lg font-bold text-red-600">${offer.originalPrice - offer.discountedPrice}</div>
                    </div>
                  </div>

                  {/* Enhanced Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group-hover:from-purple-600 group-hover:to-pink-600"
                    asChild
                  >
                    <Link href={`/offers/${offer.id}`}>
                      <Gift className="w-4 h-4 mr-2" />
                      View & Claim Offer
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button variant="outline" className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent" asChild>
              <Link href="/offers">
                View All Offers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers saving money every day</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm animate-fade-in-up">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">"{testimonials[currentTestimonial].content}"</blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={testimonials[currentTestimonial].avatar || '/placeholder.svg'} alt={testimonials[currentTestimonial].name} />
                      <AvatarFallback>
                        {testimonials[currentTestimonial].name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                      <div className="text-green-600 font-medium">Saved {testimonials[currentTestimonial].savings}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FindMyDeals?</h2>
            <p className="text-xl text-gray-600">Experience the best way to discover and claim exclusive offers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Instant Access',
                description: 'Get immediate access to thousands of exclusive offers from top brands worldwide',
                color: 'from-yellow-500 to-orange-500',
                stats: '15,000+ offers',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Verified Brands',
                description: 'All our partner brands are verified and trusted by millions of customers globally',
                color: 'from-blue-500 to-cyan-500',
                stats: '2,500+ brands',
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: 'Exclusive Deals',
                description: 'Access special offers that are only available through our platform',
                color: 'from-purple-500 to-pink-500',
                stats: 'Up to 70% off',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Personalized',
                description: 'Get recommendations based on your preferences and shopping history',
                color: 'from-red-500 to-pink-500',
                stats: 'AI-powered',
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-fade-in-up group"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <Badge className={`bg-gradient-to-r ${feature.color} text-white`}>{feature.stats}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white animate-fade-in-up">
            <div className="mb-6">
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-lg font-medium">🚀 Limited Time: Double Rewards for New Members!</Badge>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Saving?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of customers who are already saving with exclusive brand offers.
              <span className="block mt-2 text-lg">Get instant access to deals worth over $10,000!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform text-lg px-10 py-6"
                asChild
              >
                <Link href="/auth/customer/register">
                  <Gift className="w-6 h-6 mr-3" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform text-lg px-10 py-6 bg-transparent"
                asChild
              >
                <Link href="/auth/login">
                  <Store className="w-6 h-6 mr-3" />
                  List Your Brand
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
              <div className="text-center">
                <div className="text-2xl font-bold">500K+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$10M+</div>
                <div className="text-sm">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">FindMyDeals</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Connecting customers with their favorite brands through exclusive offers and deals. Join our community of smart shoppers and start saving today!
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, name: 'facebook' },
                  { icon: Twitter, name: 'twitter' },
                  { icon: Instagram, name: 'instagram' },
                  { icon: Linkedin, name: 'linkedin' },
                ].map(social => (
                  <Button key={social.name} variant="ghost" size="sm" className=" transition-colors duration-300">
                    <social.icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/offers" className="hover:text-white transition-colors">
                    Browse Offers
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-white transition-colors">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-white transition-colors">
                    Hot Deals
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Brands</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    Register Brand
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Sales
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 FindMyDeals. All rights reserved.</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>🔒 SSL Secured</span>
                <span>✓ GDPR Compliant</span>
                <span>⭐ 4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
  );
}

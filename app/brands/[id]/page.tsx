import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Store, MapPin, Globe, Star, Calendar, ExternalLink, Tag, Percent, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data - in real app, this would come from database
const brandData = {
  id: 1,
  name: 'Fashion Forward',
  description:
    "Fashion Forward is a leading sustainable fashion brand committed to creating trendy, high-quality clothing while minimizing environmental impact. Founded in 2020, we've been at the forefront of eco-conscious fashion, using recycled materials and ethical manufacturing processes.",
  category: 'Clothing & Fashion',
  location: 'New York, NY',
  website: 'https://fashionforward.com',
  email: 'contact@fashionforward.com',
  phone: '+1 (555) 123-4567',
  rating: 4.8,
  totalReviews: 324,
  verified: true,
  joinedDate: '2023-01-15',
  totalOffers: 8,
  activeOffers: 3,
  totalViews: 15420,
  address: '123 Fashion Avenue, New York, NY 10001',
};

const offers = [
  {
    id: 1,
    title: '50% Off Summer Collection',
    description: 'Get 50% off on all summer clothing items. Limited time offer!',
    discount: '50%',
    validUntil: '2024-08-31',
    isActive: true,
    category: 'Clothing',
  },
  {
    id: 2,
    title: 'Free Shipping Weekend',
    description: 'Enjoy free shipping on all orders this weekend only.',
    discount: 'Free Shipping',
    validUntil: '2024-07-28',
    isActive: true,
    category: 'Clothing',
  },
  {
    id: 3,
    title: 'Student Discount',
    description: 'Students get 20% off with valid student ID.',
    discount: '20%',
    validUntil: '2024-12-31',
    isActive: true,
    category: 'Clothing',
  },
];

export default function BrandProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Store className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h1 className="text-3xl font-bold">{brandData.name}</h1>
                          {brandData.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{brandData.rating}</span>
                          <span className="text-muted-foreground">({brandData.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {brandData.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{brandData.description}</p>
              </CardContent>
            </Card>

            {/* Active Offers */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Offers</h2>
                <Badge variant="secondary">{brandData.activeOffers} active</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map(offer => (
                  <Card key={offer.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{offer.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-800 shrink-0">
                          <Percent className="w-3 h-3 mr-1" />
                          {offer.discount}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4 line-clamp-2">{offer.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          Valid until {new Date(offer.validUntil).toLocaleDateString()}
                        </div>
                        <Button
                          size="sm"
                          className=" bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                        >
                          <Tag className="w-4 h-4 mr-2" />
                          View Offer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About {brandData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{brandData.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={brandData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {brandData.website}
                          <ExternalLink className="h-3 w-3 ml-1 inline" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category: </span>
                        <span>{brandData.category}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Member since: </span>
                        <span>{new Date(brandData.joinedDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total offers: </span>
                        <span>{brandData.totalOffers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Offers</span>
                  <span className="font-semibold">{brandData.activeOffers}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Offers</span>
                  <span className="font-semibold">{brandData.totalOffers}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="font-semibold">{brandData.totalViews.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{brandData.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <a href={brandData.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/">
                    <Tag className="h-4 w-4 mr-2" />
                    View All Offers
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/contact">
                    <Store className="h-4 w-4 mr-2" />
                    Contact Brand
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Similar Brands */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Store className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Style Central</p>
                      <p className="text-xs text-muted-foreground">Clothing & Fashion</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Store className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Urban Threads</p>
                      <p className="text-xs text-muted-foreground">Clothing & Fashion</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Store className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Eco Wear</p>
                      <p className="text-xs text-muted-foreground">Clothing & Fashion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

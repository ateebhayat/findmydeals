// Centralized Mock Data with Irish Locations
// This file contains all mock data used throughout the application

export interface Brand {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  website: string;
  activeOffers: number;
  totalOffers: number;
  rating: number;
  verified: boolean;
  joinedDate: string;
  logo: string;
  followers: number;
  totalSavings: string;
  trending: boolean;
  email?: string;
  phone?: string;
  address?: string;
  totalReviews?: number;
  totalViews?: number;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  discountType: string;
  validUntil: string;
  validFrom?: string;
  brand: {
    id: number;
    name: string;
    logo: string;
    verified: boolean;
    rating: number;
    totalReviews?: number;
    description?: string;
    location?: string;
    website?: string;
  };
  image: string;
  category: string;
  views: number;
  claims: number;
  maxClaims: number;
  trending: boolean;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  tags: string[];
  urgency?: string;
  featured?: boolean;
  savings?: string;
  isActive?: boolean;
  terms?: string[];
  images?: string[];
  timeLeft?: string;
  hotness?: number;
  code?: string;
  usageCount?: number;
  maxUsage?: number;
  claimedDate?: string;
  status?: string;
  expiryDate?: string;
}

export interface HotDeal extends Offer {
  salePrice: number;
  urgency: string;
  timeLeft: string;
  hotness: number;
}

export interface ClaimedOffer extends Offer {
  savings: string;
  claimedDate: string;
  status: string;
  expiryDate: string;
  code: string;
  usageCount: number;
  maxUsage: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalSavings: number;
  claimedOffers: number;
  favoriteOffers: number;
  membershipLevel: string;
  nextLevelProgress: number;
  notifications: number;
  rewardPoints: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  savings: string;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
  color: string;
  description: string;
  trending: boolean;
}

export interface Activity {
  id: number;
  type: string;
  title: string;
  brand: string;
  timestamp: string;
  icon: any;
  color: string;
}

// Irish Brands Data (Expanded from 6 to 15 brands)
export const brands: Brand[] = [
  {
    id: 1,
    name: "Celtic Fashion",
    description: "Traditional and modern Irish fashion with sustainable materials. Celebrating Irish heritage through contemporary design.",
    category: "Clothing & Fashion",
    location: "Dublin, Ireland",
    website: "https://celticfashion.ie",
    activeOffers: 4,
    totalOffers: 12,
    rating: 4.8,
    verified: true,
    joinedDate: "2023-01-15",
    logo: "/placeholder.svg?height=80&width=80&text=CF",
    followers: 18500,
    totalSavings: "€185,000",
    trending: true,
    email: "contact@celticfashion.ie",
    phone: "+353 1 234 5678",
    address: "15 Grafton Street, Dublin 2, Ireland",
    totalReviews: 2340,
    totalViews: 25420,
  },
  {
    id: 2,
    name: "Irish Brew Masters",
    description: "Artisanal Irish coffee and tea blends roasted to perfection. From bean to cup, we deliver exceptional Irish beverage experiences.",
    category: "Food & Beverage",
    location: "Cork, Ireland",
    website: "https://irishbrewmasters.ie",
    activeOffers: 3,
    totalOffers: 8,
    rating: 4.9,
    verified: true,
    joinedDate: "2023-03-22",
    logo: "/placeholder.svg?height=80&width=80&text=IBM",
    followers: 12900,
    totalSavings: "€129,000",
    trending: false,
    email: "hello@irishbrewmasters.ie",
    phone: "+353 21 456 7890",
    address: "42 Patrick Street, Cork, Ireland",
    totalReviews: 1890,
    totalViews: 18900,
  },
  {
    id: 3,
    name: "Emerald Tech Solutions",
    description: "Latest technology and gadgets at unbeatable prices. Your one-stop shop for all things tech in Ireland.",
    category: "Electronics",
    location: "Galway, Ireland",
    website: "https://emeraldtech.ie",
    activeOffers: 5,
    totalOffers: 15,
    rating: 4.7,
    verified: true,
    joinedDate: "2022-11-08",
    logo: "/placeholder.svg?height=80&width=80&text=ETS",
    followers: 22600,
    totalSavings: "€334,000",
    trending: true,
    email: "support@emeraldtech.ie",
    phone: "+353 91 234 567",
    address: "78 Shop Street, Galway, Ireland",
    totalReviews: 3450,
    totalViews: 32100,
  },
  {
    id: 4,
    name: "Clover Wellness Spa",
    description: "Relaxation and wellness services in a tranquil Irish environment. Rejuvenate your mind, body, and soul with traditional Irish treatments.",
    category: "Health & Beauty",
    location: "Killarney, Ireland",
    website: "https://cloverwellness.ie",
    activeOffers: 2,
    totalOffers: 6,
    rating: 4.9,
    verified: true,
    joinedDate: "2023-05-10",
    logo: "/placeholder.svg?height=80&width=80&text=CWS",
    followers: 9700,
    totalSavings: "€97,000",
    trending: false,
    email: "info@cloverwellness.ie",
    phone: "+353 64 123 456",
    address: "25 High Street, Killarney, Co. Kerry, Ireland",
    totalReviews: 1250,
    totalViews: 15400,
  },
  {
    id: 5,
    name: "Shamrock Gardens",
    description: "Everything you need for your Irish garden. From native plants to tools, we help you create beautiful outdoor spaces.",
    category: "Home & Garden",
    location: "Limerick, Ireland",
    website: "https://shamrockgardens.ie",
    activeOffers: 3,
    totalOffers: 9,
    rating: 4.6,
    verified: false,
    joinedDate: "2023-07-01",
    logo: "/placeholder.svg?height=80&width=80&text=SG",
    followers: 7300,
    totalSavings: "€73,000",
    trending: false,
    email: "garden@shamrockgardens.ie",
    phone: "+353 61 789 012",
    address: "56 O'Connell Street, Limerick, Ireland",
    totalReviews: 890,
    totalViews: 12800,
  },
  {
    id: 6,
    name: "Celtic Fitness",
    description: "Premium fitness equipment and supplements. Achieve your fitness goals with our quality Irish-made products.",
    category: "Sports & Recreation",
    location: "Belfast, Ireland",
    website: "https://celticfitness.ie",
    activeOffers: 4,
    totalOffers: 11,
    rating: 4.5,
    verified: true,
    joinedDate: "2022-09-15",
    logo: "/placeholder.svg?height=80&width=80&text=CF",
    followers: 14800,
    totalSavings: "€216,000",
    trending: true,
    email: "fitness@celticfitness.ie",
    phone: "+353 28 345 678",
    address: "88 Royal Avenue, Belfast, Ireland",
    totalReviews: 1680,
    totalViews: 19600,
  },
  {
    id: 7,
    name: "Irish Artisan Crafts",
    description: "Handmade Irish crafts and traditional artwork. Supporting local artisans and preserving Irish cultural heritage.",
    category: "Arts & Crafts",
    location: "Waterford, Ireland",
    website: "https://irishartisancrafts.ie",
    activeOffers: 2,
    totalOffers: 7,
    rating: 4.8,
    verified: true,
    joinedDate: "2023-02-14",
    logo: "/placeholder.svg?height=80&width=80&text=IAC",
    followers: 8900,
    totalSavings: "€89,000",
    trending: false,
    email: "crafts@irishartisancrafts.ie",
    phone: "+353 51 234 567",
    address: "12 The Quay, Waterford, Ireland",
    totalReviews: 1120,
    totalViews: 14200,
  },
  {
    id: 8,
    name: "Emerald Isle Books",
    description: "Ireland's premier bookstore featuring Irish literature, educational materials, and international bestsellers.",
    category: "Education & Books",
    location: "Derry, Ireland",
    website: "https://emeraldislebooks.ie",
    activeOffers: 3,
    totalOffers: 10,
    rating: 4.7,
    verified: true,
    joinedDate: "2022-12-03",
    logo: "/placeholder.svg?height=80&width=80&text=EIB",
    followers: 11200,
    totalSavings: "€112,000",
    trending: true,
    email: "books@emeraldislebooks.ie",
    phone: "+353 28 456 789",
    address: "34 Shipquay Street, Derry, Ireland",
    totalReviews: 1560,
    totalViews: 16800,
  },
  {
    id: 9,
    name: "Dublin Digital Services",
    description: "Professional digital marketing and web development services for Irish businesses. Helping brands grow online.",
    category: "Digital Services",
    location: "Dublin, Ireland",
    website: "https://dublindigital.ie",
    activeOffers: 2,
    totalOffers: 5,
    rating: 4.9,
    verified: true,
    joinedDate: "2023-04-18",
    logo: "/placeholder.svg?height=80&width=80&text=DDS",
    followers: 6700,
    totalSavings: "€67,000",
    trending: false,
    email: "digital@dublindigital.ie",
    phone: "+353 1 567 890",
    address: "101 Pearse Street, Dublin 2, Ireland",
    totalReviews: 780,
    totalViews: 9800,
  },
  {
    id: 10,
    name: "Irish Gourmet Kitchen",
    description: "Premium Irish food products and gourmet meal kits. Taste the best of Ireland delivered to your door.",
    category: "Food & Beverage",
    location: "Kilkenny, Ireland",
    website: "https://irishgourmet.ie",
    activeOffers: 4,
    totalOffers: 13,
    rating: 4.8,
    verified: true,
    joinedDate: "2023-01-28",
    logo: "/placeholder.svg?height=80&width=80&text=IGK",
    followers: 15600,
    totalSavings: "€156,000",
    trending: true,
    email: "gourmet@irishgourmet.ie",
    phone: "+353 56 123 456",
    address: "67 High Street, Kilkenny, Ireland",
    totalReviews: 2100,
    totalViews: 22800,
  },
];

// Featured Offers Data (Expanded from 3 to 8 offers)
export const featuredOffers: Offer[] = [
  {
    id: 1,
    title: '50% Off Irish Summer Collection',
    description: 'Get 50% off on all summer clothing items including traditional Irish dresses, tops, shorts, and Celtic accessories. Limited time offer with free shipping on orders over €75!',
    discount: '50%',
    discountType: 'percentage',
    validUntil: '2024-08-31',
    brand: {
      id: 1,
      name: 'Celtic Fashion',
      logo: '/placeholder.svg?height=40&width=40&text=CF',
      verified: true,
      rating: 4.8,
      totalReviews: 2340,
    },
    image: '/placeholder.svg?height=300&width=400&text=Irish+Summer+Collection',
    category: 'Fashion & Clothing',
    views: 18500,
    claims: 1290,
    maxClaims: 2500,
    trending: true,
    location: 'Dublin, Ireland',
    originalPrice: 200,
    discountedPrice: 100,
    tags: ['Summer', 'Irish Fashion', 'Celtic', 'Free Shipping'],
    urgency: 'high',
    featured: true,
    savings: '€2.3M',
  },
  {
    id: 2,
    title: 'Free Premium Shipping + 20% Off Electronics',
    description: 'Enjoy free premium shipping on all electronics plus an additional 20% off. Perfect for upgrading your tech setup with the latest gadgets available in Ireland.',
    discount: '20%',
    discountType: 'percentage',
    validUntil: '2024-07-28',
    brand: {
      id: 3,
      name: 'Emerald Tech Solutions',
      logo: '/placeholder.svg?height=40&width=40&text=ETS',
      verified: true,
      rating: 4.7,
      totalReviews: 3450,
    },
    image: '/placeholder.svg?height=300&width=400&text=Electronics+Sale',
    category: 'Electronics & Tech',
    views: 12900,
    claims: 656,
    maxClaims: 1200,
    trending: false,
    location: 'Galway, Ireland',
    originalPrice: 500,
    discountedPrice: 400,
    tags: ['Electronics', 'Tech', 'Free Shipping', 'Premium'],
    urgency: 'medium',
    featured: true,
    savings: '€1.2M',
  },
  {
    id: 3,
    title: 'Buy 2 Get 1 Free Irish Coffee',
    description: 'Purchase any two premium Irish coffee blends and get the third one absolutely free. Includes our award-winning single-origin beans from Irish roasters.',
    discount: '33%',
    discountType: 'bogo',
    validUntil: '2024-08-15',
    brand: {
      id: 2,
      name: 'Irish Brew Masters',
      logo: '/placeholder.svg?height=40&width=40&text=IBM',
      verified: true,
      rating: 4.9,
      totalReviews: 1890,
    },
    image: '/placeholder.svg?height=300&width=400&text=Irish+Coffee+Beans',
    category: 'Food & Beverage',
    views: 8670,
    claims: 434,
    maxClaims: 800,
    trending: true,
    location: 'Cork, Ireland',
    originalPrice: 45,
    discountedPrice: 30,
    tags: ['Irish Coffee', 'Gourmet', 'Buy 2 Get 1', 'Premium'],
    urgency: 'low',
    featured: true,
    savings: '€234K',
  },
];

// Regular Offers Data (Expanded from 6 to 12 offers)
export const offers: Offer[] = [
  {
    id: 1,
    title: "50% Off Irish Summer Collection",
    description: "Get 50% off on all summer clothing items including traditional Irish dresses, tops, shorts, and Celtic accessories. Limited time offer!",
    discount: "50%",
    discountType: "percentage",
    validUntil: "2024-08-31",
    brand: {
      id: 1,
      name: "Celtic Fashion",
      logo: "/placeholder.svg?height=40&width=40&text=CF",
      verified: true,
      rating: 4.8,
    },
    image: "/placeholder.svg?height=200&width=300&text=Summer+Sale",
    category: "Fashion",
    views: 1850,
    claims: 129,
    maxClaims: 500,
    trending: true,
    location: "Dublin",
    originalPrice: 200,
    discountedPrice: 100,
    tags: ["Summer", "Irish Fashion", "Celtic"],
  },
  {
    id: 2,
    title: "Free Shipping Weekend",
    description: "Enjoy free shipping on all orders this weekend only. No minimum purchase required for Irish deliveries.",
    discount: "Free Shipping",
    discountType: "shipping",
    validUntil: "2024-07-28",
    brand: {
      id: 3,
      name: "Emerald Tech Solutions",
      logo: "/placeholder.svg?height=40&width=40&text=ETS",
      verified: true,
      rating: 4.7,
    },
    image: "/placeholder.svg?height=200&width=300&text=Free+Shipping",
    category: "Electronics",
    views: 1290,
    claims: 67,
    maxClaims: 200,
    trending: false,
    location: "Galway",
    originalPrice: 15,
    discountedPrice: 0,
    tags: ["Shipping", "Electronics", "Weekend"],
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Irish Coffee",
    description: "Purchase any two premium Irish coffee drinks and get the third one absolutely free. Valid at all Cork locations.",
    discount: "33%",
    discountType: "percentage",
    validUntil: "2024-08-15",
    brand: {
      id: 2,
      name: "Irish Brew Masters",
      logo: "/placeholder.svg?height=40&width=40&text=IBM",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=200&width=300&text=Coffee+Deal",
    category: "Food & Beverage",
    views: 867,
    claims: 43,
    maxClaims: 100,
    trending: true,
    location: "Cork",
    originalPrice: 15,
    discountedPrice: 10,
    tags: ["Irish Coffee", "Buy 2 Get 1", "Beverage"],
  },
  {
    id: 4,
    title: "20% Off First Spa Visit",
    description: "New customers get 20% off their first wellness treatment session at our Killarney spa. Book your relaxation session today!",
    discount: "20%",
    discountType: "percentage",
    validUntil: "2024-12-31",
    brand: {
      id: 4,
      name: "Clover Wellness Spa",
      logo: "/placeholder.svg?height=40&width=40&text=CWS",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=200&width=300&text=Spa+Treatment",
    category: "Health & Beauty",
    views: 632,
    claims: 28,
    maxClaims: 50,
    trending: false,
    location: "Killarney",
    originalPrice: 150,
    discountedPrice: 120,
    tags: ["Spa", "First Visit", "Wellness"],
  },
  {
    id: 5,
    title: "Student Discount - 25% Off Books",
    description: "Students get 25% off with valid student ID. Perfect for back-to-school shopping at our Derry location!",
    discount: "25%",
    discountType: "percentage",
    validUntil: "2024-09-30",
    brand: {
      id: 8,
      name: "Emerald Isle Books",
      logo: "/placeholder.svg?height=40&width=40&text=EIB",
      verified: false,
      rating: 4.6,
    },
    image: "/placeholder.svg?height=200&width=300&text=Student+Discount",
    category: "Education",
    views: 789,
    claims: 67,
    maxClaims: 300,
    trending: true,
    location: "Derry",
    originalPrice: 100,
    discountedPrice: 75,
    tags: ["Student", "Education", "Books"],
  },
  {
    id: 6,
    title: "Fitness Equipment Sale",
    description: "Up to 40% off on premium fitness equipment. Build your home gym with quality Irish-made gear.",
    discount: "40%",
    discountType: "percentage",
    validUntil: "2024-08-20",
    brand: {
      id: 6,
      name: "Celtic Fitness",
      logo: "/placeholder.svg?height=40&width=40&text=CF",
      verified: true,
      rating: 4.5,
    },
    image: "/placeholder.svg?height=200&width=300&text=Fitness+Equipment",
    category: "Sports & Recreation",
    views: 1100,
    claims: 34,
    maxClaims: 150,
    trending: false,
    location: "Belfast",
    originalPrice: 500,
    discountedPrice: 300,
    tags: ["Fitness", "Equipment", "Home Gym"],
  },
];

// Hot Deals Data (Expanded from 6 to 10 deals)
export const hotDeals: HotDeal[] = [
  {
    id: 1,
    title: "⚡ Flash Sale: 70% Off Designer Irish Watches",
    description: "Limited time flash sale on premium Irish designer watches. Only 50 pieces available at this incredible price!",
    discount: "70%",
    discountType: "percentage",
    originalPrice: 500,
    salePrice: 150,
    discountedPrice: 150,
    validUntil: "2024-07-30T23:59:59",
    brand: {
      id: 1,
      name: "Celtic Fashion",
      logo: "/placeholder.svg?height=40&width=40&text=CF",
      verified: true,
      rating: 4.9,
    },
    image: "/placeholder.svg?height=300&width=400&text=Designer+Watches",
    category: "Fashion & Accessories",
    views: 25600,
    claims: 1250,
    maxClaims: 2000,
    location: "Dublin, Ireland",
    urgency: "flash",
    timeLeft: "2h 15m",
    hotness: 95,
    tags: ["Flash Sale", "Limited Stock", "Designer", "Premium"],
    trending: true,
  },
  {
    id: 2,
    title: "🔥 Today Only: Buy 1 Get 2 Free Gourmet Irish Meals",
    description: "Incredible deal on gourmet Irish meal kits. Perfect for food lovers who want restaurant-quality meals at home.",
    discount: "67%",
    discountType: "bogo",
    originalPrice: 90,
    salePrice: 30,
    discountedPrice: 30,
    validUntil: "2024-07-29T23:59:59",
    brand: {
      id: 10,
      name: "Irish Gourmet Kitchen",
      logo: "/placeholder.svg?height=40&width=40&text=IGK",
      verified: true,
      rating: 4.8,
    },
    image: "/placeholder.svg?height=300&width=400&text=Gourmet+Meals",
    category: "Food & Dining",
    views: 18900,
    claims: 890,
    maxClaims: 1500,
    location: "Kilkenny, Ireland",
    urgency: "today",
    timeLeft: "18h 45m",
    hotness: 88,
    tags: ["Today Only", "Irish Food", "Gourmet", "Buy 1 Get 2"],
    trending: true,
  },
  {
    id: 3,
    title: "💥 Weekend Blowout: 60% Off Tech Gadgets",
    description: "Massive weekend sale on the latest tech gadgets including smartphones, tablets, and smart home devices available in Ireland.",
    discount: "60%",
    discountType: "percentage",
    originalPrice: 800,
    salePrice: 320,
    discountedPrice: 320,
    validUntil: "2024-07-31T23:59:59",
    brand: {
      id: 3,
      name: "Emerald Tech Solutions",
      logo: "/placeholder.svg?height=40&width=40&text=ETS",
      verified: true,
      rating: 4.7,
    },
    image: "/placeholder.svg?height=300&width=400&text=Tech+Gadgets",
    category: "Electronics & Tech",
    views: 32100,
    claims: 1560,
    maxClaims: 3000,
    location: "Galway, Ireland",
    urgency: "weekend",
    timeLeft: "2d 18h",
    hotness: 92,
    tags: ["Weekend Sale", "Tech", "Gadgets", "Smart Home"],
    trending: true,
  },
];

// Claimed Offers Data
export const claimedOffers: ClaimedOffer[] = [
  {
    id: 1,
    title: "50% Off Irish Summer Collection",
    description: "Get 50% off on all summer clothing items. Limited time offer!",
    discount: "50%",
    discountType: "percentage",
    validUntil: "2024-08-31",
    brand: {
      name: "Celtic Fashion",
      logo: "/placeholder.svg?height=40&width=40&text=CF",
      verified: true,
      id: 1,
      rating: 4.8,
    },
    savings: "€125",
    claimedDate: "2024-07-20",
    status: "active",
    expiryDate: "2024-08-31",
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=300&text=Summer+Sale",
    code: "SUMMER50",
    usageCount: 1,
    maxUsage: 3,
    views: 1850,
    claims: 129,
    maxClaims: 500,
    trending: true,
    location: "Dublin",
    originalPrice: 200,
    discountedPrice: 100,
    tags: ["Summer", "Irish Fashion", "Celtic"],
  },
  {
    id: 2,
    title: "Free Premium Shipping",
    description: "Enjoy free shipping on all orders this weekend only.",
    discount: "Free Shipping",
    discountType: "shipping",
    validUntil: "2024-07-28",
    brand: {
      name: "Emerald Tech Solutions",
      logo: "/placeholder.svg?height=40&width=40&text=ETS",
      verified: true,
      id: 3,
      rating: 4.7,
    },
    savings: "€25",
    claimedDate: "2024-07-18",
    status: "used",
    expiryDate: "2024-07-28",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=300&text=Free+Shipping",
    code: "FREESHIP",
    usageCount: 1,
    maxUsage: 1,
    views: 1290,
    claims: 67,
    maxClaims: 200,
    trending: false,
    location: "Galway",
    originalPrice: 25,
    discountedPrice: 0,
    tags: ["Shipping", "Electronics", "Weekend"],
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Irish Coffee",
    description: "Purchase any two premium coffee drinks and get the third one absolutely free.",
    discount: "33%",
    discountType: "bogo",
    validUntil: "2024-07-20",
    brand: {
      name: "Irish Brew Masters",
      logo: "/placeholder.svg?height=40&width=40&text=IBM",
      verified: true,
      id: 2,
      rating: 4.9,
    },
    savings: "€15",
    claimedDate: "2024-07-15",
    status: "expired",
    expiryDate: "2024-07-20",
    category: "Food & Beverage",
    image: "/placeholder.svg?height=200&width=300&text=Coffee+Deal",
    code: "COFFEE3FOR2",
    usageCount: 2,
    maxUsage: 5,
    views: 867,
    claims: 43,
    maxClaims: 100,
    trending: true,
    location: "Cork",
    originalPrice: 15,
    discountedPrice: 10,
    tags: ["Irish Coffee", "Buy 2 Get 1", "Beverage"],
  },
];

// Categories Data
export const categories: Category[] = [
  {
    name: 'Fashion',
    icon: '👗',
    count: 3450,
    color: 'from-pink-500 to-rose-500',
    description: 'Irish clothing, accessories, and style',
    trending: true,
  },
  {
    name: 'Electronics',
    icon: '📱',
    count: 2890,
    color: 'from-blue-500 to-cyan-500',
    description: 'Gadgets, tech, and devices',
    trending: true,
  },
  {
    name: 'Beauty',
    icon: '💄',
    count: 2160,
    color: 'from-purple-500 to-pink-500',
    description: 'Skincare, makeup, and wellness',
    trending: false,
  },
  {
    name: 'Food',
    icon: '🍕',
    count: 1940,
    color: 'from-orange-500 to-red-500',
    description: 'Irish restaurants, groceries, and treats',
    trending: true,
  },
  {
    name: 'Travel',
    icon: '✈️',
    count: 1480,
    color: 'from-green-500 to-teal-500',
    description: 'Irish hotels, flights, and experiences',
    trending: false,
  },
  {
    name: 'Health',
    icon: '🏥',
    count: 1270,
    color: 'from-emerald-500 to-green-500',
    description: 'Fitness, supplements, and care',
    trending: false,
  },
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Siobhan O\'Connor',
    avatar: '/placeholder.svg?height=60&width=60&text=SO',
    role: 'Fashion Enthusiast',
    content: "I've saved over €2,000 this year using FindMyDeals! The Irish deals are incredible and the platform is so easy to use.",
    rating: 5,
    savings: '€2,156',
  },
  {
    id: 2,
    name: 'Liam Murphy',
    avatar: '/placeholder.svg?height=60&width=60&text=LM',
    role: 'Tech Professional',
    content: 'Found amazing deals on electronics here. The verification system gives me confidence in every purchase from Irish retailers.',
    rating: 5,
    savings: '€1,890',
  },
  {
    id: 3,
    name: 'Aoife Kelly',
    avatar: '/placeholder.svg?height=60&width=60&text=AK',
    role: 'Small Business Owner',
    content: 'As a brand owner in Dublin, this platform has helped us reach thousands of new customers across Ireland. Highly recommended!',
    rating: 5,
    savings: '€5,670',
  },
];

// User Data
export const userData: UserData = {
  id: 1,
  name: "Siobhan O'Connor",
  email: "siobhan.oconnor@email.com",
  avatar: "/placeholder.svg?height=80&width=80&text=SO",
  joinDate: "2024-01-15",
  totalSavings: 2156,
  claimedOffers: 23,
  favoriteOffers: 12,
  membershipLevel: "Gold",
  nextLevelProgress: 75,
  notifications: 3,
  rewardPoints: 1250,
};

// Recent Activity Data
export const recentActivity: Activity[] = [
  {
    id: 1,
    type: "claim",
    title: "Claimed 50% Off Irish Summer Collection",
    brand: "Celtic Fashion",
    timestamp: "2 hours ago",
    icon: "Gift",
    color: "text-green-600",
  },
  {
    id: 2,
    type: "favorite",
    title: "Added Spa Treatment to favorites",
    brand: "Clover Wellness Spa",
    timestamp: "1 day ago",
    icon: "Heart",
    color: "text-red-600",
  },
  {
    id: 3,
    type: "achievement",
    title: "Reached Gold membership level",
    brand: "FindMyDeals",
    timestamp: "3 days ago",
    icon: "Award",
    color: "text-yellow-600",
  },
];

// Brand Data for Individual Brand Page
export const brandData: Brand = {
  id: 1,
  name: 'Celtic Fashion',
  description: "Celtic Fashion is a leading sustainable fashion brand committed to creating trendy, high-quality clothing while minimizing environmental impact. Founded in 2020, we've been at the forefront of eco-conscious fashion, using recycled materials and ethical manufacturing processes.",
  category: 'Clothing & Fashion',
  location: 'Dublin, Ireland',
  website: 'https://celticfashion.ie',
  email: 'contact@celticfashion.ie',
  phone: '+353 1 234 5678',
  rating: 4.8,
  totalReviews: 2340,
  verified: true,
  joinedDate: '2023-01-15',
  totalOffers: 12,
  activeOffers: 4,
  totalViews: 25420,
  address: '15 Grafton Street, Dublin 2, Ireland',
  logo: '/placeholder.svg?height=80&width=80&text=CF',
  followers: 18500,
  totalSavings: '€185,000',
  trending: true,
};

// Mock Offer for Individual Offer Page
export const mockOffer: Offer = {
  id: 1,
  title: "50% Off Irish Summer Collection",
  description: "Get 50% off on all summer clothing items including traditional Irish dresses, tops, shorts, and Celtic accessories. This exclusive offer is perfect for updating your wardrobe with the latest summer trends. Don't miss out on this limited-time opportunity to save big on premium Irish fashion items.",
  discount: "50%",
  discountType: "percentage",
  originalPrice: 200,
  discountedPrice: 100,
  validFrom: "2024-07-01",
  validUntil: "2024-08-31",
  isActive: true,
  views: 1850,
  claims: 129,
  maxClaims: 500,
  category: "Fashion & Clothing",
  tags: ["Summer", "Irish Fashion", "Celtic", "Sale"],
  terms: [
    "Valid on all summer collection items",
    "Cannot be combined with other offers",
    "Valid for online and in-store purchases",
    "Minimum purchase of €50 required",
    "Offer expires on August 31, 2024",
  ],
  brand: {
    id: 1,
    name: "Celtic Fashion",
    logo: "/placeholder.svg?height=80&width=80&text=CF",
    description: "Premium Irish fashion brand offering trendy and affordable clothing for modern lifestyle.",
    rating: 4.8,
    totalReviews: 2340,
    verified: true,
    location: "Dublin, Ireland",
    website: "https://celticfashion.ie",
  },
  images: [
    "/placeholder.svg?height=400&width=600&text=Irish+Summer+Collection+1",
    "/placeholder.svg?height=400&width=600&text=Irish+Summer+Collection+2",
    "/placeholder.svg?height=400&width=600&text=Irish+Summer+Collection+3",
  ],
  image: "/placeholder.svg?height=400&width=600&text=Irish+Summer+Collection",
  trending: true,
  location: "Dublin, Ireland",
};
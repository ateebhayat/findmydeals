# FindMyDeals Platform - Complete API Documentation

## Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Offers APIs](#offers-apis)
3. [Hot Deals APIs](#hot-deals-apis)
4. [Brands APIs](#brands-apis)
5. [Customer Dashboard APIs](#customer-dashboard-apis)
6. [Search & Filtering APIs](#search--filtering-apis)
7. [Categories APIs](#categories-apis)
8. [Notifications APIs](#notifications-apis)
9. [Analytics APIs](#analytics-apis)
10. [Favorites APIs](#favorites-apis)
11. [Reviews & Ratings APIs](#reviews--ratings-apis)
12. [User Profile APIs](#user-profile-apis)
13. [Admin APIs](#admin-apis)

---

## Authentication APIs

### POST /api/auth/customer/register
**Description:** Register a new customer account

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "preferences": {
    "categories": ["fashion", "electronics"],
    "notifications": true,
    "newsletter": true
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "name": "John Doe",
    "avatar": null,
    "phone": "+1234567890",
    "membershipLevel": "Bronze",
    "joinDate": "2024-07-29T10:00:00Z",
    "totalSavings": 0,
    "rewardPoints": 100,
    "preferences": {
      "categories": ["fashion", "electronics"],
      "notifications": true,
      "newsletter": true
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "message": "Account created successfully! Welcome to FindMyDeals!"
}
\`\`\`

### POST /api/auth/customer/login
**Description:** Login customer account

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "securePassword123",
  "rememberMe": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "name": "John Doe",
    "avatar": "https://cdn.brandoffers.com/avatars/user_123.jpg",
    "phone": "+1234567890",
    "membershipLevel": "Gold",
    "nextLevelProgress": 75,
    "joinDate": "2024-01-15T00:00:00Z",
    "totalSavings": 2156,
    "claimedOffers": 23,
    "favoriteOffers": 12,
    "rewardPoints": 1250,
    "notifications": 3,
    "preferences": {
      "categories": ["fashion", "electronics", "beauty"],
      "notifications": true,
      "newsletter": true
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "message": "Login successful! Welcome back!"
}
\`\`\`

### POST /api/auth/brand/register
**Description:** Register a new brand account

**Request Body:**
\`\`\`json
{
  "brandName": "Fashion Forward",
  "email": "contact@fashionforward.com",
  "password": "brandPassword123",
  "website": "https://fashionforward.com",
  "category": "fashion",
  "description": "Premium fashion brand offering trendy clothing",
  "location": "New York, NY",
  "phone": "+1234567890",
  "businessRegistration": "REG123456789"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "brand": {
    "id": "brand_456",
    "name": "Fashion Forward",
    "email": "contact@fashionforward.com",
    "website": "https://fashionforward.com",
    "category": "fashion",
    "description": "Premium fashion brand offering trendy clothing",
    "location": "New York, NY",
    "phone": "+1234567890",
    "logo": null,
    "coverImage": null,
    "verified": false,
    "rating": 0,
    "totalReviews": 0,
    "activeOffers": 0,
    "totalOffers": 0,
    "followers": 0,
    "joinedDate": "2024-07-29T10:00:00Z",
    "status": "pending_verification"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Brand registered successfully! Verification pending."
}
\`\`\`

### POST /api/auth/brand/login
**Description:** Login brand account

**Request Body:**
\`\`\`json
{
  "email": "contact@fashionforward.com",
  "password": "brandPassword123",
  "rememberMe": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "brand": {
    "id": "brand_456",
    "name": "Fashion Forward",
    "email": "contact@fashionforward.com",
    "website": "https://fashionforward.com",
    "category": "fashion",
    "description": "Premium fashion brand offering trendy clothing",
    "location": "New York, NY",
    "phone": "+1234567890",
    "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
    "coverImage": "https://cdn.brandoffers.com/covers/brand_456.jpg",
    "verified": true,
    "rating": 4.8,
    "totalReviews": 2340,
    "activeOffers": 3,
    "totalOffers": 8,
    "followers": 12500,
    "joinedDate": "2023-01-15T00:00:00Z",
    "status": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "message": "Login successful! Welcome back!"
}
\`\`\`

### POST /api/auth/logout
**Description:** Logout user/brand

**Request Body:**
\`\`\`json
{
  "refreshToken": "refresh_token_here"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Logged out successfully"
}
\`\`\`

### POST /api/auth/refresh-token
**Description:** Refresh authentication token

**Request Body:**
\`\`\`json
{
  "refreshToken": "refresh_token_here"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "new_jwt_token_here",
  "refreshToken": "new_refresh_token_here"
}
\`\`\`

### POST /api/auth/forgot-password
**Description:** Request password reset

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "userType": "customer"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
\`\`\`

### POST /api/auth/reset-password
**Description:** Reset password with token

**Request Body:**
\`\`\`json
{
  "token": "reset_token_here",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Password reset successfully"
}
\`\`\`

---

## Offers APIs

### GET /api/offers
**Description:** Get all offers with filtering and pagination

**Query Parameters:**
- `category` (string): Filter by category
- `sort` (string): Sort by (trending, newest, discount, expiry)
- `limit` (number): Number of results per page
- `page` (number): Page number
- `search` (string): Search query
- `discount_min` (number): Minimum discount percentage
- `discount_max` (number): Maximum discount percentage
- `location` (string): Filter by location

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "offer_123",
        "title": "50% Off Summer Collection",
        "description": "Get 50% off on all summer clothing items including dresses, tops, shorts, and accessories. This exclusive offer is perfect for updating your wardrobe with the latest summer trends.",
        "discount": "50%",
        "discountType": "percentage",
        "originalPrice": 200,
        "discountedPrice": 100,
        "validFrom": "2024-07-01T00:00:00Z",
        "validUntil": "2024-08-31T23:59:59Z",
        "brand": {
          "id": "brand_456",
          "name": "Fashion Forward",
          "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
          "verified": true,
          "rating": 4.8,
          "totalReviews": 2340,
          "location": "New York, NY"
        },
        "category": "Fashion & Clothing",
        "subcategory": "Women's Clothing",
        "tags": ["Summer", "Clothing", "Fashion", "Free Shipping"],
        "images": [
          "https://cdn.brandoffers.com/offers/offer_123_1.jpg",
          "https://cdn.brandoffers.com/offers/offer_123_2.jpg",
          "https://cdn.brandoffers.com/offers/offer_123_3.jpg"
        ],
        "views": 12500,
        "claims": 890,
        "maxClaims": 2000,
        "trending": true,
        "featured": true,
        "urgency": "high",
        "location": "New York, NY",
        "createdAt": "2024-07-01T00:00:00Z",
        "updatedAt": "2024-07-29T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    },
    "filters": {
      "categories": [
        {"id": "fashion", "name": "Fashion", "count": 45},
        {"id": "electronics", "name": "Electronics", "count": 32},
        {"id": "food", "name": "Food & Beverage", "count": 28}
      ],
      "priceRanges": [
        {"range": "0-50", "count": 23},
        {"range": "50-100", "count": 45},
        {"range": "100-200", "count": 67},
        {"range": "200+", "count": 21}
      ],
      "locations": [
        {"city": "New York", "count": 34},
        {"city": "Los Angeles", "count": 28},
        {"city": "Chicago", "count": 19}
      ],
      "discountRanges": [
        {"range": "10-25%", "count": 12},
        {"range": "25-50%", "count": 78},
        {"range": "50-75%", "count": 45},
        {"range": "75%+", "count": 21}
      ]
    },
    "metadata": {
      "totalOffers": 15000,
      "averageDiscount": "42%",
      "totalSavings": "$2.5M",
      "lastUpdated": "2024-07-29T10:00:00Z"
    }
  }
}
\`\`\`

### GET /api/offers/{id}
**Description:** Get specific offer details

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "offer_123",
    "title": "50% Off Summer Collection",
    "description": "Get 50% off on all summer clothing items including dresses, tops, shorts, and accessories. This exclusive offer is perfect for updating your wardrobe with the latest summer trends. Don't miss out on this limited-time opportunity to save big on premium fashion items.",
    "longDescription": "Transform your summer wardrobe with our exclusive 50% off sale on the entire summer collection. This comprehensive offer includes everything you need for the perfect summer look - from breezy dresses and stylish tops to comfortable shorts and statement accessories. Our summer collection features the latest trends in sustainable fashion, with pieces made from eco-friendly materials that don't compromise on style or quality.",
    "discount": "50%",
    "discountType": "percentage",
    "originalPrice": 200,
    "discountedPrice": 100,
    "validFrom": "2024-07-01T00:00:00Z",
    "validUntil": "2024-08-31T23:59:59Z",
    "brand": {
      "id": "brand_456",
      "name": "Fashion Forward",
      "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
      "description": "Premium fashion brand offering trendy and affordable clothing for modern lifestyle.",
      "verified": true,
      "rating": 4.8,
      "totalReviews": 2340,
      "location": "New York, NY",
      "website": "https://fashionforward.com",
      "phone": "+1234567890",
      "email": "contact@fashionforward.com"
    },
    "category": "Fashion & Clothing",
    "subcategory": "Women's Clothing",
    "tags": ["Summer", "Clothing", "Fashion", "Free Shipping", "Sustainable", "Eco-friendly"],
    "images": [
      "https://cdn.brandoffers.com/offers/offer_123_1.jpg",
      "https://cdn.brandoffers.com/offers/offer_123_2.jpg",
      "https://cdn.brandoffers.com/offers/offer_123_3.jpg",
      "https://cdn.brandoffers.com/offers/offer_123_4.jpg"
    ],
    "views": 12500,
    "claims": 890,
    "maxClaims": 2000,
    "trending": true,
    "featured": true,
    "urgency": "high",
    "location": "New York, NY",
    "terms": [
      "Valid on all summer collection items",
      "Cannot be combined with other offers",
      "Valid for online and in-store purchases",
      "Minimum purchase of $50 required",
      "Free shipping on orders over $75",
      "Offer expires on August 31, 2024",
      "Returns accepted within 30 days"
    ],
    "howToRedeem": [
      "Visit the brand's website or store",
      "Add qualifying items to your cart",
      "Enter promo code SUMMER50 at checkout",
      "Discount will be applied automatically",
      "Complete your purchase"
    ],
    "restrictions": [
      "One use per customer",
      "Cannot be combined with other promotions",
      "Valid for new customers only",
      "Excludes sale items"
    ],
    "similarOffers": [
      {
        "id": "offer_789",
        "title": "Summer Sale - 30% Off",
        "discount": "30%",
        "brand": "Style Central",
        "image": "https://cdn.brandoffers.com/offers/offer_789.jpg"
      },
      {
        "id": "offer_456",
        "title": "Fashion Week Special",
        "discount": "40%",
        "brand": "Urban Threads",
        "image": "https://cdn.brandoffers.com/offers/offer_456.jpg"
      }
    ],
    "reviews": [
      {
        "id": "review_123",
        "userId": "user_789",
        "userName": "Sarah M.",
        "userAvatar": "https://cdn.brandoffers.com/avatars/user_789.jpg",
        "rating": 5,
        "comment": "Amazing deal! Saved $150 on my summer wardrobe. Quality is excellent!",
        "createdAt": "2024-07-25T14:30:00Z",
        "helpful": 12
      }
    ],
    "createdAt": "2024-07-01T00:00:00Z",
    "updatedAt": "2024-07-29T10:00:00Z"
  }
}
\`\`\`

### POST /api/offers/{id}/claim
**Description:** Claim an offer

**Request Body:**
\`\`\`json
{
  "userId": "user_123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "claimId": "claim_456",
    "offerId": "offer_123",
    "userId": "user_123",
    "claimedAt": "2024-07-29T10:30:00Z",
    "status": "active",
    "promoCode": "SUMMER50-ABC123",
    "qrCode": "https://cdn.brandoffers.com/qr/claim_456.png",
    "expiryDate": "2024-08-31T23:59:59Z",
    "usageCount": 0,
    "maxUsage": 3,
    "savings": 100,
    "instructions": [
      "Visit fashionforward.com",
      "Add items worth $50+ to cart",
      "Enter code SUMMER50-ABC123 at checkout",
      "Enjoy your 50% discount!"
    ]
  },
  "message": "Offer claimed successfully! Check your email for the discount code."
}
\`\`\`

### POST /api/offers/{id}/view
**Description:** Track offer view

**Request Body:**
\`\`\`json
{
  "userId": "user_123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offerId": "offer_123",
    "views": 12501,
    "userViewed": true
  }
}
\`\`\`

### POST /api/offers
**Description:** Create new offer (Brand only)

**Request Body:**
\`\`\`json
{
  "title": "50% Off Summer Collection",
  "description": "Get 50% off on all summer clothing items",
  "longDescription": "Transform your summer wardrobe with our exclusive 50% off sale...",
  "discount": "50%",
  "discountType": "percentage",
  "originalPrice": 200,
  "discountedPrice": 100,
  "validFrom": "2024-07-01T00:00:00Z",
  "validUntil": "2024-08-31T23:59:59Z",
  "category": "Fashion & Clothing",
  "subcategory": "Women's Clothing",
  "tags": ["Summer", "Clothing", "Fashion"],
  "images": [
    "https://cdn.brandoffers.com/offers/offer_123_1.jpg"
  ],
  "maxClaims": 2000,
  "terms": [
    "Valid on all summer collection items",
    "Cannot be combined with other offers"
  ],
  "howToRedeem": [
    "Visit the brand's website or store",
    "Add qualifying items to your cart"
  ],
  "restrictions": [
    "One use per customer"
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "offer_123",
    "title": "50% Off Summer Collection",
    "status": "pending_approval",
    "createdAt": "2024-07-29T10:30:00Z"
  },
  "message": "Offer created successfully and submitted for approval"
}
\`\`\`

### PUT /api/offers/{id}
**Description:** Update offer (Brand only)

**Request Body:**
\`\`\`json
{
  "title": "60% Off Summer Collection",
  "description": "Updated description",
  "validUntil": "2024-09-30T23:59:59Z"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "offer_123",
    "title": "60% Off Summer Collection",
    "updatedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Offer updated successfully"
}
\`\`\`

### DELETE /api/offers/{id}
**Description:** Delete offer (Brand only)

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Offer deleted successfully"
}
\`\`\`

---

## Hot Deals APIs

### GET /api/deals/hot
**Description:** Get hot deals with urgency filtering

**Query Parameters:**
- `limit` (number): Number of results
- `category` (string): Filter by category
- `urgency` (string): Filter by urgency level (flash, today, weekend, clearance)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "deals": [
      {
        "id": "deal_123",
        "title": "⚡ Flash Sale: 70% Off Designer Watches",
        "description": "Limited time flash sale on premium designer watches. Only 50 pieces available at this incredible price!",
        "discount": "70%",
        "discountType": "percentage",
        "originalPrice": 500,
        "salePrice": 150,
        "validFrom": "2024-07-29T08:00:00Z",
        "validUntil": "2024-07-30T23:59:59Z",
        "brand": {
          "id": "brand_789",
          "name": "Luxury Time",
          "logo": "https://cdn.brandoffers.com/logos/brand_789.jpg",
          "verified": true,
          "rating": 4.9,
          "location": "New York, NY"
        },
        "category": "Fashion & Accessories",
        "subcategory": "Watches",
        "image": "https://cdn.brandoffers.com/deals/deal_123.jpg",
        "images": [
          "https://cdn.brandoffers.com/deals/deal_123_1.jpg",
          "https://cdn.brandoffers.com/deals/deal_123_2.jpg"
        ],
        "views": 25600,
        "claims": 1250,
        "maxClaims": 2000,
        "urgency": "flash",
        "hotness": 95,
        "timeLeft": "2h 15m",
        "timeLeftSeconds": 8100,
        "tags": ["Flash Sale", "Limited Stock", "Designer", "Premium"],
        "location": "New York, NY",
        "trending": true,
        "featured": true
      }
    ],
    "metadata": {
      "totalDeals": 6,
      "averageDiscount": "62%",
      "totalSavings": "$2.5M",
      "hotDealsCount": 3,
      "flashSalesCount": 2,
      "lastUpdated": "2024-07-29T10:00:00Z"
    },
    "urgencyLevels": [
      {"level": "flash", "count": 2, "description": "Ending in hours"},
      {"level": "today", "count": 1, "description": "Ending today"},
      {"level": "weekend", "count": 2, "description": "Weekend only"},
      {"level": "clearance", "count": 1, "description": "Final clearance"}
    ]
  }
}
\`\`\`

### GET /api/deals/{id}
**Description:** Get specific hot deal details

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "deal_123",
    "title": "⚡ Flash Sale: 70% Off Designer Watches",
    "description": "Limited time flash sale on premium designer watches. Only 50 pieces available at this incredible price!",
    "longDescription": "Don't miss this incredible flash sale on our premium designer watch collection. These luxury timepieces feature Swiss movements, sapphire crystal glass, and premium leather straps. Perfect for both casual and formal occasions.",
    "discount": "70%",
    "discountType": "percentage",
    "originalPrice": 500,
    "salePrice": 150,
    "validFrom": "2024-07-29T08:00:00Z",
    "validUntil": "2024-07-30T23:59:59Z",
    "brand": {
      "id": "brand_789",
      "name": "Luxury Time",
      "logo": "https://cdn.brandoffers.com/logos/brand_789.jpg",
      "description": "Premium watch retailer specializing in luxury timepieces",
      "verified": true,
      "rating": 4.9,
      "totalReviews": 1250,
      "location": "New York, NY",
      "website": "https://luxurytime.com"
    },
    "category": "Fashion & Accessories",
    "subcategory": "Watches",
    "images": [
      "https://cdn.brandoffers.com/deals/deal_123_1.jpg",
      "https://cdn.brandoffers.com/deals/deal_123_2.jpg",
      "https://cdn.brandoffers.com/deals/deal_123_3.jpg"
    ],
    "views": 25600,
    "claims": 1250,
    "maxClaims": 2000,
    "urgency": "flash",
    "hotness": 95,
    "timeLeft": "2h 15m",
    "timeLeftSeconds": 8100,
    "tags": ["Flash Sale", "Limited Stock", "Designer", "Premium"],
    "location": "New York, NY",
    "trending": true,
    "featured": true,
    "terms": [
      "Limited to 50 pieces only",
      "Valid for 24 hours only",
      "Cannot be combined with other offers",
      "Free shipping included"
    ],
    "howToRedeem": [
      "Visit luxurytime.com",
      "Select your preferred watch",
      "Enter code FLASH70 at checkout",
      "Complete purchase within 24 hours"
    ]
  }
}
\`\`\`

---

## Brands APIs

### GET /api/brands
**Description:** Get all brands with filtering and pagination

**Query Parameters:**
- `category` (string): Filter by category
- `verified` (boolean): Filter by verification status
- `limit` (number): Number of results per page
- `page` (number): Page number
- `sort` (string): Sort by (rating, newest, followers)
- `search` (string): Search query

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "brands": [
      {
        "id": "brand_123",
        "name": "Fashion Forward",
        "description": "Trendy clothing for the modern lifestyle. Sustainable fashion with a focus on quality and style.",
        "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg",
        "coverImage": "https://cdn.brandoffers.com/covers/brand_123.jpg",
        "category": "Clothing & Fashion",
        "subcategories": ["Women's Clothing", "Men's Clothing", "Accessories"],
        "location": "New York, NY",
        "website": "https://fashionforward.com",
        "verified": true,
        "rating": 4.8,
        "totalReviews": 2340,
        "activeOffers": 3,
        "totalOffers": 8,
        "followers": 12500,
        "totalSavings": "$125,000",
        "trending": true,
        "joinedDate": "2023-01-15T00:00:00Z",
        "lastOfferDate": "2024-07-25T00:00:00Z",
        "socialMedia": {
          "instagram": "@fashionforward",
          "facebook": "fashionforwardny",
          "twitter": "@fashionforward"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 2500,
      "totalPages": 125,
      "hasNext": true,
      "hasPrev": false
    },
    "filters": {
      "categories": [
        {"id": "fashion", "name": "Fashion", "count": 450},
        {"id": "electronics", "name": "Electronics", "count": 320},
        {"id": "food", "name": "Food & Beverage", "count": 280}
      ],
      "locations": [
        {"city": "New York", "count": 340},
        {"city": "Los Angeles", "count": 280},
        {"city": "Chicago", "count": 190}
      ],
      "verificationStatus": [
        {"status": "verified", "count": 2100},
        {"status": "pending", "count": 400}
      ]
    }
  }
}
\`\`\`

### GET /api/brands/{id}
**Description:** Get specific brand details

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "brand_123",
    "name": "Fashion Forward",
    "description": "Premium fashion brand offering trendy and affordable clothing for modern lifestyle. Founded in 2020, we've been at the forefront of eco-conscious fashion, using recycled materials and ethical manufacturing processes.",
    "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg",
    "coverImage": "https://cdn.brandoffers.com/covers/brand_123.jpg",
    "category": "Clothing & Fashion",
    "subcategories": ["Women's Clothing", "Men's Clothing", "Accessories"],
    "location": "New York, NY",
    "address": "123 Fashion Avenue, New York, NY 10001",
    "website": "https://fashionforward.com",
    "email": "contact@fashionforward.com",
    "phone": "+1 (555) 123-4567",
    "verified": true,
    "rating": 4.8,
    "totalReviews": 2340,
    "activeOffers": 3,
    "totalOffers": 8,
    "followers": 12500,
    "totalSavings": "$125,000",
    "totalViews": 15420,
    "trending": true,
    "joinedDate": "2023-01-15T00:00:00Z",
    "lastOfferDate": "2024-07-25T00:00:00Z",
    "socialMedia": {
      "instagram": "@fashionforward",
      "facebook": "fashionforwardny",
      "twitter": "@fashionforward",
      "linkedin": "fashion-forward-ny"
    },
    "businessHours": {
      "monday": "9:00 AM - 8:00 PM",
      "tuesday": "9:00 AM - 8:00 PM",
      "wednesday": "9:00 AM - 8:00 PM",
      "thursday": "9:00 AM - 8:00 PM",
      "friday": "9:00 AM - 9:00 PM",
      "saturday": "10:00 AM - 9:00 PM",
      "sunday": "11:00 AM - 7:00 PM"
    },
    "offers": [
      {
        "id": "offer_456",
        "title": "50% Off Summer Collection",
        "discount": "50%",
        "validUntil": "2024-08-31T23:59:59Z",
        "claims": 890,
        "image": "https://cdn.brandoffers.com/offers/offer_456.jpg",
        "trending": true
      }
    ],
    "reviews": [
      {
        "id": "review_789",
        "userId": "user_456",
        "userName": "Sarah J.",
        "userAvatar": "https://cdn.brandoffers.com/avatars/user_456.jpg",
        "rating": 5,
        "comment": "Amazing deals and great quality products! Fast shipping and excellent customer service.",
        "createdAt": "2024-07-20T10:00:00Z",
        "helpful": 15
      }
    ],
    "similarBrands": [
      {
        "id": "brand_456",
        "name": "Style Central",
        "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
        "category": "Clothing & Fashion",
        "rating": 4.7
      }
    ],
    "stats": {
      "monthlyViews": 5420,
      "monthlyFollowers": 234,
      "conversionRate": 2.3,
      "averageOrderValue": 125
    }
  }
}
\`\`\`

### POST /api/brands/{id}/follow
**Description:** Follow/unfollow a brand

**Request Body:**
\`\`\`json
{
  "userId": "user_123",
  "action": "follow"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "brandId": "brand_123",
    "userId": "user_123",
    "following": true,
    "followersCount": 12501
  },
  "message": "You are now following Fashion Forward!"
}
\`\`\`

### GET /api/brands/{id}/offers
**Description:** Get all offers from a specific brand

**Query Parameters:**
- `status` (string): Filter by status (active, expired, upcoming)
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "offer_456",
        "title": "50% Off Summer Collection",
        "discount": "50%",
        "validFrom": "2024-07-01T00:00:00Z",
        "validUntil": "2024-08-31T23:59:59Z",
        "claims": 890,
        "maxClaims": 2000,
        "status": "active",
        "image": "https://cdn.brandoffers.com/offers/offer_456.jpg",
        "trending": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8,
      "totalPages": 1
    },
    "summary": {
      "activeOffers": 3,
      "expiredOffers": 4,
      "upcomingOffers": 1,
      "totalClaims": 2340,
      "totalSavings": "$125,000"
    }
  }
}
\`\`\`

---

## Customer Dashboard APIs

### GET /api/customer/dashboard
**Description:** Get customer dashboard data

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Sarah Johnson",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah.johnson@email.com",
      "avatar": "https://cdn.brandoffers.com/avatars/user_123.jpg",
      "phone": "+1234567890",
      "membershipLevel": "Gold",
      "nextLevelProgress": 75,
      "nextLevelRequirement": "$500 more to reach Platinum",
      "joinDate": "2024-01-15T00:00:00Z",
      "totalSavings": 2156,
      "claimedOffers": 23,
      "favoriteOffers": 12,
      "rewardPoints": 1250,
      "notifications": 3,
      "preferences": {
        "categories": ["fashion", "electronics", "beauty"],
        "notifications": true,
        "newsletter": true,
        "location": "New York, NY"
      }
    },
    "stats": {
      "thisMonth": {
        "savings": 234,
        "claimedOffers": 3,
        "rewardPoints": 150,
        "viewedOffers": 45
      },
      "thisWeek": {
        "savings": 89,
        "claimedOffers": 1,
        "rewardPoints": 45,
        "viewedOffers": 12
      },
      "allTime": {
        "totalSavings": 2156,
        "totalClaims": 23,
        "totalPoints": 1250,
        "favoriteOffers": 12
      }
    },
    "recentActivity": [
      {
        "id": "activity_123",
        "type": "claim",
        "title": "Claimed 50% Off Summer Collection",
        "brand": "Fashion Forward",
        "timestamp": "2024-07-29T08:30:00Z",
        "icon": "gift",
        "color": "green",
        "savings": 125
      },
      {
        "id": "activity_456",
        "type": "favorite",
        "title": "Added Spa Treatment to favorites",
        "brand": "Serenity Spa",
        "timestamp": "2024-07-28T14:20:00Z",
        "icon": "heart",
        "color": "red"
      },
      {
        "id": "activity_789",
        "type": "achievement",
        "title": "Reached Gold membership level",
        "brand": "FindMyDeals",
        "timestamp": "2024-07-25T10:15:00Z",
        "icon": "award",
        "color": "yellow"
      }
    ],
    "upcomingExpirations": [
      {
        "claimId": "claim_123",
        "offerTitle": "50% Off Summer Collection",
        "brand": "Fashion Forward",
        "expiryDate": "2024-08-31T23:59:59Z",
        "daysLeft": 33
      }
    ],
    "recommendations": [
      {
        "id": "offer_789",
        "title": "20% Off Electronics",
        "brand": "TechHub Pro",
        "discount": "20%",
        "reason": "Based on your electronics preferences"
      }
    ]
  }
}
\`\`\`

### GET /api/customer/claimed-offers
**Description:** Get customer's claimed offers

**Query Parameters:**
- `status` (string): Filter by status (active, used, expired)
- `limit` (number): Number of results
- `page` (number): Page number
- `sort` (string): Sort by (recent, expiry, savings)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "claim_123",
        "claimId": "claim_123",
        "offerId": "offer_456",
        "title": "50% Off Summer Collection",
        "brand": {
          "id": "brand_123",
          "name": "Fashion Forward",
          "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg",
          "verified": true
        },
        "discount": "50%",
        "originalPrice": 200,
        "discountedPrice": 100,
        "savings": 125,
        "claimedDate": "2024-07-20T10:00:00Z",
        "status": "active",
        "expiryDate": "2024-08-31T23:59:59Z",
        "category": "Fashion",
        "image": "https://cdn.brandoffers.com/offers/offer_456.jpg",
        "promoCode": "SUMMER50-ABC123",
        "qrCode": "https://cdn.brandoffers.com/qr/claim_123.png",
        "usageCount": 1,
        "maxUsage": 3,
        "instructions": [
          "Visit fashionforward.com",
          "Add items to cart",
          "Enter code at checkout"
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 23,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    },
    "summary": {
      "totalClaimed": 23,
      "activeClaims": 8,
      "usedClaims": 12,
      "expiredClaims": 3,
      "totalSavings": 2156
    }
  }
}
\`\`\`

### GET /api/customer/favorites
**Description:** Get customer's favorite offers

**Query Parameters:**
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "id": "fav_123",
        "offer": {
          "id": "offer_456",
          "title": "20% Off First Spa Visit",
          "brand": {
            "id": "brand_789",
            "name": "Serenity Spa",
            "logo": "https://cdn.brandoffers.com/logos/brand_789.jpg",
            "verified": true
          },
          "discount": "20%",
          "originalPrice": 150,
          "discountedPrice": 120,
          "validUntil": "2024-12-31T23:59:59Z",
          "category": "Health & Beauty",
          "image": "https://cdn.brandoffers.com/offers/offer_456.jpg",
          "trending": false,
          "views": 432,
          "claims": 12
        },
        "addedAt": "2024-07-25T14:20:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    }
  }
}
\`\`\`

### GET /api/customer/activity
**Description:** Get customer's activity history

**Query Parameters:**
- `type` (string): Filter by activity type (claim, favorite, view, review)
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity_123",
        "type": "claim",
        "title": "Claimed 50% Off Summer Collection",
        "brand": "Fashion Forward",
        "offerId": "offer_456",
        "timestamp": "2024-07-29T08:30:00Z",
        "icon": "gift",
        "color": "green",
        "savings": 125,
        "details": {
          "promoCode": "SUMMER50-ABC123",
          "expiryDate": "2024-08-31T23:59:59Z"
        }
      },
      {
        "id": "activity_456",
        "type": "favorite",
        "title": "Added Spa Treatment to favorites",
        "brand": "Serenity Spa",
        "offerId": "offer_789",
        "timestamp": "2024-07-28T14:20:00Z",
        "icon": "heart",
        "color": "red"
      },
      {
        "id": "activity_789",
        "type": "review",
        "title": "Reviewed Fashion Forward offer",
        "brand": "Fashion Forward",
        "offerId": "offer_456",
        "timestamp": "2024-07-27T16:45:00Z",
        "icon": "star",
        "color": "yellow",
        "details": {
          "rating": 5,
          "comment": "Amazing deal! Great quality products."
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    },
    "summary": {
      "totalActivities": 156,
      "claims": 23,
      "favorites": 12,
      "reviews": 8,
      "views": 113
    }
  }
}
\`\`\`

---

## Search & Filtering APIs

### GET /api/search
**Description:** Search offers and brands

**Query Parameters:**
- `q` (string): Search query
- `filters[category]` (string): Category filter
- `filters[discount]` (string): Discount range filter
- `filters[location]` (string): Location filter
- `sort` (string): Sort by (relevance, trending, newest, discount)
- `limit` (number): Number of results

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "query": "fashion",
    "results": {
      "offers": [
        {
          "id": "offer_123",
          "title": "50% Off Summer Collection",
          "brand": {
            "id": "brand_456",
            "name": "Fashion Forward",
            "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg"
          },
          "discount": "50%",
          "category": "Fashion",
          "image": "https://cdn.brandoffers.com/offers/offer_123.jpg",
          "relevanceScore": 0.95,
          "matchedFields": ["title", "description", "tags"]
        }
      ],
      "brands": [
        {
          "id": "brand_456",
          "name": "Fashion Forward",
          "category": "Fashion",
          "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
          "relevanceScore": 0.88,
          "matchedFields": ["name", "description"]
        }
      ]
    },
    "suggestions": [
      "fashion deals",
      "clothing offers",
      "summer fashion",
      "fashion accessories"
    ],
    "filters": {
      "categories": [
        {"id": "fashion", "name": "Fashion", "count": 45},
        {"id": "electronics", "name": "Electronics", "count": 12}
      ],
      "priceRanges": [
        {"range": "0-50", "count": 23},
        {"range": "50-100", "count": 34}
      ]
    },
    "totalResults": 156,
    "searchTime": "0.045s",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
}
\`\`\`

### GET /api/search/suggestions
**Description:** Get search suggestions

**Query Parameters:**
- `q` (string): Partial search query

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "text": "fashion",
        "type": "keyword",
        "count": 245
      },
      {
        "text": "Fashion Forward",
        "type": "brand",
        "count": 8
      },
      {
        "text": "fashion accessories",
        "type": "category",
        "count": 67
      }
    ]
  }
}
\`\`\`

### GET /api/search/trending
**Description:** Get trending search terms

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "trending": [
      {
        "term": "summer fashion",
        "count": 1250,
        "growth": 45.2
      },
      {
        "term": "electronics deals",
        "count": 890,
        "growth": 32.1
      },
      {
        "term": "spa treatments",
        "count": 567,
        "growth": 28.7
      }
    ],
    "categories": [
      {
        "category": "Fashion",
        "searches": 5420,
        "growth": 15.3
      },
      {
        "category": "Electronics",
        "searches": 3210,
        "growth": 22.1
      }
    ]
  }
}
\`\`\`

---

## Categories APIs

### GET /api/categories
**Description:** Get all categories

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_123",
        "name": "Fashion",
        "slug": "fashion",
        "icon": "👗",
        "description": "Clothing, accessories, and style",
        "color": "from-pink-500 to-rose-500",
        "offerCount": 2450,
        "brandCount": 450,
        "trending": true,
        "image": "https://cdn.brandoffers.com/categories/fashion.jpg",
        "subcategories": [
          {
            "id": "subcat_456",
            "name": "Women's Clothing",
            "slug": "womens-clothing",
            "offerCount": 1200,
            "brandCount": 180
          },
          {
            "id": "subcat_789",
            "name": "Men's Clothing",
            "slug": "mens-clothing",
            "offerCount": 890,
            "brandCount": 150
          },
          {
            "id": "subcat_012",
            "name": "Accessories",
            "slug": "accessories",
            "offerCount": 360,
            "brandCount": 120
          }
        ],
        "topBrands": [
          {
            "id": "brand_123",
            "name": "Fashion Forward",
            "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg"
          }
        ],
        "featuredOffers": [
          {
            "id": "offer_456",
            "title": "50% Off Summer Collection",
            "discount": "50%"
          }
        ]
      }
    ],
    "metadata": {
      "totalCategories": 12,
      "totalOffers": 15000,
      "totalBrands": 2500
    }
  }
}
\`\`\`

### GET /api/categories/{slug}
**Description:** Get specific category details

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "cat_123",
    "name": "Fashion",
    "slug": "fashion",
    "icon": "👗",
    "description": "Discover the latest fashion trends and exclusive deals on clothing, accessories, and style essentials from top brands.",
    "color": "from-pink-500 to-rose-500",
    "offerCount": 2450,
    "brandCount": 450,
    "trending": true,
    "image": "https://cdn.brandoffers.com/categories/fashion.jpg",
    "bannerImage": "https://cdn.brandoffers.com/categories/fashion-banner.jpg",
    "subcategories": [
      {
        "id": "subcat_456",
        "name": "Women's Clothing",
        "slug": "womens-clothing",
        "offerCount": 1200,
        "brandCount": 180,
        "image": "https://cdn.brandoffers.com/subcategories/womens-clothing.jpg"
      }
    ],
    "topBrands": [
      {
        "id": "brand_123",
        "name": "Fashion Forward",
        "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg",
        "rating": 4.8,
        "offerCount": 8
      }
    ],
    "featuredOffers": [
      {
        "id": "offer_456",
        "title": "50% Off Summer Collection",
        "discount": "50%",
        "brand": "Fashion Forward",
        "image": "https://cdn.brandoffers.com/offers/offer_456.jpg"
      }
    ],
    "stats": {
      "averageDiscount": "42%",
      "totalSavings": "$1.2M",
      "mostPopularSubcategory": "Women's Clothing"
    }
  }
}
\`\`\`

### GET /api/categories/{slug}/offers
**Description:** Get offers in a specific category

**Query Parameters:**
- `subcategory` (string): Filter by subcategory
- `sort` (string): Sort by (trending, newest, discount)
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "offer_123",
        "title": "50% Off Summer Collection",
        "brand": {
          "id": "brand_456",
          "name": "Fashion Forward",
          "logo": "https://cdn.brandoffers.com/logos/brand_456.jpg",
          "verified": true
        },
        "discount": "50%",
        "originalPrice": 200,
        "discountedPrice": 100,
        "validUntil": "2024-08-31T23:59:59Z",
        "subcategory": "Women's Clothing",
        "image": "https://cdn.brandoffers.com/offers/offer_123.jpg",
        "trending": true,
        "claims": 890,
        "views": 12500
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 2450,
      "totalPages": 123
    },
    "filters": {
      "subcategories": [
        {"id": "womens-clothing", "name": "Women's Clothing", "count": 1200},
        {"id": "mens-clothing", "name": "Men's Clothing", "count": 890}
      ],
      "priceRanges": [
        {"range": "0-50", "count": 234},
        {"range": "50-100", "count": 567}
      ]
    }
  }
}
\`\`\`

---

## Notifications APIs

### GET /api/customer/notifications
**Description:** Get customer notifications

**Query Parameters:**
- `unread` (boolean): Filter unread notifications
- `type` (string): Filter by notification type
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "offer_expiring",
        "title": "Offer Expiring Soon!",
        "message": "Your claimed offer '50% Off Summer Collection' expires in 2 days.",
        "data": {
          "offerId": "offer_456",
          "claimId": "claim_123",
          "expiryDate": "2024-08-31T23:59:59Z",
          "daysLeft": 2
        },
        "read": false,
        "priority": "high",
        "createdAt": "2024-07-29T09:00:00Z"
      },
      {
        "id": "notif_456",
        "type": "new_deal",
        "title": "🔥 New Hot Deal Available!",
        "message": "70% off Designer Watches - Limited time flash sale!",
        "data": {
          "dealId": "deal_789",
          "discount": "70%",
          "brand": "Luxury Time"
        },
        "read": false,
        "priority": "medium",
        "createdAt": "2024-07-29T08:30:00Z"
      },
      {
        "id": "notif_789",
        "type": "brand_follow",
        "title": "New Offer from Fashion Forward",
        "message": "Fashion Forward just posted a new 40% off deal!",
        "data": {
          "brandId": "brand_123",
          "offerId": "offer_789"
        },
        "read": true,
        "priority": "low",
        "createdAt": "2024-07-28T16:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    },
    "summary": {
      "unreadCount": 3,
      "totalCount": 45,
      "highPriority": 1,
      "mediumPriority": 2,
      "lowPriority": 42
    }
  }
}
\`\`\`

### PUT /api/customer/notifications/{id}/read
**Description:** Mark notification as read

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "notificationId": "notif_123",
    "read": true,
    "readAt": "2024-07-29T10:30:00Z"
  },
  "message": "Notification marked as read"
}
\`\`\`

### POST /api/customer/notifications/mark-all-read
**Description:** Mark all notifications as read

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "markedCount": 3,
    "readAt": "2024-07-29T10:30:00Z"
  },
  "message": "All notifications marked as read"
}
\`\`\`

### POST /api/notifications/send
**Description:** Send notification (System/Admin only)

**Request Body:**
\`\`\`json
{
  "userId": "user_123",
  "type": "offer_expiring",
  "title": "Offer Expiring Soon!",
  "message": "Your claimed offer expires in 2 days.",
  "data": {
    "offerId": "offer_456",
    "claimId": "claim_123"
  },
  "priority": "high",
  "channels": ["push", "email"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "notificationId": "notif_123",
    "sent": true,
    "channels": ["push", "email"],
    "sentAt": "2024-07-29T10:30:00Z"
  },
  "message": "Notification sent successfully"
}
\`\`\`

---

## Analytics APIs

### GET /api/brand/analytics
**Description:** Get brand analytics (Brand only)

**Query Parameters:**
- `period` (string): Time period (7d, 30d, 90d, 1y)
- `offerId` (string): Filter by specific offer

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "period": "30d",
    "overview": {
      "totalViews": 125600,
      "totalClaims": 2340,
      "totalSavings": "$234,500",
      "conversionRate": 1.86,
      "averageRating": 4.8,
      "newFollowers": 456,
      "totalFollowers": 12500
    },
    "offers": [
      {
        "id": "offer_123",
        "title": "50% Off Summer Collection",
        "views": 12500,
        "claims": 890,
        "conversionRate": 7.12,
        "revenue": "$89,000",
        "savings": "$89,000",
        "status": "active"
      }
    ],
    "demographics": {
      "ageGroups": {
        "18-24": 25,
        "25-34": 35,
        "35-44": 22,
        "45-54": 12,
        "55+": 6
      },
      "gender": {
        "female": 65,
        "male": 32,
        "other": 3
      },
      "locations": {
        "New York": 28,
        "Los Angeles": 22,
        "Chicago": 15,
        "Miami": 12,
        "Other": 23
      }
    },
    "trends": {
      "daily": [
        {
          "date": "2024-07-29",
          "views": 1250,
          "claims": 89,
          "revenue": 8900
        },
        {
          "date": "2024-07-28",
          "views": 1180,
          "claims": 76,
          "revenue": 7600
        }
      ],
      "hourly": [
        {
          "hour": "09:00",
          "views": 145,
          "claims": 12
        }
      ]
    },
    "topPerformingOffers": [
      {
        "id": "offer_123",
        "title": "50% Off Summer Collection",
        "conversionRate": 7.12,
        "claims": 890
      }
    ],
    "customerInsights": {
      "repeatCustomers": 234,
      "newCustomers": 656,
      "averageOrderValue": 125,
      "customerLifetimeValue": 340
    }
  }
}
\`\`\`

### GET /api/admin/analytics
**Description:** Get platform analytics (Admin only)

**Query Parameters:**
- `period` (string): Time period (7d, 30d, 90d, 1y)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "period": "30d",
    "overview": {
      "totalUsers": 500000,
      "totalBrands": 2500,
      "totalOffers": 15000,
      "activeOffers": 8500,
      "totalClaims": 125000,
      "totalSavings": "$10000000",
      "platformRevenue": "$500000"
    },
    "growth": {
      "users": {
        "current": 500000,
        "previous": 450000,
        "growth": 11.1
      },
      "brands": {
        "current": 2500,
        "previous": 2300,
        "growth": 8.7
      },
      "offers": {
        "current": 15000,
        "previous": 13500,
        "growth": 11.1
      }
    },
    "topCategories": [
      {
        "category": "Fashion",
        "offerCount": 2450,
        "claimCount": 45000,
        "userEngagement": 78.5
      },
      {
        "category": "Electronics",
        "offerCount": 1800,
        "claimCount": 32000,
        "userEngagement": 65.2
      }
    ],
    "topBrands": [
      {
        "id": "brand_123",
        "name": "Fashion Forward",
        "claims": 2340,
        "revenue": "$234,500",
        "rating": 4.8
      }
    ],
    "userActivity": {
      "daily": [
        {
          "date": "2024-07-29",
          "activeUsers": 25000,
          "newUsers": 1250,
          "claims": 4500
        }
      ]
    },
    "geographics": {
      "topCities": [
        {"city": "New York", "users": 75000, "claims": 15000},
        {"city": "Los Angeles", "users": 65000, "claims": 12000}
      ]
    }
  }
}
\`\`\`

---

## Favorites APIs

### POST /api/customer/favorites
**Description:** Add or remove offer from favorites

**Request Body:**
\`\`\`json
{
  "offerId": "offer_123",
  "action": "add"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "favoriteId": "fav_456",
    "offerId": "offer_123",
    "userId": "user_123",
    "action": "add",
    "addedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Offer added to favorites"
}
\`\`\`

### DELETE /api/customer/favorites/{favoriteId}
**Description:** Remove offer from favorites

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "favoriteId": "fav_456",
    "removed": true,
    "removedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Offer removed from favorites"
}
\`\`\`

### GET /api/customer/favorites/check/{offerId}
**Description:** Check if offer is in favorites

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offerId": "offer_123",
    "isFavorite": true,
    "favoriteId": "fav_456",
    "addedAt": "2024-07-25T14:20:00Z"
  }
}
\`\`\`

---

## Reviews & Ratings APIs

### POST /api/offers/{id}/reviews
**Description:** Submit review for an offer

**Request Body:**
\`\`\`json
{
  "userId": "user_123",
  "rating": 5,
  "comment": "Amazing deal! Saved $150 on my summer wardrobe. Quality is excellent!",
  "claimId": "claim_456"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reviewId": "review_789",
    "offerId": "offer_123",
    "userId": "user_123",
    "rating": 5,
    "comment": "Amazing deal! Saved $150 on my summer wardrobe. Quality is excellent!",
    "createdAt": "2024-07-29T10:30:00Z",
    "helpful": 0,
    "verified": true
  },
  "message": "Review submitted successfully"
}
\`\`\`

### GET /api/offers/{id}/reviews
**Description:** Get reviews for an offer

**Query Parameters:**
- `sort` (string): Sort by (newest, oldest, rating, helpful)
- `rating` (number): Filter by rating
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_123",
        "userId": "user_789",
        "userName": "Sarah M.",
        "userAvatar": "https://cdn.brandoffers.com/avatars/user_789.jpg",
        "rating": 5,
        "comment": "Amazing deal! Saved $150 on my summer wardrobe. Quality is excellent!",
        "createdAt": "2024-07-25T14:30:00Z",
        "helpful": 12,
        "verified": true,
        "claimVerified": true
      }
    ],
    "summary": {
      "averageRating": 4.6,
      "totalReviews": 156,
      "ratingDistribution": {
        "5": 89,
        "4": 45,
        "3": 15,
        "2": 5,
        "1": 2
      }
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156,
      "totalPages": 16
    }
  }
}
\`\`\`

### POST /api/reviews/{id}/helpful
**Description:** Mark review as helpful

**Request Body:**
\`\`\`json
{
  "userId": "user_123",
  "helpful": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reviewId": "review_123",
    "helpfulCount": 13,
    "userMarkedHelpful": true
  },
  "message": "Review marked as helpful"
}
\`\`\`

### PUT /api/reviews/{id}
**Description:** Update review (Author only)

**Request Body:**
\`\`\`json
{
  "rating": 4,
  "comment": "Updated review comment"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reviewId": "review_123",
    "rating": 4,
    "comment": "Updated review comment",
    "updatedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Review updated successfully"
}
\`\`\`

### DELETE /api/reviews/{id}
**Description:** Delete review (Author only)

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Review deleted successfully"
}
\`\`\`

---

## User Profile APIs

### GET /api/customer/profile
**Description:** Get customer profile

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "phone": "+1234567890",
    "avatar": "https://cdn.brandoffers.com/avatars/user_123.jpg",
    "dateOfBirth": "1990-05-15",
    "gender": "female",
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "zipCode": "10001"
    },
    "membershipLevel": "Gold",
    "nextLevelProgress": 75,
    "joinDate": "2024-01-15T00:00:00Z",
    "lastLoginAt": "2024-07-29T09:00:00Z",
    "preferences": {
      "categories": ["fashion", "electronics", "beauty"],
      "notifications": {
        "email": true,
        "push": true,
        "sms": false,
        "offerExpiry": true,
        "newDeals": true,
        "brandUpdates": true
      },
      "newsletter": true,
      "language": "en",
      "currency": "USD",
      "timezone": "America/New_York"
    },
    "stats": {
      "totalSavings": 2156,
      "claimedOffers": 23,
      "favoriteOffers": 12,
      "rewardPoints": 1250,
      "reviewsWritten": 8,
      "brandsFollowed": 15
    },
    "socialAccounts": {
      "google": {
        "connected": true,
        "email": "sarah.johnson@gmail.com"
      },
      "facebook": {
        "connected": false
      }
    }
  }
}
\`\`\`

### PUT /api/customer/profile
**Description:** Update customer profile

**Request Body:**
\`\`\`json
{
  "firstName": "Sarah",
  "lastName": "Johnson",
  "phone": "+1234567890",
  "dateOfBirth": "1990-05-15",
  "location": {
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "preferences": {
    "categories": ["fashion", "electronics", "beauty"],
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "updatedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Profile updated successfully"
}
\`\`\`

### POST /api/customer/profile/avatar
**Description:** Upload profile avatar

**Request Body:** (multipart/form-data)
\`\`\`
avatar: [image file]
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "avatarUrl": "https://cdn.brandoffers.com/avatars/user_123.jpg",
    "uploadedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Avatar uploaded successfully"
}
\`\`\`

### DELETE /api/customer/profile/avatar
**Description:** Remove profile avatar

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "avatarUrl": null,
    "removedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Avatar removed successfully"
}
\`\`\`

### GET /api/brand/profile
**Description:** Get brand profile (Brand only)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "brand_123",
    "name": "Fashion Forward",
    "email": "contact@fashionforward.com",
    "description": "Premium fashion brand offering trendy clothing",
    "logo": "https://cdn.brandoffers.com/logos/brand_123.jpg",
    "coverImage": "https://cdn.brandoffers.com/covers/brand_123.jpg",
    "website": "https://fashionforward.com",
    "phone": "+1234567890",
    "category": "Fashion",
    "location": "New York, NY",
    "address": "123 Fashion Avenue, New York, NY 10001",
    "verified": true,
    "rating": 4.8,
    "totalReviews": 2340,
    "activeOffers": 3,
    "totalOffers": 8,
    "followers": 12500,
    "joinedDate": "2023-01-15T00:00:00Z",
    "businessHours": {
      "monday": "9:00 AM - 8:00 PM",
      "tuesday": "9:00 AM - 8:00 PM",
      "wednesday": "9:00 AM - 8:00 PM",
      "thursday": "9:00 AM - 8:00 PM",
      "friday": "9:00 AM - 9:00 PM",
      "saturday": "10:00 AM - 9:00 PM",
      "sunday": "11:00 AM - 7:00 PM"
    },
    "socialMedia": {
      "instagram": "@fashionforward",
      "facebook": "fashionforwardny",
      "twitter": "@fashionforward"
    },
    "settings": {
      "notifications": {
        "newFollowers": true,
        "offerClaims": true,
        "reviews": true
      },
      "privacy": {
        "showEmail": false,
        "showPhone": true
      }
    }
  }
}
\`\`\`

### PUT /api/brand/profile
**Description:** Update brand profile (Brand only)

**Request Body:**
\`\`\`json
{
  "description": "Updated brand description",
  "website": "https://newfashionforward.com",
  "phone": "+1234567890",
  "address": "456 New Fashion Street, New York, NY 10002",
  "businessHours": {
    "monday": "9:00 AM - 8:00 PM",
    "tuesday": "9:00 AM - 8:00 PM"
  },
  "socialMedia": {
    "instagram": "@newfashionforward",
    "facebook": "newfashionforwardny"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "brand_123",
    "name": "Fashion Forward",
    "updatedAt": "2024-07-29T10:30:00Z"
  },
  "message": "Brand profile updated successfully"
}
\`\`\`

---

## Admin APIs

### GET /api/admin/dashboard
**Description:** Get admin dashboard data (Admin only)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 500000,
      "totalBrands": 2500,
      "totalOffers": 15000,
      "activeOffers": 8500,
      "totalSavings": "$10000000",
      "monthlyGrowth": {
        "users": 12.5,
        "brands": 8.3,
        "offers": 15.7
      }
    },
    "recentActivity": [
      {
        "type": "user_registration",
        "count": 1250,
        "period": "today"
      },
      {
        "type": "offer_created",
        "count": 45,
        "period": "today"
      },
      {
        "type": "brand_registration",
        "count": 12,
        "period": "today"
      }
    ],
    "topCategories": [
      {
        "category": "Fashion",
        "offerCount": 2450,
        "userEngagement": 78.5,
        "growth": 15.2
      },
      {
        "category": "Electronics",
        "offerCount": 1800,
        "userEngagement": 65.3,
        "growth": 22.1
      }
    ],
    "pendingApprovals": {
      "brands": 23,
      "offers": 67,
      "reports": 12
    },
    "systemHealth": {
      "serverStatus": "healthy",
      "databaseStatus": "healthy",
      "apiResponseTime": "120ms",
      "uptime": "99.9%"
    }
  }
}
\`\`\`

### GET /api/admin/users
**Description:** Get all users (Admin only)

**Query Parameters:**
- `type` (string): Filter by user type (customer, brand)
- `status` (string): Filter by status (active, inactive, suspended)
- `search` (string): Search query
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "name": "Sarah Johnson",
        "email": "sarah.johnson@email.com",
        "type": "customer",
        "status": "active",
        "joinDate": "2024-01-15T00:00:00Z",
        "lastLoginAt": "2024-07-29T09:00:00Z",
        "totalSavings": 2156,
        "claimedOffers": 23,
        "membershipLevel": "Gold"
      },
      {
        "id": "brand_456",
        "name": "Fashion Forward",
        "email": "contact@fashionforward.com",
        "type": "brand",
        "status": "active",
        "verified": true,
        "joinDate": "2023-01-15T00:00:00Z",
        "activeOffers": 3,
        "totalOffers": 8,
        "followers": 12500
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 502500,
      "totalPages": 10050
    },
    "summary": {
      "totalUsers": 502500,
      "customers": 500000,
      "brands": 2500,
      "activeUsers": 485000,
      "suspendedUsers": 150
    }
  }
}
\`\`\`

### GET /api/admin/offers/pending
**Description:** Get pending offers for approval (Admin only)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offers": [
      {
        "id": "offer_123",
        "title": "50% Off Summer Collection",
        "brand": {
          "id": "brand_456",
          "name": "Fashion Forward",
          "verified": true
        },
        "discount": "50%",
        "category": "Fashion",
        "submittedAt": "2024-07-29T08:00:00Z",
        "status": "pending_approval",
        "priority": "normal"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 67,
      "totalPages": 4
    }
  }
}
\`\`\`

### PUT /api/admin/offers/{id}/approve
**Description:** Approve or reject offer (Admin only)

**Request Body:**
\`\`\`json
{
  "action": "approve",
  "reason": "Offer meets all guidelines and requirements"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "offerId": "offer_123",
    "status": "approved",
    "approvedAt": "2024-07-29T10:30:00Z",
    "approvedBy": "admin_456"
  },
  "message": "Offer approved successfully"
}
\`\`\`

### GET /api/admin/brands/pending
**Description:** Get pending brands for verification (Admin only)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "brands": [
      {
        "id": "brand_789",
        "name": "New Fashion Brand",
        "email": "contact@newfashionbrand.com",
        "category": "Fashion",
        "submittedAt": "2024-07-28T14:00:00Z",
        "status": "pending_verification",
        "businessRegistration": "REG123456789",
        "documents": [
          "https://cdn.brandoffers.com/docs/brand_789_license.pdf"
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 23,
      "totalPages": 2
    }
  }
}
\`\`\`

### PUT /api/admin/brands/{id}/verify
**Description:** Verify or reject brand (Admin only)

**Request Body:**
\`\`\`json
{
  "action": "verify",
  "reason": "All documents verified and business registration confirmed"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "brandId": "brand_789",
    "status": "verified",
    "verifiedAt": "2024-07-29T10:30:00Z",
    "verifiedBy": "admin_456"
  },
  "message": "Brand verified successfully"
}
\`\`\`

### GET /api/admin/reports
**Description:** Get user reports (Admin only)

**Query Parameters:**
- `type` (string): Filter by report type
- `status` (string): Filter by status
- `limit` (number): Number of results
- `page` (number): Page number

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "report_123",
        "type": "inappropriate_content",
        "reportedBy": {
          "id": "user_456",
          "name": "John Doe"
        },
        "reportedItem": {
          "type": "offer",
          "id": "offer_789",
          "title": "Suspicious Offer"
        },
        "reason": "This offer seems too good to be true and might be fraudulent",
        "status": "pending",
        "createdAt": "2024-07-29T08:00:00Z",
        "priority": "high"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    },
    "summary": {
      "totalReports": 12,
      "pendingReports": 8,
      "resolvedReports": 4,
      "highPriority": 2
    }
  }
}
\`\`\`

### PUT /api/admin/reports/{id}/resolve
**Description:** Resolve report (Admin only)

**Request Body:**
\`\`\`json
{
  "action": "resolved",
  "resolution": "Investigated and found no violation. Offer is legitimate.",
  "actionTaken": "none"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "reportId": "report_123",
    "status": "resolved",
    "resolvedAt": "2024-07-29T10:30:00Z",
    "resolvedBy": "admin_456",
    "resolution": "Investigated and found no violation. Offer is legitimate."
  },
  "message": "Report resolved successfully"
}
\`\`\`

---

## Error Responses

All APIs follow a consistent error response format:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "timestamp": "2024-07-29T10:30:00Z"
}
\`\`\`

### Common Error Codes

- `VALIDATION_ERROR` (400): Invalid input data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_SERVER_ERROR` (500): Server error

---

## Authentication

Most APIs require authentication using JWT tokens. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### Token Refresh

Tokens expire after 24 hours. Use the refresh token endpoint to get a new token before expiry.

---

## Rate Limiting

API endpoints are rate limited:
- Public endpoints: 100 requests per minute
- Authenticated endpoints: 1000 requests per minute
- Admin endpoints: 5000 requests per minute

Rate limit headers are included in responses:
\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1627846261
\`\`\`

---

## Pagination

List endpoints support pagination with consistent parameters:
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 20, max: 100)

Pagination info is included in responses:
\`\`\`json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
\`\`\`

---

## Webhooks

The platform supports webhooks for real-time notifications:

### Available Events
- `offer.claimed`
- `offer.expired`
- `brand.verified`
- `user.registered`
- `review.submitted`

### Webhook Payload Example
\`\`\`json
{
  "event": "offer.claimed",
  "timestamp": "2024-07-29T10:30:00Z",
  "data": {
    "offerId": "offer_123",
    "userId": "user_456",
    "claimId": "claim_789",
    "savings": 125
  }
}
\`\`\`

---

This comprehensive API documentation covers all the endpoints needed for the FindMyDeals platform, including authentication, offers management, user interactions, analytics, and administrative functions.

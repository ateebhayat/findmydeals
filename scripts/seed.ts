import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_IJeukda8Ah3S@ep-frosty-feather-abtif1mu-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
const sql = postgres(connectionString)
const db = drizzle(sql, { schema })

// Utility function to generate random UUID-like string
const generateId = () => crypto.randomUUID()

// Utility function to hash passwords
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

// Utility function to generate claim code
const generateClaimCode = () => {
  return faker.string.alphanumeric(8).toUpperCase()
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data (in reverse order to handle foreign key constraints)
    console.log('🧹 Clearing existing data...')
    await db.delete(schema.brandFollowers)
    await db.delete(schema.userActivities)
    await db.delete(schema.hotDeals)
    await db.delete(schema.notifications)
    await db.delete(schema.reviews)
    await db.delete(schema.favorites)
    await db.delete(schema.claims)
    await db.delete(schema.offers)
    await db.delete(schema.categories)
    await db.delete(schema.brands)
    await db.delete(schema.users)

    // 1. Seed Categories
    console.log('📂 Seeding categories...')
    const categoryData = [
      { name: 'Food & Dining', description: 'Restaurants, cafes, and food delivery', icon: '🍽️', color: '#FF6B6B' },
      { name: 'Fashion & Apparel', description: 'Clothing, shoes, and accessories', icon: '👗', color: '#4ECDC4' },
      { name: 'Electronics', description: 'Gadgets, computers, and tech accessories', icon: '📱', color: '#45B7D1' },
      { name: 'Health & Beauty', description: 'Cosmetics, skincare, and wellness', icon: '💄', color: '#96CEB4' },
      { name: 'Travel & Tourism', description: 'Hotels, flights, and travel packages', icon: '✈️', color: '#FFEAA7' },
      { name: 'Entertainment', description: 'Movies, games, and events', icon: '🎬', color: '#DDA0DD' },
      { name: 'Sports & Fitness', description: 'Gym memberships, sports gear, and activities', icon: '🏋️', color: '#FF7675' },
      { name: 'Home & Garden', description: 'Furniture, decor, and gardening supplies', icon: '🏠', color: '#00B894' },
      { name: 'Automotive', description: 'Car services, parts, and accessories', icon: '🚗', color: '#6C5CE7' },
      { name: 'Education', description: 'Courses, books, and learning materials', icon: '📚', color: '#FDCB6E' }
    ]

    const categories = await db.insert(schema.categories).values(categoryData).returning()
    console.log(`✅ Created ${categories.length} categories`)

    // 2. Seed Users
    console.log('👥 Seeding users...')
    const userData = []
    for (let i = 0; i < 50; i++) {
      userData.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: await hashPassword('password123'),
        phone: faker.string.numeric(10),
        avatar: faker.image.avatar(),
        role: 'customer' as const,
        membershipLevel: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'] as const),
        rewardPoints: faker.number.int({ min: 0, max: 10000 }),
        totalSavings: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }).toString(),
        claimedOffers: faker.number.int({ min: 0, max: 50 }),
        favoriteOffers: faker.number.int({ min: 0, max: 20 }),
        preferences: {
          categories: faker.helpers.arrayElements(categories.map(c => c.id), { min: 1, max: 5 }),
          notifications: {
            email: faker.datatype.boolean(),
            push: faker.datatype.boolean(),
            sms: faker.datatype.boolean(),
            offerExpiry: faker.datatype.boolean(),
            newDeals: faker.datatype.boolean(),
            brandUpdates: faker.datatype.boolean()
          },
          newsletter: faker.datatype.boolean(),
          language: 'en',
          currency: 'USD',
          timezone: 'America/New_York'
        },
        socialAccounts: {
          google: faker.datatype.boolean() ? {
            connected: true,
            email: faker.internet.email()
          } : undefined,
          facebook: faker.datatype.boolean() ? {
            connected: true,
            email: faker.internet.email()
          } : undefined
        },
        lastLoginAt: faker.date.recent({ days: 30 }),
        isActive: faker.datatype.boolean({ probability: 0.9 }),
        emailVerified: faker.datatype.boolean({ probability: 0.8 })
      })
    }

    const users = await db.insert(schema.users).values(userData).returning()
    console.log(`✅ Created ${users.length} users`)

    // 3. Seed Brands
    console.log('🏢 Seeding brands...')
    const brandData = []
    for (let i = 0; i < 20; i++) {
      const companyName = faker.company.name()
      brandData.push({
        name: companyName,
        email: faker.internet.email({ firstName: companyName.toLowerCase().replace(/\s+/g, '') }),
        password: await hashPassword('brandpass123'),
        description: faker.company.catchPhrase() + '. ' + faker.lorem.sentences(2),
        logo: faker.image.urlLoremFlickr({ category: 'business' }),
        coverImage: faker.image.urlLoremFlickr({ category: 'business', width: 1200, height: 400 }),
        website: faker.internet.url(),
        phone: faker.string.numeric(10),
        address: faker.location.streetAddress({ useFullAddress: true }),
        location: {
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          coordinates: {
            lat: parseFloat(faker.location.latitude()),
            lng: parseFloat(faker.location.longitude())
          }
        },
        businessHours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        socialMedia: {
          instagram: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
          facebook: faker.internet.url(),
          twitter: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
          linkedin: faker.internet.url()
        },
        businessRegistration: faker.string.alphanumeric(10).toUpperCase(),
        documents: [faker.internet.url(), faker.internet.url()],
        verified: faker.datatype.boolean({ probability: 0.7 }),
        status: faker.helpers.arrayElement(['pending_verification', 'active', 'suspended', 'inactive'] as const),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }).toString(),
        totalReviews: faker.number.int({ min: 0, max: 500 }),
        activeOffers: faker.number.int({ min: 0, max: 20 }),
        totalOffers: faker.number.int({ min: 0, max: 100 }),
        followers: faker.number.int({ min: 0, max: 10000 }),
        totalSavings: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }).toString(),
        totalViews: faker.number.int({ min: 0, max: 100000 }),
        settings: {
          notifications: {
            newFollowers: faker.datatype.boolean(),
            offerClaims: faker.datatype.boolean(),
            reviews: faker.datatype.boolean()
          },
          privacy: {
            showEmail: faker.datatype.boolean(),
            showPhone: faker.datatype.boolean()
          }
        },
        lastOfferDate: faker.date.recent({ days: 60 }),
        lastLoginAt: faker.date.recent({ days: 7 }),
        isActive: faker.datatype.boolean({ probability: 0.9 }),
        emailVerified: faker.datatype.boolean({ probability: 0.8 })
      })
    }

    const brands = await db.insert(schema.brands).values(brandData).returning()
    console.log(`✅ Created ${brands.length} brands`)

    // 4. Seed Offers
    console.log('🎁 Seeding offers...')
    const offerData = []
    for (let i = 0; i < 100; i++) {
      const brand = faker.helpers.arrayElement(brands)
      const category = faker.helpers.arrayElement(categories)
      const discountType = faker.helpers.arrayElement(['percentage', 'fixed', 'buy_one_get_one'])
      const originalPrice = faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
      const discountValue = discountType === 'percentage' 
        ? faker.number.int({ min: 5, max: 70 })
        : faker.number.float({ min: 5, max: originalPrice * 0.5, fractionDigits: 2 })
      
      const finalPrice = discountType === 'percentage'
        ? originalPrice * (1 - discountValue / 100)
        : discountType === 'fixed'
        ? Math.max(0, originalPrice - discountValue)
        : originalPrice * 0.5 // buy one get one

      const startDate = faker.date.recent({ days: 30 })
      const endDate = faker.date.future({ days: 60, refDate: startDate })

      offerData.push({
        brandId: brand.id,
        categoryId: category.id,
        title: faker.commerce.productName() + ' - Special Offer',
        description: faker.commerce.productDescription() + ' ' + faker.lorem.sentences(2),
        discountType,
        discountValue: discountValue.toString(),
        originalPrice: originalPrice.toString(),
        finalPrice: finalPrice.toString(),
        currency: 'USD',
        startDate,
        endDate,
        maxClaims: faker.number.int({ min: 10, max: 1000 }),
        currentClaims: faker.number.int({ min: 0, max: 50 }),
        terms: faker.lorem.paragraphs(2),
        image: faker.image.urlLoremFlickr({ category: 'business' }),
        isActive: faker.datatype.boolean({ probability: 0.8 }),
        isFeatured: faker.datatype.boolean({ probability: 0.2 }),
        isHot: faker.datatype.boolean({ probability: 0.1 }),
        views: faker.number.int({ min: 0, max: 10000 })
      })
    }

    const offers = await db.insert(schema.offers).values(offerData).returning()
    console.log(`✅ Created ${offers.length} offers`)

    // 5. Seed Claims
    console.log('🎫 Seeding claims...')
    const claimData = []
    for (let i = 0; i < 200; i++) {
      const user = faker.helpers.arrayElement(users)
      const offer = faker.helpers.arrayElement(offers)
      const claimedAt = faker.date.recent({ days: 30 })
      const status = faker.helpers.arrayElement(['pending', 'used', 'expired', 'cancelled'])
      
      claimData.push({
        userId: user.id,
        offerId: offer.id,
        claimCode: generateClaimCode(),
        status,
        claimedAt,
        usedAt: status === 'used' ? faker.date.future({ days: 7, refDate: claimedAt }) : null,
        expiresAt: faker.date.future({ days: 30, refDate: claimedAt }),
        savings: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }).toString()
      })
    }

    const claims = await db.insert(schema.claims).values(claimData).returning()
    console.log(`✅ Created ${claims.length} claims`)

    // 6. Seed Favorites
    console.log('❤️ Seeding favorites...')
    const favoriteData = []
    const favoriteSet = new Set()
    
    for (let i = 0; i < 150; i++) {
      const user = faker.helpers.arrayElement(users)
      const offer = faker.helpers.arrayElement(offers)
      const key = `${user.id}-${offer.id}`
      
      if (!favoriteSet.has(key)) {
        favoriteSet.add(key)
        favoriteData.push({
          userId: user.id,
          offerId: offer.id
        })
      }
    }

    const favorites = await db.insert(schema.favorites).values(favoriteData).returning()
    console.log(`✅ Created ${favorites.length} favorites`)

    // 7. Seed Reviews
    console.log('⭐ Seeding reviews...')
    const reviewData = []
    
    // Only create reviews for claims that exist
    const reviewableClaims = claims.filter(claim => {
      // Only include claims that are 'used' status for better data quality
      return claim.status === 'used';
    });
    
    // Limit the number of reviews to the number of eligible claims or 200, whichever is smaller
    const maxReviews = Math.min(reviewableClaims.length, 200);
    
    // Shuffle the claims to get random ones
    const shuffledClaims = faker.helpers.shuffle([...reviewableClaims]);
    
    for (let i = 0; i < maxReviews; i++) {
      const claim = shuffledClaims[i];
      const user = users.find(u => u.id === claim.userId);
      const offer = offers.find(o => o.id === claim.offerId);
      
      if (!user || !offer) continue; // Skip if user or offer not found (shouldn't happen)
      
      reviewData.push({
        userId: user.id,
        offerId: offer.id,
        brandId: offer.brandId,
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
        helpful: faker.number.int({ min: 0, max: 50 }),
        verified: faker.datatype.boolean({ probability: 0.7 }),
        claimVerified: faker.datatype.boolean({ probability: 0.8 }),
        claimId: claim?.id || null
      })
    }

    const reviews = await db.insert(schema.reviews).values(reviewData).returning()
    console.log(`✅ Created ${reviews.length} reviews`)

    // 8. Seed Notifications
    console.log('🔔 Seeding notifications...')
    const notificationData = []
    for (let i = 0; i < 500; i++) {
      const user = faker.helpers.arrayElement(users)
      const type = faker.helpers.arrayElement(['offer_claim', 'offer_expiry', 'new_deal', 'brand_update', 'system'])
      
      notificationData.push({
        userId: user.id,
        type,
        title: faker.lorem.sentence(),
        message: faker.lorem.sentences(2),
        data: {
          offerId: faker.helpers.maybe(() => faker.helpers.arrayElement(offers).id),
          brandId: faker.helpers.maybe(() => faker.helpers.arrayElement(brands).id)
        },
        isRead: faker.datatype.boolean({ probability: 0.6 }),
        readAt: faker.helpers.maybe(() => faker.date.recent({ days: 7 }))
      })
    }

    const notifications = await db.insert(schema.notifications).values(notificationData).returning()
    console.log(`✅ Created ${notifications.length} notifications`)

    // 9. Seed Hot Deals
    console.log('🔥 Seeding hot deals...')
    const hotDealData: Array<{
      offerId: string
      startDate: Date
      endDate: Date
      priority: number
      isActive: boolean
    }> = []
    const hotOffers = faker.helpers.arrayElements(offers.filter(o => o.isHot), { min: 5, max: 15 })
    
    hotOffers.forEach((offer: any, index: number) => {
      hotDealData.push({
        offerId: offer.id,
        startDate: faker.date.recent({ days: 7 }),
        endDate: faker.date.future({ days: 14 }),
        priority: index + 1,
        isActive: faker.datatype.boolean({ probability: 0.9 })
      })
    })

    const hotDeals = await db.insert(schema.hotDeals).values(hotDealData).returning()
    console.log(`✅ Created ${hotDeals.length} hot deals`)

    // 10. Seed User Activities
    console.log('📊 Seeding user activities...')
    const activityData = []
    for (let i = 0; i < 1000; i++) {
      const user = faker.helpers.arrayElement(users)
      const offer = faker.helpers.arrayElement(offers)
      const activityType = faker.helpers.arrayElement(['view', 'claim', 'favorite', 'review'])
      
      activityData.push({
        userId: user.id,
        offerId: offer.id,
        activityType,
        metadata: {
          timestamp: faker.date.recent({ days: 30 }).toISOString(),
          source: faker.helpers.arrayElement(['web', 'mobile', 'email']),
          ...(activityType === 'view' && { duration: faker.number.int({ min: 5, max: 300 }) }),
          ...(activityType === 'claim' && { claimCode: generateClaimCode() })
        }
      })
    }

    const userActivities = await db.insert(schema.userActivities).values(activityData).returning()
    console.log(`✅ Created ${userActivities.length} user activities`)

    // 11. Seed Brand Followers
    console.log('👥 Seeding brand followers...')
    const followerData = []
    const followerSet = new Set()
    
    for (let i = 0; i < 300; i++) {
      const user = faker.helpers.arrayElement(users)
      const brand = faker.helpers.arrayElement(brands)
      const key = `${user.id}-${brand.id}`
      
      if (!followerSet.has(key)) {
        followerSet.add(key)
        followerData.push({
          userId: user.id,
          brandId: brand.id
        })
      }
    }

    const brandFollowers = await db.insert(schema.brandFollowers).values(followerData).returning()
    console.log(`✅ Created ${brandFollowers.length} brand followers`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Categories: ${categories.length}`)
    console.log(`- Users: ${users.length}`)
    console.log(`- Brands: ${brands.length}`)
    console.log(`- Offers: ${offers.length}`)
    console.log(`- Claims: ${claims.length}`)
    console.log(`- Favorites: ${favorites.length}`)
    console.log(`- Reviews: ${reviews.length}`)
    console.log(`- Notifications: ${notifications.length}`)
    console.log(`- Hot Deals: ${hotDeals.length}`)
    console.log(`- User Activities: ${userActivities.length}`)
    console.log(`- Brand Followers: ${brandFollowers.length}`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await sql.end()
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding script completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding script failed:', error)
      process.exit(1)
    })
}

export default seedDatabase

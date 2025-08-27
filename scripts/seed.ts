import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../lib/db/schema'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

// Database connection
const connectionString = 'postgresql://neondb_owner:npg_pAy8GUBvZb9m@ep-young-scene-abjj10jn-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
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

// Irish geographical data
const IRISH_COUNTIES = [
  // Republic of Ireland (26 counties)
  'Dublin', 'Cork', 'Galway', 'Mayo', 'Donegal', 'Kerry', 'Tipperary', 'Clare', 'Tyrone', 'Antrim',
  'Limerick', 'Roscommon', 'Down', 'Wexford', 'Meath', 'Londonderry', 'Kilkenny', 'Wicklow', 'Offaly',
  'Cavan', 'Waterford', 'Westmeath', 'Sligo', 'Laois', 'Kildare', 'Fermanagh', 'Leitrim', 'Armagh',
  'Monaghan', 'Longford', 'Carlow', 'Louth'
]

const IRISH_CITIES = [
  { name: 'Dublin', county: 'Dublin', coordinates: { lat: 53.3498, lng: -6.2603 } },
  { name: 'Cork', county: 'Cork', coordinates: { lat: 51.8985, lng: -8.4756 } },
  { name: 'Galway', county: 'Galway', coordinates: { lat: 53.2707, lng: -9.0568 } },
  { name: 'Limerick', county: 'Limerick', coordinates: { lat: 52.6638, lng: -8.6267 } },
  { name: 'Waterford', county: 'Waterford', coordinates: { lat: 52.2593, lng: -7.1101 } },
  { name: 'Drogheda', county: 'Louth', coordinates: { lat: 53.7189, lng: -6.3478 } },
  { name: 'Dundalk', county: 'Louth', coordinates: { lat: 54.0014, lng: -6.4058 } },
  { name: 'Swords', county: 'Dublin', coordinates: { lat: 53.4597, lng: -6.2178 } },
  { name: 'Bray', county: 'Wicklow', coordinates: { lat: 53.2026, lng: -6.0983 } },
  { name: 'Navan', county: 'Meath', coordinates: { lat: 53.6528, lng: -6.6814 } },
  { name: 'Ennis', county: 'Clare', coordinates: { lat: 52.8436, lng: -8.9864 } },
  { name: 'Kilkenny', county: 'Kilkenny', coordinates: { lat: 52.6541, lng: -7.2448 } },
  { name: 'Tralee', county: 'Kerry', coordinates: { lat: 52.2706, lng: -9.7094 } },
  { name: 'Carlow', county: 'Carlow', coordinates: { lat: 52.8408, lng: -6.9326 } },
  { name: 'Naas', county: 'Kildare', coordinates: { lat: 53.2156, lng: -6.6669 } },
  { name: 'Athlone', county: 'Westmeath', coordinates: { lat: 53.4239, lng: -7.9407 } },
  { name: 'Sligo', county: 'Sligo', coordinates: { lat: 54.2766, lng: -8.4761 } },
  { name: 'Letterkenny', county: 'Donegal', coordinates: { lat: 54.9503, lng: -7.7342 } },
  { name: 'Castlebar', county: 'Mayo', coordinates: { lat: 53.8567, lng: -9.2985 } },
  { name: 'Clonmel', county: 'Tipperary', coordinates: { lat: 52.3558, lng: -7.7036 } }
]

const IRISH_LANDMARKS = [
  'Cliffs of Moher', 'Giant\'s Causeway', 'Ring of Kerry', 'Dingle Peninsula', 'Skellig Michael',
  'Newgrange', 'Glenveagh National Park', 'Killarney National Park', 'The Burren', 'Aran Islands',
  'Trinity College Dublin', 'Guinness Storehouse', 'Blarney Castle', 'Rock of Cashel', 'Powerscourt Gardens',
  'Kylemore Abbey', 'Ashford Castle', 'Christ Church Cathedral', 'St. Patrick\'s Cathedral', 'Phoenix Park'
]

// Authentic Irish brands data
const IRISH_BRANDS = [
  // Food & Beverage
  { name: 'Guinness', industry: 'Food & Dining', description: 'Ireland\'s most famous stout beer, brewed since 1759', website: 'https://www.guinness.com' },
  { name: 'Jameson Irish Whiskey', industry: 'Food & Dining', description: 'Premium Irish whiskey distilled since 1780', website: 'https://www.jamesonwhiskey.com' },
  { name: 'Kerrygold', industry: 'Food & Dining', description: 'Ireland\'s leading butter and dairy brand', website: 'https://www.kerrygold.com' },
  { name: 'Barry\'s Tea', industry: 'Food & Dining', description: 'Ireland\'s favourite tea brand since 1901', website: 'https://www.barrystea.ie' },
  { name: 'Tayto', industry: 'Food & Dining', description: 'Iconic Irish crisp and snack brand', website: 'https://www.tayto.ie' },
  { name: 'Murphy\'s Irish Stout', industry: 'Food & Dining', description: 'Cork-based brewery famous for its smooth stout', website: 'https://www.murphys.com' },
  { name: 'Ballymaloe', industry: 'Food & Dining', description: 'Artisan food producer from County Cork', website: 'https://www.ballymaloe.ie' },
  
  // Retail
  { name: 'Penneys', industry: 'Fashion & Apparel', description: 'Ireland\'s leading value fashion retailer', website: 'https://www.penneys.ie' },
  { name: 'Dunnes Stores', industry: 'Fashion & Apparel', description: 'Major Irish retail chain for clothing and groceries', website: 'https://www.dunnesstores.com' },
  { name: 'Brown Thomas', industry: 'Fashion & Apparel', description: 'Luxury department store chain', website: 'https://www.brownthomas.com' },
  { name: 'Arnotts', industry: 'Fashion & Apparel', description: 'Historic Dublin department store since 1843', website: 'https://www.arnotts.ie' },
  
  // Financial Services
  { name: 'AIB (Allied Irish Banks)', industry: 'Financial Services', description: 'One of Ireland\'s largest banks', website: 'https://www.aib.ie' },
  { name: 'Bank of Ireland', industry: 'Financial Services', description: 'Ireland\'s oldest bank, established in 1783', website: 'https://www.bankofireland.com' },
  { name: 'Permanent TSB', industry: 'Financial Services', description: 'Irish retail bank and mortgage lender', website: 'https://www.permanenttsb.ie' },
  
  // Technology
  { name: 'Eircom', industry: 'Technology', description: 'Ireland\'s largest telecommunications provider', website: 'https://www.eir.ie' },
  { name: 'Three Ireland', industry: 'Technology', description: 'Major mobile network operator in Ireland', website: 'https://www.three.ie' },
  { name: 'Vodafone Ireland', industry: 'Technology', description: 'Leading mobile and broadband provider', website: 'https://www.vodafone.ie' },
  
  // Transportation & Travel
  { name: 'Ryanair', industry: 'Travel & Tourism', description: 'Europe\'s largest low-cost airline based in Dublin', website: 'https://www.ryanair.com' },
  { name: 'Aer Lingus', industry: 'Travel & Tourism', description: 'Ireland\'s national airline since 1936', website: 'https://www.aerlingus.com' },
  { name: 'Irish Rail', industry: 'Travel & Tourism', description: 'Ireland\'s national railway operator', website: 'https://www.irishrail.ie' },
  { name: 'Bus Éireann', industry: 'Travel & Tourism', description: 'National bus service provider', website: 'https://www.buseireann.ie' },
  
  // Construction & Materials
  { name: 'CRH', industry: 'Construction', description: 'Global building materials company headquartered in Dublin', website: 'https://www.crh.com' },
  { name: 'Kingspan', industry: 'Construction', description: 'Leading insulation and building envelope solutions', website: 'https://www.kingspan.com' },
  
  // Hospitality
  { name: 'Jurys Inn', industry: 'Travel & Tourism', description: 'Irish hotel chain with locations across Ireland and UK', website: 'https://www.jurysinns.com' },
  { name: 'The Fitzwilliam Hotel Group', industry: 'Travel & Tourism', description: 'Luxury hotel group with properties across Ireland', website: 'https://www.fitzwilliamhotelgroup.com' },
  
  // Media & Entertainment
  { name: 'RTÉ', industry: 'Entertainment', description: 'Ireland\'s national public service broadcaster', website: 'https://www.rte.ie' },
  { name: 'Irish Independent', industry: 'Entertainment', description: 'Ireland\'s largest selling daily newspaper', website: 'https://www.independent.ie' },
  
  // Healthcare & Beauty
  { name: 'Boots Ireland', industry: 'Health & Beauty', description: 'Leading pharmacy and health & beauty retailer', website: 'https://www.boots.ie' },
  { name: 'McCauley Health & Beauty', industry: 'Health & Beauty', description: 'Irish pharmacy chain', website: 'https://www.mccauley.ie' },
  
  // Sports & Fitness
  { name: 'GAA (Gaelic Athletic Association)', industry: 'Sports & Fitness', description: 'Ireland\'s largest sporting organisation', website: 'https://www.gaa.ie' },
  { name: 'IRFU (Irish Rugby)', industry: 'Sports & Fitness', description: 'Governing body for rugby union in Ireland', website: 'https://www.irishrugby.ie' }
]

// Generate proper Irish Eircode (postal code)
const generateEircode = (county: string): string => {
  const countyPrefixes: { [key: string]: string } = {
    'Dublin': 'D',
    'Cork': 'T',
    'Galway': 'H',
    'Limerick': 'V',
    'Waterford': 'X',
    'Kerry': 'V',
    'Mayo': 'F',
    'Donegal': 'F',
    'Tipperary': 'E',
    'Clare': 'V',
    'Wexford': 'Y',
    'Kilkenny': 'R',
    'Meath': 'C',
    'Kildare': 'W',
    'Wicklow': 'A',
    'Offaly': 'R',
    'Laois': 'R',
    'Westmeath': 'N',
    'Longford': 'N',
    'Roscommon': 'F',
    'Leitrim': 'N',
    'Cavan': 'H',
    'Monaghan': 'H',
    'Louth': 'A',
    'Carlow': 'R',
    'Sligo': 'F'
  }
  
  const prefix = countyPrefixes[county] || 'A'
  const numbers = faker.string.numeric(2)
  const letters = faker.string.alpha({ length: 4, casing: 'upper' })
  
  return `${prefix}${numbers} ${letters}`
}

// Generate Irish address
const generateIrishAddress = () => {
  const city = faker.helpers.arrayElement(IRISH_CITIES)
  const streetTypes = ['Street', 'Road', 'Avenue', 'Lane', 'Close', 'Park', 'Green', 'Square', 'Terrace']
  const streetNames = [
    'Main', 'Church', 'High', 'Mill', 'Bridge', 'Castle', 'Market', 'Abbey', 'Patrick', 'Michael',
    'O\'Connell', 'Grafton', 'Henry', 'Dame', 'Temple', 'Nassau', 'Kildare', 'Merrion', 'Stephen\'s',
    'Trinity', 'College', 'Pearse', 'Wolfe Tone', 'Emmet', 'Parnell', 'Sackville', 'Baggot'
  ]
  
  const streetNumber = faker.number.int({ min: 1, max: 999 })
  const streetName = faker.helpers.arrayElement(streetNames)
  const streetType = faker.helpers.arrayElement(streetTypes)
  const eircode = generateEircode(city.county)
  
  return {
    address: `${streetNumber} ${streetName} ${streetType}, ${city.name}, Co. ${city.county}`,
    city: city.name,
    county: city.county,
    eircode: eircode,
    coordinates: city.coordinates
  }
}

// Generate Irish phone number
const generateIrishPhone = (): string => {
  const prefixes = ['01', '021', '091', '061', '051', '087', '085', '086', '083', '089']
  const prefix = faker.helpers.arrayElement(prefixes)
  const number = faker.string.numeric(7)
  return `+353 ${prefix} ${number}`
}

// Generate Irish names
const IRISH_FIRST_NAMES = {
  male: ['Liam', 'Noah', 'Conor', 'Sean', 'Oisin', 'Fionn', 'Cian', 'Luke', 'Adam', 'James', 'Daniel', 'Michael', 'David', 'Ryan', 'Eoin', 'Darragh', 'Tadhg', 'Cathal', 'Ruairi', 'Niall'],
  female: ['Emma', 'Emily', 'Grace', 'Fiadh', 'Sophie', 'Ava', 'Amelia', 'Ella', 'Saoirse', 'Kate', 'Anna', 'Aoife', 'Sarah', 'Molly', 'Lily', 'Hannah', 'Lucy', 'Caoimhe', 'Niamh', 'Ciara']
}

const IRISH_SURNAMES = [
  'Murphy', 'Kelly', 'O\'Sullivan', 'Walsh', 'Smith', 'O\'Brien', 'Byrne', 'Ryan', 'O\'Connor', 'O\'Neill',
  'O\'Reilly', 'Doyle', 'McCarthy', 'Gallagher', 'O\'Doherty', 'Kennedy', 'Lynch', 'Murray', 'Quinn', 'Moore',
  'McLoughlin', 'O\'Carroll', 'Connolly', 'Daly', 'O\'Connell', 'Wilson', 'Dunne', 'Griffin', 'Fitzpatrick', 'Power'
]

const generateIrishName = () => {
  const gender = faker.helpers.arrayElement(['male', 'female'])
  const firstName = faker.helpers.arrayElement(IRISH_FIRST_NAMES[gender])
  const lastName = faker.helpers.arrayElement(IRISH_SURNAMES)
  return { firstName, lastName }
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
      const irishName = generateIrishName()
      userData.push({
        firstName: irishName.firstName,
        lastName: irishName.lastName,
        email: faker.internet.email({ firstName: irishName.firstName.toLowerCase(), lastName: irishName.lastName.toLowerCase() }).toLowerCase(),
        password: await hashPassword('password123'),
        phone: generateIrishPhone(),
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
          currency: 'EUR',
          timezone: 'Europe/Dublin'
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
    
    // First, add authentic Irish brands
    for (const irishBrand of IRISH_BRANDS) {
      const irishAddress = generateIrishAddress()
      const brandName = irishBrand.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      
      brandData.push({
        name: irishBrand.name,
        email: `info@${brandName}.ie`,
        password: await hashPassword('brandpass123'),
        description: irishBrand.description,
        logo: faker.image.urlLoremFlickr({ category: 'business' }),
        coverImage: faker.image.urlLoremFlickr({ category: 'business', width: 1200, height: 400 }),
        website: irishBrand.website,
        phone: generateIrishPhone(),
        address: irishAddress.address,
        location: {
          city: irishAddress.city,
          state: irishAddress.county,
          country: 'Ireland',
          coordinates: irishAddress.coordinates
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
          instagram: `@${brandName}`,
          facebook: `https://facebook.com/${brandName}`,
          twitter: `@${brandName}`,
          linkedin: `https://linkedin.com/company/${brandName}`
        },
        businessRegistration: faker.string.alphanumeric(10).toUpperCase(),
        documents: [faker.internet.url(), faker.internet.url()],
        verified: faker.datatype.boolean({ probability: 0.9 }), // Irish brands more likely to be verified
        status: faker.helpers.arrayElement(['active', 'active', 'active', 'pending_verification'] as const), // Mostly active
        rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 2 }).toString(),
        totalReviews: faker.number.int({ min: 100, max: 2000 }),
        activeOffers: faker.number.int({ min: 5, max: 25 }),
        totalOffers: faker.number.int({ min: 20, max: 150 }),
        followers: faker.number.int({ min: 1000, max: 50000 }),
        totalSavings: faker.number.float({ min: 10000, max: 100000, fractionDigits: 2 }).toString(),
        totalViews: faker.number.int({ min: 10000, max: 500000 }),
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
        lastOfferDate: faker.date.recent({ days: 30 }),
        lastLoginAt: faker.date.recent({ days: 3 }),
        isActive: faker.datatype.boolean({ probability: 0.95 }),
        emailVerified: faker.datatype.boolean({ probability: 0.95 })
      })
    }
    
    // Add some additional fictional Irish brands to reach desired count
    const additionalBrandsNeeded = Math.max(0, 50 - IRISH_BRANDS.length)
    for (let i = 0; i < additionalBrandsNeeded; i++) {
      const irishAddress = generateIrishAddress()
      const companyName = `${faker.helpers.arrayElement(['Celtic', 'Emerald', 'Shamrock', 'Clover', 'Gaelic', 'Dublin', 'Cork', 'Galway'])} ${faker.company.buzzNoun()}`
      const brandName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '')
      
      brandData.push({
        name: companyName,
        email: `info@${brandName}.ie`,
        password: await hashPassword('brandpass123'),
        description: faker.company.catchPhrase() + '. ' + faker.lorem.sentences(2),
        logo: faker.image.urlLoremFlickr({ category: 'business' }),
        coverImage: faker.image.urlLoremFlickr({ category: 'business', width: 1200, height: 400 }),
        website: `https://www.${brandName}.ie`,
        phone: generateIrishPhone(),
        address: irishAddress.address,
        location: {
          city: irishAddress.city,
          state: irishAddress.county,
          country: 'Ireland',
          coordinates: irishAddress.coordinates
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
          instagram: `@${brandName}`,
          facebook: `https://facebook.com/${brandName}`,
          twitter: `@${brandName}`,
          linkedin: `https://linkedin.com/company/${brandName}`
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
      const endDate = new Date(startDate.getTime() + (60 * 24 * 60 * 60 * 1000)) // 60 days from start date

      offerData.push({
        brandId: brand.id,
        categoryId: category.id,
        title: faker.commerce.productName() + ' - Special Offer',
        description: faker.commerce.productDescription() + ' ' + faker.lorem.sentences(2),
        discountType,
        discountValue: discountValue.toString(),
        originalPrice: originalPrice.toString(),
        finalPrice: finalPrice.toString(),
        currency: 'EUR',
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
        usedAt: status === 'used' ? new Date(claimedAt.getTime() + (7 * 24 * 60 * 60 * 1000)) : null,
        expiresAt: new Date(claimedAt.getTime() + (30 * 24 * 60 * 60 * 1000)),
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
        endDate: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)),
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

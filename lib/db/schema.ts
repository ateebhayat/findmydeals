import { pgTable, uuid, varchar, text, integer, decimal, boolean, timestamp, jsonb, pgEnum, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const userRoleEnum = pgEnum('role', ['customer', 'brand', 'admin'])
export const membershipLevelEnum = pgEnum('membershipLevel', ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'])
export const brandStatusEnum = pgEnum('brandStatus', ['pending_verification', 'active', 'suspended', 'inactive'])
export const notificationTypeEnum = pgEnum('notificationType', ['offer_claim', 'offer_expiry', 'new_deal', 'brand_update', 'system'])

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  avatar: varchar('avatar', { length: 500 }).default('https://ui-avatars.com/api/?na  me=John+Doe'),
  role: userRoleEnum('role').default('customer').notNull(),
  membershipLevel: membershipLevelEnum('membershipLevel').default('Bronze').notNull(),
  rewardPoints: integer('rewardPoints').default(0).notNull(),
  totalSavings: decimal('totalSavings', { precision: 10, scale: 2 }).default('0').notNull(),
  claimedOffers: integer('claimedOffers').default(0).notNull(),
  favoriteOffers: integer('favoriteOffers').default(0).notNull(),
  preferences: jsonb('preferences').$type<{
    categories: string[]
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      offerExpiry: boolean
      newDeals: boolean
      brandUpdates: boolean
    }
    newsletter: boolean
    language: string
    currency: string
    timezone: string
  }>(),
  socialAccounts: jsonb('socialAccounts').$type<{
    google?: {
      connected: boolean
      email: string
    }
    facebook?: {
      connected: boolean
      email: string
    }
  }>(),
  lastLoginAt: timestamp('lastLoginAt'),
  isActive: boolean('isActive').default(true).notNull(),
  emailVerified: boolean('emailVerified').default(true).notNull(),
  emailVerificationToken: varchar('emailVerificationToken', { length: 255 }),
  passwordResetToken: varchar('passwordResetToken', { length: 255 }),
  passwordResetExpires: timestamp('passwordResetExpires'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}))

// Brands table
export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  description: text('description'),
  logo: varchar('logo', { length: 500 }),
  coverImage: varchar('coverImage', { length: 500 }),
  website: varchar('website', { length: 500 }),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  location: jsonb('location').$type<{
    city: string
    state: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }>(),
  businessHours: jsonb('businessHours').$type<{
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }>(),
  socialMedia: jsonb('socialMedia').$type<{
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
    youtube?: string
  }>(),
  businessRegistration: varchar('businessRegistration', { length: 255 }),
  documents: jsonb('documents').$type<string[]>(),
  verified: boolean('verified').default(false).notNull(),
  status: brandStatusEnum('status').default('pending_verification').notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0').notNull(),
  totalReviews: integer('totalReviews').default(0).notNull(),
  activeOffers: integer('activeOffers').default(0).notNull(),
  totalOffers: integer('totalOffers').default(0).notNull(),
  followers: integer('followers').default(0).notNull(),
  totalSavings: decimal('totalSavings', { precision: 10, scale: 2 }).default('0').notNull(),
  totalViews: integer('totalViews').default(0).notNull(),
  settings: jsonb('settings').$type<{
    notifications: {
      newFollowers: boolean
      offerClaims: boolean
      reviews: boolean
    }
    privacy: {
      showEmail: boolean
      showPhone: boolean
    }
  }>(),
  lastOfferDate: timestamp('lastOfferDate'),
  lastLoginAt: timestamp('lastLoginAt'),
  isActive: boolean('isActive').default(true).notNull(),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  emailVerificationToken: varchar('emailVerificationToken', { length: 255 }),
  passwordResetToken: varchar('passwordResetToken', { length: 255 }),
  passwordResetExpires: timestamp('passwordResetExpires'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('brands_email_idx').on(table.email),
  nameIdx: index('brands_name_idx').on(table.name),
}))

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  color: varchar('color', { length: 7 }),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})

// Offers table
export const offers = pgTable('offers', {
  id: uuid('id').primaryKey().defaultRandom(),
  brandId: uuid('brandId').notNull().references(() => brands.id),
  categoryId: uuid('categoryId').references(() => categories.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  discountType: varchar('discountType', { length: 20 }).notNull(), // percentage, fixed, buy_one_get_one
  discountValue: decimal('discountValue', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('originalPrice', { precision: 10, scale: 2 }),
  finalPrice: decimal('finalPrice', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  maxClaims: integer('maxClaims'),
  currentClaims: integer('currentClaims').default(0).notNull(),
  terms: text('terms'),
  image: varchar('image', { length: 500 }),
  isActive: boolean('isActive').default(true).notNull(),
  isFeatured: boolean('isFeatured').default(false).notNull(),
  isHot: boolean('isHot').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  brandIdIdx: index('offers_brand_id_idx').on(table.brandId),
  categoryIdIdx: index('offers_category_id_idx').on(table.categoryId),
  startDateIdx: index('offers_start_date_idx').on(table.startDate),
  endDateIdx: index('offers_end_date_idx').on(table.endDate),
  isActiveIdx: index('offers_is_active_idx').on(table.isActive),
}))

// Claims table
export const claims = pgTable('claims', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  offerId: uuid('offerId').notNull().references(() => offers.id),
  claimCode: varchar('claimCode', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending, used, expired, cancelled
  claimedAt: timestamp('claimedAt').defaultNow().notNull(),
  usedAt: timestamp('usedAt'),
  expiresAt: timestamp('expiresAt'),
  savings: decimal('savings', { precision: 10, scale: 2 }),
  reviewId: uuid('reviewId'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('claims_user_id_idx').on(table.userId),
  offerIdIdx: index('claims_offer_id_idx').on(table.offerId),
  claimCodeIdx: index('claims_claim_code_idx').on(table.claimCode),
  statusIdx: index('claims_status_idx').on(table.status),
}))

// Favorites table
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  offerId: uuid('offerId').notNull().references(() => offers.id),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('favorites_user_id_idx').on(table.userId),
  offerIdIdx: index('favorites_offer_id_idx').on(table.offerId),
  uniqueUserOffer: index('favorites_user_offer_unique').on(table.userId, table.offerId),
}))

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  offerId: uuid('offerId').notNull().references(() => offers.id),
  brandId: uuid('brandId').references(() => brands.id),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  helpful: integer('helpful').default(0).notNull(),
  verified: boolean('verified').default(false).notNull(),
  claimVerified: boolean('claimVerified').default(false).notNull(),
  claimId: uuid('claimId'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('reviews_user_id_idx').on(table.userId),
  offerIdIdx: index('reviews_offer_id_idx').on(table.offerId),
  brandIdIdx: index('reviews_brand_id_idx').on(table.brandId),
  ratingIdx: index('reviews_rating_idx').on(table.rating),
}))

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  data: jsonb('data'),
  isRead: boolean('isRead').default(false).notNull(),
  readAt: timestamp('readAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('notifications_user_id_idx').on(table.userId),
  isReadIdx: index('notifications_is_read_idx').on(table.isRead),
  createdAtIdx: index('notifications_created_at_idx').on(table.createdAt),
}))

// Hot Deals table
export const hotDeals = pgTable('hotDeals', {
  id: uuid('id').primaryKey().defaultRandom(),
  offerId: uuid('offerId').notNull().references(() => offers.id),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  priority: integer('priority').default(0).notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
}, (table) => ({
  offerIdIdx: index('hot_deals_offer_id_idx').on(table.offerId),
  isActiveIdx: index('hot_deals_is_active_idx').on(table.isActive),
  priorityIdx: index('hot_deals_priority_idx').on(table.priority),
}))

// User Activities table
export const userActivities = pgTable('userActivities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  offerId: uuid('offerId').references(() => offers.id),
  activityType: varchar('activityType', { length: 50 }).notNull(), // view, claim, favorite, review
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_activities_user_id_idx').on(table.userId),
  offerIdIdx: index('user_activities_offer_id_idx').on(table.offerId),
  activityTypeIdx: index('user_activities_activity_type_idx').on(table.activityType),
  createdAtIdx: index('user_activities_created_at_idx').on(table.createdAt),
}))

// Brand Followers table
export const brandFollowers = pgTable('brandFollowers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id),
  brandId: uuid('brandId').notNull().references(() => brands.id),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('brand_followers_user_id_idx').on(table.userId),
  brandIdIdx: index('brand_followers_brand_id_idx').on(table.brandId),
  uniqueUserBrand: index('brand_followers_user_brand_unique').on(table.userId, table.brandId),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  claims: many(claims),
  favorites: many(favorites),
  reviews: many(reviews),
  notifications: many(notifications),
  activities: many(userActivities),
  brandFollows: many(brandFollowers),
}))

export const brandsRelations = relations(brands, ({ many }) => ({
  offers: many(offers),
  reviews: many(reviews),
  followers: many(brandFollowers),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  offers: many(offers),
}))

export const offersRelations = relations(offers, ({ one, many }) => ({
  brand: one(brands, {
    fields: [offers.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [offers.categoryId],
    references: [categories.id],
  }),
  claims: many(claims),
  favorites: many(favorites),
  reviews: many(reviews),
  hotDeal: many(hotDeals),
  activities: many(userActivities),
}))

export const claimsRelations = relations(claims, ({ one }) => ({
  user: one(users, {
    fields: [claims.userId],
    references: [users.id],
  }),
  offer: one(offers, {
    fields: [claims.offerId],
    references: [offers.id],
  }),
  review: one(reviews, {
    fields: [claims.reviewId],
    references: [reviews.id],
  }),
}))

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  offer: one(offers, {
    fields: [favorites.offerId],
    references: [offers.id],
  }),
}))

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  offer: one(offers, {
    fields: [reviews.offerId],
    references: [offers.id],
  }),
  brand: one(brands, {
    fields: [reviews.brandId],
    references: [brands.id],
  }),
  claim: one(claims, {
    fields: [reviews.claimId],
    references: [claims.id],
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

export const hotDealsRelations = relations(hotDeals, ({ one }) => ({
  offer: one(offers, {
    fields: [hotDeals.offerId],
    references: [offers.id],
  }),
}))

export const userActivitiesRelations = relations(userActivities, ({ one }) => ({
  user: one(users, {
    fields: [userActivities.userId],
    references: [users.id],
  }),
  offer: one(offers, {
    fields: [userActivities.offerId],
    references: [offers.id],
  }),
}))

export const brandFollowersRelations = relations(brandFollowers, ({ one }) => ({
  user: one(users, {
    fields: [brandFollowers.userId],
    references: [users.id],
  }),
  brand: one(brands, {
    fields: [brandFollowers.brandId],
    references: [brands.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Brand = typeof brands.$inferSelect
export type NewBrand = typeof brands.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Offer = typeof offers.$inferSelect
export type NewOffer = typeof offers.$inferInsert
export type Claim = typeof claims.$inferSelect
export type NewClaim = typeof claims.$inferInsert
export type Favorite = typeof favorites.$inferSelect
export type NewFavorite = typeof favorites.$inferInsert
export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert
export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert
export type HotDeal = typeof hotDeals.$inferSelect
export type NewHotDeal = typeof hotDeals.$inferInsert
export type UserActivity = typeof userActivities.$inferSelect
export type NewUserActivity = typeof userActivities.$inferInsert
export type BrandFollower = typeof brandFollowers.$inferSelect
export type NewBrandFollower = typeof brandFollowers.$inferInsert 
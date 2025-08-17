import { eq, and, desc, asc, like, gte, lte, inArray } from "drizzle-orm"
import { db } from "./index"
import { 
  users, 
  brands, 
  offers, 
  categories, 
  claims, 
  favorites, 
  reviews, 
  notifications, 
  hotDeals, 
  userActivities, 
  brandFollowers 
} from "./schema"
import type { 
  User, 
  NewUser, 
  Brand, 
  NewBrand, 
  Offer, 
  NewOffer,
  Category,
  NewCategory,
  Claim,
  NewClaim,
  Favorite,
  NewFavorite,
  Review,
  NewReview,
  Notification,
  NewNotification,
  HotDeal,
  NewHotDeal,
  UserActivity,
  NewUserActivity,
  BrandFollower,
  NewBrandFollower
} from "./schema"

export class UserService {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
    return result[0] || null
  }

  static async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning()
    return user
  }

  static async update(id: string, data: Partial<NewUser>): Promise<User | null> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning()
    return user || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(users).where(eq(users.id, id))
    return true
  }
}

export class BrandService {
  static async findByEmail(email: string): Promise<Brand | null> {
    const result = await db.select().from(brands).where(eq(brands.email, email)).limit(1)
    return result[0] || null
  }

  static async findById(id: string): Promise<Brand | null> {
    const result = await db.select().from(brands).where(eq(brands.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewBrand): Promise<Brand> {
    const [brand] = await db.insert(brands).values(data).returning()
    return brand
  }

  static async update(id: string, data: Partial<NewBrand>): Promise<Brand | null> {
    const [brand] = await db.update(brands).set(data).where(eq(brands.id, id)).returning()
    return brand || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(brands).where(eq(brands.id, id))
    return true
  }

  static async findMany(): Promise<Brand[]> {
    return await db.select().from(brands).orderBy(desc(brands.createdAt))
  }
}

export class OfferService {
  static async findById(id: string): Promise<Offer | null> {
    const result = await db.select().from(offers).where(eq(offers.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewOffer): Promise<Offer> {
    const [offer] = await db.insert(offers).values(data).returning()
    return offer
  }

  static async update(id: string, data: Partial<NewOffer>): Promise<Offer | null> {
    const [offer] = await db.update(offers).set(data).where(eq(offers.id, id)).returning()
    return offer || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(offers).where(eq(offers.id, id))
    return true
  }

  static async findMany(params?: {
    limit?: number
  }): Promise<Offer[]> {
    if (params?.limit) {
      return await db.select().from(offers).where(eq(offers.isActive, true)).orderBy(desc(offers.createdAt)).limit(params.limit)
    }
    
    return await db.select().from(offers).where(eq(offers.isActive, true)).orderBy(desc(offers.createdAt))
  }
}

export class CategoryService {
  static async findById(id: string): Promise<Category | null> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(data).returning()
    return category
  }

  static async update(id: string, data: Partial<NewCategory>): Promise<Category | null> {
    const [category] = await db.update(categories).set(data).where(eq(categories.id, id)).returning()
    return category || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(categories).where(eq(categories.id, id))
    return true
  }

  static async findMany(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.name))
  }
}

export class ClaimService {
  static async findById(id: string): Promise<Claim | null> {
    const result = await db.select().from(claims).where(eq(claims.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewClaim): Promise<Claim> {
    const [claim] = await db.insert(claims).values(data).returning()
    return claim
  }

  static async update(id: string, data: Partial<NewClaim>): Promise<Claim | null> {
    const [claim] = await db.update(claims).set(data).where(eq(claims.id, id)).returning()
    return claim || null
  }

  static async findByUser(userId: string): Promise<Claim[]> {
    return await db.select().from(claims).where(eq(claims.userId, userId)).orderBy(desc(claims.claimedAt))
  }
}

export class FavoriteService {
  static async findById(id: string): Promise<Favorite | null> {
    const result = await db.select().from(favorites).where(eq(favorites.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewFavorite): Promise<Favorite> {
    const [favorite] = await db.insert(favorites).values(data).returning()
    return favorite
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(favorites).where(eq(favorites.id, id))
    return true
  }

  static async findByUser(userId: string): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId)).orderBy(desc(favorites.createdAt))
  }

  static async checkFavorite(userId: string, offerId: string): Promise<Favorite | null> {
    const result = await db.select().from(favorites).where(and(eq(favorites.userId, userId), eq(favorites.offerId, offerId))).limit(1)
    return result[0] || null
  }
}

export class ReviewService {
  static async findById(id: string): Promise<Review | null> {
    const result = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(data).returning()
    return review
  }

  static async update(id: string, data: Partial<NewReview>): Promise<Review | null> {
    const [review] = await db.update(reviews).set(data).where(eq(reviews.id, id)).returning()
    return review || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(reviews).where(eq(reviews.id, id))
    return true
  }

  static async findByOffer(offerId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.offerId, offerId)).orderBy(desc(reviews.createdAt))
  }
}

export class NotificationService {
  static async findById(id: string): Promise<Notification | null> {
    const result = await db.select().from(notifications).where(eq(notifications.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewNotification): Promise<Notification> {
    const [notification] = await db.insert(notifications).values(data).returning()
    return notification
  }

  static async update(id: string, data: Partial<NewNotification>): Promise<Notification | null> {
    const [notification] = await db.update(notifications).set(data).where(eq(notifications.id, id)).returning()
    return notification || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(notifications).where(eq(notifications.id, id))
    return true
  }

  static async findByUser(userId: string, params?: {
    unread?: boolean
  }): Promise<Notification[]> {
    if (params?.unread !== undefined) {
      return await db.select().from(notifications)
        .where(and(eq(notifications.userId, userId), eq(notifications.isRead, !params.unread)))
        .orderBy(desc(notifications.createdAt))
    }
    
    return await db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
  }
}

export class HotDealService {
  static async findById(id: string): Promise<HotDeal | null> {
    const result = await db.select().from(hotDeals).where(eq(hotDeals.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewHotDeal): Promise<HotDeal> {
    const [hotDeal] = await db.insert(hotDeals).values(data).returning()
    return hotDeal
  }

  static async update(id: string, data: Partial<NewHotDeal>): Promise<HotDeal | null> {
    const [hotDeal] = await db.update(hotDeals).set(data).where(eq(hotDeals.id, id)).returning()
    return hotDeal || null
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(hotDeals).where(eq(hotDeals.id, id))
    return true
  }

  static async findMany(params?: {
    limit?: number
  }): Promise<HotDeal[]> {
    if (params?.limit) {
      return await db.select().from(hotDeals)
        .where(eq(hotDeals.isActive, true))
        .orderBy(asc(hotDeals.priority), desc(hotDeals.createdAt))
        .limit(params.limit)
    }

    return await db.select().from(hotDeals)
      .where(eq(hotDeals.isActive, true))
      .orderBy(asc(hotDeals.priority), desc(hotDeals.createdAt))
  }
}

export class UserActivityService {
  static async findById(id: string): Promise<UserActivity | null> {
    const result = await db.select().from(userActivities).where(eq(userActivities.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewUserActivity): Promise<UserActivity> {
    const [activity] = await db.insert(userActivities).values(data).returning()
    return activity
  }

  static async findByUser(userId: string, params?: {
    limit?: number
  }): Promise<UserActivity[]> {
    if (params?.limit) {
      return await db.select().from(userActivities)
        .where(eq(userActivities.userId, userId))
        .orderBy(desc(userActivities.createdAt))
        .limit(params.limit)
    }

    return await db.select().from(userActivities)
      .where(eq(userActivities.userId, userId))
      .orderBy(desc(userActivities.createdAt))
  }
}

export class BrandFollowerService {
  static async findById(id: string): Promise<BrandFollower | null> {
    const result = await db.select().from(brandFollowers).where(eq(brandFollowers.id, id)).limit(1)
    return result[0] || null
  }

  static async create(data: NewBrandFollower): Promise<BrandFollower> {
    const [follower] = await db.insert(brandFollowers).values(data).returning()
    return follower
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(brandFollowers).where(eq(brandFollowers.id, id))
    return true
  }

  static async checkFollow(userId: string, brandId: string): Promise<BrandFollower | null> {
    const result = await db.select().from(brandFollowers).where(and(eq(brandFollowers.userId, userId), eq(brandFollowers.brandId, brandId))).limit(1)
    return result[0] || null
  }

  static async findByUser(userId: string): Promise<BrandFollower[]> {
    return await db.select().from(brandFollowers).where(eq(brandFollowers.userId, userId)).orderBy(desc(brandFollowers.createdAt))
  }

  static async findByBrand(brandId: string): Promise<BrandFollower[]> {
    return await db.select().from(brandFollowers).where(eq(brandFollowers.brandId, brandId)).orderBy(desc(brandFollowers.createdAt))
  }
} 
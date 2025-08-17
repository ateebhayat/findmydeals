CREATE TYPE "public"."brandStatus" AS ENUM('pending_verification', 'active', 'suspended', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."membershipLevel" AS ENUM('Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond');--> statement-breakpoint
CREATE TYPE "public"."notificationType" AS ENUM('offer_claim', 'offer_expiry', 'new_deal', 'brand_update', 'system');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('customer', 'brand', 'admin');--> statement-breakpoint
CREATE TABLE "brandFollowers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"brandId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"description" text,
	"logo" varchar(500),
	"coverImage" varchar(500),
	"website" varchar(500),
	"phone" varchar(20),
	"address" text,
	"location" jsonb,
	"businessHours" jsonb,
	"socialMedia" jsonb,
	"businessRegistration" varchar(255),
	"documents" jsonb,
	"verified" boolean DEFAULT false NOT NULL,
	"status" "brandStatus" DEFAULT 'pending_verification' NOT NULL,
	"rating" numeric(3, 2) DEFAULT '0' NOT NULL,
	"totalReviews" integer DEFAULT 0 NOT NULL,
	"activeOffers" integer DEFAULT 0 NOT NULL,
	"totalOffers" integer DEFAULT 0 NOT NULL,
	"followers" integer DEFAULT 0 NOT NULL,
	"totalSavings" numeric(10, 2) DEFAULT '0' NOT NULL,
	"totalViews" integer DEFAULT 0 NOT NULL,
	"settings" jsonb,
	"lastOfferDate" timestamp,
	"lastLoginAt" timestamp,
	"isActive" boolean DEFAULT true NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"emailVerificationToken" varchar(255),
	"passwordResetToken" varchar(255),
	"passwordResetExpires" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brands_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100),
	"color" varchar(7),
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"offerId" uuid NOT NULL,
	"claimCode" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"claimedAt" timestamp DEFAULT now() NOT NULL,
	"usedAt" timestamp,
	"expiresAt" timestamp,
	"savings" numeric(10, 2),
	"reviewId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "claims_claimCode_unique" UNIQUE("claimCode")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"offerId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotDeals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offerId" uuid NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"type" "notificationType" NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"data" jsonb,
	"isRead" boolean DEFAULT false NOT NULL,
	"readAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brandId" uuid NOT NULL,
	"categoryId" uuid,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"discountType" varchar(20) NOT NULL,
	"discountValue" numeric(10, 2) NOT NULL,
	"originalPrice" numeric(10, 2),
	"finalPrice" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"maxClaims" integer,
	"currentClaims" integer DEFAULT 0 NOT NULL,
	"terms" text,
	"image" varchar(500),
	"isActive" boolean DEFAULT true NOT NULL,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"isHot" boolean DEFAULT false NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"offerId" uuid NOT NULL,
	"brandId" uuid,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"helpful" integer DEFAULT 0 NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"claimVerified" boolean DEFAULT false NOT NULL,
	"claimId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userActivities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"offerId" uuid,
	"activityType" varchar(50) NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(20),
	"avatar" varchar(500) DEFAULT 'https://ui-avatars.com/api/?na  me=John+Doe',
	"role" "role" DEFAULT 'customer' NOT NULL,
	"membershipLevel" "membershipLevel" DEFAULT 'Bronze' NOT NULL,
	"rewardPoints" integer DEFAULT 0 NOT NULL,
	"totalSavings" numeric(10, 2) DEFAULT '0' NOT NULL,
	"claimedOffers" integer DEFAULT 0 NOT NULL,
	"favoriteOffers" integer DEFAULT 0 NOT NULL,
	"preferences" jsonb,
	"socialAccounts" jsonb,
	"lastLoginAt" timestamp,
	"isActive" boolean DEFAULT true NOT NULL,
	"emailVerified" boolean DEFAULT true NOT NULL,
	"emailVerificationToken" varchar(255),
	"passwordResetToken" varchar(255),
	"passwordResetExpires" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "brandFollowers" ADD CONSTRAINT "brandFollowers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brandFollowers" ADD CONSTRAINT "brandFollowers_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotDeals" ADD CONSTRAINT "hotDeals_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userActivities" ADD CONSTRAINT "userActivities_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userActivities" ADD CONSTRAINT "userActivities_offerId_offers_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "brand_followers_user_id_idx" ON "brandFollowers" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "brand_followers_brand_id_idx" ON "brandFollowers" USING btree ("brandId");--> statement-breakpoint
CREATE INDEX "brand_followers_user_brand_unique" ON "brandFollowers" USING btree ("userId","brandId");--> statement-breakpoint
CREATE INDEX "brands_email_idx" ON "brands" USING btree ("email");--> statement-breakpoint
CREATE INDEX "brands_name_idx" ON "brands" USING btree ("name");--> statement-breakpoint
CREATE INDEX "claims_user_id_idx" ON "claims" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "claims_offer_id_idx" ON "claims" USING btree ("offerId");--> statement-breakpoint
CREATE INDEX "claims_claim_code_idx" ON "claims" USING btree ("claimCode");--> statement-breakpoint
CREATE INDEX "claims_status_idx" ON "claims" USING btree ("status");--> statement-breakpoint
CREATE INDEX "favorites_user_id_idx" ON "favorites" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "favorites_offer_id_idx" ON "favorites" USING btree ("offerId");--> statement-breakpoint
CREATE INDEX "favorites_user_offer_unique" ON "favorites" USING btree ("userId","offerId");--> statement-breakpoint
CREATE INDEX "hot_deals_offer_id_idx" ON "hotDeals" USING btree ("offerId");--> statement-breakpoint
CREATE INDEX "hot_deals_is_active_idx" ON "hotDeals" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "hot_deals_priority_idx" ON "hotDeals" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "notifications_is_read_idx" ON "notifications" USING btree ("isRead");--> statement-breakpoint
CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "offers_brand_id_idx" ON "offers" USING btree ("brandId");--> statement-breakpoint
CREATE INDEX "offers_category_id_idx" ON "offers" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX "offers_start_date_idx" ON "offers" USING btree ("startDate");--> statement-breakpoint
CREATE INDEX "offers_end_date_idx" ON "offers" USING btree ("endDate");--> statement-breakpoint
CREATE INDEX "offers_is_active_idx" ON "offers" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "reviews_user_id_idx" ON "reviews" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "reviews_offer_id_idx" ON "reviews" USING btree ("offerId");--> statement-breakpoint
CREATE INDEX "reviews_brand_id_idx" ON "reviews" USING btree ("brandId");--> statement-breakpoint
CREATE INDEX "reviews_rating_idx" ON "reviews" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "user_activities_user_id_idx" ON "userActivities" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_activities_offer_id_idx" ON "userActivities" USING btree ("offerId");--> statement-breakpoint
CREATE INDEX "user_activities_activity_type_idx" ON "userActivities" USING btree ("activityType");--> statement-breakpoint
CREATE INDEX "user_activities_created_at_idx" ON "userActivities" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");
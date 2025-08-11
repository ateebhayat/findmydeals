# BrandOffers Platform

A comprehensive Next.js application for managing brand offers, deals, and customer interactions with a full backend API built using TypeORM and PostgreSQL.

## Features

- **User Authentication**: Customer and brand registration/login with JWT tokens
- **Offer Management**: Create, manage, and claim offers with detailed tracking
- **Hot Deals**: Flash sales and urgent deals with real-time countdown
- **Categories**: Organized offer categories with filtering and search
- **Customer Dashboard**: Personal dashboard with stats, activity, and recommendations
- **Brand Management**: Brand profiles, verification, and analytics
- **Real-time Features**: Notifications, activity tracking, and trending offers
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, TypeORM, PostgreSQL
- **Authentication**: JWT tokens with refresh mechanism
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Database**: PostgreSQL with TypeORM entities

## Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- Yarn or npm

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brand-offers-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your-password
   DB_NAME=brandoffers

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

   # Application Configuration
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE brandoffers;
   CREATE USER brandoffers_user WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE brandoffers TO brandoffers_user;
   ```

5. **Initialize the database**
   ```bash
   # Run the database initialization script
   npx tsx scripts/init-database.ts
   ```

6. **Start the development server**
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:3000`

## Database Schema

The application uses TypeORM entities with the following main tables:

- **users**: Customer accounts with membership levels and preferences
- **brands**: Brand accounts with verification status and analytics
- **offers**: Offer details with status, pricing, and metadata
- **categories**: Offer categories with subcategories and metadata
- **claims**: User offer claims with status and usage tracking
- **favorites**: User favorite offers
- **reviews**: Offer reviews and ratings
- **notifications**: User notifications
- **hot_deals**: Special deals with urgency tracking
- **user_activities**: User activity tracking
- **brand_followers**: Brand following relationships

## API Endpoints

### Authentication
- `POST /api/auth/customer/register` - Customer registration
- `POST /api/auth/customer/login` - Customer login
- `POST /api/auth/brand/register` - Brand registration
- `POST /api/auth/brand/login` - Brand login

### Offers
- `GET /api/offers` - Get all offers with filtering and pagination
- `GET /api/offers/[id]` - Get specific offer details
- `POST /api/offers/[id]/claim` - Claim an offer
- `POST /api/offers/[id]/view` - Track offer view

### Hot Deals
- `GET /api/deals/hot` - Get hot deals with urgency filtering

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/[slug]` - Get specific category details
- `GET /api/categories/[slug]/offers` - Get offers in a category

### Customer Dashboard
- `GET /api/customer/dashboard` - Get customer dashboard data
- `GET /api/customer/claimed-offers` - Get customer's claimed offers
- `GET /api/customer/favorites` - Get customer's favorite offers
- `GET /api/customer/activity` - Get customer's activity history

### Brands
- `GET /api/brands` - Get all brands with filtering
- `GET /api/brands/[id]` - Get specific brand details
- `POST /api/brands/[id]/follow` - Follow/unfollow a brand

## Sample Data

The initialization script creates:

- **3 Categories**: Fashion, Electronics, Food & Beverage
- **3 Brands**: Fashion Forward, TechHub Pro, Serenity Spa
- **3 Offers**: Summer collection sale, Electronics discount, Spa treatments
- **2 Sample Users**: Sarah Johnson (Gold member), John Doe (Silver member)

## Development

### Database Commands
```bash
# Generate TypeORM models
yarn db:generate

# Create migration
yarn db:create-migration

# Run migrations
yarn db:migrate

# Revert migration
yarn db:revert
```

### Code Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── customer/          # Customer dashboard
│   └── dashboard/         # Brand dashboard
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── entities/          # TypeORM entities
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database configuration
│   └── middleware.ts     # API middleware
├── scripts/               # Database scripts
└── styles/                # Global styles
```

## Authentication Flow

1. **Registration**: Users can register as customers or brands
2. **Login**: JWT tokens are issued for authentication
3. **Token Refresh**: Automatic token refresh using refresh tokens
4. **Authorization**: Role-based access control for different endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 
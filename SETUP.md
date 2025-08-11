# BrandOffers App Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- Yarn or npm

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=brandoffers

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Database Setup

1. **Create PostgreSQL Database:**
   ```sql
   CREATE DATABASE brandoffers;
   CREATE USER brandoffers_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE brandoffers TO brandoffers_user;
   ```

2. **Initialize Database with Sample Data:**
   ```bash
   npx tsx scripts/init-database.ts
   ```

## Installation & Running

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Start Development Server:**
   ```bash
   yarn dev
   ```

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:3000/docs

## API Endpoints

### Authentication
- `POST /api/auth/customer/register` - Customer registration
- `POST /api/auth/customer/login` - Customer login
- `POST /api/auth/brand/register` - Brand registration
- `POST /api/auth/brand/login` - Brand login

### Offers
- `GET /api/offers` - Get all offers with filtering
- `GET /api/offers/{id}` - Get specific offer
- `POST /api/offers/{id}/claim` - Claim an offer
- `POST /api/offers/{id}/view` - Record offer view

### Hot Deals
- `GET /api/deals/hot` - Get hot deals

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{slug}` - Get specific category

### Customer Dashboard
- `GET /api/customer/dashboard` - Get customer dashboard data
- `GET /api/customer/claimed-offers` - Get claimed offers
- `GET /api/customer/favorites` - Get favorites

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/{id}` - Get specific brand

## Testing the System

1. **Register a Customer:**
   - Go to http://localhost:3000/auth/customer/register
   - Fill in the registration form
   - You'll be redirected to the dashboard

2. **Register a Brand:**
   - Go to http://localhost:3000/auth/brand/register
   - Fill in the brand registration form

3. **Browse Offers:**
   - Visit http://localhost:3000/offers
   - Use filters and search functionality

4. **View Hot Deals:**
   - Visit http://localhost:3000/deals
   - See time-limited offers

5. **Explore Categories:**
   - Visit http://localhost:3000/categories
   - Browse offers by category

## Database Schema

The application includes the following entities:
- **Users** - Customer accounts with membership levels
- **Brands** - Business accounts with verification status
- **Offers** - Deals and promotions
- **Categories** - Offer categorization
- **Claims** - Offer usage tracking
- **Favorites** - User saved offers
- **Reviews** - User feedback
- **Notifications** - User alerts
- **HotDeals** - Time-sensitive offers
- **UserActivity** - User interaction tracking
- **BrandFollowers** - Brand subscription tracking

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env.local`
- Verify database exists and user has permissions

### JWT Token Issues
- Ensure JWT_SECRET and JWT_REFRESH_SECRET are set
- Check token expiration settings

### API Errors
- Check browser console for detailed error messages
- Verify API routes are accessible
- Check database connection status

## Production Deployment

1. **Environment Variables:**
   - Use strong, unique JWT secrets
   - Set NODE_ENV=production
   - Configure production database

2. **Database:**
   - Use production PostgreSQL instance
   - Set up proper backups
   - Configure connection pooling

3. **Security:**
   - Enable HTTPS
   - Set secure cookie options
   - Configure CORS properly

## Support

For issues or questions:
1. Check the console logs
2. Review the API documentation
3. Check database connectivity
4. Verify environment configuration 
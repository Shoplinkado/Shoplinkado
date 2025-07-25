# Shoplinkado - E-commerce Product Aggregator

## Overview

Shoplinkado is a Brazilian e-commerce affiliate platform that aggregates and displays products from Shopee with organized categories and direct purchase links. The application features a clean, mobile-first design with Portuguese content targeting Brazilian users.

## User Preferences

Preferred communication style: Simple, everyday language.
Admin password: Maduh5082410381

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Storage**: PostgreSQL-backed session store

### Key Design Decisions

**Monorepo Structure**: The application uses a monorepo with `client/`, `server/`, and `shared/` directories to enable code sharing between frontend and backend, particularly for type definitions and database schemas.

**In-Memory Development Storage**: The application includes a memory-based storage implementation for development, allowing rapid prototyping without database setup, while maintaining the same interface for production database integration.

**Component-First UI**: Uses shadcn/ui components built on Radix UI primitives, providing accessible, customizable components with consistent design patterns.

## Key Components

### Data Models
- **Categories**: Product categories with emoji icons, descriptions, and URL slugs
- **Products**: Product information including images, prices, ratings, and Shopee affiliate URLs
- **Schema Validation**: Drizzle-Zod integration for runtime type validation

### Core Features
- **Category Browser**: Homepage displays all available product categories
- **Product Listings**: Category-specific product pages with filtering
- **Affiliate Integration**: Direct links to Shopee product pages
- **Responsive Design**: Mobile-first design optimized for Brazilian users
- **Flash Sales**: Special promotion handling with visual indicators
- **Admin Authentication**: Secure admin panel with session-based authentication
- **Product Management**: Admin interface to add and manage affiliate products

### API Endpoints
- `GET /api/categories` - Retrieve all categories
- `GET /api/categories/:slug` - Get specific category by slug
- `GET /api/categories/:slug/products` - Get products for a category
- `POST /api/products` - Create new product (authenticated)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check` - Check admin authentication status

## Data Flow

1. **Homepage Load**: Fetches categories from `/api/categories` and displays as grid
2. **Category Navigation**: Uses slug-based routing to load category-specific pages
3. **Product Display**: Loads products for selected category via `/api/categories/:slug/products`
4. **Affiliate Clicks**: Opens Shopee URLs in new tab/window for purchase completion
5. **Error Handling**: Graceful fallbacks with loading states and error messages

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pooling**: Built-in connection management via Neon

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Consistent icon system
- **Custom Color Scheme**: Shopee-inspired orange theme with CSS variables

### Development Tools
- **Vite**: Fast build tool with HMR
- **ESBuild**: Production build optimization
- **TypeScript**: Full type safety across stack
- **Replit Integration**: Development environment compatibility

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild compiles TypeScript server to `dist/index.js`
- **Database**: Drizzle migrations run via `db:push` script

### Production Configuration
- **Environment Variables**: `DATABASE_URL` for PostgreSQL connection
- **Static Assets**: Served via Express static middleware in production
- **Process Management**: Single Node.js process serving both API and static files

### Development Workflow
- **Hot Reload**: Vite HMR for frontend changes
- **API Restart**: nodemon-style restart for backend changes
- **Database Sync**: Push schema changes without migrations during development
- **Type Safety**: Shared types between client and server ensure consistency

The application is designed for easy deployment on platforms like Replit, Heroku, or Vercel with minimal configuration requirements.
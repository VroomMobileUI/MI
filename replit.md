# JAY JANKULOVSKI E-commerce Platform

## Overview

This is a full-stack e-commerce platform for JAY JANKULOVSKI's digital video editing products, built with a modern React frontend and Express.js backend. The application showcases and sells video editing tools including LUT packs, DaVinci Resolve powergrades, transitions, and SFX packs targeted at content creators and video professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom cinema theme variables
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Storage**: Currently using in-memory storage with seeded data (MemStorage class)
- **Database ORM**: Drizzle ORM configured for PostgreSQL (ready for database integration)
- **API**: RESTful API endpoints for products, reviews, and before/after images

### Project Structure
- **Monorepo approach** with shared types and schemas
- **client/**: React frontend application
- **server/**: Express.js backend application  
- **shared/**: Common schemas and types used by both frontend and backend

## Key Components

### Database Schema (Drizzle)
- **Products**: Core product information with pricing, categories, images
- **Reviews**: Customer reviews with ratings and timestamps
- **Before/After Images**: Comparison images for showcasing product effects
- **Schema Location**: `shared/schema.ts` with Zod validation

### API Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/featured` - Fetch featured products
- `GET /api/products/:id` - Fetch single product
- `GET /api/products/category/:category` - Fetch products by category
- `GET /api/reviews` - Fetch all reviews
- `GET /api/before-after` - Fetch before/after comparison images

### Frontend Components
- **Navigation**: Fixed header with responsive mobile menu
- **HeroCarousel**: Auto-rotating carousel for featured products
- **ProductCard**: Reusable component with small/large variants
- **BeforeAfterSlider**: Interactive slider for image comparisons
- **ReviewCard**: Customer review display components

### Styling System
- **Cinema Theme**: Custom CSS variables for dark, cinematic aesthetic
- **Colors**: Black/gray primary palette with orange accent (#FF6B35)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express.js routes handle HTTP requests and responses
3. **Storage Layer**: Currently in-memory storage, designed for easy database integration
4. **Response Flow**: JSON responses with consistent error handling
5. **State Management**: Query client handles caching, loading states, and updates

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessibility
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Utilities**: date-fns for date formatting
- **Icons**: Lucide React for consistent iconography
- **Carousel**: Embla Carousel for smooth sliding components

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL (configured but not yet connected)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Environment**: tsx for TypeScript execution in development

### Development Tools
- **Build**: esbuild for production backend bundling
- **Type Checking**: TypeScript with strict configuration
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer
- **Development**: Vite dev server with HMR and error overlay

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Type Checking**: TypeScript compiler validates all code

### Environment Configuration
- **Development**: Uses tsx for hot reloading and Vite dev server
- **Production**: Serves static files from Express with built React app
- **Database**: Configured for PostgreSQL via DATABASE_URL environment variable

### Current Status
- **Frontend**: Fully functional with mock data
- **Backend**: API endpoints implemented with in-memory storage
- **Database**: Schema defined but not yet connected (easy to enable)
- **Deployment**: Ready for production deployment with database setup

The application is architected to easily transition from in-memory storage to a full PostgreSQL database by simply providing a DATABASE_URL and running the Drizzle migrations. The storage interface abstraction allows this transition without changing the API layer.
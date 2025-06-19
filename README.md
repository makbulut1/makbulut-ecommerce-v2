# Makbulut Ecommerce

Makbulut Store - A Medusa-powered ecommerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Yarn

### Setup

1. **Start the database services:**
```bash
docker-compose up -d
```

2. **Start the backend:**
```bash
cd makbulut-ecommerce-backend
yarn dev
```

3. **Start the storefront (in a new terminal):**
```bash
cd makbulut-ecommerce-storefront
yarn dev
```

## 📁 Project Structure

```
makbulut-ecommerce/
├── docker-compose.yml              # Database services (PostgreSQL + Redis)
├── makbulut-ecommerce-backend/     # Medusa backend API
└── makbulut-ecommerce-storefront/  # Next.js storefront
```

## 🌐 Access Points

- **Backend API:** http://localhost:9000
- **Storefront:** http://localhost:8000
- **Admin Dashboard:** http://localhost:9000/admin

## 🔧 Development

### Backend Commands
```bash
cd makbulut-ecommerce-backend
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn seed         # Seed database with demo data
```

### Storefront Commands
```bash
cd makbulut-ecommerce-storefront
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
```

## 🗄️ Database

The project uses PostgreSQL with the following default credentials:
- **Host:** localhost:5432
- **Database:** medusa
- **Username:** postgres
- **Password:** postgres

## 📝 Environment Variables

Backend environment variables are configured in `makbulut-ecommerce-backend/.env`:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
REDIS_URL=redis://localhost:6379
```

## 🎯 Features

- ✅ Headless ecommerce backend
- ✅ Next.js storefront
- ✅ PostgreSQL database
- ✅ Redis caching
- ✅ Admin dashboard
- ✅ Demo data included

## 📚 Documentation

For more information about Medusa, visit: https://docs.medusajs.com/ 
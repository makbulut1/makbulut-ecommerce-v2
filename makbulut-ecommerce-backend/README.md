# Makbulut Store Backend

![License](https://img.shields.io/github/license/kullaniciadi/makbulut-ecommerce)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

A modern, scalable, and customizable e-commerce backend built with Medusa.

Medusa altyapısı ile geliştirilmiş, ölçeklenebilir ve özelleştirilebilir bir e-ticaret backend uygulaması.

---

## Requirements

- **Node.js**: v20 or higher (e.g. v20.19.0)
- **Yarn**: v1.22.x or v3.x (e.g. v1.22.22 or v3.2.3)
- **Docker**: v20 or higher (e.g. Docker version 28.1.1)
- **Docker Compose**: v2 or higher (usually included with Docker Desktop)

> Ensure all tools above are installed and available in your PATH before proceeding.

---

## Features
- Modern, scalable, and customizable infrastructure
- Powerful API support
- Flexible module system

---

## Setup Steps

1. **Start Database and Redis**
   - In the project root, run:
     ```bash
     docker-compose up -d
     ```
   - Ensure Postgres (5432) and Redis (6379) are running:
     ```bash
     docker ps
     ```
     You should see `medusa-postgres` and `medusa-redis` containers "Up".

2. **Configure Environment Variables**
   - In `makbulut-ecommerce-backend`, create a `.env` file:
     ```env
     DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     STORE_CORS=http://localhost:8000
     ADMIN_CORS=http://localhost:7000
     AUTH_CORS=http://localhost:7000,http://localhost:8000
     JWT_SECRET=supersecret
     COOKIE_SECRET=supersecret
     STOCK_LOCATION_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     INVENTORY_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     SALES_CHANNEL_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     PRODUCT_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     REGION_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     USER_DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
     ```

3. **Install Dependencies**
   ```bash
   yarn install
   ```

4. **Run Migrations and Seed Data**
   - Migrate database schema:
     ```bash
     yarn medusa migrations run
     # or
     npx medusa migrations run
     ```
   - Seed with sample data:
     ```bash
     yarn medusa seed -f src/scripts/seed.ts
     # or
     npx medusa seed -f src/scripts/seed.ts
     ```
   - (Optional) Create admin user manually:
     ```bash
     yarn medusa user -e admin@makbulut.com -p sifre123
     # or
     npx medusa user -e admin@makbulut.com -p sifre123
     ```

5. **Start the Backend**
   ```bash
   yarn dev
   ```

---

## Technologies Used
- [Medusa](https://medusajs.com/)
- PostgreSQL
- Redis
- Node.js / TypeScript

---

## License
MIT 
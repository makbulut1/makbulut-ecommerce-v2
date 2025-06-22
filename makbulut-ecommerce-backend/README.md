# Makbulut Store Backend

Bu proje, Medusa altyapısı kullanılarak geliştirilmiş bir e-ticaret backend uygulamasıdır.

## Gereksinimler

Projeyi çalıştırmadan önce aşağıdaki araçların sisteminizde kurulu olması gerekmektedir:

- **Node.js**: v20 veya üzeri (Örnek: v20.19.0)
- **Yarn**: v1.22.x veya v3.x (Örnek: v1.22.22 veya v3.2.3)
- **Docker**: v20 veya üzeri (Örnek: Docker version 28.1.1)
- **Docker Compose**: v2 veya üzeri (genellikle Docker Desktop ile birlikte gelir)

> **Not:** Docker Compose, Docker Desktop ile birlikte gelir. Docker kuruluysa ayrıca yüklemeniz gerekmez.

Kurulum adımlarına geçmeden önce yukarıdaki araçların kurulu ve PATH değişkeninize ekli olduğundan emin olun.

## Özellikler
- Modern, ölçeklenebilir ve özelleştirilebilir altyapı
- Güçlü API desteği
- Esnek modül sistemi

## Kurulum Adımları

1. **Veritabanı ve Redis'i Başlatın**
   - Proje kök dizininde aşağıdaki komut ile Postgres ve Redis'i Docker üzerinden başlatın:
     ```bash
     docker-compose up -d
     ```
   - Postgres'in (5432) ve Redis'in (6379) çalıştığından emin olun.  
     Bunu kontrol etmek için:
     ```bash
     docker ps
     ```
     komutunu kullanabilirsiniz. Çıktıda `medusa-postgres` ve `medusa-redis` container'larının "Up" durumda olması gerekir.

2. **Ortam Değişkenlerini Ayarlayın**
   - `makbulut-ecommerce-backend` dizininde bir `.env` dosyası oluşturun ve aşağıdaki örnekteki gibi doldurun:
     ```
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

3. **Bağımlılıkları Yükleyin**
   ```bash
   yarn install
   ```

4. **Veritabanı Migration ve Seed İşlemleri**
   - Migration (şema oluşturma):
     ```bash
     yarn medusa migrations run
     ```
   - Seed (örnek veri ekleme):
     ```bash
     yarn seed
     ```

5. **Backend'i Başlatın**
   ```bash
   yarn dev
   ```

## Kullanılan Teknolojiler
- [Medusa](https://medusajs.com/) (altyapı)
- PostgreSQL
- Redis
- Node.js / TypeScript

## Lisans
MIT 
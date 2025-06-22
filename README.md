# Makbulut E-Ticaret Projesi Kurulum Rehberi

Bu rehber, projeyi sıfırdan kurmak ve çalıştırmak isteyen herkes için adım adım yol haritası sunar. Tüm adımlar hem backend (Medusa) hem de frontend (Next.js Storefront) için geçerlidir.

---

## 1. Gereksinimler
- Docker & Docker Compose
- Node.js (>=18)
- Yarn veya npm

---

## 2. PostgreSQL'i Docker ile Başlat

Projede Medusa backend için PostgreSQL kullanılır. Docker ile hızlıca başlatmak için:

```bash
docker-compose up -d
```

Bu komut, `docker-compose.yml` dosyasındaki PostgreSQL servisini başlatır.

---

## 3. Backend (Medusa) Kurulumu

### 3.1. Environment Dosyasını Oluştur

Backend dizinine girip örnek environment dosyasını kopyalayın:

```bash
cd makbulut-ecommerce-backend
cp .env.template .env
```

> **Not:** `.env` dosyasındaki veritabanı bağlantı bilgileri Docker'daki PostgreSQL ile uyumlu olmalı. Örnek:
> 
> ```env
>      DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
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
> ````

### 3.2. Bağımlılıkları Kur

```bash
yarn install
# veya
npm install
```

### 3.3. Veritabanı Migration (Yapılandırma)

```bash
yarn medusa db:migrate
# veya
npx medusa db:migrate
```

### 3.4. Seed (Demo Veri Yükleme)

```bash
yarn medusa exec src/scripts/seed.ts
# veya
npx medusa exec src/scripts/seed.ts
```

### 3.5. Admin Kullanıcı Oluşturma

Seed scripti ile otomatik olarak bir admin kullanıcı oluşturulur. Eğer elle eklemek isterseniz:

```bash
yarn medusa user -e admin@makbulut.com -p admin123
# veya
npx medusa user -e admin@makbulut.com -p admin123
```

### 3.6. Backend'i Başlat

```bash
yarn dev
# veya
npm run dev
```

---

## 4. Publishable Key Oluşturma

Admin panelde oturum açtıktan sonra, "Settings > API Keys" bölümünden yeni bir Publishable Key oluşturun. Bu anahtar Storefront için gereklidir.

---

## 5. Storefront (Next.js) Kurulumu

### 5.1. Environment Dosyasını Oluştur

Storefront dizinine girip örnek environment dosyasını kopyalayın:

```bash
cd ../makbulut-ecommerce-storefront
cp .env.template .env.local
```

> **Not:** `.env.local` dosyasına Medusa backend URL'si ve oluşturduğunuz Publishable Key'i ekleyin:
> 
> ```env
> NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
> NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=oluşturduğunuz_publishable_key
> NEXT_PUBLIC_DEFAULT_REGION=tr
> ```

### 5.2. Bağımlılıkları Kur

```bash
yarn install
# veya
npm install
```

### 5.3. Storefront'u Başlat

```bash
yarn dev
# veya
npm run dev
```

---

## 6. Giriş ve Test

- Admin panel: [http://localhost:9000/app](http://localhost:9000/app)
- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin kullanıcı: `admin@makbulut.com` / `sifre123` (veya seed'de belirttiğiniz şifre)

---

## 7. Sık Karşılaşılan Sorunlar

- **Ürünler görünmüyor:** Seed scriptini tekrar çalıştırın ve backend'i yeniden başlatın.
- **Veritabanı bağlantı hatası:** `.env` dosyasındaki veritabanı bilgilerini ve Docker PostgreSQL servisini kontrol edin.
- **Publishable Key hatası:** Storefront `.env.local` dosyasındaki anahtarın doğru olduğundan emin olun.

---

## 8. Ekstra

- Tüm komutlar hem `yarn` hem de `npm` ile çalışır.
- Docker ile PostgreSQL dışında başka bir veritabanı kullanmak isterseniz, `.env` dosyasını güncelleyin.

---

## Veritabanı Diyagramı

Veritabanı şemasının görsel diyagramı için:

[dbdiagram.io üzerinde görüntüle](https://dbdiagram.io/d/68580ab1f039ec6d36537f4f)

---

Herhangi bir sorunda bu rehberi referans alabilir veya proje yöneticisine ulaşabilirsiniz. 

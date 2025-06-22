# Makbulut E-Ticaret Storefront

![License](https://img.shields.io/github/license/kullaniciadi/makbulut-ecommerce)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

Modern, özelleştirilebilir ve Medusa tabanlı bir e-ticaret frontend uygulaması.

---

## Gereksinimler

- Node.js (>=18)
- Yarn veya npm

---

## Kurulum Adımları

1. **Ortam Değişkenlerini Ayarla**
   - Proje dizininde `.env.local` dosyası oluşturun ve aşağıdaki örneğe göre doldurun:
     ```env
     NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
     NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=oluşturduğunuz_publishable_key
     NEXT_PUBLIC_DEFAULT_REGION=tr
     ```

2. **Bağımlılıkları Yükle**
   ```bash
   yarn install
   # veya
   npm install
   ```

3. **Uygulamayı Başlat**
   ```bash
   yarn dev
   # veya
   npm run dev
   ```

4. **Uygulama Adresi**
   - [http://localhost:3000](http://localhost:3000)

---

## Özellikler

- Medusa backend ile tam entegre alışveriş deneyimi
- Çoklu dil ve bölge desteği
- Modern ve responsive arayüz
- Kolay özelleştirilebilir yapı

---

## Lisans

MIT

---

## Veritabanı Diyagramı

Backend veritabanı şemasının görsel diyagramı için:

[dbdiagram.io üzerinde görüntüle](https://dbdiagram.io/d/68580ab1f039ec6d36537f4f) 
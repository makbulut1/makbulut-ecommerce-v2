# Makbulut Store Backend

Bu proje, Medusa altyapısı kullanılarak geliştirilmiş bir e-ticaret backend uygulamasıdır.

## Özellikler
- Modern, ölçeklenebilir ve özelleştirilebilir altyapı
- Güçlü API desteği
- Esnek modül sistemi

## Kurulum

1. Gerekli servisleri başlatın (PostgreSQL, Redis)
2. Ortam değişkenlerini `.env` dosyasına ekleyin
3. Bağımlılıkları yükleyin:
   ```bash
   yarn install
   ```
4. Veritabanını başlatın ve örnek verileri yükleyin:
   ```bash
   yarn seed
   ```
5. Geliştirme sunucusunu başlatın:
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
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function seedDemoData({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  // 1. Admin kullanıcı ekle
  try {
    const userModuleService = container.resolve(Modules.USER)
    const existingAdmin = await userModuleService.listUsers({ email: "admin@makbulut.com" })
    if (!existingAdmin.length) {
      await userModuleService.createUsers([
        {
          email: "admin@makbulut.com",
          first_name: "Makbulut",
          last_name: "Admin"
        }
      ])
      logger.info("Admin kullanıcı eklendi: admin@makbulut.com")
    } else {
      logger.info("Admin kullanıcı zaten mevcut: admin@makbulut.com")
    }
  } catch (e) {
    logger.error("Admin kullanıcı eklenirken hata oluştu: " + e.message)
  }

  // 2. Bölgeleri oluştur
  let trRegion, euRegion
  try {
    const regionModuleService = container.resolve(Modules.REGION)
    const regions = await regionModuleService.listRegions()
    trRegion = regions.find(r => r.name === "Türkiye")
    euRegion = regions.find(r => r.name === "Avrupa")
    if (!trRegion) {
      [trRegion] = await regionModuleService.createRegions([
        {
          name: "Türkiye",
          currency_code: "try",
          countries: ["tr"],
          tax_rates: [
            { name: "KDV", code: "tr-vat", rate: 18 }
          ],
          is_default: true
        }
      ])
      logger.info("Türkiye bölgesi eklendi.")
    } else {
      logger.info("Türkiye bölgesi zaten mevcut.")
    }
    if (!euRegion) {
      [euRegion] = await regionModuleService.createRegions([
        {
          name: "Avrupa",
          currency_code: "eur",
          countries: ["gb", "de", "dk", "se", "no", "fi", "nl", "be", "fr", "it", "es", "pt", "at", "ch"],
          tax_rates: [
            { name: "VAT", code: "eu-vat", rate: 20 }
          ]
        }
      ])
      logger.info("Avrupa bölgesi eklendi.")
    } else {
      logger.info("Avrupa bölgesi zaten mevcut.")
    }
  } catch (e) {
    logger.error("Bölge eklenirken hata oluştu: " + e.message)
  }

  // 3. Stok lokasyonu oluştur
  let stockLocation
  try {
    const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION)
    const locations = await stockLocationModuleService.listStockLocations()
    stockLocation = locations.find(l => l.name === "İstanbul Depo")
    if (!stockLocation) {
      [stockLocation] = await stockLocationModuleService.createStockLocations([
        {
          name: "İstanbul Depo",
          address: {
            address_1: "Atatürk Havalimanı",
            city: "İstanbul",
            country_code: "tr",
            postal_code: "34283"
          }
        }
      ])
      logger.info("İstanbul Depo stok lokasyonu eklendi.")
    } else {
      logger.info("İstanbul Depo stok lokasyonu zaten mevcut.")
    }
  } catch (e) {
    logger.error("Stok lokasyonu eklenirken hata oluştu: " + e.message)
  }

  // 4. Varsayılan sales channel oluştur
  let salesChannel
  try {
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
    const channels = await salesChannelModuleService.listSalesChannels()
    salesChannel = channels.find(c => c.name === "Varsayılan Satış Kanalı")
    if (!salesChannel) {
      [salesChannel] = await salesChannelModuleService.createSalesChannels([
        { name: "Varsayılan Satış Kanalı" }
      ])
      logger.info("Varsayılan sales channel eklendi.")
    } else {
      logger.info("Varsayılan sales channel zaten mevcut.")
    }
  } catch (e) {
    logger.error("Sales channel eklenirken hata oluştu: " + e.message)
  }

  // 5. Demo ürünler ve varyantlar oluştur
  try {
    const productModuleService = container.resolve(Modules.PRODUCT)
    // Önce tüm ürünleri sil
    const products = await productModuleService.listProducts()
    if (products.length > 0) {
      await productModuleService.deleteProducts(products.map(p => p.id))
      logger.info("Mevcut ürünler silindi.")
    }
    // Tişört
    const [tshirt] = await productModuleService.createProducts([
      {
        title: "Makbulut Premium T-Shirt",
        description: "Yüksek kaliteli pamuktan üretilen premium t-shirt",
        handle: "makbulut-premium-tshirt",
        status: "published",
        images: [
          { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" }
        ],
        options: [
          { title: "Beden", values: ["S", "M", "L"] },
          { title: "Renk", values: ["Beyaz", "Siyah"] }
        ],
        variants: [
          { title: "S / Beyaz", sku: "MB-TS-S-WH", options: { Beden: "S", Renk: "Beyaz" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true },
          { title: "M / Beyaz", sku: "MB-TS-M-WH", options: { Beden: "M", Renk: "Beyaz" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true },
          { title: "L / Beyaz", sku: "MB-TS-L-WH", options: { Beden: "L", Renk: "Beyaz" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true },
          { title: "S / Siyah", sku: "MB-TS-S-BL", options: { Beden: "S", Renk: "Siyah" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true },
          { title: "M / Siyah", sku: "MB-TS-M-BL", options: { Beden: "M", Renk: "Siyah" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true },
          { title: "L / Siyah", sku: "MB-TS-L-BL", options: { Beden: "L", Renk: "Siyah" }, prices: [{ amount: 29900, currency_code: "try" }], manage_inventory: true }
        ]
      }
    ])
    // Ayakkabı
    const [shoe] = await productModuleService.createProducts([
      {
        title: "Makbulut Spor Ayakkabı",
        description: "Rahat ve şık spor ayakkabı",
        handle: "makbulut-spor-ayakkabi",
        status: "published",
        images: [
          { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop" }
        ],
        options: [
          { title: "Beden", values: ["39", "40", "41", "42"] }
        ],
        variants: [
          { title: "39", sku: "MB-SA-39", options: { Beden: "39" }, prices: [{ amount: 89900, currency_code: "try" }], manage_inventory: true },
          { title: "40", sku: "MB-SA-40", options: { Beden: "40" }, prices: [{ amount: 89900, currency_code: "try" }], manage_inventory: true },
          { title: "41", sku: "MB-SA-41", options: { Beden: "41" }, prices: [{ amount: 89900, currency_code: "try" }], manage_inventory: true },
          { title: "42", sku: "MB-SA-42", options: { Beden: "42" }, prices: [{ amount: 89900, currency_code: "try" }], manage_inventory: true }
        ]
      }
    ])
    logger.info("Demo ürünler ve varyantlar oluşturuldu.")

    // 6. Inventory item ve stok ekle
    const inventoryModuleService = container.resolve(Modules.INVENTORY)
    const allVariants = [...tshirt.variants, ...shoe.variants]
    for (const variant of allVariants) {
      // Inventory item'ı SKU ile ara
      let inventoryItem: any = null
      const items = await inventoryModuleService.listInventoryItems({ sku: variant.sku })
      if (items.length > 0) {
        inventoryItem = items[0]
      } else {
        inventoryItem = await inventoryModuleService.createInventoryItem({
          sku: variant.sku,
          origin_country: "tr",
          manage_inventory: true,
          variant_id: variant.id
        })
        logger.info(`Inventory item oluşturuldu: ${variant.sku}`)
      }
      if (!inventoryItem) {
        throw new Error(`Inventory item oluşturulamadı: ${variant.sku}`)
      }
      // Stok ekle (İstanbul Depo)
      const levels = await inventoryModuleService.listInventoryLevels({ inventory_item_id: inventoryItem.id })
      const hasLevel = levels.find(l => l.location_id === stockLocation.id)
      if (!hasLevel) {
        await inventoryModuleService.createInventoryLevel({
          inventory_item_id: inventoryItem.id,
          location_id: stockLocation.id,
          stocked_quantity: 100
        })
        logger.info(`Stok eklendi: ${variant.sku} - İstanbul Depo - 100 adet`)
      }
    }

    // Kategorileri oluştur
    const productCategoryModuleService = container.resolve(Modules.PRODUCT_CATEGORY)
    const categories = [
      { name: "Shirts", is_active: true },
      { name: "Sweatshirts", is_active: true },
      { name: "Pants", is_active: true }
    ]
    const createdCategories = []
    for (const cat of categories) {
      let existing = await productCategoryModuleService.listProductCategories({ name: cat.name })
      if (!existing.length) {
        [existing] = await productCategoryModuleService.createProductCategories([cat])
      } else {
        existing = existing[0]
      }
      createdCategories.push(existing)
    }
    // Medusa T-Shirt
    const [medusaTshirt] = await productModuleService.createProducts([
      {
        title: "Medusa T-Shirt",
        description: "Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.",
        handle: "t-shirt",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png" },
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png" },
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png" },
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png" }
        ],
        options: [
          { title: "Beden", values: ["S", "M", "L", "XL"] },
          { title: "Renk", values: ["Siyah", "Beyaz"] }
        ],
        variants: [
          { title: "S / Siyah", sku: "SHIRT-S-BLACK", options: { Beden: "S", Renk: "Siyah" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "S / Beyaz", sku: "SHIRT-S-WHITE", options: { Beden: "S", Renk: "Beyaz" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "M / Siyah", sku: "SHIRT-M-BLACK", options: { Beden: "M", Renk: "Siyah" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "M / Beyaz", sku: "SHIRT-M-WHITE", options: { Beden: "M", Renk: "Beyaz" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "L / Siyah", sku: "SHIRT-L-BLACK", options: { Beden: "L", Renk: "Siyah" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "L / Beyaz", sku: "SHIRT-L-WHITE", options: { Beden: "L", Renk: "Beyaz" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "XL / Siyah", sku: "SHIRT-XL-BLACK", options: { Beden: "XL", Renk: "Siyah" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true },
          { title: "XL / Beyaz", sku: "SHIRT-XL-WHITE", options: { Beden: "XL", Renk: "Beyaz" }, prices: [{ amount: 1000, currency_code: "try" }], manage_inventory: true }
        ],
        categories: [createdCategories.find(c => c.name === "Shirts").id],
        sales_channels: [salesChannel.id]
      }
    ])
    // Medusa Sweatshirt
    const [medusaSweatshirt] = await productModuleService.createProducts([
      {
        title: "Medusa Sweatshirt",
        description: "Reimagine the feeling of a classic sweatshirt. With our cotton sweatshirt, everyday essentials no longer have to be ordinary.",
        handle: "sweatshirt",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png" },
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png" }
        ],
        options: [
          { title: "Beden", values: ["S", "M", "L", "XL"] }
        ],
        variants: [
          { title: "S", sku: "SWEATSHIRT-S", options: { Beden: "S" }, prices: [{ amount: 1500, currency_code: "try" }], manage_inventory: true },
          { title: "M", sku: "SWEATSHIRT-M", options: { Beden: "M" }, prices: [{ amount: 1500, currency_code: "try" }], manage_inventory: true },
          { title: "L", sku: "SWEATSHIRT-L", options: { Beden: "L" }, prices: [{ amount: 1500, currency_code: "try" }], manage_inventory: true },
          { title: "XL", sku: "SWEATSHIRT-XL", options: { Beden: "XL" }, prices: [{ amount: 1500, currency_code: "try" }], manage_inventory: true }
        ],
        categories: [createdCategories.find(c => c.name === "Sweatshirts").id],
        sales_channels: [salesChannel.id]
      }
    ])
    // Medusa Sweatpants
    const [medusaSweatpants] = await productModuleService.createProducts([
      {
        title: "Medusa Sweatpants",
        description: "Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.",
        handle: "sweatpants",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png" },
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png" }
        ],
        options: [
          { title: "Beden", values: ["S", "M", "L", "XL"] }
        ],
        variants: [
          { title: "S", sku: "SWEATPANTS-S", options: { Beden: "S" }, prices: [{ amount: 1200, currency_code: "try" }], manage_inventory: true },
          { title: "M", sku: "SWEATPANTS-M", options: { Beden: "M" }, prices: [{ amount: 1200, currency_code: "try" }], manage_inventory: true },
          { title: "L", sku: "SWEATPANTS-L", options: { Beden: "L" }, prices: [{ amount: 1200, currency_code: "try" }], manage_inventory: true },
          { title: "XL", sku: "SWEATPANTS-XL", options: { Beden: "XL" }, prices: [{ amount: 1200, currency_code: "try" }], manage_inventory: true }
        ],
        categories: [createdCategories.find(c => c.name === "Pants").id],
        sales_channels: [salesChannel.id]
      }
    ])
    // Inventory işlemleri
    const allMedusaVariants = [
      ...medusaTshirt.variants,
      ...medusaSweatshirt.variants,
      ...medusaSweatpants.variants
    ]
    for (const variant of allMedusaVariants) {
      let inventoryItem: any = null
      const items = await inventoryModuleService.listInventoryItems({ sku: variant.sku })
      if (items.length > 0) {
        inventoryItem = items[0]
      } else {
        inventoryItem = await inventoryModuleService.createInventoryItem({
          sku: variant.sku,
          origin_country: "tr",
          manage_inventory: true,
          variant_id: variant.id
        })
        logger.info(`Inventory item oluşturuldu: ${variant.sku}`)
      }
      if (!inventoryItem) {
        throw new Error(`Inventory item oluşturulamadı: ${variant.sku}`)
      }
      const levels = await inventoryModuleService.listInventoryLevels({ inventory_item_id: inventoryItem.id })
      const hasLevel = levels.find(l => l.location_id === stockLocation.id)
      if (!hasLevel) {
        await inventoryModuleService.createInventoryLevel({
          inventory_item_id: inventoryItem.id,
          location_id: stockLocation.id,
          stocked_quantity: 100
        })
        logger.info(`Stok eklendi: ${variant.sku} - İstanbul Depo - 100 adet`)
      }
    }
  } catch (e) {
    logger.error("Ürün/stock işlemlerinde hata oluştu: " + e.message)
  }

  logger.info("Seed işlemi tamamlandı!")
}
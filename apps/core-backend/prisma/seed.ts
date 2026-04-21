import { PrismaClient, UserRole, InventoryAction } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu gieo mầm dữ liệu (NexusAI Seed)...');

  // --- 1. Tạo Users (Admin & Customers) ---
  const users = [
    {
      email: 'admin@nexusai.com',
      name: 'Nexus Admin',
      passwordHash: 'hashed_password_123', // Demo only
      role: UserRole.ADMIN,
    },
    {
      email: 'hoangthanh@gmail.com',
      name: 'Hoàng Thanh',
      passwordHash: 'hashed_password_123',
      role: UserRole.CUSTOMER,
    },
    {
      email: 'customer@test.com',
      name: 'Test Customer',
      passwordHash: 'hashed_password_123',
      role: UserRole.CUSTOMER,
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }
  console.log('✅ Đã tạo người dùng mẫu.');

  // --- 2. Tạo Categories ---
  const categoriesData = [
    {
      name: 'AI Wearables',
      slug: 'ai-wearables',
      description: 'Thiết bị đeo thông minh tích hợp trí tuệ nhân tạo',
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Smart Living',
      slug: 'smart-living',
      description: 'Giải pháp nhà thông minh thế hệ mới',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-103792e097df?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Robotics & Automation',
      slug: 'robotics-automation',
      description: 'Robot hỗ trợ cá nhân và tự động hóa',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Neuro-Tech',
      slug: 'neuro-tech',
      description: 'Thiết bị giao tiếp não bộ và tối ưu hóa tinh thần',
      imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const categories: any = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  console.log('✅ Đã tạo danh mục sản phẩm.');

  // --- 3. Tạo Products & Inventory ---
  const productsData = [
    // AI Wearables
    {
      name: 'NexusAI Smart Glasses Pro',
      slug: 'nexusai-glasses-pro',
      description: 'Kính thực tế ảo tăng cường tích hợp trợ lý AI đa ngôn ngữ và nhận diện khuôn mặt thời gian thực.',
      price: 1499.00,
      sku: 'NX-W-001',
      categorySlug: 'ai-wearables',
      imageUrls: ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000'],
      stock: 25,
    },
    {
      name: 'AI Whisper Ring',
      slug: 'ai-whisper-ring',
      description: 'Nhẫn thông minh điều khiển bằng cử chỉ và hỗ trợ ghi âm cuộc gọi bí mật.',
      price: 299.00,
      sku: 'NX-W-002',
      categorySlug: 'ai-wearables',
      imageUrls: ['https://images.unsplash.com/photo-1589131008225-b128522303fa?q=80&w=1000'],
      stock: 100,
    },
    {
      name: 'Haptic Feedback Vest',
      slug: 'haptic-vest-elite',
      description: 'Áo phản hồi xúc giác cho trải nghiệm gaming và thực tế ảo đỉnh cao.',
      price: 599.50,
      sku: 'NX-W-003',
      categorySlug: 'ai-wearables',
      imageUrls: ['https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1000'],
      stock: 15,
    },

    // Smart Living
    {
      name: 'Ambient AI Hub',
      slug: 'ambient-ai-hub',
      description: 'Trung tâm điều khiển nhà thông minh tự động hóa theo hành vi người dùng.',
      price: 199.00,
      sku: 'NX-S-001',
      categorySlug: 'smart-living',
      imageUrls: ['https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000'],
      stock: 50,
    },
    {
      name: 'Smart Mirror Display',
      slug: 'smart-mirror-x',
      description: 'Gương thông minh hiển thị thông báo, sức khỏe và thời tiết mỗi sáng.',
      price: 899.00,
      sku: 'NX-S-002',
      categorySlug: 'smart-living',
      imageUrls: ['https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000'],
      stock: 10,
    },

    // Robotics
    {
      name: 'Companion Droid v2',
      slug: 'companion-droid-v2',
      description: 'Robot trợ lý cá nhân có khả năng giao tiếp và hỗ trợ việc nhà cơ bản.',
      price: 2499.00,
      sku: 'NX-R-001',
      categorySlug: 'robotics-automation',
      imageUrls: ['https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=1000'],
      stock: 5,
    },
    {
      name: 'AI Nano Drone',
      slug: 'ai-nano-drone',
      description: 'Drone siêu nhỏ tích hợp AI tránh vật cản và quay phim 4K tự động.',
      price: 450.00,
      sku: 'NX-R-002',
      categorySlug: 'robotics-automation',
      imageUrls: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000'],
      stock: 40,
    },

    // Neuro-Tech
    {
      name: 'Neural Link Headband',
      slug: 'neural-headband',
      description: 'Băng đô theo dõi sóng não để tối ưu hóa giấc ngủ và sự tập trung.',
      price: 799.00,
      sku: 'NX-N-001',
      categorySlug: 'neuro-tech',
      imageUrls: ['https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000'],
      stock: 30,
    },
  ];

  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        sku: p.sku,
        imageUrls: p.imageUrls,
        categoryId: categories[p.categorySlug].id,
      },
    });

    // Tạo Inventory & Log ban đầu
    const inventory = await prisma.inventory.upsert({
      where: { productId: product.id },
      update: { quantity: p.stock },
      create: {
        productId: product.id,
        quantity: p.stock,
        lowStockThreshold: 5,
      },
    });

    await prisma.inventoryLog.create({
      data: {
        inventoryId: inventory.id,
        action: InventoryAction.RESTOCK,
        quantity: p.stock,
        note: 'Gieo mầm dữ liệu ban đầu',
      },
    });
  }
  console.log('✅ Đã tạo sản phẩm và kho mẫu.');

  // --- 4. Tạo Đơn hàng mẫu (Orders) ---
  const hthanh = await prisma.user.findUnique({ where: { email: 'hoangthanh@gmail.com' } });
  const lens = await prisma.product.findUnique({ where: { slug: 'nexusai-glasses-pro' } });

  if (hthanh && lens) {
    await prisma.order.upsert({
      where: { orderNumber: 'NX-20240421-0001' },
      update: {},
      create: {
        orderNumber: 'NX-20240421-0001',
        userId: hthanh.id,
        totalAmount: lens.price,
        shippingName: hthanh.name,
        shippingPhone: '0987654321',
        shippingAddress: '123 Đường Công Nghệ, Quận AI, TP. Hồ Chí Minh',
        items: {
          create: {
            productId: lens.id,
            quantity: 1,
            unitPrice: lens.price,
            totalPrice: lens.price,
            productName: lens.name,
            productSku: lens.sku,
          }
        }
      }
    });
  }
  console.log('✅ Đã tạo đơn hàng mẫu.');

  console.log('🌿 Hoàn tất gieo mầm dữ liệu NexusAI!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
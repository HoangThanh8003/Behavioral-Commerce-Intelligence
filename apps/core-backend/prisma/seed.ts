import { PrismaClient, UserRole, InventoryAction } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding ZENTO database...');

  // --- 1. Users ---
  const users = [
    {
      email: 'admin@zento.store',
      name: 'ZENTO Admin',
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
      name: 'Alex Morgan',
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
  console.log('✅ Users seeded.');

  // --- 2. Categories ---
  const categoriesData = [
    {
      name: 'Mechanical Keyboards',
      slug: 'mechanical-keyboards',
      description: 'Premium mechanical keyboards for professionals and enthusiasts.',
      imageUrl: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 1,
    },
    {
      name: 'Audio',
      slug: 'audio',
      description: 'Studio-grade headphones, speakers, and audio accessories.',
      imageUrl: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 2,
    },
    {
      name: 'Lighting',
      slug: 'lighting',
      description: 'Precision desk and monitor lighting for focused work.',
      imageUrl: 'https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 3,
    },
    {
      name: 'Workspace Accessories',
      slug: 'workspace-accessories',
      description: 'Industrial workspace components for precision environments.',
      imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 4,
    },
  ];

  const categories: Record<string, { id: string }> = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, imageUrl: c.imageUrl, sortOrder: c.sortOrder },
      create: c,
    });
  }
  console.log('✅ Categories seeded.');

  // --- 3. Products (30 Total) ---
  const productsData = [
    // ── Mechanical Keyboards (8) ──────────────────────────
    {
      name: 'KX-75 Silent',
      slug: 'kx-75-silent',
      description: 'A 75% layout mechanical keyboard with silent linear switches, hot-swappable PCB, and machined aluminum frame. Designed for writers and late-night coders who need zero noise without sacrificing tactile precision.',
      price: 189.00, comparePrice: 219.00, sku: 'ZN-KB-001', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 45,
    },
    {
      name: 'Mono65 Wireless',
      slug: 'mono65-wireless',
      description: 'Compact 65% wireless mechanical keyboard with Bluetooth 5.1 and USB-C. Gateron Brown switches, PBT double-shot keycaps, and a minimal dark-mode aesthetic.',
      price: 149.00, comparePrice: null, sku: 'ZN-KB-002', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/4005569/pexels-photo-4005569.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80,
    },
    {
      name: 'Apex TKL Pro',
      slug: 'apex-tkl-pro',
      description: 'Tenkeyless form factor with Cherry MX Red switches, per-key RGB, and a detachable wrist rest. CNC aluminum top plate with sound-dampening foam layers for a deep, satisfying thock.',
      price: 259.00, comparePrice: 299.00, sku: 'ZN-KB-003', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 30,
    },
    {
      name: 'Split Ergo 42',
      slug: 'split-ergo-42',
      description: 'Ergonomic split keyboard with 42 keys, columnar stagger, and tented design. Kailh Choc low-profile switches. Programmable via QMK/VIA. Built for developers who value posture.',
      price: 329.00, comparePrice: null, sku: 'ZN-KB-004', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 15,
    },
    {
      name: 'Noir 96 Custom',
      slug: 'noir-96-custom',
      description: 'Premium 96% layout keyboard with brass weight and gasket mount. Offers a full numpad while saving desk space. Pre-lubed linear switches for ultimate smooth typing.',
      price: 349.00, comparePrice: 399.00, sku: 'ZN-KB-005', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/8386361/pexels-photo-8386361.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 25,
    },
    {
      name: 'Vanguard 60%',
      slug: 'vanguard-60',
      description: 'Ultra-compact 60% layout for pure minimalists. Blank PBT keycaps and a heavy steel base. Perfect for clean desk setups where aesthetics matter as much as function.',
      price: 139.00, comparePrice: 159.00, sku: 'ZN-KB-006', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/7915507/pexels-photo-7915507.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 60,
    },
    {
      name: 'Forge Limited',
      slug: 'forge-limited',
      description: 'Limited edition mechanical keyboard with a machined titanium chassis and carbon fiber top plate. Custom industrial tactile switches for a deliberate, high-feedback typing experience.',
      price: 450.00, comparePrice: null, sku: 'ZN-KB-007', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 10,
    },
    {
      name: 'Neon Grid 84',
      slug: 'neon-grid-84',
      description: '84-key layout with translucent frosted acrylic case and intense underglow RGB. Comes with tactile Holy Panda switches.',
      price: 210.00, comparePrice: 240.00, sku: 'ZN-KB-008', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/4005574/pexels-photo-4005574.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 40,
    },

    // ── Audio (8) ──────────────────────────────────────────
    {
      name: 'Studio One Over-Ear',
      slug: 'studio-one-over-ear',
      description: 'Closed-back reference headphones with 40mm beryllium drivers, memory foam ear cushions, and a flat frequency response tuned for mixing.',
      price: 279.00, comparePrice: 329.00, sku: 'ZN-AU-001', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 60,
    },
    {
      name: 'Drift ANC Wireless',
      slug: 'drift-anc-wireless',
      description: 'Wireless over-ear headphones with adaptive noise cancellation, 38-hour battery life, and multipoint Bluetooth. Foldable design with a premium carrying case.',
      price: 199.00, comparePrice: null, sku: 'ZN-AU-002', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 100,
    },
    {
      name: 'Pulse Desktop Speaker',
      slug: 'pulse-desktop-speaker',
      description: 'Compact desktop speaker pair with USB-C DAC, 20W per channel, and passive radiators for deep bass in a small footprint. Matte black aluminum enclosure.',
      price: 169.00, comparePrice: null, sku: 'ZN-AU-003', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/10298064/pexels-photo-10298064.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 40,
    },
    {
      name: 'Omni Pod Microphone',
      slug: 'omni-pod-mic',
      description: 'USB-C condenser microphone designed for podcasters and streamers. Features a built-in pop filter, shock mount, and zero-latency monitoring. Matte black finish.',
      price: 129.00, comparePrice: 149.00, sku: 'ZN-AU-004', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/159613/microphone-audio-computer-music-159613.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80,
    },
    {
      name: 'Aura Wireless Earbuds',
      slug: 'aura-wireless-earbuds',
      description: 'True wireless earbuds with active noise cancellation, transparency mode, and a wireless charging case. IPX4 water resistance.',
      price: 149.00, comparePrice: null, sku: 'ZN-AU-005', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 150,
    },
    {
      name: 'Resonance Soundbar',
      slug: 'resonance-soundbar',
      description: 'Sleek under-monitor soundbar with Dolby Atmos support, Bluetooth 5.2, and an integrated subwoofer. Perfect for cinematic desktop setups.',
      price: 299.00, comparePrice: 349.00, sku: 'ZN-AU-006', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 25,
    },
    {
      name: 'Vocal Dynamic Mic',
      slug: 'vocal-dynamic-mic',
      description: 'Professional XLR dynamic microphone with excellent off-axis rejection. Ideal for voiceovers and streaming in untreated rooms.',
      price: 249.00, comparePrice: null, sku: 'ZN-AU-007', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 35,
    },
    {
      name: 'Echo Studio DAC',
      slug: 'echo-studio-dac',
      description: 'High-resolution digital-to-analog converter and headphone amplifier. Drives high-impedance audiophile headphones effortlessly.',
      price: 199.00, comparePrice: 229.00, sku: 'ZN-AU-008', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 50,
    },

    // ── Lighting (6) ───────────────────────────────────────
    {
      name: 'Arc Monitor Light Bar',
      slug: 'arc-monitor-light-bar',
      description: 'Asymmetric monitor light bar with adjustable color temperature (2700K–6500K) and brightness. Zero screen glare, USB-C powered.',
      price: 79.00, comparePrice: 99.00, sku: 'ZN-LT-001', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 120,
    },
    {
      name: 'Halo Desk Lamp',
      slug: 'halo-desk-lamp',
      description: 'Articulated desk lamp with edge-lit LED panel, 800 lux at desk level, and a weighted metal base. CRI 95+ for accurate color rendering.',
      price: 129.00, comparePrice: null, sku: 'ZN-LT-002', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/11105953/pexels-photo-11105953.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 55,
    },
    {
      name: 'Ambient Strip Kit',
      slug: 'ambient-strip-kit',
      description: 'Addressable LED strip kit with 2 meters of warm-to-cool tunable light. Adhesive-backed for monitor or desk edge mounting.',
      price: 49.00, comparePrice: null, sku: 'ZN-LT-003', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 200,
    },
    {
      name: 'Lumina Ring Light',
      slug: 'lumina-ring-light',
      description: '10-inch ring light for video calls and streaming. Features edge-lit technology for soft, flattering illumination without blinding the user.',
      price: 89.00, comparePrice: 110.00, sku: 'ZN-LT-004', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/3095328/pexels-photo-3095328.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80,
    },
    {
      name: 'Prism Corner Lamp',
      slug: 'prism-corner-lamp',
      description: 'Minimalist RGB corner floor lamp. Connects via Wi-Fi and supports millions of colors. Perfect for setting a moody studio atmosphere.',
      price: 149.00, comparePrice: 179.00, sku: 'ZN-LT-005', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 45,
    },
    {
      name: 'Glow Key Light',
      slug: 'glow-key-light',
      description: 'Professional LED key light for desktop streaming. Fully adjustable via desktop app. Clamp mount saves desk space.',
      price: 199.00, comparePrice: null, sku: 'ZN-LT-006', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/1249911/pexels-photo-1249911.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 30,
    },

    // ── Workspace Accessories (8) ──────────────────────────
    {
      name: 'Control Surface',
      slug: 'control-surface',
      description: 'Full-size workspace surface engineered from high-density precision polymer. Machined mesh texture provides pixel-perfect tracking with zero drag. Non-slip industrial base.',
      price: 59.00, comparePrice: null, sku: 'ZN-WA-001', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 150,
    },
    {
      name: 'Orbit Wrist Rest',
      slug: 'orbit-wrist-rest',
      description: 'Ergonomic wrist rest with slow-rebound memory foam core and a cool-touch fabric cover. Designed to pair with 65–75% keyboards.',
      price: 39.00, comparePrice: null, sku: 'ZN-WA-002', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/7412076/pexels-photo-7412076.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 90,
    },
    {
      name: 'Cable Dock Mini',
      slug: 'cable-dock-mini',
      description: 'Weighted aluminum cable management dock with three magnetic slots. Keeps USB-C, Lightning, and headphone cables organized and within reach.',
      price: 35.00, comparePrice: null, sku: 'ZN-WA-003', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/4219864/pexels-photo-4219864.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 200,
    },
    {
      name: 'Slate Laptop Stand',
      slug: 'slate-laptop-stand',
      description: 'Minimalist laptop stand machined from a single block of aluminum. Elevates your screen to eye level to reduce neck strain. Ventilated base for airflow.',
      price: 89.00, comparePrice: 109.00, sku: 'ZN-WA-004', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 70,
    },
    {
      name: 'Zenith USB-C Hub',
      slug: 'zenith-usb-c-hub',
      description: '7-in-1 USB-C hub with HDMI 4K@60Hz, 100W PD passthrough, SD/microSD slots, USB-A 3.0, and gigabit Ethernet. Aluminum unibody with braided cable.',
      price: 69.00, comparePrice: null, sku: 'ZN-WA-005', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/3315369/pexels-photo-3315369.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 85,
    },
    {
      name: 'Ergo Flow Mouse',
      slug: 'ergo-flow-mouse',
      description: 'Ergonomic vertical mouse designed to reduce wrist strain. Wireless multi-device connectivity, hyper-fast scroll wheel, and tactile side buttons.',
      price: 99.00, comparePrice: 119.00, sku: 'ZN-WA-006', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 120,
    },
    {
      name: 'Precision Mousepad',
      slug: 'precision-mousepad',
      description: 'Hard surface gaming-grade mousepad optimized for ultra-low friction tracking. Features a non-slip rubberized base and stitched anti-fray edges.',
      price: 29.00, comparePrice: null, sku: 'ZN-WA-007', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 300,
    },
    {
      name: 'Grid Riser',
      slug: 'grid-riser',
      description: 'Aerospace-grade aluminum desk riser with a tempered glass surface. Integrated cable management routing. Built to support heavy workstation loads in focused environments.',
      price: 189.00, comparePrice: 220.00, sku: 'ZN-WA-008', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/5082571/pexels-photo-5082571.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 40,
    },
  ];

  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        imageUrls: p.imageUrls,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        sku: p.sku,
        imageUrls: p.imageUrls,
        categoryId: categories[p.categorySlug].id,
      },
    });

    // Inventory + initial stock log
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
        note: 'Initial stock — ZENTO seed',
      },
    });
  }
  console.log('✅ Products & inventory seeded.');

  // --- 4. Sample Order ---
  const customer = await prisma.user.findUnique({ where: { email: 'hoangthanh@gmail.com' } });
  const keyboard = await prisma.product.findUnique({ where: { slug: 'kx-75-silent' } });

  if (customer && keyboard) {
    await prisma.order.upsert({
      where: { orderNumber: 'ZN-20260425-0001' },
      update: {},
      create: {
        orderNumber: 'ZN-20260425-0001',
        userId: customer.id,
        totalAmount: keyboard.price,
        shippingName: customer.name,
        shippingPhone: '0987654321',
        shippingAddress: '456 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        items: {
          create: {
            productId: keyboard.id,
            quantity: 1,
            unitPrice: keyboard.price,
            totalPrice: keyboard.price,
            productName: keyboard.name,
            productSku: keyboard.sku,
          },
        },
      },
    });
  }
  console.log('✅ Sample order seeded.');

  console.log('🌿 ZENTO seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
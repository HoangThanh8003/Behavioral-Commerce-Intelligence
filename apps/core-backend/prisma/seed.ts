import { PrismaClient, UserRole, InventoryAction } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Đang khởi tạo dữ liệu mẫu ZENTO...');

  console.log('🧹 Đang dọn dẹp dữ liệu cũ (Xóa Order, Inventory, Product, Category)...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.inventoryLog.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('✅ Đã xóa dữ liệu cũ.');

  // --- 1. Users ---
  const users = [
    {
      email: 'admin@zento.store',
      name: 'Quản trị viên ZENTO',
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
      name: 'Khách hàng Demo',
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
  console.log('✅ Đã tạo dữ liệu người dùng.');

  // --- 2. Categories ---
  const categoriesData = [
    {
      name: 'Bàn phím cơ',
      slug: 'mechanical-keyboards',
      description: 'Bàn phím cơ cao cấp dành cho chuyên gia và người đam mê sự hoàn hảo.',
      imageUrl: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 1,
    },
    {
      name: 'Âm thanh',
      slug: 'audio',
      description: 'Tai nghe chuẩn studio, loa và các phụ kiện âm thanh chuyên nghiệp.',
      imageUrl: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 2,
    },
    {
      name: 'Chiếu sáng',
      slug: 'lighting',
      description: 'Đèn bàn và đèn màn hình tối ưu cho không gian làm việc tập trung.',
      imageUrl: 'https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=800',
      sortOrder: 3,
    },
    {
      name: 'Phụ kiện không gian làm việc',
      slug: 'workspace-accessories',
      description: 'Các phụ kiện thiết yếu giúp tối ưu hóa không gian làm việc công thái học.',
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
  console.log('✅ Đã tạo dữ liệu danh mục.');

  // --- 3. Products (30 Total) ---
  const productsData = [
    // ── Mechanical Keyboards (8) ──────────────────────────
    {
      name: 'Bàn phím KX-75 Silent',
      slug: 'kx-75-silent',
      description: 'Bàn phím cơ layout 75% với switch tuyến tính siêu êm, mạch hotswap, và khung nhôm đúc nguyên khối. Thiết kế dành cho lập trình viên làm việc đêm cần sự yên tĩnh tuyệt đối.',
      price: 189.00, comparePrice: 219.00, sku: 'ZN-KB-001', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 45,
    },
    {
      name: 'Bàn phím Mono65 Không Dây',
      slug: 'mono65-wireless',
      description: 'Bàn phím không dây layout 65% nhỏ gọn hỗ trợ Bluetooth 5.1 và USB-C. Trang bị Gateron Brown switch, keycap PBT double-shot với thiết kế phong cách tối giản.',
      price: 149.00, comparePrice: null, sku: 'ZN-KB-002', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/4005569/pexels-photo-4005569.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80,
    },
    {
      name: 'Bàn phím Apex TKL Pro',
      slug: 'apex-tkl-pro',
      description: 'Layout Tenkeyless với Cherry MX Red switch, LED RGB từng phím và kê tay nam châm tháo rời. Plate nhôm CNC với nhiều lớp foam tiêu âm mang lại âm thanh trầm ấm (thock).',
      price: 259.00, comparePrice: 299.00, sku: 'ZN-KB-003', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 30,
    },
    {
      name: 'Bàn phím Split Ergo 42',
      slug: 'split-ergo-42',
      description: 'Bàn phím công thái học tách đôi với 42 phím, bố cục dạng cột và độ nghiêng tùy chỉnh. Sử dụng switch low-profile Kailh Choc. Lập trình qua QMK/VIA. Dành cho người ưu tiên tư thế tự nhiên.',
      price: 329.00, comparePrice: null, sku: 'ZN-KB-004', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 15,
    },
    {
      name: 'Bàn phím Noir 96 Custom',
      slug: 'noir-96-custom',
      description: 'Bàn phím cao cấp layout 96% với tạ đồng và thiết kế gasket mount. Switch tuyến tính đã được lube sẵn cho cảm giác gõ mượt mà tối đa.',
      price: 349.00, comparePrice: 399.00, sku: 'ZN-KB-005', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/8386361/pexels-photo-8386361.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 25,
    },
    {
      name: 'Bàn phím Vanguard 60%',
      slug: 'vanguard-60',
      description: 'Layout 60% siêu nhỏ gọn dành cho người theo đuổi sự tối giản. Keycap PBT không in chữ và đế thép siêu nặng. Phù hợp cho không gian làm việc mang đậm tính thẩm mỹ.',
      price: 139.00, comparePrice: 159.00, sku: 'ZN-KB-006', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/7915507/pexels-photo-7915507.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 60,
    },
    {
      name: 'Bàn phím Forge Phiên bản Giới Hạn',
      slug: 'forge-limited',
      description: 'Phiên bản giới hạn với khung titan gia công CNC và plate sợi carbon. Switch tactile công nghiệp tùy chỉnh cho trải nghiệm gõ mạnh mẽ, dứt khoát.',
      price: 450.00, comparePrice: null, sku: 'ZN-KB-007', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 10,
    },
    {
      name: 'Bàn phím Neon Grid 84',
      slug: 'neon-grid-84',
      description: 'Layout 84 phím với vỏ acrylic nhám trong suốt và hệ thống LED gầm RGB nổi bật. Trang bị switch tactile Holy Panda huyền thoại.',
      price: 210.00, comparePrice: 240.00, sku: 'ZN-KB-008', categorySlug: 'mechanical-keyboards',
      imageUrls: ['https://images.pexels.com/photos/4005574/pexels-photo-4005574.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 40,
    },

    // ── Audio (8) ──────────────────────────────────────────
    {
      name: 'Tai nghe Studio One Over-Ear',
      slug: 'studio-one-over-ear',
      description: 'Tai nghe kiểm âm dạng đóng (closed-back) với củ loa beryllium 40mm, đệm tai memory foam, mang lại dải âm thanh phẳng chuẩn xác cho việc mix nhạc.',
      price: 279.00, comparePrice: 329.00, sku: 'ZN-AU-001', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 60,
    },
    {
      name: 'Tai nghe Drift ANC Không Dây',
      slug: 'drift-anc-wireless',
      description: 'Tai nghe không dây hỗ trợ chống ồn chủ động, thời lượng pin 38 giờ, Bluetooth đa điểm kết nối nhiều thiết bị. Thiết kế gập linh hoạt đi kèm hộp đựng cao cấp.',
      price: 199.00, comparePrice: null, sku: 'ZN-AU-002', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 100,
    },
    {
      name: 'Loa máy tính Pulse',
      slug: 'pulse-desktop-speaker',
      description: 'Loa máy tính nhỏ gọn với DAC USB-C, 20W mỗi kênh và màng cộng hưởng thụ động mang lại âm bass sâu. Vỏ nhôm đen nhám đầy uy lực.',
      price: 169.00, comparePrice: null, sku: 'ZN-AU-003', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/10298064/pexels-photo-10298064.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 40,
    },
    {
      name: 'Micro thu âm Omni Pod',
      slug: 'omni-pod-mic',
      description: 'Micro condenser cắm cổng USB-C hoàn hảo cho podcaster và streamer. Tích hợp màng lọc pop-filter, ngàm chống sốc và hỗ trợ kiểm âm độ trễ bằng 0.',
      price: 129.00, comparePrice: 149.00, sku: 'ZN-AU-004', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80, // Sửa 404
    },
    {
      name: 'Tai nghe không dây Aura Earbuds',
      slug: 'aura-wireless-earbuds',
      description: 'Tai nghe in-ear không dây (TWS) với công nghệ chống ồn chủ động, chế độ xuyên âm và hộp sạc chuẩn Qi. Đạt chuẩn kháng nước IPX4.',
      price: 149.00, comparePrice: null, sku: 'ZN-AU-005', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 150,
    },
    {
      name: 'Loa Resonance Soundbar',
      slug: 'resonance-soundbar',
      description: 'Loa soundbar đặt dưới màn hình siêu mượt với chuẩn âm thanh vòm Dolby Atmos, Bluetooth 5.2 và loa siêu trầm gắn liền. Trải nghiệm điện ảnh ngay trên bàn làm việc.',
      price: 299.00, comparePrice: 349.00, sku: 'ZN-AU-006', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 25,
    },
    {
      name: 'Micro thu âm Vocal Dynamic',
      slug: 'vocal-dynamic-mic',
      description: 'Micro XLR Dynamic chuẩn phòng thu với độ nhạy cao và lọc tiếng ồn cực tốt. Tuyệt vời cho công việc thu âm chuyên nghiệp trong không gian nhiều tiếng ồn.',
      price: 249.00, comparePrice: null, sku: 'ZN-AU-007', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 35,
    },
    {
      name: 'Bộ xử lý âm thanh Echo Studio DAC',
      slug: 'echo-studio-dac',
      description: 'Bộ giải mã âm thanh độ phân giải cao kết hợp amplifier cho tai nghe. Đẩy mạnh công suất để phối ghép với những mẫu tai nghe audiophile trở kháng cao.',
      price: 199.00, comparePrice: 229.00, sku: 'ZN-AU-008', categorySlug: 'audio',
      imageUrls: ['https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 50,
    },

    // ── Lighting (6) ───────────────────────────────────────
    {
      name: 'Đèn màn hình Arc Light Bar',
      slug: 'arc-monitor-light-bar',
      description: 'Đèn treo màn hình với thiết kế chiếu sáng bất đối xứng, chỉnh nhiệt độ màu (2700K–6500K) tự do. Hạn chế hiện tượng lóa màn hình, cấp nguồn trực tiếp qua USB-C.',
      price: 79.00, comparePrice: 99.00, sku: 'ZN-LT-001', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/10368532/pexels-photo-10368532.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 120,
    },
    {
      name: 'Đèn bàn làm việc Halo',
      slug: 'halo-desk-lamp',
      description: 'Đèn bàn gấp khúc linh hoạt sử dụng tấm nền LED viền cường độ 800 lux, chân đế kim loại vững chắc. Độ hoàn màu chuẩn xác với CRI > 95.',
      price: 129.00, comparePrice: null, sku: 'ZN-LT-002', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/11105953/pexels-photo-11105953.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 55,
    },
    {
      name: 'Bộ LED viền Ambient Strip',
      slug: 'ambient-strip-kit',
      description: 'Dải LED viền dài 2 mét có khả năng đồng bộ màu sắc. Có sẵn băng keo chuyên dụng để dán mặt sau màn hình, hộc bàn tạo điểm nhấn không gian ảo diệu.',
      price: 49.00, comparePrice: null, sku: 'ZN-LT-003', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 200,
    },
    {
      name: 'Đèn quay phim Lumina Ring Light',
      slug: 'lumina-ring-light',
      description: 'Đèn vòng 10-inch chuyên biệt cho video call và livestream. Ứng dụng công nghệ chiếu sáng bao quanh giúp khuôn mặt bừng sáng tự nhiên mà không gây chói mắt.',
      price: 89.00, comparePrice: 110.00, sku: 'ZN-LT-004', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 80, // Sửa 404
    },
    {
      name: 'Đèn cột góc tường Prism Corner',
      slug: 'prism-corner-lamp',
      description: 'Cây đèn chiếu góc tường RGB thanh lịch. Hỗ trợ hàng triệu dải màu và điều khiển qua Wi-Fi, kiến tạo hoàn hảo không gian Studio ngập tràn cảm hứng sáng tạo.',
      price: 149.00, comparePrice: 179.00, sku: 'ZN-LT-005', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 45,
    },
    {
      name: 'Đèn mặt đa góc Glow Key Light',
      slug: 'glow-key-light',
      description: 'Đèn chiếu thẳng Key Light chuyên dụng cho livestreaming. Thay đổi dễ dàng qua phần mềm máy tính. Trang bị sẵn chân kẹp mép bàn gọn gàng tối ưu diện tích.',
      price: 199.00, comparePrice: null, sku: 'ZN-LT-006', categorySlug: 'lighting',
      imageUrls: ['https://images.pexels.com/photos/1249911/pexels-photo-1249911.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 30,
    },

    // ── Workspace Accessories (8) ──────────────────────────
    {
      name: 'Thảm trải bàn Control Surface',
      slug: 'control-surface',
      description: 'Thảm lót kín khu vực làm việc làm từ polymer đa mật độ. Bề mặt lưới micro tối ưu hóa độ chính xác của chuột vi tính. Lớp đế nhám chống trượt cực kỳ bền bỉ.',
      price: 59.00, comparePrice: null, sku: 'ZN-WA-001', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 150,
    },
    {
      name: 'Kê tay đệm êm Orbit Wrist Rest',
      slug: 'orbit-wrist-rest',
      description: 'Kê tay bảo vệ sức khỏe với lõi bọt xốp memory foam đàn hồi chậm và lớp vỏ vải thoáng khí mát lạnh. Rất vừa vặn với các dòng bàn phím kích cỡ 65-75%.',
      price: 39.00, comparePrice: null, sku: 'ZN-WA-002', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/7412076/pexels-photo-7412076.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 90,
    },
    {
      name: 'Dock gài cáp Cable Dock Mini',
      slug: 'cable-dock-mini',
      description: 'Bộ giữ cáp bằng nhôm trọng lượng nặng trang bị 3 khe từ tính nam châm. Cố định ngăn nắp tất cả các dây cáp USB-C, cáp Lightning và dây nguồn của bạn.',
      price: 35.00, comparePrice: null, sku: 'ZN-WA-003', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/4219864/pexels-photo-4219864.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 200,
    },
    {
      name: 'Giá đỡ laptop Slate Stand',
      slug: 'slate-laptop-stand',
      description: 'Giá để laptop bằng hợp kim nhôm nguyên khối. Đưa màn hình lên cao ngang tầm nhìn để chống mỏi cổ và tăng cường lượng không khí tản nhiệt.',
      price: 89.00, comparePrice: 109.00, sku: 'ZN-WA-004', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 70,
    },
    {
      name: 'Cổng đa năng Zenith USB-C Hub',
      slug: 'zenith-usb-c-hub',
      description: 'Bộ hub chia cổng USB-C 7 trong 1: HDMI 4K/60Hz, sạc truyền qua PD 100W, đầu đọc thẻ SD/microSD, USB-A 3.0 và cổng mạng dây RJ45. Vỏ nhôm nguyên khối đầm chắc.',
      price: 69.00, comparePrice: null, sku: 'ZN-WA-005', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/3315369/pexels-photo-3315369.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 85,
    },
    {
      name: 'Chuột thông minh Ergo Flow Mouse',
      slug: 'ergo-flow-mouse',
      description: 'Chuột đứng công thái học làm giảm hiện tượng đau cổ tay. Hỗ trợ đa kết nối không dây, bánh xe cuộn cực nhạy và loạt phím bấm phụ bố trí dọc hông.',
      price: 99.00, comparePrice: 119.00, sku: 'ZN-WA-006', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 120,
    },
    {
      name: 'Bàn di chuột Precision Mousepad',
      slug: 'precision-mousepad',
      description: 'Bề mặt di chuột cứng chuyên nghiệp được tôi luyện tối đa hóa tốc độ phản hồi. Lớp đáy cao su siêu bám và các đường chỉ viền khâu thủ công tinh tế.',
      price: 29.00, comparePrice: null, sku: 'ZN-WA-007', categorySlug: 'workspace-accessories',
      imageUrls: ['https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1000'], stock: 300,
    },
    {
      name: 'Kệ kê màn hình Grid Riser',
      slug: 'grid-riser',
      description: 'Chân kê màn hình máy tính cấu tạo từ chất liệu nhôm chế tạo vỏ máy bay kết hợp mặt kính trong suốt cường lực. Ẩn dây thông minh. Chịu được tải trọng siêu nặng.',
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
        note: 'Dữ liệu tồn kho khởi tạo — ZENTO',
      },
    });
  }
  console.log('✅ Đã tạo dữ liệu sản phẩm và kho hàng.');

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
  console.log('✅ Đã tạo đơn hàng mẫu.');

  console.log('🌿 Hoàn tất nạp dữ liệu (seed) cho ZENTO!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
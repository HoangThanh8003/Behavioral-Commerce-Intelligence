import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { CartsModule } from "./carts/carts.module";
import { OrdersModule } from "./orders/orders.module";
import { AnalyticsModule } from "./analytics/analytics.module";

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    ProductsModule,
    InventoryModule,
    CartsModule,
    OrdersModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

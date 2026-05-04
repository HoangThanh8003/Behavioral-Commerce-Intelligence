import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { InventoryModule } from "./inventory/inventory.module";
import { CartsModule } from "./carts/carts.module";
import { OrdersModule } from "./orders/orders.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { RabbitMQModule } from "./rabbitmq/rabbitmq.module";
import { PaymentModule } from "./payment/payment.module";

@Module({
  imports: [
    RabbitMQModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    InventoryModule,
    CartsModule,
    OrdersModule,
    AnalyticsModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



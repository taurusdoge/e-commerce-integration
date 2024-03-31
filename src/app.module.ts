import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShopifyModule } from './platforms/shopify';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GatewayModule,
    ShopifyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

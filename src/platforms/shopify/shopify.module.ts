import { Module } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}

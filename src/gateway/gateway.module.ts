import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SalesforceModule, ShopifyModule } from '../platforms';

@Module({
  imports: [ShopifyModule, SalesforceModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

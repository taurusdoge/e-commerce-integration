import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {
  SupportedPlatforms,
  isImplementsIProductCreate,
} from '../common/types';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @HttpCode(HttpStatus.OK)
  @Get('orders/:platform')
  async getOrders(@Param('platform') platform: SupportedPlatforms) {
    return await this.gatewayService.getServiceProvider(platform).getOrders();
  }

  @HttpCode(HttpStatus.OK)
  @Get('order/:platform/:id')
  async getOrderById(
    @Param('platform') platform: SupportedPlatforms,
    @Param('id') id: string,
  ) {
    return await this.gatewayService
      .getServiceProvider(platform)
      .getOrderById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('product/:platform')
  async createProduct(
    @Param('platform') platform: SupportedPlatforms,
    @Body() dto: unknown,
  ) {
    const serviceProvider = this.gatewayService.getServiceProvider(platform);

    if (!isImplementsIProductCreate(serviceProvider)) {
      throw new NotImplementedException(
        `${platform} does not support product creation`,
      );
    }

    return serviceProvider.createProduct(dto);
  }
}

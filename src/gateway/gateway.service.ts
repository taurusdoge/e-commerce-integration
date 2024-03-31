import { Injectable, NotImplementedException } from '@nestjs/common';
import { SalesforceService, ShopifyService } from '../platforms';
import { SupportedPlatforms } from '../common/types';

@Injectable()
export class GatewayService {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly salesforceService: SalesforceService,
  ) {}

  public getServiceProvider(platform: SupportedPlatforms) {
    switch (platform) {
      case SupportedPlatforms.Shopify:
        return this.shopifyService;
      case SupportedPlatforms.Salesforce:
        return this.salesforceService;
      default:
        throw new NotImplementedException(
          `${platform} platform is not supported`,
        );
    }
  }
}

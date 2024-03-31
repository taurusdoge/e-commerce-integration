import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GatewayController } from '../gateway.controller';
import { GatewayService } from '../gateway.service';
import { SalesforceService, ShopifyService } from '../../platforms';
import { SupportedPlatforms } from '../../common/types';

describe('ShopifyController', () => {
  let gatewayController: GatewayController;
  let shopifyService: ShopifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        GatewayService,
        ShopifyService,
        SalesforceService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => key),
          },
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
              post: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    gatewayController = module.get<GatewayController>(GatewayController);
    shopifyService = module.get<ShopifyService>(ShopifyService);
  });

  describe('getOrders', () => {
    it('should return an array of orders', async () => {
      const result = { orders: [] };
      jest
        .spyOn(shopifyService, 'getOrders')
        .mockImplementation(async () => result);

      expect(
        await gatewayController.getOrders(SupportedPlatforms.Shopify),
      ).toBe(result);
    });
  });
});

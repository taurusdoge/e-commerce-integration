import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import {
  IShopifyConfig,
  IShopifyOrderLineItem,
  IShopifyOrder,
  IShopifyService,
} from './types';
import {
  CreateShopifyProductDTO,
  GetShopifyOrderByIdResponse,
  GetShopifyOrdersResponse,
} from './dto';
import { logAxiosError, validateDTO } from '../../common/utils';

@Injectable()
export class ShopifyService implements IShopifyService {
  private readonly logger = new Logger(ShopifyService.name);
  private readonly axios: AxiosInstance;

  private readonly config: IShopifyConfig;
  private readonly baseUrl: string;
  private readonly headers = {};

  constructor(configService: ConfigService, httpService: HttpService) {
    this.axios = httpService.axiosRef;

    this.config = {
      storeUrl: configService.getOrThrow('SHOPIFY_STORE'),
      apiVersion: configService.getOrThrow('SHOPIFY_API_VERSION'),
      accessToken: configService.getOrThrow('SHOPIFY_PASSWORD'),
      accessTokenHeader: configService.getOrThrow(
        'SPOTIFY_ACCESS_TOKEN_HEADER',
      ),
    };

    this.baseUrl = `https://${this.config.storeUrl}/admin/api/${this.config.apiVersion}`;
    this.headers = {
      [this.config.accessTokenHeader]: this.config.accessToken,
    };
  }

  async getOrders(): Promise<GetShopifyOrdersResponse> {
    try {
      const url = `${this.baseUrl}/orders.json`;
      const response = await this.axios.get(url, {
        headers: this.headers,
      });

      if (!response?.data) {
        throw new NotFoundException(
          `Request succeeded but no orders were returned`,
        );
      }

      const { orders } = response.data as GetShopifyOrdersResponse;
      const modifiedOrders = orders.map((order: IShopifyOrder) => ({
        ...order,
        line_items: this.flattenOrderResponse(order),
      }));

      return {
        orders: modifiedOrders,
      };
    } catch (error) {
      logAxiosError(error, this.logger);
    }
  }

  async getOrderById(id: string): Promise<GetShopifyOrderByIdResponse> {
    try {
      const url = `${this.baseUrl}/orders/${id}.json`;
      const response = await this.axios.get(url, {
        headers: this.headers,
      });

      if (!response?.data) {
        throw new NotFoundException(
          `Request succeeded but no data was returned for order: ${id}`,
        );
      }

      const { order } = response.data as GetShopifyOrderByIdResponse;
      const modifiedOrder: IShopifyOrder = {
        ...order,
        line_items: this.flattenOrderResponse(order),
      };

      return {
        order: modifiedOrder,
      };
    } catch (error) {
      logAxiosError(error, this.logger);
    }
  }

  async createProduct(dto: unknown) {
    try {
      const validProductDTO = await validateDTO(dto, CreateShopifyProductDTO);
      const body = { product: validProductDTO };
      const url = `${this.baseUrl}/products.json`;
      // TODO: fails with `403: [API] This action requires merchant approval for write_products scope`
      const response = await this.axios.post(url, body, {
        headers: this.headers,
      });

      if (!response?.data) {
        throw new NotFoundException(
          `Creation succeeded but no data was returned for product: ${validProductDTO}`,
        );
      }

      // TODO: flatten by "tags" array
      return response.data;
    } catch (error) {
      logAxiosError(error, this.logger);

      // TODO: throw error here to let the client know that the request has actually failed
    }
  }

  // TODO: add test
  private flattenOrderResponse(order: IShopifyOrder) {
    return order.line_items.reduce(
      (items: IShopifyOrderLineItem[], item: IShopifyOrderLineItem) => {
        if (item.current_quantity > 1) {
          const tempItem: IShopifyOrderLineItem = {
            ...item,
            current_quantity: 1,
          };

          items = [
            ...items,
            ...new Array(item.current_quantity).fill(tempItem),
          ];
        } else {
          items.push(item);
        }

        return items;
      },
      [],
    );
  }
}

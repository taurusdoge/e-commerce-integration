import { IShopifyOrder } from '../types';

export interface GetShopifyOrderByIdResponse {
  order: IShopifyOrder;
}

export interface GetShopifyOrdersResponse {
  orders: IShopifyOrder[];
}

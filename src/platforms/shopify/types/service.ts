import {
  ICreateProduct,
  IGetOrderById,
  IGetOrders,
} from '../../../common/types';

export interface IShopifyService
  extends IGetOrders,
    IGetOrderById,
    ICreateProduct {}

import { IGetOrderById, IGetOrders } from '../../../common/types';

export interface ISalesforceService extends IGetOrders, IGetOrderById {}

import { Injectable, NotImplementedException } from '@nestjs/common';
import { ISalesforceService } from './types';

@Injectable()
export class SalesforceService implements ISalesforceService {
  async getOrders() {
    throw new NotImplementedException(
      'Salesforce getOrders is not implemented yet',
    );
  }

  async getOrderById(id: string) {
    throw new NotImplementedException(
      `Salesforce getOrdersById is not implemented yet. Passed id is ${id} by the way`,
    );
  }
}

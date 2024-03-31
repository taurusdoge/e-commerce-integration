export interface IGetOrders {
  getOrders: () => Promise<unknown>;
}

export interface IGetOrderById {
  getOrderById: (id: string | number) => Promise<unknown>;
}

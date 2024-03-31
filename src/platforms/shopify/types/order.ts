export interface IShopifyOrder {
  id: number;
  name: string;
  line_items: IShopifyOrderLineItem[];
}

export interface IShopifyOrderLineItem {
  id: string;
  name: string;
  current_quantity: number;
}

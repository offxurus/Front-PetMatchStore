export interface Product {
  id?: string;
  code?: number;
  name: string;
  quantity: number;
  price: number;
  active: boolean;
}

export interface ProductsGetResponse {
  cursor: number;
  products: Array<Product>;
}

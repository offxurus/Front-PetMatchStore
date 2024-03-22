export interface Product {
  id?: string;
  code?: number;
  name: string;
  quantity: number;
  price: number;
  active: boolean;
  images?: string[];
  image_default?: string;
  description?: string;
  rating?: number;
}

export interface ProductsGetResponse {
  cursor: number;
  products: Array<Product>;
}

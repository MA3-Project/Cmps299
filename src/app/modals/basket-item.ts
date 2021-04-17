import { Product } from './product.model';

// basket items
export interface basketItem {
  product: Product;
  quantity: number;
}

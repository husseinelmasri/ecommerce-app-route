import { ProductI } from './product.type';

export interface WishlistDataI {
  status: string;
  count: number;
  data: ProductI[];
}

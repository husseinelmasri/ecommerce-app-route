import { ProductI } from './product.type';

export interface ShippingAddressI {
  details: string;
  phone: string;
  city: string;
  paymentMethod?: 'cash' | 'online';
}

export interface OrderItemI {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface OrderI {
  _id: string;
  id?: string | number;
  cartItems: OrderItemI[];
  totalOrderPrice: number;
  paymentMethodType: 'card' | 'cash';
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  shippingAddress: ShippingAddressI;
  createdAt: string;
  updatedAt: string;
  shippingPrice: number;
  taxPrice: number;
}

export type OrdersType = OrderI[];

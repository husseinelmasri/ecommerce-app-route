'use server';

import { ShippingAddressI } from '@/types/order.type';
import { getOurToken } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function createOrder(cartId: string, data: ShippingAddressI) {
  try {
    const { paymentMethod, ...ShippingAddress } = data;
    const endpoint =
      paymentMethod === 'cash'
        ? `api/v2/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const token = await getOurToken();

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token || '' },
      body: JSON.stringify({ shippingAddress: ShippingAddress }),
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || 'Failed to create an order');
    return result;
  } catch (error) {
    return { status: 'fail', message: (error as Error).message };
  }
}

export async function getUserOrders() {
  try {
    const token = await getOurToken();
    if (!token) throw new Error('No token');

    const decoded = jwtDecode<{ id?: string }>(token);
    const userId = decoded?.id;

    if (!userId) throw new Error('No user ID in token');

    const res = await fetch(`${baseUrl}/api/v1/orders/user/${userId}`, {
      headers: { token },
      cache: 'no-store',
    });

    const data = await res.json();

    return Array.isArray(data) ? data : (data.data ?? []);
  } catch (error) {
    console.error('getUserOrders Error:', error);
    return [];
  }
}

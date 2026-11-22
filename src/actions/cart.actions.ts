'use server';

import { getOurToken } from '@/lib/auth';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function addProductToCart(productId: string, count?: number) {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/cart`, {
    method: 'POST',
    body: JSON.stringify({ productId, count: count ?? 1 }),
    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function GetLoggedUserCart() {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/cart`, {
    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function RemoveProductsFromCart(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`, {
    method: 'DELETE',

    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function UpdateCartProductQuantity(
  productId: string,
  count: number,
) {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ count }),
    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}
export async function ClearUserCart() {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/cart`, {
    method: 'DELETE',
    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

'use server';

import { getOurToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function addProductToWishlist(productId: string) {
  try {
    const token = await getOurToken();
    const res = await fetch(`${baseUrl}/api/v1/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token || '',
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add to wishlist');

    revalidatePath('/wishlist');
    return data;
  } catch (error: any) {
    return { status: 'fail', message: error.message };
  }
}

export async function getUserWishlist() {
  try {
    const token = await getOurToken();
    const res = await fetch(`${baseUrl}/api/v1/wishlist`, {
      headers: {
        'Content-Type': 'application/json',
        token: token || '',
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to get wishlist');
    return data;
  } catch (error: any) {
    return { status: 'fail', message: error.message, data: [] };
  }
}

export async function removeProductFromWishlist(productId: string) {
  try {
    const token = await getOurToken();
    const res = await fetch(`${baseUrl}/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: token || '',
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to remove product');

    revalidatePath('/wishlist');
    return data;
  } catch (error: any) {
    return { status: 'fail', message: error.message };
  }
}

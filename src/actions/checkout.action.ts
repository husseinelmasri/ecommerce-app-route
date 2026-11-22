'use server';

import { getOurToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function onlinePayment(cartId: string, formData: any) {
  const token = await getOurToken();
  const response = await fetch(
    `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { token: token, 'Content-Type': 'application/json' },
    },
  );
  return await response.json();
}

export async function cashPayment(cartId: string, formData: any) {
  const token = await getOurToken();
  const response = await fetch(`${baseUrl}/api/v2/orders/${cartId}`, {
    method: 'POST',
    body: JSON.stringify({
      shippingAddress: formData,
    }),
    headers: { token: token, 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (data?.status === 'success') {
    revalidatePath('/allorders');
  }
  return data;
}

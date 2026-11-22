'use client';

import { GetLoggedUserCart } from '@/actions/cart.actions';
import { CartDataI } from '@/types/cart.type';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
type CartContextType = {
  noOfCartItems: number;
  handleCart: () => Promise<void>;
};
export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const { status } = useSession();

  async function handleCart() {
    try {
      const response: CartDataI = await GetLoggedUserCart();
      console.log(response);
      const noOfItems = response.data.products.reduce(
        (acc, product) => acc + product.count,
        0,
      );
      setNoOfCartItems(noOfItems);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (status === 'authenticated') {
      handleCart();
    }
  }, [status]);
  return (
    <>
      <CartContext.Provider value={{ noOfCartItems, handleCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}

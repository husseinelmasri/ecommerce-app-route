'use client';

import { getUserWishlist } from '@/actions/wishlist.actions';
import { useSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react';

type WishlistContextType = {
  noOfWishlistItems: number;
  handleWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
  const { status } = useSession();

  async function handleWishlist() {
    try {
      const response = await getUserWishlist();
      if (response?.status === 'success') {
        setNoOfWishlistItems(response.count || 0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      handleWishlist();
    } else {
      setNoOfWishlistItems(0);
    }
  }, [status]);

  return (
    <WishlistContext.Provider value={{ noOfWishlistItems, handleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

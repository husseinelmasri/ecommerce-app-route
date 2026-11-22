'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar/navbar';
import { Toaster } from 'sonner';
import AuthContextProvider from '@/context/AuthContext';
import CartContextprovider from '@/context/cartContext';
import WishlistContextProvider from '@/context/wishlistContext';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Footer from '../common/footer/footer';

export default function ProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <CartContextprovider>
        <WishlistContextProvider>
          <Provider store={store}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <Toaster position="top-center" richColors />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </div>
          </Provider>
        </WishlistContextProvider>
      </CartContextprovider>
    </AuthContextProvider>
  );
}

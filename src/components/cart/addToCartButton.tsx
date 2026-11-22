'use client';
import { Button } from '@/components/ui/button';
import { addProductToCart } from '@/actions/cart.actions';
import { toast } from 'sonner';
import { useContext, useState } from 'react';
import { Spinner } from '../ui/spinner';
import { CartContext } from '@/context/cartContext';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { handleCart } = useContext(CartContext)!;
  const [isLoading, setisLoading] = useState(false);
  async function addToCart(id: string) {
    setisLoading(true);
    try {
      const response = await addProductToCart(id);
      console.log(response);
      toast.success('Product added to cart');
      handleCart();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      router.push('/login');
    } finally {
      setisLoading(false);
    }
  }
  return (
    <>
      <Button onClick={() => addToCart(productId)} className="w-full">
        {isLoading ? (
          <>
            <span className="flex items-center">
              Adding...
              <Spinner />
            </span>
          </>
        ) : (
          'Add to Cart'
        )}
      </Button>
    </>
  );
}

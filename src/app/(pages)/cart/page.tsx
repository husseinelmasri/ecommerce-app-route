'use client';

import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';

import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/cart/cartItem';
import OrderSummary from '@/components/cart/orderSummary';
import { ClearUserCart, GetLoggedUserCart } from '@/actions/cart.actions';
import { CartDataI } from '@/types/cart.type';
import { CartProductI } from '@/types/cart.type';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { CartContext } from '@/context/cartContext';

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { handleCart, noOfCartItems } = useContext(CartContext)!;

  const [isClearing, setIsClearing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cartData, setCartData] = useState<CartDataI | null>(null);

  async function getCart() {
    setIsLoading(true);
    try {
      const response: CartDataI = await GetLoggedUserCart();
      console.log(response, 'CART');
      setCartData(response);
      setProducts(response?.data?.products ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async function clearCart() {
    setIsClearing(true);
    try {
      const response = await ClearUserCart();
      console.log(response);
      setProducts([]);
      setCartData(null);
      toast.success(response.message);
      setIsDialogOpen(false);
      await handleCart();
    } catch (error) {
      console.log(error);
      toast.error('Failed to clear cart');
    } finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen gap-4 flex-col justify-center items-center">
          <h2 className="text-6xl font-black">Loading...</h2>
          <Spinner className="size-7" />
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <div className="flex h-screen gap-4 flex-col justify-center items-center">
          <Button variant="link" className=" text-6xl">
            <Link
              href="/products"
              className="flex gap-4 flex-col justify-center items-center">
              Go Shopping
              <ShoppingCart className="size-10" />
            </Link>
          </Button>
        </div>
      </>
    );
  }
  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have{' '}
          <span className="font-semibold text-primary">
            {noOfCartItems} {noOfCartItems === 1 ? 'item' : 'items'}
          </span>{' '}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {products.map((product) => (
            <CartItem
              key={product._id}
              setProducts={setProducts}
              product={product}
              setCartData={setCartData}
            />
          ))}

          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground">
                  <Trash2 />
                  Clear all items
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear your cart?</DialogTitle>
                  <DialogDescription>
                    This will remove all {products.length}{' '}
                    {products.length === 1 ? 'item' : 'items'} from your cart.
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isClearing}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={clearCart}
                    disabled={isClearing}>
                    {isClearing ? (
                      <>
                        <Spinner className="size-4" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 />
                        Yes, clear cart
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <OrderSummary cartData={cartData!} isCheckOut={false} />
      </div>
    </div>
  );
}

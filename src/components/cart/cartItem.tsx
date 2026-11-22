'use client';

import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartDataI, CartProductI } from '@/types/cart.type';
import Image from 'next/image';
import { CartContext } from '@/context/cartContext';
import {
  RemoveProductsFromCart,
  UpdateCartProductQuantity,
} from '@/actions/cart.actions';
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
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

export default function CartItem({
  product,
  setProducts,
  setCartData,
}: {
  product: CartProductI;
  setProducts: (products: CartProductI[]) => void;
  setCartData: (cartData: CartDataI | null) => void;
}) {
  const { handleCart } = useContext(CartContext)!;
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const quantityButtonDisabledStyles =
    'disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:hover:bg-muted disabled:hover:text-muted-foreground';

  async function deleteCart(id: string) {
    setIsRemoving(true);
    try {
      const response = await RemoveProductsFromCart(id);
      toast.success('Product removed from cart');
      setProducts(response.data.products);
      setIsDialogOpen(false);
      console.log(response);
      setCartData(response);
      handleCart();
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove product from cart');
    } finally {
      setIsRemoving(false);
    }
  }

  async function updateCart(id: string, count: number) {
    try {
      const response = await UpdateCartProductQuantity(id, count);
      toast.success('Product quantity updated');
      handleCart();
      setProducts(response.data.products);
      console.log(response);
      setCartData(response);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update product quantity');
    }
  }

  return (
    <>
      <Card className="rounded-2xl py-0 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
          <Image
            src={product.product.imageCover}
            alt="product image"
            width={200}
            height={200}
          />
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-lg font-semibold">{product.product.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-primary">
                  {product.product.category.name}
                </span>
              </div>
            </div>

            <p className="font-bold text-primary">
              {product.price} EGP{' '}
              <span className="text-sm font-normal text-muted-foreground">
                per unit
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-input p-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Decrease quantity"
                  className={quantityButtonDisabledStyles}
                  disabled={product.count === 1}
                  onClick={() =>
                    updateCart(product.product.id, product.count - 1)
                  }>
                  <Minus />
                </Button>
                <span className="min-w-6 text-center font-medium">
                  {product.count}
                </span>
                <Button
                  size="icon-sm"
                  aria-label="Increase quantity"
                  className={quantityButtonDisabledStyles}
                  onClick={() =>
                    updateCart(product.product.id, product.count + 1)
                  }>
                  <Plus />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">
                    {product.price * product.count}{' '}
                    <span className="text-sm font-normal text-muted-foreground">
                      EGP
                    </span>
                  </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon-lg"
                      aria-label={`Remove ${product.product.title}`}>
                      <Trash2 />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove this item?</DialogTitle>
                      <DialogDescription>
                        &ldquo;{product.product.title}&rdquo; will be removed
                        from your cart. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isRemoving}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={() => deleteCart(product.product.id)}
                        disabled={isRemoving}>
                        {isRemoving ? (
                          <>
                            <Spinner className="size-4" /> Removing...
                          </>
                        ) : (
                          <>
                            <Trash2 /> Yes, remove
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

'use client';

import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { addProductToCart } from '@/actions/cart.actions';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { CartContext } from '@/context/cartContext';

export default function ProductDetailsActions({
  productId,
  maxQuantity,
  price,
}: {
  productId: string;
  maxQuantity: number;
  price: number;
}) {
  const [count, setCount] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { handleCart } = useContext(CartContext)!;

  const handleDecrease = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (count < maxQuantity) setCount((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const requests = Array.from({ length: count }).map(() =>
        addProductToCart(productId),
      );

      await Promise.all(requests);

      toast.success(`${count} item(s) added to cart`);
      setCount(1);

      await handleCart();
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-11 items-center rounded-lg border border-input">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity"
              onClick={handleDecrease}
              disabled={count <= 1 || maxQuantity < 1 || isAdding}>
              <Minus />
            </Button>
            <span className="min-w-10 text-center">{count}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              onClick={handleIncrease}
              disabled={count >= maxQuantity || maxQuantity < 1 || isAdding}>
              <Plus />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {maxQuantity} available
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
        <span className="text-sm font-medium">Total Price:</span>
        <span className="font-heading text-xl font-bold text-primary">
          {(price * count).toFixed(2)} EGP
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          size="lg"
          className="h-12 gap-2"
          disabled={maxQuantity < 1 || isAdding}
          onClick={handleAddToCart}>
          {isAdding ? (
            <>
              <Spinner className="size-5" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          size="lg"
          className="h-12 gap-2 bg-foreground text-background hover:bg-foreground/90"
          disabled={maxQuantity < 1 || isAdding}>
          <Zap />
          Buy Now
        </Button>
      </div>
    </>
  );
}

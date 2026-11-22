'use client';

import { removeProductFromWishlist } from '@/actions/wishlist.actions';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { toast } from 'sonner';
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
import { Spinner } from '@/components/ui/spinner';
import { WishlistContext } from '@/context/wishlistContext';

export default function RemoveProductFromWishlistButton({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { handleWishlist } = useContext(WishlistContext)!;

  const displayTitle =
    productTitle && productTitle.trim() !== '' ? productTitle : 'this item';

  async function handleRemove() {
    setIsLoading(true);
    const res = await removeProductFromWishlist(productId);

    if (res.status === 'success') {
      toast.success(res.message || 'Item removed from wishlist');
      setIsDialogOpen(false);
      await handleWishlist();
      router.refresh();
    } else {
      toast.error(res.message || 'Failed to remove item');
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
          title="Remove from wishlist">
          <Trash2 className="size-5" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove this item?</DialogTitle>
          <DialogDescription>
            &ldquo;{displayTitle}&rdquo; will be removed from your wishlist.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleRemove}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="size-4" /> Removing...
              </>
            ) : (
              <>
                <Trash2 className="size-4" /> Yes, remove
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

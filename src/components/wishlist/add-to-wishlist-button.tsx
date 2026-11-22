'use client';

import {
  addProductToWishlist,
  removeProductFromWishlist,
} from '@/actions/wishlist.actions';
import { WishlistContext } from '@/context/wishlistContext';
import { Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

export default function AddToWishlistButton({
  productId,
  isInWishlist = false,
}: {
  productId: string;
  isInWishlist?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(isInWishlist);
  const { handleWishlist } = useContext(WishlistContext)!;

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const res = inWishlist
      ? await removeProductFromWishlist(productId)
      : await addProductToWishlist(productId);

    if (res.status === 'success') {
      setInWishlist(!inWishlist);
      toast.success(res.message);
      await handleWishlist();
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-all ${
        inWishlist
          ? 'bg-red-50 text-red-500 border-red-200'
          : 'bg-white text-gray-400 border-gray-100 hover:text-red-500 hover:border-red-200'
      }`}>
      <Heart className={`size-5 ${inWishlist ? 'fill-current' : ''}`} />
    </button>
  );
}

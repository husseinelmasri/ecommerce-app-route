import { getUserWishlist } from '@/actions/wishlist.actions';
import { WishlistDataI } from '@/types/wishlist.type';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronRight } from 'lucide-react';
import AddToCartButton from '@/components/cart/addToCartButton';
import RemoveProductFromWishlistButton from '@/components/wishlist/remove-product-button';

export default async function WishlistPage() {
  const wishlist: WishlistDataI = await getUserWishlist();
  const products = wishlist?.data || [];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-gray-900 font-medium">Wishlist</span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <Heart className="size-6 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Heart className="size-16 text-gray-200 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Your Wishlist is Empty
                </h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added anything yet.
                </p>
                <Link
                  href="/products"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50/50 transition-colors">
                  <div className="col-span-5 flex items-center gap-4">
                    <Link
                      href={`/products/${product._id}`}
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/products/${product._id}`}
                        className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                        {product.title || 'Product'}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.category.name}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 text-left md:text-center mt-2 md:mt-0">
                    <span className="md:hidden text-gray-500 text-sm mr-2">
                      Price:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {product.price} EGP
                    </span>
                  </div>

                  <div className="col-span-2 text-left md:text-center mt-2 md:mt-0">
                    <span className="md:hidden text-gray-500 text-sm mr-2">
                      Status:
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${product.quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center gap-2 justify-start md:justify-end mt-4 md:mt-0">
                    <div className="w-32">
                      <AddToCartButton productId={product._id} />
                    </div>
                    <RemoveProductFromWishlistButton
                      productId={product._id}
                      productTitle={product.title}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProductI } from '@/types/product.type';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from '@/components/cart/addToCartButton';
import AddToWishlistButton from '../wishlist/add-to-wishlist-button';

export default function ProductCard({ product }: { product: ProductI }) {
  const getFourWords = (text: string) => {
    return text.split(' ').slice(0, 4).join(' ');
  };

  return (
    <Card className="relative flex h-full flex-col pt-0 group overflow-hidden">
      <div className="absolute top-4 right-4 z-40">
        <AddToWishlistButton productId={product._id} />
      </div>

      <Link href={`/products/${product._id}`} className="flex-1">
        <div className="relative overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={500}
            height={500}
            className="relative z-20 aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-1">
          <p className="text-sm text-muted-foreground">
            {product.category.name}
          </p>
          <CardTitle className="font-semibold text-xl">
            {getFourWords(product.title)}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {product.description}
          </CardDescription>

          <div className="flex items-center mt-2">
            {[0, 1, 2, 3, 4].map((star, index) => {
              const filledStar = star < Math.floor(product.ratingsAverage);
              return (
                <React.Fragment key={index}>
                  <Star
                    className={
                      filledStar
                        ? 'text-amber-400 fill-amber-400 size-4'
                        : 'text-gray-300 fill-gray-300 size-4'
                    }
                  />
                </React.Fragment>
              );
            })}
            <span className="text-sm font-medium ml-2">
              {product.ratingsAverage}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.ratingsQuantity})
            </span>
          </div>

          <h3 className="font-bold text-lg mt-2 text-primary">
            {product.price} EGP
          </h3>
        </CardHeader>
      </Link>

      <CardFooter className="mt-auto pt-0">
        <AddToCartButton productId={product._id} />
      </CardFooter>
    </Card>
  );
}

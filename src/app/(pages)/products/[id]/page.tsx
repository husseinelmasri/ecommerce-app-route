import { getProductsDetails } from '@/services/product.service';
import { ProductDetailsI } from '@/types/productDetails.type';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import ProductSlider from '@/components/products/productSlider';
import ProductDetailsActions from '@/components/products/productDetailsActions';
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
} from 'lucide-react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getProductsDetails(id);
  const product: ProductDetailsI = response.data;

  return (
    <>
      <div className="container mx-auto my-6">
        <div className="bread-crumb mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <ProductSlider images={product.images} />
          </div>
          <div className="col-span-8">
            <div className="details col-span-12 lg:col-span-8">
              <Card className="gap-0 rounded-2xl py-0 shadow-sm">
                <CardContent className="space-y-5 p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {product.category.name}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {product.brand.name}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                      {product.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <div
                        className="flex items-center text-amber-500"
                        aria-label={`${product.ratingsAverage} out of 5 stars`}>
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star < Math.round(product.ratingsAverage)
                                ? 'fill-current'
                                : ''
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({product.ratingsQuantity} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-heading text-3xl font-bold">
                      {product.price} <span className="text-xl">EGP</span>{' '}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                        product.quantity > 0
                          ? 'bg-primary/10 text-primary'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                      <span
                        className={`size-2 rounded-full ${
                          product.quantity > 0 ? 'bg-primary' : 'bg-destructive'
                        }`}
                      />
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <Separator />

                  <p className="text-sm leading-6 text-muted-foreground">
                    Material Polyester Blend
                    <span className="mx-2 text-border">|</span>
                    Colour Name Beige
                    <span className="mx-2 text-border">|</span>
                    Department Women
                  </p>

                  <ProductDetailsActions
                    productId={product.id}
                    maxQuantity={product.quantity}
                    price={product.price}
                  />

                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 flex-1 gap-2">
                      <Heart />
                      Add to Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="h-12 w-12"
                      aria-label="Share product">
                      <Share2 />
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Truck className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Free Delivery</p>
                        <p className="text-xs text-muted-foreground">
                          Orders over $50
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <RotateCcw className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">30 Days Return</p>
                        <p className="text-xs text-muted-foreground">
                          Money back
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">
                          100% Protected
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

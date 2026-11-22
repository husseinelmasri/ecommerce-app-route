import { getProductsByBrand } from '@/services/product.service';
import { getSpecificBrand } from '@/services/brand.service';
import { ProductI } from '@/types/product.type';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

export default async function BrandDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const brandId = params.id;

  const [brandRes, productsRes] = await Promise.all([
    getSpecificBrand(brandId),
    getProductsByBrand(brandId),
  ]);

  const brand = brandRes?.data;
  const products: ProductI[] = productsRes?.data || [];

  if (!brand) {
    return (
      <div className="container mx-auto my-20 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Brand Not Found
        </h1>
        <Link
          href="/brands"
          className="bg-primary text-white px-6 py-2.5 rounded-lg">
          Back to Brands
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="bg-[#00B074] w-full py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-white font-medium">{brand.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl">
              <Image
                src={brand.image}
                alt={brand.name}
                width={60}
                height={60}
                className="object-contain w-14 h-14"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{brand.name}</h1>
              <p className="text-white/80 text-sm">
                Browse products from {brand.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal className="size-4" />
            Active Filters:
          </div>

          <div className="flex items-center gap-2 bg-[#E5F7ED] text-[#00B074] px-3 py-1 rounded-full text-sm font-medium">
            {brand.name}
            <Link
              href="/products"
              className="hover:bg-[#00B074]/10 rounded-full p-0.5 transition-colors">
              <X className="size-3" />
            </Link>
          </div>

          <Link
            href="/products"
            className="text-sm text-gray-500 hover:text-gray-800 underline decoration-gray-300 underline-offset-4 ml-2 transition-colors">
            Clear all
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Showing {products.length} products
        </p>

        {products.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center">
            <p className="text-gray-500">No products found for this brand.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

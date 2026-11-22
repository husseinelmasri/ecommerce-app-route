import React from 'react';
import Link from 'next/link';
import { ChevronRight, Package } from 'lucide-react';
import { GetAllProducts } from '@/services/product.service';
import { ProductI } from '@/types/product.type';
import ProductCard from '@/components/products/ProductCard';

export default async function ProductsPage() {
  const response = await GetAllProducts();
  const products: ProductI[] = response.data || [];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="bg-linear-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] w-full py-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-white font-medium">All Products</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Package className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                All Products
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Showing {products.length} products
        </p>

        {products.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

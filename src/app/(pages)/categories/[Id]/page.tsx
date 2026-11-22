import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { getSpecificCategory } from '@/services/categories.service';
import { getProductsByCategory } from '@/services/product.service';
import { ProductI } from '@/types/product.type';
import ProductCard from '@/components/products/ProductCard';

export default async function CategoryDetailsPage(props: {
  params: Promise<{ Id: string }>;
}) {
  const params = await props.params;
  const categoryId = params.Id;

  const [categoryRes, productsRes] = await Promise.all([
    getSpecificCategory(categoryId),
    getProductsByCategory(categoryId),
  ]);

  const category = categoryRes?.data;
  const products: ProductI[] = productsRes?.data || [];

  if (!category) {
    return (
      <div className="container mx-auto my-20 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Category Not Found
        </h1>
        <Link
          href="/categories"
          className="bg-primary text-white px-6 py-2.5 rounded-lg">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="bg-linear-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] w-full py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link
              href="/categories"
              className="hover:text-white transition-colors">
              Categories
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-white font-medium">{category.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Image
                src={category.image}
                alt={category.name}
                width={40}
                height={40}
                className="object-contain w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{category.name}</h1>
              <p className="text-white/80 text-sm">
                Browse products in {category.name}
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
            {category.name}
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
            <p className="text-gray-500">
              No products found for this category.
            </p>
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

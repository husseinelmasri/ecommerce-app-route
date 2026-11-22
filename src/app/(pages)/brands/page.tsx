import { getAllBrands } from '@/services/brand.service';
import { BrandI } from '@/types/brand.type';
import BrandCard from '@/components/brands/brand-card';
import Link from 'next/link';
import { ChevronRight, Tags } from 'lucide-react';

export default async function BrandsPage() {
  const response = await getAllBrands();
  const brands: BrandI[] = response?.data || [];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="bg-linear-to-r from-[#7F22FE] via-[#8E51FF] to-[#C27AFF] w-full py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-white">Brands</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm inline-flex items-center justify-center">
              <Tags className="size-8 text-white" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/80 text-sm md:text-base mt-1 font-medium">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {brands.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center">
            <p className="text-gray-500">No brands found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

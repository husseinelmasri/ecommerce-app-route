import Image from 'next/image';
import Link from 'next/link';
import { BrandI } from '@/types/brand.type';

export default function BrandCard({ brand }: { brand: BrandI }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center">
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center p-4">
        <Image
          alt={brand.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          src={brand.image}
          width={160}
          height={160}
        />
      </div>
      <h3 className="font-semibold text-gray-900 text-center text-xs sm:text-sm group-hover:text-purple-600 transition-colors truncate w-full">
        {brand.name}
      </h3>
    </Link>
  );
}

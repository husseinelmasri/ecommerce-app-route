import Link from 'next/link';
import Image from 'next/image';
import { CategoryI } from '@/types/category.type';
import { ArrowRight } from 'lucide-react';
import { getCategories } from '@/services/categories.service';

export default async function Categories() {
  const response = await getCategories();
  const categories: CategoryI[] = response?.data || [];
  if (categories.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-primary rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-primary">Category</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 text-sm md:text-base transition-colors">
            View All Categories
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

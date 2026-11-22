import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/services/categories.service';
import { CategoryI } from '@/types/category.type';

export default async function CategoriesPage() {
  const response = await getCategories();
  const categories: CategoryI[] = response?.data || [];

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-primary rounded-full"></div>
        <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center">
            <div className="w-full h-48 relative rounded-xl overflow-hidden bg-gray-50 mb-4 flex items-center justify-center">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

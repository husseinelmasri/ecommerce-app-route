import { GetAllProducts } from '@/services/product.service';
import { ProductI } from '@/types/product.type';
import ProductCard from '@/components/products/ProductCard';
import HeaderSection from '../HeaderSection/HeaderSection';

export default async function Products() {
  const response = await GetAllProducts();
  const products: ProductI[] = response.data;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <HeaderSection headerName="Featured" sectionName="Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

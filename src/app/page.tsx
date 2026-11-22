import MainSlider from '@/components/home/MainSlider/MainSlider';
import StoreFeatures from '@/components/home/StoreFeatures/StoreFeatures';
import PromoSection from '@/components/home/PromoSection/PromoSection';
import Products from '@/components/home/Products/Products';
import NewsletterSection from '@/components/home/NewsletterSection/NewsletterSection';
import Categories from '@/components/home/Categories/Categories';

export default function Home() {
  return (
    <div className="flex flex-col">
      <MainSlider />
      <StoreFeatures />
      <Categories />
      <PromoSection />
      <Products />
      <NewsletterSection />
    </div>
  );
}

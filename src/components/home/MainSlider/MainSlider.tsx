'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import homeSliderImage from '@/assets/home-slider.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Fresh Products Delivered to your Door',
    subtitle: 'Get 20% off your first order',
  },
  {
    title: 'Premium Quality Guaranteed',
    subtitle: 'Fresh from farm to your table',
  },
  {
    title: 'Fast & Free Delivery',
    subtitle: 'Same day delivery available',
  },
];

export default function MainSlider() {
  return (
    <div className="relative w-full h-112.5 md:h-112.5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{
          clickable: true,
          bulletClass:
            'swiper-pagination-bullet !w-3 !h-3 !bg-white/50 !opacity-100 transition-all',
          bulletActiveClass: '!bg-white !w-8 !rounded-md',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-start">
              <Image
                src={homeSliderImage}
                alt="Fresh Products"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-emerald-500/90 to-emerald-400/40" />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-xl text-white text-left">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 font-medium">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center justify-start gap-4">
                    <Link
                      href="/products"
                      className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Shop Now
                    </Link>
                    <Link
                      href="/products"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="size-6" />
        </button>
        <button className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg hover:bg-gray-100 transition-colors">
          <ChevronRight className="size-6" />
        </button>
      </Swiper>
    </div>
  );
}

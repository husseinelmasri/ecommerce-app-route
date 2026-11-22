'use client';

import React, { useState } from 'react';

import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {images.map((images, i) => {
          return (
            <SwiperSlide key={`main-${i}`}>
              <Image
                loading="eager"
                src={images}
                alt={`main-image-${i}`}
                width={500}
                height={500}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {images.map((images, i) => {
          return (
            <SwiperSlide key={`thumb-${i}`}>
              <Image
                loading="eager"
                src={images}
                alt={`thumbnail-image-${i}`}
                width={100}
                height={100}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

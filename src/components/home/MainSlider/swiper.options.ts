import { Pagination, Navigation } from 'swiper/modules';

export const swiperOptions = {
  slidesPerView: 1,
  loop: true,
  pagination: { clickable: true },
  modules: [Pagination, Navigation],
  navigation: { nextEl: '.custom-next', prevEl: '.custom-prev' },
};

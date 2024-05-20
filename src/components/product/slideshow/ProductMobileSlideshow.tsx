'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination, Thumbs } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          height: '100%'
        }}
        pagination={true}
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Thumbs, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                width={600}
                height={500}
                src={image}
                alt={title}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

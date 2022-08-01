import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigation, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

const MainSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <Carousel>
      <Swiper
        modules={[Navigation, Autoplay, Thumbs]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          swiper.activeIndex === 9
            ? setActiveIndex(1)
            : swiper.activeIndex === 0
            ? setActiveIndex(8)
            : setActiveIndex(swiper.activeIndex);
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        navigation
        autoplay={{ delay: 2500, pauseOnMouseEnter: false }}
      >
        <SwiperSlide>
          <Image src="/images/banner-1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-4.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-5.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-6.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-7.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-8.png" alt="" />
        </SwiperSlide>
      </Swiper>
      <Indicator>{activeIndex}/8</Indicator>
    </Carousel>
  );
};

export default MainSlider;

const Carousel = styled.section`
  overflow: hidden;
  position: relative;
  margin-top: 16px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  .swiper-button-prev,
  .swiper-button-next {
    &::after {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      color: #fff;
      font-size: 17px;
      padding: 11px 16px;
    }
  }
  .swiper-button-prev::after {
    margin-left: 25px;
  }
  .swiper-button-next::after {
    margin-right: 25px;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Indicator = styled.div`
  position: absolute;
  right: 17px;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 24px;
  font-size: 12px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  z-index: 10;
`;

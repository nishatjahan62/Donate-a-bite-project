import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import banner01 from "../../assets/Banners/B01.jpg";
import banner02 from "../../assets/Banners/B02.jpg";
import banner03 from "../../assets/Banners/B03.jpg";

const Banner = () => {
  return (
    <div className="lg:my-18 my-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={500} // transition speed
      >
        <SwiperSlide>
          <div className="mx-5 sm:mx-8 lg:mx-10">
            <img className="rounded-2xl" src={banner01} alt="Banner 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mx-5 sm:mx-8 lg:mx-10">
            <img className="rounded-2xl" src={banner02} alt="Banner 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mx-5 sm:mx-8 lg:mx-10">
            <img className="rounded-2xl" src={banner03} alt="Banner 3" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

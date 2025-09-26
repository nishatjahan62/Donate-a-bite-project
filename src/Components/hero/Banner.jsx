import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner01 from "../../assets/Banners/B01.jpg";
import banner02 from "../../assets/Banners/B02.jpg";
import banner03 from "../../assets/Banners/B03.jpg";

const Banner = () => {
  return (
    <div className="lg:my-18 my-12">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={1500}     
        transitionTime={500}  
      >
        <div className="mx-5 sm:mx-8 lg:mx-10">
          <img className="rounded-2xl" src={banner01} alt="Banner 1" />
        </div>
        <div className="mx-5 sm:mx-8 lg:mx-10">
          <img className="rounded-2xl" src={banner02} alt="Banner 2" />
        </div>
        <div className="mx-5 sm:mx-8 lg:mx-10">
          <img className="rounded-2xl" src={banner03} alt="Banner 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

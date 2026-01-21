import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/autoplay";

import banner01 from "../../assets/Banners/B01.jpg";
import banner02 from "../../assets/Banners/B02.jpg";
import banner03 from "../../assets/Banners/B03.jpg";
import Button from "../../Pages/Shared/Button/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={800}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {[banner01, banner02, banner03].map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-center bg-cover relative flex items-center justify-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Animated Content – remounts on slide change */}
              <motion.div
                key={activeIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6 max-w-3xl"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-primary text-4xl md:text-6xl font-bold leading-tight"
                >
                  Turn Surplus Food Into Shared Hope
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-200 mt-6 text-lg md:text-xl"
                >
                  Donate-A-Bite connects restaurants and communities to reduce
                  food waste and nourish lives—one meal at a time.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-10">
                  <Link to="/all-donations">
                    <Button label="Donate Food Now" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

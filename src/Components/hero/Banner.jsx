import React from "react";
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
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={900}
        className="h-full"
      >
        {[banner01, banner02, banner03].map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-center bg-cover relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-black/20" />

              {/*  Button */}
            
<motion.div
  className="absolute bottom-10 right-10 z-10 flex items-center gap-3"
  initial={{ opacity: 0, y: 30 }}
  animate={{
    opacity: 1,
    y: [0, -10, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    y: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
>
  <Link to="/all-donations" className="flex items-center gap-3 group">
    {/* Reused Button */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button label="Donate Food Now" />
    </motion.div>

    {/* Animated Arrow */}
    <motion.span
      className="text-white text-lg"
      animate={{ x: [0, 8, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <FaArrowRight />
    </motion.span>
  </Link>
</motion.div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

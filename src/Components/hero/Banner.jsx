import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

// Import images
import banner01 from "../../assets/Banners/B01.jpg";
import banner02 from "../../assets/Banners/B02.jpg";
import banner03 from "../../assets/Banners/B03.jpg";

import Button from "../../Pages/Shared/Button/Button";
import { FaArrowRight, FaHandHoldingHeart } from "react-icons/fa";

const slideData = [
  {
    image: banner01,
    title: "Reduce Food Waste",
    description: "Join our network of restaurants and charities to make a lasting impact.",
  },
  {
    image: banner02,
    title: "Connect & Share Surplus",
    description: "Efficiently manage donations and help those in need around you.",
  },
  {
    image: banner03,
    title: "Make an Impact Today",
    description: "Sign up now to start donating, requesting, or rescuing surplus food.",
  },
];

// --- Animation Variants ---

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeInStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Banner = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={"fade"}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="h-full w-full"
      >
        {slideData.map((slide, index) => {
          const words = slide.title.split(" ");

          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className="w-full h-full bg-center bg-cover relative flex items-center justify-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Content Container */}
                  <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center text-white">
                    {/* 1. Main Heading (Word by Word + Scale) */}
                    {isActive && (
                      <motion.div
                        className="max-w-4xl mb-4"
                        variants={sentenceVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h1
                          className="text-xl md:text-2xl lg:text-4xl font-extrabold drop-shadow-lg leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {words.map((word, i) => (
                            <motion.span key={i} variants={wordVariants}>
                              {word}
                            </motion.span>
                          ))}
                        </motion.h1>
                      </motion.div>
                    )}

                    {/* 2. Description Card */}
                    {isActive && (
                      <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInStagger}
                        className="max-w-xl mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl"
                      >
                        <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed">
                          {slide.description}
                        </p>
                      </motion.div>
                    )}

                    {/* 3. Learn More Button */}
                    {isActive && (
                      <motion.div
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInStagger}
                      >
                        <Link to="/auth/Login">
                          <motion.button
                            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base transition-all hover:bg-white/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Learn More
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="group-hover:translate-x-1"
                            >
                              <FaArrowRight className="text-sm" />
                            </motion.span>
                          </motion.button>
                        </Link>
                      </motion.div>
                    )}
                  </div>

                  {/* Donate Food Now Button Restored to Bottom Right Corner */}
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button label="Donate Food Now" />
                      </motion.div>

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

                  {/* Floating Decorative Element */}
                  <motion.div
                    className="absolute bottom-8 left-8 z-10 text-white/50 hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: [0, 5, 0] }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <FaHandHoldingHeart size={40} />
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Swiper Pagination Dots */}
      <div className="swiper-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2"></div>
    </div>
  );
};

const styles = `
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.4);
    opacity: 1;
    transition: all 0.3s ease;
  }
  .swiper-pagination-bullet-active {
    width: 30px;
    border-radius: 10px;
    background-color: white;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Banner;
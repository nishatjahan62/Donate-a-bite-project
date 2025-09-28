import React from "react";
import { useSwiperSlide } from "swiper/react";

const StoryCard = ({ story }) => {
  const { title, image, description } = story;
  const swiperSlide = useSwiperSlide();

  return (
   <div
      // Adjusted padding and margin for better small-screen fit
      className={`w-full p-4 mx-0 rounded-2xl shadow-lg transition-all duration-300 text-left transform ${
        swiperSlide.isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"
      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
    >
      <img
        src={image}
        alt={title}
        className="w-full sm:h-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-2xl font-semibold mb-2 text-center text-primary dark:text-white">
        {title}
      </h3>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
};

export default StoryCard;

import React from "react";
import { useSwiperSlide } from "swiper/react";

const StoryCard = ({ story }) => {
  const { title, image, description } = story;
  const swiperSlide = useSwiperSlide();

  return (
    <div
      className={`w-full h-[350px] sm:h-[360px] p-4 sm:px-6 mx-0 rounded-2xl shadow-lg text-left
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col
        hover:border-2 hover:border-primary hover:-translate-y-1
        ${
          swiperSlide.isActive
            ? "scale-100 opacity-100"
            : "scale-95 opacity-70"
        }`}
    >
      {/* Image section */}
      <div className="w-full h-48 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Text section */}
      <div className="flex flex-col justify-between flex-grow mt-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-primary dark:text-white">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-center line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;

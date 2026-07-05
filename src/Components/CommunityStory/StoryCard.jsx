import React from "react";
import { useSwiperSlide } from "swiper/react";
import Button from "../../Pages/Shared/Button/Button";

const StoryCard = ({ story, onRead }) => {
  const swiperSlide = useSwiperSlide();

  return (
    <div
      className={`
      group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden
      transition-all duration-500
      ${
        swiperSlide.isActive
          ? "scale-100 opacity-100 shadow-2xl"
          : "scale-90 opacity-60"
      }
    `}
    >
      <div className="overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col h-[230px]">

        <h3 className="text-2xl font-bold text-primary text-center">
          {story.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mt-4 line-clamp-4 text-center flex-1">
          {story.description}
        </p>

        <Button
          onClick={onRead}
          label="Read full Story"
        >
      
        </Button>

      </div>
    </div>
  );
};

export default StoryCard;
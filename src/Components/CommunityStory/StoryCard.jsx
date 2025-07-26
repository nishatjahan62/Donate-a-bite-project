// StoryCard.jsx
import React from "react";
import { useSwiperSlide } from "swiper/react";

const StoryCard = ({ story }) => {
  const { title, image, description } = story;
  const swiperSlide = useSwiperSlide();

  return (
    <div
      className={`w-full lg:mx-15 p-7 mx-5 bg-white rounded-2xl shadow-lg transition-all duration-300 text-left transform ${
        swiperSlide.isActive ? "scale-105 opacity-100" : "scale-90 opacity-60"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-2xl font-semibold text-primary mb-2 text-center">{title}</h3>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
};

export default StoryCard;

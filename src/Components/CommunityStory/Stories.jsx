import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import StoryCard from "./StoryCard";

const stories = [
  {
    title: "Hope Kitchen",
    description:
      "A small restaurant in Chittagong donates 30 meals daily, spreading kindness.",
    image: "https://i.ibb.co/SwcwwMMy/image.png",
  },
  {
    title: "Food for All",
    description:
      "Partnering with 15 eateries, they bring rescued food to those in need.",
    image: "https://i.ibb.co/20ZZFBGR/image.png",
  },
  {
    title: "Care Meals",
    description:
      "Volunteers serve hot meals across rural communities every weekend.",
    image: "https://i.ibb.co/4nSgFRq8/image.png",
  },
  {
    title: "Kind Hearts",
    description:
      "An NGO connecting surplus food from events to shelters and orphanages.",
    image: "https://i.ibb.co/n8kpH1zR/image.png",
  },
  {
    title: "Daily Dignity",
    description:
      "Helping families in need with access to clean meals and heartfelt care.",
    image: "https://i.ibb.co/0j2GPkbv/image.png",
  },
];

const Stories = () => {
  return (
    <section className="bg-secondary dark:bg-gray-900 py-16 px-4 sm:px-10 font-sans  rounded-2xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary dark:text-white pb-16">
          Community Stories
        </h2>

       <Swiper
  modules={[Autoplay, EffectCoverflow]}
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    0: {
      slidesPerView: 1, // small screens -> 1 card full width
      spaceBetween: 0,
      effect: "slide", // simple slide for mobile
    },
    768: {
      slidesPerView: 1, // medium screens -> still 1 card
      spaceBetween: 0,
      effect: "slide",
    },
    1024: {
      slidesPerView: 3, // large screens -> 3 cards with coverflow
      spaceBetween: 30,
      effect: "coverflow",
    },
  }}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: false,
  }}
  className="px-4"
>
  {stories.map((story, index) => (
    <SwiperSlide key={index}>
      <StoryCard story={story} />
    </SwiperSlide>
  ))}
</Swiper>

      </div>
    </section>
  );
};

export default Stories;

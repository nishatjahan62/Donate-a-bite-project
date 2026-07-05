import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import StoryCard from "./StoryCard";
import StoryModal from "./StoryModal";

import {stories} from "../../data/story";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section className="bg-secondary dark:bg-gray-900 py-16 px-4 sm:px-10 rounded-2xl">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary poppins">
            Community Stories
          </h2>

          <p className="text-lg text-white dark:text-gray-300 mt-2">
            From the Community, For the Community
          </p>
        </div>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          centeredSlides
          grabCursor
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              effect: "slide",
            },
            768: {
              slidesPerView: 1,
              effect: "slide",
            },
            1024: {
              slidesPerView: 3,
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
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <StoryCard
                story={story}
                onRead={() => setSelectedStory(story)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {selectedStory && (
          <StoryModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}

      </div>
    </section>
  );
};

export default Stories;
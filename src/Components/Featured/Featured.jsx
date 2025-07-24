import React, { useEffect, useState } from "react";
import DonationCard from "../donationCard/DonationCard";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Featured = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/featured-donations")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2 className="text-center font-bold text-4xl text-primary py-10 poppins ">
        Featured Donations
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        mousewheel
        loop={true}
      >
        {donations.map((donation) => (
          <SwiperSlide key={donation._id}>
            <DonationCard donation={donation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Featured;

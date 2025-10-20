import React, { useEffect, useState } from "react";
import DonationCard from "../donationCard/DonationCard";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Featured = () => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axiosSecure.get("/featured-donations"); // backend route
        setDonations(res.data); // save to state
      } catch (error) {
        console.error("Error fetching featured donations:", error);
      }
    };

    fetchDonations();
  }, [axiosSecure]);

  return (
    <div>
      <div className="text-center py-3 pb-16">
        {" "}
        <h2 className="text-3xl font-bold text-primary ">Featured Donations</h2>
        <p className=" text-gray-700 dark:text-gray-300 text-base">
          Spotlight on Impactful Donations
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
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

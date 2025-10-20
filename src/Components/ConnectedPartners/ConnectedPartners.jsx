import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Button from "../../Pages/Shared/Button/Button";
import { FaEnvelope } from "react-icons/fa";

const ConnectedPartners = () => {
  const axios = UseAxiosSecure();

  // Fetch Restaurants
  const { data: restaurants = [], isLoading: loadingRestaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await axios.get("/restaurants");
      return res.data;
    },
  });

  // Fetch Charities
  const { data: charities = [], isLoading: loadingCharities } = useQuery({
    queryKey: ["charities"],
    queryFn: async () => {
      const res = await axios.get("/charities");
      return res.data;
    },
  });

  if (loadingRestaurants || loadingCharities) return <p>Loading...</p>;

  const renderCard = (item) => (
    <motion.div
      key={item._id}
      className="bg-white dark:bg-gray-800 border border-secondary rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-xl text-center mx-auto w-[70%] sm:w-full"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image or fallback */}
      <div className="w-16 h-16 rounded-full bg-secondary dark:bg-gray-700 flex items-center justify-center text-white font-bold text-xl mx-auto overflow-hidden">
        {item.photoURL ? (
          <img
            src={item.photoURL}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{item.name ? item.name.charAt(0) : "P"}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-xl sm:text-2xl font-bold text-primary text-center">
        {item.name}
      </h3>

      {/* Description / email */}
      <div className="flex gap-2 text-gray-600 dark:text-gray-300 justify-center">
  <FaEnvelope className="mt-1 text-secondary dark:text-primary" />
  <p className="text-sm">
    {item.email || item.description || "No details"}
  </p>
</div>

      {/* Optional link button */}
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <Button label="Visit" className="mt-auto w-full" />
        </a>
      )}
    </motion.div>
  );

  return (
    <section className="py-20 px-6 md:px-20  transition-colors duration-300  shadow-lg border-t-4 border-l-4 border-secondary rounded-2xl ">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl poppins md:text-4xl font-bold text-primary">
          Our Connected Restaurants & Charities
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
          Meet the restaurants and charities contributing to reducing food
          waste.
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-8 text-primary">Restaurants</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {restaurants.map(renderCard)}
      </div>

      <h3 className="text-2xl font-semibold mb-8 text-primary">Charities</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {charities.map(renderCard)}
      </div>
    </section>
  );
};

export default ConnectedPartners;

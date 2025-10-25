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
      className="relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-2xl p-6 flex flex-col gap-5 text-center shadow-md hover:shadow-xl 
      transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary transition-all duration-500 pointer-events-none"></div>

      {/* Image */}
      <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden ring-2 ring-secondary/40 shadow-sm group-hover:ring-primary transition-all duration-500">
        {item.photoURL ? (
          <img
            src={item.photoURL}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary text-white text-2xl font-bold">
            {item.name ? item.name.charAt(0) : "?"}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold  text-primary transition-colors duration-300">
        {item.name}
      </h3>

      {/* Email or Description */}
      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
        <FaEnvelope className="text-secondary dark:text-primary" />
        <p className="text-sm">{item.email || item.description || "No details"}</p>
      </div>

      {/* Visit Button */}
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <Button
            label="Visit"
            className="mt-3 w-full bg-secondary hover:bg-primary text-white font-semibold py-2 rounded-xl transition-all duration-300"
          />
        </a>
      )}
    </motion.div>
  );

  return (
    <section className="py-20 px-6 md:px-20  dark:bg-gray-900 transition-colors duration-300 rounded-2xl bg-secondary border-secondary shadow-inner">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-primary">
          Our Connected Partners
        </h2>
        <p className="text-white dark:text-gray-300 text-base">
          Meet the restaurants and charities working together to reduce food
          waste and serve the community better.
        </p>
      </div>

      <div className="space-y-5 sm:space-y-10 lg:space-y-14 ">
        {/* Restaurants Section */}
        <div>
          <h3 className="text-2xl  font-semibold text-primary mb-2 text-center underline decoration-secondary underline-offset-8">
            Restaurants
          </h3>
          <p className="text-center text-white/90 dark:text-gray-400 mb-8 text-sm md:text-base">
            These restaurants generously share surplus meals to fight hunger and minimize waste.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {restaurants.map(renderCard)}
          </div>
        </div>

        {/* Charities Section */}
        <div>
          <h3 className="text-2xl  font-semibold text-primary mb-2 text-center underline decoration-secondary underline-offset-8">
            Charities
          </h3>
          <p className="text-center text-white/90 dark:text-gray-400 mb-8 text-sm md:text-base">
            Our charity partners distribute collected food to those who need it most.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {charities.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectedPartners;

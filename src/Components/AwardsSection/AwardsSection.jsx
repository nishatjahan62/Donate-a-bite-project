import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaStar, FaMedal, FaTrophy } from "react-icons/fa";

const awards = [
  { icon: <FaAward />, title: "Best Charity Platform 2024" },
  { icon: <FaStar />, title: "Top Rated by Users" },
  { icon: <FaMedal />, title: "Community Impact Award" },
  { icon: <FaTrophy />, title: "Food Waste Hero Recognition" },
];

const AwardsSection = () => {
  return (
    <section className="">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold poppins text-primary mb-4">
          Awards & Recognition
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Donate-A-Bite has been recognized for its impact in minimizing food waste and supporting communities.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              borderBlockWidth:2,
              borderColor: " #2a9d8f", 
              boxShadow: "0 15px 25px rgba(30, 64, 175, 0.3)",
            }}
            className="flex flex-col items-center p-6  border-1 border-secondary rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
          >
            <div className="text-5xl text-primary mb-4">{award.icon}</div>
            <h3 className="text-xl font-semibold  text-center text-black dark:text-white">
              {award.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;

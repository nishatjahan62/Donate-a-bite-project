import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaStar, FaMedal, FaTrophy } from "react-icons/fa";

const awards = [
  { icon: <FaAward />, title: "Best Charity Platform 2025" },
  { icon: <FaStar />, title: "Top Rated by Users" },
  { icon: <FaMedal />, title: "Community Impact Award" },
  { icon: <FaTrophy />, title: "Food Waste Hero Recognition" },
];

const AwardsSection = () => {
  return (
   <section className="pt-16">
  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold poppins text-primary mb-4">
      Awards & Recognition
    </h2>
    <p className="text-gray-700 dark:text-white text-lg max-w-2xl mx-auto">
      Donate-A-Bite has been recognized for its impact in minimizing food waste and supporting communities.
    </p>
  </div>

  {/* Awards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-6">
    {awards.map((award, index) => (
      <motion.div
        key={index}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 15px 25px rgba(30, 64, 175, 0.3)",
        }}
        className="bg-white dark:bg-gray-700 w-full shadow-md border-t-4 border-l-4 border-secondary rounded-2xl text-center flex flex-col items-center space-y-3 py-8 px-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
      >
        <div className="text-5xl text-primary mb-4">{award.icon}</div>
        <h3 className="text-xl font-semibold text-center text-gray-700 poppins dark:text-white">
          {award.title}
        </h3>
      </motion.div>
    ))}
  </div>
</section>

  );
};

export default AwardsSection;

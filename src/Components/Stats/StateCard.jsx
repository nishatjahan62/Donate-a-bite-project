import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaLeaf, FaUtensils, FaWeight, FaHandsHelping } from "react-icons/fa";

const icons = {
  food: <FaWeight className="text-4xl text-fuchsia-400" />,
  meals: <FaUtensils className="text-4xl text-yellow-500" />,
  co2: <FaLeaf className="text-4xl text-blue-500" />,
  volunteers: <FaHandsHelping className="text-4xl text-pink-400" />,
};

const StatCard = ({ stat }) => {
  const { icon, endValue, suffix, label } = stat;
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) setStartCount(true);
    else setStartCount(false);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-700 w-full shadow-md border-t-4 border-l-4 border-secondary rounded-2xl text-center flex flex-col items-center space-y-3 py-8 px-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
    >
     
      <div className="relative p-4 bg-secondary dark:bg-gray-600 rounded-full mx-auto overflow-hidden ring-2 ring-secondary/40 shadow-sm group-hover:ring-primary transition-all duration-500">
        {icons[icon]}
      </div>

      <h3 className="text-4xl font-extrabold text-primary dark:text-white">
        {startCount ? (
          <CountUp end={endValue} duration={2.5} separator="," suffix={suffix} />
        ) : (
          "0"
        )}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 font-semibold">{label}</p>
    </div>
  );
};

export default StatCard;

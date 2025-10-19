// components/Impact/StatCard.jsx
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaLeaf, FaUtensils, FaWeight } from "react-icons/fa";

const icons = {
  food: <FaWeight className="text-4xl text-green-600" />,
  meals: <FaUtensils className="text-4xl text-yellow-500" />,
  co2: <FaLeaf className="text-4xl text-blue-500" />,
};

const StatCard = ({ stat }) => {
  const { icon, endValue, suffix, label } = stat;
  const { ref, inView } = useInView({
    triggerOnce: false, // allow multiple triggers
    threshold: 0.4, // visible % before triggering
  });

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    } else {
      setStartCount(false); // reset when out of view
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-600 shadow-lg border-t-4 border-l-4 border-secondary rounded-2xl p-6 text-center flex flex-col items-center space-y-3 hover:shadow-xl transition"
    >
      <div>{icons[icon]}</div>

      <h3 className="text-4xl font-extrabold text-primary dark:text-white">
        {startCount ? (
          <CountUp end={endValue} duration={2.5} separator="," suffix={suffix} />
        ) : (
          "0"
        )}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>
    </div>
  );
};

export default StatCard;

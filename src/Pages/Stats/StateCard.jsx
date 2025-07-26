// components/Impact/StatCard.jsx
import React from "react";
import CountUp from "react-countup";
import { FaLeaf, FaUtensils, FaWeight } from "react-icons/fa";

const icons = {
  food: <FaWeight className="text-4xl text-green-600" />,
  meals: <FaUtensils className="text-4xl text-yellow-500" />,
  co2: <FaLeaf className="text-4xl text-blue-500" />,
};

const StatCard = ({ stat }) => {
  const { icon, endValue, suffix, label } = stat;
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center flex flex-col items-center space-y-3 hover:shadow-xl transition">
      <div>{icons[icon]}</div>
      <h3 className="text-4xl font-extrabold text-primary">
        <CountUp end={endValue} duration={2.5} separator="," suffix={suffix} />
      </h3>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>
    </div>
  );
};

export default StatCard;

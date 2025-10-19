// Stats.jsx
import React from "react";
import StatCard from "./StateCard";

const Stats = () => {
  const stats = [
    {
      icon: "food",
      endValue: 1200,
      suffix: " kg",
      label: "Total Food Donated",
    },
    { icon: "meals", endValue: 3500, suffix: "", label: "Meals Saved" },
    {
      icon: "co2",
      endValue: 2800,
      suffix: " kg",
      label: "CO₂ Emissions Reduced",
    },
  ];

  return (
    <section className=" dark:bg-[#1E293B] rounded-2xl nunito  px-4">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary dark:text-white poppins pb-16">
          Our Collective Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

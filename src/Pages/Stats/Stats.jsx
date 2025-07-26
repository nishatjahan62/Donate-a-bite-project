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
    <section className="bg-secondary dark:bg-[#1E293B] py-16 mt-20 rounded-2xl nunito">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary poppins mb-12">
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

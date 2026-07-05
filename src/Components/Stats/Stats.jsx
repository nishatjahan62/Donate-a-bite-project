import React from "react";
import StatCard from "./StateCard";

const Stats = () => {
  const stats = [
    {
      icon: "food",
      endValue: 120,
      suffix: " kg",
      label: "Total Food Donated",
    },
    {
      icon: "meals",
      endValue: 3500,
      suffix: "",
      label: "Meals Saved",
    },
    {
      icon: "co2",
      endValue: 280,
      suffix: " kg",
      label: "CO₂ Emissions Reduced",
    },
    {
      icon: "volunteers",
      endValue: 450,
      suffix: "+",
      label: "Volunteers Engaged",
    },
  ];

  return (
    <section className="dark:bg-[#1E293B] rounded-2xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-primary poppins">
            Our Collective Impact
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Together, We’re Changing Lives
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
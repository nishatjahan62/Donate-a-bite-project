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
    { icon: "meals", endValue: 3500, suffix: "", label: "Meals Saved" },
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
    <section className="dark:bg-[#1E293B] rounded-2xl nunito">
      <div className=" mx-auto  text-center">
        <div className="text-center py-3 pb-16">
          <h2 className="text-3xl poppins font-bold text-primary">
            Our Collective Impact
          </h2>
          <p className="text-grey-800 dark:text-gray-300 text-lg">
            Together, We’re Changing Lives
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

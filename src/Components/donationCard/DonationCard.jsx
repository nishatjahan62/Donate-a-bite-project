import React from "react";
import { Link } from "react-router";
import Button from "../../Pages/Shared/Button/Button";

const DonationCard = ({ donation }) => {
  const {
    title,
    image,
    foodType,
    status,
    quantity,
    _id,
    restaurant: { name: restaurantName, location } = {},
  } = donation;

  return (
    <div className="flex flex-col items-center mx-auto w-[270px] md:w-[270px] sm:w-[280px]  lg:w-[360px] h-[410px] bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48">
        <img
          src={image}
          alt={foodType}
          className="w-full h-full object-cover"
        />
        {/* Optional overlay for style */}
        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition"></div>
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-lg ${
            status === "Available"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 w-full justify-between text-center sm:text-left">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-primary">
            {title}{" "}
            <span className="text-sm text-secondary">({foodType})</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 line-clamp-1">
            {restaurantName} - {location}
          </p>

          <p className="text-gray-700 dark:text-gray-400 font-semibold">
            Quantity:{" "}
            <span className="text-primary dark:text-gray-100 font-semibold">
              {quantity}
            </span>
          </p>
        </div>

        {/* Button */}
        <div className="">
          <Link to={`/donation-details/${_id}`}>
            <Button className="w-full" label="View Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

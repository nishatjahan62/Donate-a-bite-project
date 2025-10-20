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
    <div className="flex flex-col mx-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition h-full">
      {/* Image */}
      <img src={image} alt={foodType} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Text + Info Area */}
        <div className="flex flex-col flex-grow justify-between min-h-[140px]">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
              {title}{" "}
              <span className="text-sm text-blue-500">({foodType})</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-1">
              {restaurantName} - {location}
            </p>

            {/* Quantity Display */}
            <p className=" text-gray-700 dark:text-gray-400 mt-1 font-semibold">
              Quantity:{" "}
              <span className="text-primary dark:text-gray-100 font-semibold">
                {quantity}
              </span>
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`mt-3 px-3 py-1 rounded-lg text-sm font-semibold self-start ${
              status === "Available"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Button - always bottom aligned */}
        <div className="mt-4">
          <Link to={`/donation-details/${_id}`}>
            <Button className="w-full" label="View Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;

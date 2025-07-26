import React from "react";
import { Link } from "react-router"; 
import Button from "../../Pages/Button/Button";

const DonationCard = ({ donation }) => {
  const {
    title,
    image,
    foodType,
    status,
    _id,
    restaurant: { name: restaurantName, location } = {},
  } = donation;

  return (
    <div className="mx-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={foodType} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {title} <span className="text-sm text-blue-500">({foodType})</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {restaurantName} - {location}
        </p>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Available"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>

        <div className="mt-4">
          <Link
            to={`/donation-details/${_id}`}
          >
            <Button className="w-full" label="View Details"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DonationCard;


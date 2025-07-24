import React from "react";
import { useLoaderData } from "react-router"; 

const DonationDetails = () => {
  const {
    title,
    description,
    foodType,
    quantity,
    image,
    status,
    pickupTime,
    restaurant = {},
  } = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 nunito">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-4 text-gray-800 dark:text-gray-100">
            <h2 className="text-4xl font-bold text-primary poppins">{title}</h2>
            <p className="text-lg leading-relaxed">{description}</p>

            <div className="text-base space-y-1">
              <p>
                <span className="font-semibold">Food Type:</span> {foodType}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {quantity}
              </p>
              <p>
                <span className="font-semibold">Restaurant:</span> {restaurant.name} - {restaurant.location}
              </p>
              <p>
                <span className="font-semibold">Pickup Time:</span> {pickupTime}
              </p>
            </div>

            <span
              className={`inline-block mt-4 px-4 py-1 rounded-full font-semibold text-sm tracking-wide ${
                status === "Available"
                  ? "bg-green-100 text-green-700"
                  : status === "Requested"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Status: {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;

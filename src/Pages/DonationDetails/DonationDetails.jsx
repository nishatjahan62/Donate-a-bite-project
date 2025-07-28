import React, { useState } from "react";
import { useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../Button/Button";

const DonationDetails = () => {
  const { user } = UseAuth();
  const userId = user?.uid;
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    _id,
    title,
    description,
    foodType,
    quantity,
    image,
    status,
    pickupTime,
    restaurant = {},
  } = useLoaderData();
  const handleFavorite = async () => {
    if (!userId) {
      toast.error("Please log in to save this donation to favorites.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/favorites", {
        userId,
        donationId: _id,
      });

      if (response.status === 201) {
        setIsFavorite(true);
        alert("Saved to favorites!");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Already in favorites.");
        setIsFavorite(true);
      } else {
        console.error(error);
        alert("Failed to save favorite.");
      }
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 nunito">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl"
          />
        </div>

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
                <span className="font-semibold">Restaurant:</span>{" "}
                {restaurant.name} - {restaurant.location}
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
        <Button
  onClick={handleFavorite}
  className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold ${
    isFavorite ? "bg-gray-500" : "bg-primary hover:bg-primary"
  }`}
  disabled={isFavorite}
>
  {isFavorite ? "Added to Favorites" : "Add to Favorites"}
</Button>

        </div>
      </div>
    </div>
  );
};

export default DonationDetails;

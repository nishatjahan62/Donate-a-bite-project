import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Button from "../Shared/Button/Button";
import { Link } from "react-router";

const AllDonations = () => {
  const axios = UseAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axios.get("/admin/feature-donations");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading donations...</p>;
  if (isError) return <p>Error loading donations!</p>;

  return (
    <div className="p-4 mx-5 sm:mx-8 dark:bg-black dark:text-white min-h-screen">
      <h1 className="text-3xl text-center font-bold text-primary mb-6 py-5">
        All Donations
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="border rounded-2xl p-4 shadow-2xl border-secondary dark:border-secondary bg-white dark:bg-gray-900"
          >
            <img
              src={donation.image || "/placeholder.png"}
              alt={donation.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl py-2 font-semibold text-primary">
              {donation.title}
            </h2>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <p>
                <span className="font-bold">Restaurant:</span>{" "}
                {donation.restaurant?.name} <br />
                {donation.restaurant?.location}
              </p>
              {donation.charityName && (
                <p>
                  <span className="font-bold">Charity:</span> {donation.charityName}
                </p>
              )}
              <p>
            <hr className="border-secondary dark:border-gray-700 my-2" />


                <span className="font-bold">Quantity:</span> {donation.quantity}
              </p>
              <p>
                <span className="font-bold">Status:</span> {donation.status}
              </p>
            </div>

            <hr className="border-secondary dark:border-gray-700 my-2" />

            <Link to={`/donation-details/${donation._id}`}>
            <Button className="w-full" label="View Details"></Button>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;

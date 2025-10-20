import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import DonationCard from "../../Components/donationCard/DonationCard";

const PendingDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const res = await axiosSecure.get("/donations/verified");
        setDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch pending donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDonations();
  }, [axiosSecure]);

  if (loading)
    return <p className="text-center mt-10">Loading pending donations...</p>;

  return (
    <div className="p-6 lg:mt-26 sm:mt-20 mt-16">
      <h1 className="text-3xl text-center poppins font-bold mb-4 text-primary">
        Pending Donations
      </h1>

      {donations.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No pending donations found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDonations;

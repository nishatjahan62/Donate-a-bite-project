import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa6";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseUserRole from "../../Hooks/UseUserRole";
import Button from "../../Pages/Shared/Button/Button";
import { Link } from "react-router";
import Loading from "../../Pages/Loading/Loading";

const LatestCharityRequests = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { role } = UseUserRole(user?.email);

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests/latest");
      return res.data
        .filter((req) => req.purpose !== "Charity Role Request")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (error) return <p className="text-primary">Failed to load requests.</p>;

  return (
    <section className="py-15 px-3 sm:px-10 mt-15 bg-secondary sm:mt-14 lg:mt-20 dark:bg-gray-900 mx-5 sm:mx-8 lg:mx-10 rounded-2xl">
      <h2 className="text-3xl text-center py-3 font-bold text-primary mb-6">
        Latest Charity Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {requests.map((req) => (
          <motion.div
            key={req._id}
            className="bg-white dark:bg-gray-800 border border-secondary rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-xl text-center mx-auto w-[70%] sm:w-full"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Charity Image or Fallback */}
            <div className="w-16 h-16 rounded-full bg-secondary dark:bg-gray-700 flex items-center justify-center text-white font-bold text-xl mx-auto overflow-hidden">
              {req.charityImage ? (
                <img
                  src={req.charityImage}
                  alt={req.charityName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{req.charityName ? req.charityName.charAt(0) : "C"}</span>
              )}
            </div>

            {/* Charity Name */}
            <h3 className="text-xl sm:text-2xl font-bold text-primary text-center">
              {req.charityName}
            </h3>

            {/* Description with icon */}
            <div className="flex gap-2 text-gray-600 dark:text-gray-300 justify-center">
              <FaClipboardList className="mt-1 text-secondary dark:text-primary" />
              <p className="text-sm">
                {req.description || "No description provided"}
              </p>
            </div>

            {/* Donation Title */}
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Donation: <span className="font-bold">{req.donationTitle}</span>
            </p>

            {/* Action Button */}
            {role === "restaurant" && (
              <Link to={`/dashboard/request-details/${req._id}`}>
                <Button
                  label="View Request"
                  className="mt-auto w-full"
                ></Button>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestCharityRequests;

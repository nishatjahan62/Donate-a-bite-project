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
        .slice(0, 4);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-primary">Failed to load requests.</p>;

  return (
    <section className="py-16 px-4 sm:px-10 bg-secondary dark:bg-gray-900 rounded-2xl">
      <div className="text-center py-3 pb-16">
        <h2 className="text-3xl poppins font-bold text-primary">
          Latest Charity Requests
        </h2>
        <p className="text-white dark:text-gray-300 text-lg">
          Respond to the Call for Compassion
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {requests.map((req) => (
          <motion.div
            key={req._id}
            className="relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center justify-between shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden min-h-[350px]"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hover highlight border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary transition-all duration-500 pointer-events-none"></div>

            {/* Top Content */}
            <div className="flex flex-col items-center gap-4 flex-grow">
              {/* Charity Image */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-secondary/40 shadow-sm group-hover:ring-primary transition-all duration-500">
                {req.charityImage ? (
                  <img
                    src={req.charityImage}
                    alt={req.charityName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-white text-2xl font-bold">
                    {req.charityName ? req.charityName.charAt(0) : "C"}
                  </div>
                )}
              </div>

              {/* Charity Name */}
              <h3 className="text-xl font-bold text-primary transition-colors duration-300 line-clamp-1">
                {req.charityName}
              </h3>

              {/* Description */}
              <div className="flex items-start justify-center gap-2 text-gray-600 dark:text-gray-300 min-h-[50px]">
                <FaClipboardList className="text-secondary dark:text-primary text-lg mt-1 shrink-0" />
                <p className="text-sm line-clamp-2">
                  {req.description || "No description provided"}
                </p>
              </div>

              {/* Donation Title */}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Donation:{" "}
                <span className="font-bold text-primary dark:text-secondary">
                  {req.donationTitle}
                </span>
              </p>
            </div>

            {/* Action Button */}
            {role === "restaurant" && (
              <Link
                to={`/dashboard/request-details/${req._id}`}
                className="w-full mt-4"
              >
                <Button
                  label="View Request"
                  className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-xl transition-all duration-300"
                />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestCharityRequests;

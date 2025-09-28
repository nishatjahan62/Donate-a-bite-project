import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaClipboardList, FaUtensils, FaClock } from "react-icons/fa6";
import Loading from "../../Pages/Loading/Loading";

const RequestDetails = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();

  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error loading request.</p>
    );

  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-800",
    Accepted: "bg-blue-200 text-blue-800",
    "Picked Up": "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg flex flex-col gap-6">
        {/* Charity Logo & Name */}
        <div className="flex flex-col items-center gap-4">
          {request.charityImage ? (
            <img
              src={request.charityImage}
              alt={request.charityName}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {request.charityName?.charAt(0) || "C"}
            </div>
          )}
          <h2 className="text-4xl font-bold text-primary">
            {request.charityName}
          </h2>
        </div>

        {/* Description */}
        <div className="flex items-start gap-3 p-4 bg-secondary/10 dark:bg-gray-700 rounded-xl shadow-inner">
          <FaClipboardList className="text-primary text-2xl mt-1" />
          <p className="text-gray-800 dark:text-gray-200 text-lg">
            {request.description || "No description provided."}
          </p>
        </div>

        {/* Donation Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
            <FaUtensils className="text-primary text-xl" />
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Donation:</strong> {request.donationTitle}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
            <FaClock className="text-primary text-xl" />
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Pickup Time:</strong>{" "}
              {new Date(request.pickupTime).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-center mt-2">
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              statusColor[request.status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;

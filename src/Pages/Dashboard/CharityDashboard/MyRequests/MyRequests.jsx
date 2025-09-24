import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../../Hooks/UseAuth";
import { FaClipboardList } from "react-icons/fa6";

const MyRequests = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [requests, setRequests] = useState([]);

  // Fetch requests
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/requests/charity/${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  // Cancel request
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/requests/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setRequests((prev) => prev.filter((r) => r._id !== id));
              Swal.fire(
                "Cancelled!",
                "Your request has been cancelled.",
                "success"
              );
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      {/* Heading */}
     <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-8 text-primary dark:text-primary">
  <FaClipboardList className="text-primary dark:text-primary" />
  My Donation Requests
</h2>


      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border-2 border-secondary dark:border-secondary rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300"
          >
            {/* Donation Title */}
            <h3 className="text-xl font-semibold text-primary dark:text-primary mb-3">
              {req.donationTitle}
            </h3>

            {/* Details */}
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Restaurant:</span>{" "}
              {req.restaurantName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Food Type:</span> {req.foodType}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Quantity:</span> {req.quantity}
            </p>

            {/* Status */}
            <p
              className={`mt-4 font-semibold ${
                req.status === "Pending"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : req.status === "Accepted"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              Status: {req.status}
            </p>

            {/* Cancel button */}
            {req.status === "Pending" && (
              <button
                onClick={() => handleCancel(req._id)}
                className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {requests.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          No requests found.
        </p>
      )}
    </div>
  );
};

export default MyRequests;

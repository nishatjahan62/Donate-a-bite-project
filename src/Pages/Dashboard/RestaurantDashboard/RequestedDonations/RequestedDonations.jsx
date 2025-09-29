import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { FaClipboardList } from "react-icons/fa6";
import Loading from "../../../Loading/Loading";

const RequestedDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // fetch all donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/restaurant/all");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const url =
        action === "accept"
          ? `/requests/accept/${id}`
          : `/requests/reject/${id}`;
      const res = await axiosSecure.patch(url);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["restaurantRequests"]),
  });

  const handleAction = async (id, action) => {
  const actionText = action === "accept" ? "Accept" : "Reject";

  const confirmResult = await Swal.fire({
    title: `${actionText}?`, // short 2-word title
    text: `Are you sure you want to ${actionText.toLowerCase()} this request?`, // explanatory text
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: actionText,
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (confirmResult.isConfirmed) {
    mutation.mutate(
      { id, action },
      {
        onSuccess: () => {
          Swal.fire({
            title: `${actionText}ed!`, // success title
            text: `The request has been ${actionText.toLowerCase()}ed successfully.`, // success text
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        },
      }
    );
  }
};

  if (isLoading)
    return <Loading></Loading>

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <FaClipboardList className="text-primary text-2xl" />
        <h1 className="text-2xl font-bold text-primary">Requested Donations</h1>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-secondary rounded-lg">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-secondary dark:bg-gray-800 text-primary">
            <tr>
              <th className="px-3 py-2 text-left">Donation Title</th>
              <th className="px-3 py-2 text-left">Food Type</th>
              <th className="px-3 py-2 text-left">Charity Name</th>
              <th className="px-3 py-2 text-left">Charity Email</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Pickup Time</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="border-b border-secondary dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-3 py-2 font-medium text-primary">
                  {req.donationTitle}
                </td>
                <td className="px-3 py-2 text-primary">{req.foodType || "N/A"}</td>
                <td className="px-3 py-2 text-primary">{req.charityName}</td>
                <td className="px-3 py-2 text-primary">{req.charityEmail}</td>
                <td
                  className="px-3 py-2 max-w-xs truncate"
                  title={req.description}
                >
                  {req.description}
                </td>
                <td className="px-3 py-2 text-primary">
                  {new Date(req.pickupTime).toLocaleString()}
                </td>
                <td
                  className={`px-3 py-2 font-semibold ${
                    req.status === "Pending"
                      ? "text-yellow-500"
                      : req.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {req.status}
                </td>
                <td className="px-3 py-2 flex gap-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, "accept")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "reject")}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedDonations;

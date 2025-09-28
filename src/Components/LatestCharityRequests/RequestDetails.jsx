import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaClipboardList } from "react-icons/fa6";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading request.</p>;

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-4 text-center">
        {request.charityName}
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FaClipboardList className="text-primary text-xl" />
          <p>{request.description}</p>
        </div>

        <p>
          <strong>Donation:</strong> {request.donationTitle}
        </p>

        <p>
          <strong>Pickup Time:</strong>{" "}
          {new Date(request.pickupTime).toLocaleString()}
        </p>

        <p>
          <strong>Status:</strong> {request.status}
        </p>
      </div>
    </div>
  );
};

export default RequestDetails;

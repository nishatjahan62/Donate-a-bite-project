import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaBox } from "react-icons/fa6";

const ReceivedDonations = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [selected, setSelected] = useState(null);
  const [review, setReview] = useState({ rating: "", comment: "" });

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["received", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity/received/${user.email}`);
      return res.data;
    },
  });

  const addReview = useMutation({
    mutationFn: async ({ id, review }) => {
      await axiosSecure.post(`/charity/review/${id}`, review);
    },
    onSuccess: () => {
      refetch();
      setSelected(null);
      setReview({ rating: "", comment: "" });
    },
  });

  return (
    <div className="p-6">
      <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-8 text-primary dark:text-primary">
        <FaBox className="text-primary dark:text-primary" />
        Received Donations
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((don) => (
          <div
            key={don._id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <h3 className="text-lg font-semibold">{don.donationTitle}</h3>
            <p>Restaurant: {don.restaurantName}</p>
            <p>Food: {don.foodType}</p>
            <p>Quantity: {don.quantity}</p>
            <p>Pickup Date: {new Date(don.pickupDate).toLocaleString()}</p>

            <button
              onClick={() => setSelected(don._id)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              placeholder="Rating (1-5)"
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              placeholder="Write your comment..."
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex gap-3">
              <button
                onClick={() => addReview.mutate({ id: selected, review })}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;

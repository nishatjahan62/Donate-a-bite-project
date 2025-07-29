import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MyReviews = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/reviews-by-user/${user.email}`).then(res => setReviews(res.data));
  }, [axiosSecure, user.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review._id} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold">{review.donationTitle}</h3>
            <p><strong>Restaurant:</strong> {review.restaurantName}</p>
            <p><strong>Review Time:</strong> {new Date(review.createdAt).toLocaleString()}</p>
            <p className="mt-2 italic text-gray-700 dark:text-gray-300">{review.description}</p>
            <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error mt-3">Delete Review</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;

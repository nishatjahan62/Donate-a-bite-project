import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loading from "../../../Loading/Loading";

const MyReviews = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      queryClient.invalidateQueries({ queryKey: ["my-reviews", user.email] });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return <Loading></Loading>

  if (reviews.length === 0)
    return (
      <p className="p-5 text-center text-gray-700 dark:text-gray-300">
        You haven't submitted any reviews yet.
      </p>
    );

  return (
    <div className="p-5 space-y-4">
      {reviews.map((rev) => (
        <div
          key={rev._id}
          className="border rounded p-3 shadow bg-white dark:bg-gray-800 
                     border-gray-300 dark:border-gray-700 
                     text-gray-800 dark:text-gray-200"
        >
          <h3 className="font-bold text-lg">{rev.donationTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{rev.restaurantName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(rev.createdAt).toLocaleString()}
          </p>
          <p className="mt-2">{rev.description}</p>
          <button
            onClick={() => handleDelete(rev._id)}
            className="btn btn-sm btn-error mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;

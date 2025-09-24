import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";


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

  if (isLoading) return <p>Loading...</p>;
  if (reviews.length === 0) return <p className="p-5">You haven't submitted any reviews yet.</p>;

  return (
    <div className="p-5 space-y-4">
      {reviews.map((rev) => (
        <div key={rev._id} className="border rounded p-3 shadow">
          <h3 className="font-bold">{rev.donationTitle}</h3>
          <p>{rev.restaurantName}</p>
          <p><small>{new Date(rev.createdAt).toLocaleString()}</small></p>
          <p>{rev.description}</p>
          <button onClick={() => handleDelete(rev._id)} className="btn btn-sm btn-error mt-2">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;

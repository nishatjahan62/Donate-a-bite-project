import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loading from "../../../Loading/Loading";

const Favorites = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/favorites/${id}`);
      queryClient.invalidateQueries({ queryKey: ["favorites", user.email] }); // v5 object form
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <Loading></Loading>
  if (favorites.length === 0)
    return (
      <p className="p-5 text-center text-gray-700 dark:text-gray-300">
        No favorites yet.
      </p>
    );

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((fav) => (
        <div
          key={fav._id}
          className="border rounded p-3 shadow bg-white dark:bg-gray-800 
                     border-gray-300 dark:border-gray-700 
                     text-gray-800 dark:text-gray-200"
        >
          <img
            src={fav.donationImage}
            alt={fav.donationTitle}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="font-bold mt-2 text-lg">{fav.donationTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {fav.restaurantName} - {fav.location}
          </p>
          <p className="mt-1">Status: {fav.status}</p>
          <p>Quantity: {fav.quantity}</p>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleRemove(fav._id)}
              className="btn btn-sm btn-error"
            >
              Remove
            </button>
            <a
              href={`/donation-details/${fav.donationId}`}
              className="btn btn-sm btn-primary"
            >
              Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;

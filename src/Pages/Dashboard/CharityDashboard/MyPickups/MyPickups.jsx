import { useQuery, useMutation } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaTruck } from "react-icons/fa6";

const MyPickups = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: pickups = [], refetch } = useQuery({
    queryKey: ["my-pickups", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity/my-pickups/${user.email}`);
      return res.data;
    },
  });

  const confirmPickup = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/charity/confirm-pickup/${id}`);
    },
    onSuccess: () => refetch(),
  });

  return (
    <div className="p-6">
       <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-8 text-primary dark:text-primary">
        <FaTruck className="text-primary dark:text-primary" />
      My Pickups
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pickups.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <h3 className="text-lg font-semibold">{item.donationTitle}</h3>
            <p>Restaurant: {item.restaurantName}</p>
            <p>Location: {item.restaurantLocation}</p>
            <p>Food: {item.foodType}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Pickup Time: {new Date(item.pickupTime).toLocaleString()}</p>
            <p>Status: {item.status}</p>

            {item.status !== "Picked Up" && (
              <button
                onClick={() => confirmPickup.mutate(item._id)}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
              >
                Confirm Pickup
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;

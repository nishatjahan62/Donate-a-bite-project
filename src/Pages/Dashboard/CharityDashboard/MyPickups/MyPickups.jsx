import { useQuery, useMutation } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaTruck } from "react-icons/fa6";
import Button from "../../../Shared/Button/Button";
import Swal from "sweetalert2";

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
    onSuccess: () => {
      Swal.fire({
        title: "Pickup Confirmed!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm this pickup?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmPickup.mutate(id);
      }
    });
  };

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
            className="p-6 border-2 border-secondary rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            {/* Donation Title */}
            <h3 className="text-xl font-bold text-center text-primary dark:text-primary mb-4">
              {item.donationTitle}
            </h3>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="font-semibold ">
                Restaurant:{" "}
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {item.restaurantName}
                </span>
              </p>
              <p className="font-semibold">
                Location:{" "}
                <span className="font-bold">{item.restaurantLocation}</span>
              </p>
              <hr className="text-secondary py-1" />{" "}
              <p className="font-semibold">
                Food Type: <span className="font-bold">{item.foodType}</span>
              </p>
              <p className="font-semibold">
                Quantity: <span className="font-bold">{item.quantity}</span>
              </p>
              <hr className="text-secondary py-1" />
              <p className="font-semibold">
                Pickup Time:{" "}
                <span className="font-bold">
                  {new Date(item.pickupTime).toLocaleString()}
                </span>
              </p>
              <p className="font-semibold">
                Status: <span className="font-bold">{item.status}</span>
              </p>
            </div>
            <div className="flex justify-center items-center my-2">
              {item.status !== "Picked Up" && (
                <Button
                  onClick={() => handleConfirm(item._id)}
                  label="Confirm Pickup "
                ></Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickups;

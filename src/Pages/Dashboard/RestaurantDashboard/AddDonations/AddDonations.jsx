import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";
import Swal from "sweetalert2";

const AddDonation = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newDonation) => {
      const { data } = await axiosSecure.post("/donations", newDonation);
      return data;
    },
      onSuccess: () => {
      reset(); 
      Swal.fire({
        title: "Donation Added 🎉",
        text: "Your surplus food donation has been listed successfully.",
        icon: "success",
        confirmButtonText: "Great!",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Oops!",
        text: err.message || "Something went wrong while adding donation.",
        icon: "error",
      });
    },
  });

  const onSubmit = (data) => {
    const donationData = {
      ...data,
      restaurantName: user?.displayName || "Unknown",
      restaurantEmail: user?.email,
      status: "Pending",
    };

    mutate(donationData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-secondary bg-gray-100 rounded-xl mt-10 sm:mt-16 shadow-2xl">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primary mb-6 py-5 text-center">
        Share Your Surplus – Add a Donation
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Donation Title */}
        <div>
          <input
            type="text"
            placeholder="Donation Title (e.g., Surplus Pastries)"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Food Type */}
        <div>
          <input
            type="text"
            placeholder="Food Type (e.g., Bakery, Produce)"
            {...register("foodType", { required: "Food type is required" })}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
          {errors.foodType && (
            <span className="text-red-500 text-sm">
              {errors.foodType.message}
            </span>
          )}
        </div>

        {/* Quantity */}
        <div>
          <input
            type="text"
            placeholder="Quantity (e.g., 10kg or 20 portions)"
            {...register("quantity", { required: "Quantity is required" })}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">
              {errors.quantity.message}
            </span>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          {/* Pickup Time */}
          <div>
            <input
             placeholder="Pickup Time Window"
              type="datetime-local"
              {...register("pickupTime")}
              className="w-full p-2 border dark:bg-gray-800 rounded"
            />
            {errors.pickupTime && (
              <span className="text-red-500 text-sm">
                {errors.pickupTime.message}
              </span>
            )}
          </div>

          {errors.pickupTime && (
            <span className="text-red-500 text-sm">
              {errors.pickupTime.message}
            </span>
          )}
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            placeholder="Location (Address or Coordinates)"
            {...register("location", { required: "Location is required" })}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>

        {/* Image */}
        <div>
          <input
            type="text"
            placeholder="Image URL"
            {...register("image")}
            className="w-full p-2 border dark:bg-gray-800 rounded"
          />
        </div>

        {/* Read-only Restaurant Info */}
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="w-full p-2 border bg-gray-200 dark:bg-gray-700 rounded"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full p-2 border bg-gray-200 dark:bg-gray-700 rounded"
        />

        <Button
          label={isPending ? "Adding Donation..." : "Add Donation"}
          type="submit"
          disabled={isPending}
          className="flex justify-center items-center mx-auto"
        ></Button>
      </form>
      {isError && (
        <p className="text-red-600 mt-3 text-center">❌ {error.message}</p>
      )}
    </div>
  );
};

export default AddDonation;

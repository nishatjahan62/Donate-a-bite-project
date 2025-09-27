import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";

const MyDonations = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [editingDonation, setEditingDonation] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["my-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/restaurant/${user.email}`);
      return res.data;
    },
  });

  // Delete donation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/donations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-donations", user?.email]);
      Swal.fire("Deleted!", "Donation has been removed.", "success");
    },
  });

  // Update donation
  const updateMutation = useMutation({
    mutationFn: async (data) =>
      await axiosSecure.patch(`/donations/${editingDonation._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-donations", user?.email]);
      setEditingDonation(null);
      reset();
      Swal.fire("Updated!", "Donation has been updated.", "success");
    },
    onError: (err) => {
      Swal.fire("Error!", err.message || "Failed to update donation", "error");
    },
  });

  const onUpdateSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <p>Loading donations...</p>;

  return (
  <div className="p-6 dark:bg-secondary min-h-screen">
  <h1 className="text-3xl font-bold text-primary mb-6 text-center">
    My Donations
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
    {donations.map((donation) => (
      <div
        key={donation._id}
        className="mx-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
      >
        <img
          src={donation.image}
          alt={donation.foodType}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {donation.title}{" "}
            <span className="text-sm text-blue-500">({donation.foodType})</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Restaurant: {donation.restaurant?.name} - {donation.location}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Quantity: {donation.quantity}
          </p>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
              donation.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : donation.status === "Verified"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {donation.status}
          </span>

          <div className="flex gap-2 mt-4">
            {donation.status !== "Rejected" && (
              <Button
                onClick={() => setEditingDonation(donation)}
                className="flex-1"
                label="Update"
              />
            )}
            <Button
              onClick={() => deleteMutation.mutate(donation._id)}
              className="flex-1"
              label="Delete"
            />
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Update Form */}
  {editingDonation && (
    <div className="mt-8 p-6 dark:bg-gray-900 bg-gray-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Update Donation: {editingDonation.title}
      </h2>

      <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
        <input
          type="text"
          defaultValue={editingDonation.title}
          {...register("title", { required: "Title is required" })}
          placeholder="Donation Title"
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        <input
          type="text"
          defaultValue={editingDonation.foodType}
          {...register("foodType", { required: "Food type is required" })}
          placeholder="Food Type"
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        {errors.foodType && (
          <span className="text-red-500">{errors.foodType.message}</span>
        )}

        <input
          type="text"
          defaultValue={editingDonation.quantity}
          {...register("quantity", { required: "Quantity is required" })}
          placeholder="Quantity"
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        {errors.quantity && (
          <span className="text-red-500">{errors.quantity.message}</span>
        )}

        <input
          type="text"
          defaultValue={editingDonation.location}
          {...register("location", { required: "Location is required" })}
          placeholder="Location"
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        {errors.location && (
          <span className="text-red-500">{errors.location.message}</span>
        )}

        <input
          type="datetime-local"
          defaultValue={editingDonation.pickupTime}
          {...register("pickupTime", {
            required: "Pickup time is required",
          })}
          className="w-full p-2 border dark:bg-gray-800 rounded"
        />
        {errors.pickupTime && (
          <span className="text-red-500">{errors.pickupTime.message}</span>
        )}

        <Button type="submit" className="w-full mt-4" label="Update Donation" />
      </form>
    </div>
  )}
</div>

  );
};

export default MyDonations;

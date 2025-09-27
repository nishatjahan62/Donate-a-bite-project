import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button"; // assuming you have a Button component
const FeatureDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["feature-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/feature-donations");
      return res.data;
    },
  });

  // Feature donation mutation
  const featureMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/admin/feature-donations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feature-donations"]); // refresh list
    },
  });

  if (isLoading)
    return <p className="text-center py-10 text-primary">Loading...</p>;

  return (
    <div className="p-6 dark:bg-secondary bg-gray-100 rounded-xl shadow-lg mx-5 sm:mx-8 lg:mx-10 mt-10 sm:mt-15">
      <h2 className="text-3xl text-center py-3 font-bold text-primary mb-6">
        Feature Donations
      </h2>

      <div className="overflow-x-auto rounded">
        <table className="w-full border border-secondary text-sm dark:text-gray-200 ">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2 ">Image</th>
              <th className="p-2 ">Title</th>
              <th className="p-2 ">Food Type</th>
              <th className="p-2 ">Restaurant</th>
              <th className="p-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation._id}
                className="border-b border-secondary dark:border-gray-700 text-center "
              >
                <td className="p-2">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 text-primary">{donation.title}</td>
                <td className="p-2 text-primary">{donation.foodType}</td>
                <td className="p-2 text-primary">
                  {donation.restaurant?.name}
                </td>
                <td className="p-2">
                  <Button
                    disabled={donation.isFeatured}
                    label={donation.isFeatured ? "Featured" : "Feature"}

                    onClick={() => featureMutation.mutate(donation._id)}
                  >
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;

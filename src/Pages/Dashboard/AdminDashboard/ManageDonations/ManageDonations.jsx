import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";

const ManageDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donations");
      return data;
    },
  });

  // Verify mutation
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/donations/${id}/verify`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donations"]);
      Swal.fire({
        icon: "success",
        title: "Verified ✅",
        text: "Donation marked as verified",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => Swal.fire("Error", "Could not verify donation", "error"),
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/donations/${id}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donations"]);
      Swal.fire({
        icon: "info",
        title: "Rejected ❌",
        text: "Donation marked as rejected",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => Swal.fire("Error", "Could not reject donation", "error"),
  });

  // Confirm before mutation
  const handleVerify = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to verify this donation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify it!",
    }).then((result) => {
      if (result.isConfirmed) {
        verifyMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this donation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <p className="text-center text-2xl text-primary">Loading donations...</p>
    );
  if (isError)
    return <p className="text-center text-red-500">Error fetching donations</p>;

  return (
    <div className="p-6 dark:bg-secondary bg-gray-100 rounded-xl shadow-lg mx-5 sm:mx-8 lg:mx-10 mt-10 sm:mt-15">
      <h2 className="text-3xl text-center py-3 font-bold text-primary mb-6">
        Manage Donations
      </h2>

      <div className="overflow-x-auto rounded">
        <table className="w-full border border-secondary text-sm dark:text-gray-200 ">
          <thead className="bg-primary text-white">
            {" "}
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Food Type</th>
              <th className="p-3">Restaurant</th>
              <th className="p-3">Email</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d._id} className="border-t dark:border-gray-700">
                <td className="p-3 text-center">{d.title}</td>
                <td className="p-3 text-center">{d.foodType}</td>
                <td className="p-3 text-center">{d.restaurant?.name}</td>
                <td className="p-3 text-center">{d.restaurant?.email}</td>
                <td className="p-3 text-center">{d.quantity}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      d.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : d.status === "Verified"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <Button
                    label="Verify"
                    onClick={() => handleVerify(d._id)}
                    className="bg-green-500 hover:bg-green-600"
                  />
                  <Button
                    label="Reject"
                    onClick={() => handleReject(d._id)}
                    className="bg-red-500 hover:bg-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;

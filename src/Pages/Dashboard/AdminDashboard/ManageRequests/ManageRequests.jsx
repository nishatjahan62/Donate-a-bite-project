import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";

const ManageRequests = () => {
  const axios = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: async () => {
      const res = await axios.get("/admin/requests");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/admin/requests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-requests"]);
      Swal.fire("Deleted!", "Request has been deleted.", "success");
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-primary">Loading requests...</p>;

  return (
   <div className="p-6 dark:bg-secondary bg-gray-100 rounded-xl shadow-lg mx-5 sm:mx-8 lg:mx-10 mt-10 sm:mt-15">
  <h2 className="text-3xl text-center py-3 font-bold text-primary mb-6">
    Manage Requests
  </h2>

  <div className="overflow-x-auto rounded">
    <table className="w-full border border-secondary text-sm dark:text-gray-200">
      <thead className="bg-primary text-white">
        <tr>
          <th className="p-3 text-left">Donation Title</th>
          <th className="p-3 text-center">Charity Name</th>
          <th className="p-3 text-center">Charity Email</th>
          <th className="p-3 text-center">Description</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req._id} className="border-t dark:border-gray-700">
            <td className="p-3 text-center">{req.donationTitle}</td>
            <td className="p-3 text-center">{req.charityName}</td>
            <td className="p-3 text-center">{req.charityEmail}</td>
            <td className="p-3 text-center">{req.description}</td>
            <td className="p-3 text-center flex justify-center gap-2">
              <Button
                label="Delete"
                onClick={() => handleDelete(req._id)}
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

export default ManageRequests;

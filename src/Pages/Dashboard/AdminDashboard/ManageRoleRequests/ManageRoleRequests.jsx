import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";

const ManageRoleRequests = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all charity role requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charityRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/charity-requests");
      return data;
    },
  });

  // ✅ Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/charity-requests/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(["charityRequests"]);
      Swal.fire({
        icon: "success",
        title: "Approved ✅",
        text: "User has been assigned charity role.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // ✅ Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/charity-requests/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(["charityRequests"]);
      Swal.fire({
        icon: "error",
        title: "Rejected ❌",
        text: "Request has been rejected.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // ✅ Confirmation before action
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg mx-2 sm:mx-3 lg:mx-4 mt-10 sm:mt-15">
      <h2 className="text-3xl font-bold text-primary mb-6 py-3 text-center">
        Manage Charity Role Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-primary text-white dark:bg-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Organization</th>
              <th className="px-4 py-2">Mission</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2 dark:text-gray-300">{req.userName}</td>
                <td className="px-4 py-2 dark:text-gray-300">{req.userEmail}</td>
                <td className="px-4 py-2 dark:text-gray-300">{req.organizationName}</td>
                <td className="px-4 py-2 dark:text-gray-300">{req.missionStatement}</td>
                <td className="px-4 py-2 dark:text-gray-300">{req.transactionId}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {req.status}
                </td>
                <td className="px-4 py-2">
                  {req.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(req._id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                        label="Approve"
                      />
                      <Button
                        onClick={() => handleReject(req._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        label="Reject"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

const { data: users = [], isLoading } = useQuery({
  queryKey: ["users", search],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users?search=${search}`);
    return res.data;
  },
  placeholderData: [], 
});


  // 🔹 Make Admin
  const makeAdmin = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to make this user an admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/make-admin`);
      if (res.data.success) {
        await Swal.fire("Success", res.data.message, "success");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to make admin",
        "error"
      );
    }
  };

  // 🔹 Remove Admin
  const removeAdmin = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this user's admin role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove Admin",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/remove-admin`);
      if (res.data.success) {
        await Swal.fire("Success", res.data.message, "success");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to remove admin",
        "error"
      );
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* 📝 Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.role}</td>
                <td className="border px-3 py-2">
                  {user.role === "user" ? (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => removeAdmin(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;

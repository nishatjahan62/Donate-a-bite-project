import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

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

  // Role-changing functions
  const makeAdmin = async (id) =>
    handleRoleChange(id, "make-admin", "make this user an Admin");
  const removeAdmin = async (id) =>
    handleRoleChange(id, "remove-admin", "remove Admin role");
  const makeCharity = async (id) =>
    handleRoleChange(id, "make-charity", "make this user a Charity");
  const removeCharity = async (id) =>
    handleRoleChange(id, "remove-charity", "remove Charity role");
  const makeRestaurant = async (id) =>
    handleRoleChange(id, "make-restaurant", "make this user a Restaurant");
  const removeRestaurant = async (id) =>
    handleRoleChange(id, "remove-restaurant", "remove Restaurant role");

  // Generic role change handler with confirmation
  const handleRoleChange = async (id, action, confirmText) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${confirmText}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${id}/${action}`);
      if (res.data.success) {
        await Swal.fire("Success", res.data.message, "success");
        queryClient.invalidateQueries(["users"]);
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || `Failed to ${confirmText}`,
        "error"
      );
    }
  };

  const roleTextColor = (role) => {
    switch (role) {
      case "admin":
        return "text-green-500 dark:text-green-400 font-semibold text-lg";
      case "charity":
        return "text-blue-500 dark:text-blue-400 font-semibold text-lg";
      case "restaurant":
        return "text-purple-500 dark:text-purple-400 font-semibold text-lg";
      default:
        return "text-gray-700 dark:text-gray-300 text-lg";
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-primary dark:text-white">
        Manage Users
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-secondary dark:border-gray-600 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      {/* 📝 Users Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b dark:border-gray-600">
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className={`border px-3 py-2 ${roleTextColor(user.role)}`}>
                  {user.role}
                </td>
                <td className="border flex justify-center items-center gap-2 px-2 py-2">
                  {/* Admin Buttons */}
                  {user.role === "admin" ? (
                    <button
                      onClick={() => removeAdmin(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-white  sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Charity Buttons */}
                  {user.role === "charity" ? (
                    <button
                      onClick={() => removeCharity(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white  sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Remove Charity
                    </button>
                  ) : (
                    <button
                      onClick={() => makeCharity(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Make Charity
                    </button>
                  )}

                  {/* Restaurant Buttons */}
                  {user.role === "restaurant" ? (
                    <button
                      onClick={() => removeRestaurant(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white  sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Remove Restaurant
                    </button>
                  ) : (
                    <button
                      onClick={() => makeRestaurant(user._id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white sm:px-2 px-1 py-1 rounded text-sm sm:text-base"
                    >
                      Make Restaurant
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-300">
          No users found.
        </p>
      )}
    </div>
  );
};

export default ManageUsers;

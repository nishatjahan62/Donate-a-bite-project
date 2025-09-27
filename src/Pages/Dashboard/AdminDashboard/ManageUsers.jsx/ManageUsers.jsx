import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Button from "../../../Shared/Button/Button";

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
        await Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
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

  // Delete handler
  const deleteUser = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.success) {
        await Swal.fire({
          title: "Deleted!",
          text: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        queryClient.invalidateQueries(["users"]);
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete user",
        "error"
      );
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading users...</p>;

  return (
    <div className="p-6 dark:bg-secondary bg-gray-100 rounded-xl shadow-lg mx-5 sm:mx-8 lg:mx-10 mt-8 sm:mt-15">
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

      {/* Users Table */}
      <div className="overflow-x-auto rounded">
        <table className="w-full border border-secondary text-sm dark:text-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t dark:border-gray-700">
                <td className="p-3 text-center">{user.name}</td>
                <td className="p-3 text-center">{user.email}</td>
                <td className={`p-3 text-center ${roleTextColor(user.role)}`}>
                  {user.role}
                </td>
                <td className="p-3 text-center flex  justify-center gap-2">
                  {/* Keep your existing Buttons logic */}
                  {user.role === "admin" ? (
                    <Button
                      label="Remove Admin"
                      onClick={() => removeAdmin(user._id)}
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white  sm:px-2 rounded text-sm "
                    ></Button>
                  ) : (
                    <Button
                      label=" Make Admin"
                      onClick={() => makeAdmin(user._id)}
                      className="cursor-pointer bg-green-500 hover:bg-green-600 text-white sm:px-2  sm:py-1 rounded text-sm sm:text-base"
                    ></Button>
                  )}
                  {user.role === "charity" ? (
                    <Button
                      onClick={() => removeCharity(user._id)}
                      label="Remove Charity"
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white  sm:px-2 rounded text-sm "
                    ></Button>
                  ) : (
                    <Button
                      onClick={() => makeCharity(user._id)}
                      label="Make Charity"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white sm:px-2  sm:py-1 rounded text-sm sm:text-base"
                    ></Button>
                  )}
                  {user.role === "restaurant" ? (
                    <Button
                      label="Remove Restaurant"
                      onClick={() => removeRestaurant(user._id)}
                      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white  sm:px-2 rounded text-sm "
                    ></Button>
                  ) : (
                    <Button
                      label="Make Restaurant"
                      onClick={() => makeRestaurant(user._id)}
                      className=" cursor-pointer bg-purple-500 hover:bg-purple-600 text-white sm:px-2  sm:py-1 rounded text-sm sm:text-base"
                    ></Button>
                  )}
                  <Button
                    label="Delete User"
                    onClick={() => deleteUser(user._id)}
                    className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white sm:px-2  sm:py-1.5 rounded text-sm sm:text-base"
                  ></Button>
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

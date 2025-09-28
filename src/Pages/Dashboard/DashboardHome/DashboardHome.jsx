import React, { useEffect, useState } from "react";
import { FaGift, FaClipboardList, FaHeart, FaStar } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import UseUserRole from "../../../Hooks/UseUserRole";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user } = UseAuth();
  const { role } = UseUserRole();
  const axiosSecure = UseAxiosSecure();

  const [stats, setStats] = useState({
    donations: 0,
    requests: 0,
    favorites: 0,
    reviews: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [donationChartData, setDonationChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (role === "restaurant") {
          const donationsRes = await axiosSecure.get(`/donations/restaurant/${user.email}`);
          const requestsRes = await axiosSecure.get(`/requests/restaurant/all`);

          setStats({
            donations: donationsRes.data.length,
            requests: requestsRes.data.filter(r => r.status === "Pending").length,
            favorites: 0,
            reviews: 0,
          });

          setRecentActivity(requestsRes.data.slice(0, 5));

          // Prepare donation chart data
          const statsObj = {};
          donationsRes.data.forEach(donation => {
            const type = donation.foodType || "Other";
            statsObj[type] = (statsObj[type] || 0) + 1;
          });
          const chartData = Object.keys(statsObj).map(key => ({
            name: key,
            value: statsObj[key],
          }));
          setDonationChartData(chartData);

        } else if (role === "charity") {
          const requestsRes = await axiosSecure.get(`/requests/charity/${user.email}`);
          const pickupsRes = await axiosSecure.get(`/charity/my-pickups/${user.email}`);

          setStats({
            donations: requestsRes.data.length,
            requests: pickupsRes.data.length,
            favorites: 0,
            reviews: 0,
          });

          setRecentActivity(requestsRes.data.slice(0, 5));

        } else if (role === "user") {
          const favRes = await axiosSecure.get(`/favorites/${user.email}`);
          const txRes = await axiosSecure.get(`/transactions/${user.email}`);

          setStats({
            donations: 0,
            requests: 0,
            favorites: favRes.data.length,
            reviews: txRes.data.length,
          });

          setRecentActivity(txRes.data.slice(0, 5));

        } else if (role === "admin") {
          const donationsRes = await axiosSecure.get("/donations");
          const requestsRes = await axiosSecure.get("/admin/requests");

          setStats({
            donations: donationsRes.data.length,
            requests: requestsRes.data.length,
            favorites: 0,
            reviews: 0,
          });

          setRecentActivity(requestsRes.data.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [user.email, role, axiosSecure]);

  return (
    <div className="p-6 space-y-6">
      {/* Hero */}
      <div className="bg-primary text-white dark:bg-primary dark:text-gray-100 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Welcome, {user?.displayName || "User"}!</h1>
        <p className="text-lg mt-1">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4">
          <FaGift className="text-3xl text-primary dark:text-green-400" />
          <div>
            <p className="text-xl font-bold dark:text-gray-100">{stats.donations}</p>
            <p className="text-gray-700 dark:text-gray-300">Donations</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4">
          <FaClipboardList className="text-3xl text-green-500 dark:text-green-400" />
          <div>
            <p className="text-xl font-bold dark:text-gray-100">{stats.requests}</p>
            <p className="text-gray-700 dark:text-gray-300">Requests</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4">
          <FaHeart className="text-3xl text-pink-500 dark:text-pink-400" />
          <div>
            <p className="text-xl font-bold dark:text-gray-100">{stats.favorites}</p>
            <p className="text-gray-700 dark:text-gray-300">Favorites</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4">
          <FaStar className="text-3xl text-yellow-400 dark:text-yellow-300" />
          <div>
            <p className="text-xl font-bold dark:text-gray-100">{stats.reviews}</p>
            <p className="text-gray-700 dark:text-gray-300">Reviews</p>
          </div>
        </div>
      </div>

      {/* Donation Statistics Chart for Restaurant */}
      {role === "restaurant" && donationChartData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Donation Statistics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.length === 0 && (
            <li className="text-gray-500 dark:text-gray-400">No recent activity</li>
          )}
          {recentActivity.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <span className="font-medium dark:text-gray-100">
                {item.donationTitle || item.purpose || item.transactionId || "Activity"}
              </span>
              <span className="text-gray-500 text-sm dark:text-gray-300">
                {new Date(item.createdAt || item.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;

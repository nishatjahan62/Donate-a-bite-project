import React, { useEffect, useState } from "react";
import {
  FaGift,
  FaClipboardList,
  FaHeart,
  FaStar,
  FaUsers,
  FaBox,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import UseAuth from "../../../Hooks/UseAuth";
import UseUserRole from "../../../Hooks/UseUserRole";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const COLORS = ["#22c55e", "#facc15", "#f97316", "#3b82f6", "#ef4444"];

const DashboardHome = () => {
  const { user } = UseAuth();
  const { role } = UseUserRole();
  const axiosSecure = UseAxiosSecure();

  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!role || !user?.email) return;

        // Common data (favorites + reviews)
        const [favRes, reviewRes] = await Promise.allSettled([
          axiosSecure.get(`/favorites/${user.email}`),
          axiosSecure.get(`/transactions/${user.email}`),
        ]);

        const favorites = favRes.status === "fulfilled" ? favRes.value.data || [] : [];
        const reviews = reviewRes.status === "fulfilled" ? reviewRes.value.data || [] : [];

        const favCount = favorites.length || 0;
        const reviewCount = reviews.length || 0;

        // --- ADMIN ---
        if (role === "admin") {
          const [donationsRes, requestsRes, usersRes] = await Promise.all([
            axiosSecure.get("/donations"),
            axiosSecure.get("/admin/requests"),
            axiosSecure.get("/users"),
          ]);

          const allUsers = usersRes.data || [];
          const donations = donationsRes.data || [];
          const requests = requestsRes.data || [];

          const totalCharities = allUsers.filter((u) => u.role === "charity").length;
          const totalRestaurants = allUsers.filter((u) => u.role === "restaurant").length;

          setStats([
            { label: "Total Donations", value: donations.length || 0, icon: <FaGift /> },
            { label: "Total Requests", value: requests.length || 0, icon: <FaClipboardList /> },
            { label: "Total Charities", value: totalCharities || 0, icon: <FaUsers /> },
            { label: "Total Restaurants", value: totalRestaurants || 0, icon: <FaBox /> },
            { label: "Favorites", value: favCount, icon: <FaHeart /> },
            { label: "Reviews", value: reviewCount, icon: <FaStar /> },
          ]);

          const completed = donations.filter((d) => d.status === "Completed").length;
          const pending = donations.filter((d) => d.status === "Pending").length;
          const verified = donations.filter((d) => d.status === "Verified").length;

          setChartData([
            { name: "Completed", value: completed || 0 },
            { name: "Verified", value: verified || 0 },
            { name: "Pending", value: pending || 0 },
          ]);

          setRecentActivity(requests.slice(0, 5));
        }

        // --- CHARITY ---
        if (role === "charity") {
          const [myReq, myPickups, myDonations] = await Promise.all([
            axiosSecure.get(`/requests/charity/${user.email}`),
            axiosSecure.get(`/charity/my-pickups/${user.email}`),
            axiosSecure.get(`/donations/charity/${user.email}`),
          ]);

          const reqData = myReq.data || [];
          const pickups = myPickups.data || [];
          const donations = myDonations.data || [];

          const completed = reqData.filter((r) => r.status === "Completed").length;
          const inProgress = reqData.filter((r) => r.status === "In Progress").length;
          const pending = reqData.filter((r) => r.status === "Pending").length;

          setStats([
            { label: "My Donations", value: donations.length || 0, icon: <FaGift /> },
            { label: "My Pickups", value: pickups.length || 0, icon: <FaClipboardList /> },
            { label: "My Requests", value: reqData.length || 0, icon: <FaUsers /> },
            { label: "Received Donations", value: donations.filter(d => d.status === "Completed").length || 0, icon: <FaHeart /> },
            { label: "Favorites", value: favCount, icon: <FaHeart /> },
            { label: "Reviews", value: reviewCount, icon: <FaStar /> },
          ]);

          setChartData([
            { name: "Completed", value: completed || 0 },
            { name: "In Progress", value: inProgress || 0 },
            { name: "Pending", value: pending || 0 },
          ]);

          setRecentActivity(reqData.slice(0, 5));
        }

        // --- RESTAURANT ---
        if (role === "restaurant") {
          const [donationsRes, requestsRes] = await Promise.all([
            axiosSecure.get(`/donations/restaurant/${user.email}`),
            axiosSecure.get(`/requests/restaurant/all`),
          ]);

          const donations = donationsRes.data || [];
          const completed = donations.filter((d) => d.status === "Completed").length;
          const pending = donations.filter((d) => d.status === "Pending").length;
          const verified = donations.filter((d) => d.status === "Verified").length;

          setStats([
            { label: "My Donations", value: donations.length || 0, icon: <FaGift /> },
            { label: "Requested Donations", value: requestsRes.data.length || 0, icon: <FaClipboardList /> },
            { label: "Favorites", value: favCount, icon: <FaHeart /> },
            { label: "Reviews", value: reviewCount, icon: <FaStar /> },
          ]);

          setChartData([
            { name: "Completed", value: completed || 0 },
            { name: "Verified", value: verified || 0 },
            { name: "Pending", value: pending || 0 },
          ]);

          setRecentActivity(requestsRes.data.slice(0, 5));
        }

        // --- USER ---
        if (role === "user") {
          const completed = reviews.filter((r) => r.status === "Completed").length;
          const inProgress = reviews.filter((r) => r.status === "In Progress").length;
          const pending = reviews.filter((r) => r.status === "Pending").length;

          setStats([
            { label: "My Favorites", value: favCount, icon: <FaHeart /> },
            { label: "My Reviews", value: reviewCount, icon: <FaStar /> },
          ]);

          setChartData([
            { name: "Completed", value: completed || 0 },
            { name: "In Progress", value: inProgress || 0 },
            { name: "Pending", value: pending || 0 },
          ]);

          setRecentActivity(reviews.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [role, user?.email, axiosSecure]);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {user?.displayName || "Guest"} 👋
        </h1>
        <p className="text-lg mt-2 text-gray-500">
          {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard Overview` : "Dashboard Overview"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              borderBlockWidth: 2,
              borderColor: "#2a9d8f",
              boxShadow: "0 15px 25px rgba(30, 64, 175, 0.3)",
            }}
            className="flex flex-col items-center p-6 border border-secondary rounded-2xl shadow-lg cursor-pointer transition-all duration-300 bg-white"
          >
            <div className="text-5xl text-primary mb-3">{card.icon}</div>
            <h3 className="text-lg font-medium text-gray-600">{card.label}</h3>
            <p className="text-3xl font-bold text-primary mt-2">{card.value || 0}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity + Works Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.length === 0 ? (
              <li className="text-gray-400">No recent activity</li>
            ) : (
              recentActivity.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">
                    {item.donationTitle || item.purpose || item.transactionId || "Activity"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt || item.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </motion.div>

        {/* Works Chart */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Works Overview</h2>
          <div className="relative w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, `${name}`]}
                  contentStyle={{ borderRadius: "8px", borderColor: "#f4a261" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {chartData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;

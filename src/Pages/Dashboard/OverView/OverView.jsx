import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseUserRole from "../../../Hooks/UseUserRole";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const PRIMARY_COLOR = "#f4a261"; // Updated primary (text)
const SECONDARY_COLOR = "#2a9d8f"; // Secondary (bar/pie fill)

const Overview = () => {
  const { user } = UseAuth();
  const { role } = UseUserRole();
  const axiosSecure = UseAxiosSecure();

  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        if (role === "restaurant") {
          const donationsRes = await axiosSecure.get(`/donations/restaurant/${user.email}`);
          const requestsRes = await axiosSecure.get(`/requests/restaurant/all`);

          const donationTypes = {};
          donationsRes.data.forEach(d => {
            donationTypes[d.type] = (donationTypes[d.type] || 0) + 1;
          });

          setChartData(
            Object.keys(donationTypes).map(key => ({
              name: key,
              value: donationTypes[key],
            }))
          );

          setPieData([
            { name: "Donations", value: donationsRes.data.length },
            { name: "Pending Requests", value: requestsRes.data.filter(r => r.status === "Pending").length },
          ]);

        } else if (role === "charity") {
          const requestsRes = await axiosSecure.get(`/requests/charity/${user.email}`);
          const pickupsRes = await axiosSecure.get(`/charity/my-pickups/${user.email}`);
          const receivedRes = await axiosSecure.get(`/charity/received-donations/${user.email}`);

          setChartData([
            { name: "Requests", value: requestsRes.data.length },
            { name: "Pickups", value: pickupsRes.data.length },
            { name: "Received Donations", value: receivedRes.data.length },
          ]);

          setPieData([
            { name: "Requests", value: requestsRes.data.length },
            { name: "Pickups", value: pickupsRes.data.length },
            { name: "Received Donations", value: receivedRes.data.length },
          ]);

        } else if (role === "user") {
          const favRes = await axiosSecure.get(`/favorites/${user.email}`);
          const txRes = await axiosSecure.get(`/transactions/${user.email}`);
          const reviewedRes = await axiosSecure.get(`/reviews/${user.email}`);

          setChartData([
            { name: "Favorites", value: favRes.data.length },
            { name: "Transactions", value: txRes.data.length },
            { name: "Reviews", value: reviewedRes.data.length },
          ]);

          setPieData([
            { name: "Favorites", value: favRes.data.length },
            { name: "Transactions", value: txRes.data.length },
            { name: "Reviews", value: reviewedRes.data.length },
          ]);

        } else if (role === "admin") {
          const donationsRes = await axiosSecure.get("/donations");
          const requestsRes = await axiosSecure.get("/admin/requests");
          const usersRes = await axiosSecure.get("/users");

          setChartData([
            { name: "Donations", value: donationsRes.data.length },
            { name: "Requests", value: requestsRes.data.length },
            { name: "Users", value: usersRes.data.length },
          ]);

          setPieData([
            { name: "Donations", value: donationsRes.data.length },
            { name: "Requests", value: requestsRes.data.length },
            { name: "Users", value: usersRes.data.length },
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOverview();
  }, [user.email, role, axiosSecure]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary dark:text-primary">Overview Dashboard</h1>

      {/* Bar Chart */}
      <div className="dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary">
          Activity Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={SECONDARY_COLOR} />
            <XAxis dataKey="name" stroke={PRIMARY_COLOR} />
            <YAxis stroke={PRIMARY_COLOR} />
            <Tooltip />
            <Legend formatter={(value) => <span style={{ color: PRIMARY_COLOR }}>{value}</span>} />
            <Bar dataKey="value" fill={SECONDARY_COLOR} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary">
          Proportion Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              stroke={PRIMARY_COLOR} // primary text color
              strokeWidth={2}
              label={({ name }) => <span style={{ fill: PRIMARY_COLOR }}>{name}</span>}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={SECONDARY_COLOR} />
              ))}
            </Pie>
            <Tooltip />
            <Legend formatter={(value) => <span style={{ color: PRIMARY_COLOR }}>{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;

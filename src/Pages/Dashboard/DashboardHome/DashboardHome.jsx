import { FaSmile, FaStar, FaRegChartBar } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";


const DashboardHome = () => {
  const { user } = UseAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Hello, {user?.displayName || "User"}!
      </h1>
      <p className="mb-8 text-gray-500">
        Welcome to your dashboard. Here’s a quick overview of your activity.
      </p>

    </div>
  );
};

export default DashboardHome;

import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          <li><Link to="/dashboard/profile">My Profile</Link></li>
          <li><Link to="/dashboard/request-charity">Request Charity Role</Link></li>
          <li><Link to="/dashboard/favorites">Favorites</Link></li>
          <li><Link to="/dashboard/reviews">My Reviews</Link></li>
          <li><Link to="/dashboard/transactions">Transaction History</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

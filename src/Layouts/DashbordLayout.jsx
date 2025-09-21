import React from "react";
import { NavLink, Outlet } from "react-router";
import UseAuth from "../Hooks/UseAuth";
const DashboardLayout = () => {
  const { user } = UseAuth();
  const NavLinkClass = ({ isActive }) =>
    `flex items-center text-lg font-semibold transition-colors ${
      isActive ? "text-primary" : "hover:text-primary"
    }`;

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar for small screens only */}
        <div className="navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2"></div>
        </div>

        {/* Page content */}
        <div className="p-4 flex-1">
          <Outlet />
          <h1></h1>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="menu w-64 bg-secondary min-h-screen p-4">
          {/* Logo */}

          {/* User info */}
          {user && (
            <div className="flex items-center mb-6">
              <img
                src={user.photoURL || "https://via.placeholder.com/50"}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>
          )}
          <>
            <li>
              <NavLink to="/" className={NavLinkClass}>
                Home
              </NavLink>
            </li>
          </>
          {/* <>
            <li>
              <NavLink  className={NavLinkClass}  to="/dashboard/profile">My Profile</NavLink>
            </li>
            <li>
              <NavLink className={NavLinkClass} to="/dashboard/request-charity">
                Request Charity Role
              </NavLink>
            </li>
            <li>
              <NavLink className={NavLinkClass} to="/dashboard/favorites">
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink className={NavLinkClass} to="/dashboard/reviews">
                My Reviews
              </NavLink>
            </li>
            <li>
              <NavLink className={NavLinkClass} to="/dashboard/transactions">
                Transaction History
              </NavLink>
            </li>
        
       
          </> */}
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

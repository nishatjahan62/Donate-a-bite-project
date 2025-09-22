import React from "react";
import { NavLink, Outlet } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import UserIcon from "../assets/userIcon.png";

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
        <aside className="menu w-64 bg-secondary min-h-screen ">
          {/* Logo */}

          {/* User info */}
          {user && (
            <div className=" flex justify-center items-center mb-3 mt-2">
              <img
                className="w-10 rounded-full m-2 "
                alt="user's photo"
                src={user?.photoURL || UserIcon}
                title={user && user.displayName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = UserIcon;
                }}
              />
              <div>
                <p className="font-semibold pt-2 text-lg">{user.displayName}</p>
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
          <>
            <li>
              <NavLink className={NavLinkClass} to="/dashboard/profile">
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={NavLinkClass}
                to="/dashboard/request-charity-role"
              >
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
              <NavLink
                className={NavLinkClass}
                to="/dashboard/transaction-history"
              >
                Transaction History
              </NavLink>
              <NavLink
                className={NavLinkClass}
                to="/dashboard/manage-users"
              >
                Manage Users{" "}
              </NavLink>
            </li>
          </>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

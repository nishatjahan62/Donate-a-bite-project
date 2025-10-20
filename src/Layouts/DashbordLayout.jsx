import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import Loading from "../Pages/Loading/Loading";
import UserIcon from "../assets/userIcon.png";
import UseUserRole from "../Hooks/UseUserRole";
import LightLogo from "../assets/LightLogo.png";
import DarkLogo from "../assets/DarkLogo.png";
import OnlyLogo from "../assets/onlyicon.png";

// 🎨 React Icons
import {
  FaHome,
  FaUser,
  FaHeart,
  FaStar,
  FaCreditCard,
  FaUtensils,
  FaPlusCircle,
  FaGift,
  FaClipboardList,
  FaHandsHelping,
  FaBox,
  FaUsers,
  FaShieldAlt,
  FaLayerGroup,
  FaRegStar,
  FaChartPie,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) return <Loading />;

  // Active/Inactive link styling
  const NavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-base font-semibold transition-colors px-3 py-3
     ${
       isActive
         ? "text-gray-900 bg-primary font-bold"
         : "text-gray-800 dark:text-gray-200 hover:text-primary hover:bg-transparent"
     }`;

  // Role-based profile icon + label
  const profileIcon =
    role === "restaurant" ? (
      <FaUtensils />
    ) : role === "charity" ? (
      <FaHandsHelping />
    ) : role === "admin" ? (
      <FaShieldAlt />
    ) : (
      <FaUser />
    );

  const profileLabel =
    role === "restaurant"
      ? "Restaurant Profile"
      : role === "charity"
      ? "Charity Profile"
      : role === "admin"
      ? "Admin Profile"
      : "My Profile";

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Fixed Dashboard Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-secondary px-4 py-3 flex justify-between items-center shadow-md">
          <Link to="/" className="flex items-center gap-2">
            <img src={OnlyLogo} alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-grey">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || UserIcon}
              alt={user?.displayName}
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <span className="text-grey font-medium">
              {user?.displayName?.split(" ")[0] || "User"}
            </span>
            <Link
              to="/logout"
              className="bg-primary text-white px-3 py-1 rounded hover:bg-white hover:text-primary transition"
            >
              Logout
            </Link>
          </div>
        </nav>

        {/* Spacer for fixed navbar */}
        <div className="h-16"></div>

        {/* Page content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="bg-primary dark:bg-secondary text-center p-3 text-white">
          &copy; {new Date().getFullYear()} DonateA. All rights reserved.
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="menu w-64 bg-secondary min-h-screen p-2">
          {/* User & Logo Section */}
          {user && (
            <div className="flex flex-col items-center p-4 ">
              {/* Logo */}
              <Link to={"/"}>
                <div className="flex justify-center mt-14 my-4">
                  <img
                    src={LightLogo}
                    alt="Light Logo"
                    className=" lg:block dark:hidden w-32"
                  />
                  <img
                    src={DarkLogo}
                    alt="Dark Logo"
                    className="hidden lg:dark:block w-32"
                  />
                </div>
              </Link>

              {/* User Info */}
              <div className="flex items-center gap-3 p-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    className="w-full h-full rounded-full object-cover border-2 border-primary shadow-2xl"
                    alt={user?.displayName || "User"}
                    src={user?.photoURL || UserIcon}
                    title={user?.displayName}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = UserIcon;
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    {user.displayName?.split(" ")[0] || ""}
                  </h2>
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    {role
                      ? role.charAt(0).toUpperCase() + role.slice(1)
                      : "User"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Common Link */}
          <li>
            <NavLink to="/" className={NavLinkClass}>
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/over-view" className={NavLinkClass}>
              <FaChartPie /> Overview
            </NavLink>
          </li>

          {/* Universal Profile Link */}
          <li>
            <NavLink to="/dashboard/profile" className={NavLinkClass}>
              {profileIcon} {profileLabel}
            </NavLink>
          </li>

          {/* Role-Specific Links */}
          {role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/request-charity-role"
                  className={NavLinkClass}
                >
                  <FaHandsHelping /> Request Charity Role
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/favorites" className={NavLinkClass}>
                  <FaHeart /> Favorites
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews" className={NavLinkClass}>
                  <FaStar /> My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/user-transaction-history"
                  className={NavLinkClass}
                >
                  <FaCreditCard /> Transaction History
                </NavLink>
              </li>
            </>
          )}

          {role === "restaurant" && (
            <>
              <li>
                <NavLink to="/dashboard/add-donations" className={NavLinkClass}>
                  <FaPlusCircle /> Add Donation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donations" className={NavLinkClass}>
                  <FaGift /> My Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/requested-donations"
                  className={NavLinkClass}
                >
                  <FaClipboardList /> Requested Donations
                </NavLink>
              </li>
            </>
          )}

          {role === "charity" && (
            <>
              <li>
                <NavLink to="/dashboard/my-requests" className={NavLinkClass}>
                  <FaClipboardList /> My Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-pickups" className={NavLinkClass}>
                  <FaBox /> My Pickups
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/received-donations"
                  className={NavLinkClass}
                >
                  <FaGift /> Received Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/charity-transaction-history"
                  className={NavLinkClass}
                >
                  <FaCreditCard /> Transaction History
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-donations"
                  className={NavLinkClass}
                >
                  <FaGift /> Manage Donations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users" className={NavLinkClass}>
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-role-requests"
                  className={NavLinkClass}
                >
                  <FaLayerGroup /> Manage Role Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-requests"
                  className={NavLinkClass}
                >
                  <FaClipboardList /> Manage Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/feature-donations"
                  className={NavLinkClass}
                >
                  <FaRegStar /> Feature Donations
                </NavLink>
              </li>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

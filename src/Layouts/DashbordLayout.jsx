import React from "react";
import { NavLink, Outlet } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import Loading from "../Pages/Loading/Loading";
import UserIcon from "../assets/userIcon.png";
import UseUserRole from "../Hooks/UseUserRole";

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
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) return <Loading />;

  // Active/Inactive link styling
  const NavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-lg font-semibold transition-colors rounded-lg px-3 py-2
     ${isActive ? "text-primary font-bold bg-gray-200 dark:bg-gray-800" : "hover:text-primary"}`;

  // Role-based profile icon + label
  const profileIcon =
    role === "restaurant"
      ? <FaUtensils />
      : role === "charity"
      ? <FaHandsHelping />
      : role === "admin"
      ? <FaShieldAlt />
      : <FaUser />;

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
        {/* Top Navbar for small screens */}
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
        </div>

        {/* Page content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="menu w-64 bg-secondary min-h-screen p-2">
          {/* User info */}
          {user && (
            <div className="flex justify-center items-center mb-3 mt-2">
              <img
                className="w-10 rounded-full m-2"
                alt="user"
                src={user?.photoURL || UserIcon}
                title={user?.displayName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = UserIcon;
                }}
              />
              <p className="font-semibold text-lg">{user.displayName}</p>
            </div>
          )}

          {/* Common Link */}
          <li>
            <NavLink to="/" className={NavLinkClass}>
              <FaHome /> Home
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
                  to="/dashboard/transaction-history"
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
                  to="/dashboard/transaction-history"
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

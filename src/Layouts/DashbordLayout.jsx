import React, { useEffect, useState } from "react";
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
import Button from "../Pages/Shared/Button/Button";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logOut } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  // logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "info",
          draggable: true,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-button",
          },
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

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

      <div className="drawer-content flex flex-col min-h-screen">
        <nav className="fixed top-0 left-0 w-full z-50 bg-secondary px-4 py-3 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <label htmlFor="dashboard-drawer" className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            {/* Logo and title */}
            <Link to="/" className="flex items-center gap-2">
              <img src={OnlyLogo} alt="Logo" className="w-8 h-8" />
            </Link>
            <span className="font-bold text-base lg:text-lg text-grey">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="px-2">
              <label className="swap swap-rotate cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                  checked={theme === "dark"}
                />
                {/* Moon icon */}
                <svg
                  className="swap-on h-8 w-8 fill-current text-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                </svg>
                {/* Sun icon */}
                <svg
                  className="swap-off h-8 w-8 fill-current text-[#FFD700] drop-shadow-[0_0_6px_#FFD700]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Z" />
                </svg>
              </label>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center">
                  <h3 className="pr-2 font-semibold text-base text-grey dark:text-gray-200">
                    Hello
                  </h3>
                  <p className="font-semibold text-lg text-green-800 dark:text-green-400">
                    {user.displayName?.split(" ")[0] || ""}
                  </p>
                  <div className="w-10 rounded-full mx-2 cursor-pointer">
                    <img
                      className="w-10 rounded-full"
                      alt="user's photo"
                      src={user?.photoURL || UserIcon}
                      title={user.displayName}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = UserIcon;
                      }}
                    />
                  </div>
                </div>
                <Button onClick={handleLogOut} label="Logout">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth/Login">
                <Button label="Sign In" />
              </Link>
            )}
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

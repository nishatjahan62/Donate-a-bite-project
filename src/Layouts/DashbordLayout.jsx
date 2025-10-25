import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router"; // Use 'react-router-dom' for modern React Router
import UseAuth from "../Hooks/UseAuth";
import Loading from "../Pages/Loading/Loading";
import UseUserRole from "../Hooks/UseUserRole";
import Button from "../Pages/Shared/Button/Button";
import Swal from "sweetalert2";

// 🎨 Assets (make sure these paths are correct)
import UserIcon from "../assets/userIcon.png";
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
  FaMoon, // Added for explicit moon/sun icons
  FaSun,
  FaBars, // Added for hamburger menu
} from "react-icons/fa";

// Component to represent a navigation section title
const NavSectionTitle = ({ children }) => (
  <li className="menu-title mt-4 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
    {children}
  </li>
);

// ---

const DashboardLayout = () => {
  const { user, logOut } = UseAuth();
  const { role, roleLoading } = UseUserRole();

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

  // logout logic (kept simple, removed toast for brevity but can be re-added)
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
        console.error("Logout Error:", error);
      });
  };

  if (roleLoading) return <Loading />;

  // Active/Inactive link styling - UPGRADED for better visual distinction and hover effect
  const NavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 text-sm font-medium rounded-lg transition-all duration-200 p-3 mx-2
    ${
      isActive
        ? "bg-primary text-white shadow-md transform scale-[1.02] " // Strong active state
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary"
    }`;

  // Role-based profile icon + label (kept the original logic)
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

  // --- Layout Structure ---
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area (Navbar + Pages + Footer) */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* Fixed Navbar (Top Bar) */}
        <nav className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800 px-4 py-3 flex justify-between items-center shadow-lg border-b border-gray-200 dark:border-gray-700 rounded-2xl">
          
          <div className="flex items-center gap-4">
            {/* Hamburger Button for mobile sidebar */}
            <label htmlFor="dashboard-drawer" className="lg:hidden text-gray-700 dark:text-gray-300 cursor-pointer">
              <FaBars className="w-6 h-6" />
            </label>

            {/* Logo and title */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={OnlyLogo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">
                Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 ">
            {/* Theme Toggle - Simpler/Cleaner DaisyUI style */}
            <label className="swap swap-rotate text-2xl text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                onChange={(e) =>
                  setTheme(e.target.checked ? "dark" : "light")
                }
                checked={theme === "dark"}
              />
              <FaMoon className="swap-on fill-current text-indigo-400" />
              <FaSun className="swap-off fill-current text-yellow-500" />
            </label>

            {/* User Dropdown/Profile Info */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                  <div className="w-10 rounded-full">
                    <img
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
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-700 rounded-2xl w-52 border border-gray-100 dark:border-gray-600">
                  <li className="menu-title text-sm font-bold text-gray-800 dark:text-gray-100 p-2">
                    {user.displayName?.split(" ")[0] || "User"}
                  </li>
                  <li className="text-gray-600 dark:text-gray-300 p-2">
                    Role: <span className="font-semibold text-primary">{role?.charAt(0).toUpperCase() + role.slice(1) || 'N/A'}</span>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <Link to="/dashboard/profile" className="justify-between text-gray-700 dark:text-gray-200">
                      Profile
                      <span className="badge badge-sm badge-outline dark:text-primary dark:border-primary">New</span>
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogOut} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/auth/Login">
                <Button label="Sign In">Sign In</Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-6"> 
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white/90 dark:bg-gray-800 text-center p-3 text-gray-600 dark:text-gray-400 border-t rounded-2xl border-gray-200 dark:border-gray-700">
          &copy; {new Date().getFullYear()} DonateA. All rights reserved.
        </footer>
      </div>

      {/* Sidebar (Drawer) */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="menu w-64 min-h-full bg-white dark:bg-gray-800 p-0 shadow-2xl border-r border-gray-100 dark:border-gray-700">
          
          {/* Logo Section - TOP of sidebar */}
          <Link to={"/"} className="flex items-center justify-center py-6 border-b border-gray-100 dark:border-gray-700">
            <img
              src={theme === 'light' ? LightLogo : DarkLogo} // Conditional logo based on theme
              alt="Logo"
              className="w-32 h-auto"
            />
          </Link>

          {/* User Info - Immediately after logo */}
          {user && (
            <div className="flex flex-col items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full border-4 border-primary shadow-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt={user?.displayName || "User"}
                  src={user?.photoURL || UserIcon}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = UserIcon;
                  }}
                />
              </div>
              <h2 className="font-bold text-xl mt-3 text-gray-900 dark:text-gray-100">
                {user.displayName || "Welcome"}
              </h2>
              <span className="text-sm font-semibold text-primary dark:text-primary-focus capitalize mt-1 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
                {role || "User"}
              </span>
            </div>
          )}

          {/* Navigation Links - Organized into groups */}
          <ul className="py-4 space-y-1">
            
            {/* General Links */}
            <NavSectionTitle>General</NavSectionTitle>
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
            <li>
              <NavLink to="/dashboard/profile" className={NavLinkClass}>
                {profileIcon} {profileLabel}
              </NavLink>
            </li>

            {/* Role-Specific Links */}
            {role === "user" && (
              <>
                <NavSectionTitle>My Activities</NavSectionTitle>
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
                  <NavLink to="/dashboard/user-transaction-history" className={NavLinkClass}>
                    <FaCreditCard /> Transaction History
                  </NavLink>
                </li>
                <NavSectionTitle>Roles</NavSectionTitle>
                <li>
                  <NavLink to="/dashboard/request-charity-role" className={NavLinkClass}>
                    <FaHandsHelping /> Request Charity Role
                  </NavLink>
                </li>
              </>
            )}

            {role === "restaurant" && (
              <>
                <NavSectionTitle>Donations</NavSectionTitle>
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
                  <NavLink to="/dashboard/requested-donations" className={NavLinkClass}>
                    <FaClipboardList /> Requested Donations
                  </NavLink>
                </li>
              </>
            )}

            {role === "charity" && (
              <>
                <NavSectionTitle>Requests & Pickups</NavSectionTitle>
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
                  <NavLink to="/dashboard/received-donations" className={NavLinkClass}>
                    <FaGift /> Received Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/charity-transaction-history" className={NavLinkClass}>
                    <FaCreditCard /> Transaction History
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <NavSectionTitle>Admin Management</NavSectionTitle>
                <li>
                  <NavLink to="/dashboard/manage-donations" className={NavLinkClass}>
                    <FaGift /> Manage Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-requests" className={NavLinkClass}>
                    <FaClipboardList /> Manage Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users" className={NavLinkClass}>
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-role-requests" className={NavLinkClass}>
                    <FaLayerGroup /> Manage Role Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/feature-donations" className={NavLinkClass}>
                    <FaRegStar /> Feature Donations
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
import React, { useEffect, useState } from "react";
import { Link, Links, NavLink } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import LightLogo from "../../../assets/LightLogo.png";
import DarkLogo from "../../../assets/DarkLogo.png";
import OnlyLogo from "../../../assets/onlyicon.png";
import UserIcon from "../../../assets/userIcon.png";

const Navbar = () => {
  const { user, logOut } = UseAuth();

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

  const handleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // NavLink with dark mode support
  const NavLinkClass = ({ isActive }) =>
    `px-2 py-1 rounded text-lg ${
      isActive
        ? "font-extrabold border-b-2 text-secondary dark:text-primary"
        : "font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-secondary-light"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={NavLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className={NavLinkClass}>
          About Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={NavLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to="/all-donations" className={NavLinkClass}>
            All Donations
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-[#F8F8F8] dark:bg-[#1E2939] shadow-sm lg:px-20 font-poppins px-8 text-gray-800 dark:text-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow text-gray-800 dark:text-gray-200">
            {navItems}
          </ul>
        </div>

          <Link to={'/'}><div className="flex justify-center mb-4">
                <img
                  src={LightLogo}
                  alt="Light Logo"
                  className="hidden lg:block dark:hidden w-32"
                />
                <img
                  src={DarkLogo}
                  alt="Dark Logo"
                  className="hidden lg:dark:block w-32"
                />
                <img
                  src={OnlyLogo}
                  alt="Small Screen Logo"
                  className="block lg:hidden w-12"
                />
              </div></Link>


      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <div onClick={handleTheme} className="px-2">
          <label className="swap swap-rotate cursor-pointer">
            <input type="checkbox" checked={theme === "dark"} readOnly />
            <svg
              className="swap-on h-8 w-8 fill-current text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
            <svg
              className="swap-off h-8 w-8 fill-current text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center">
              <h3 className="pr-2 font-semibold text-base text-gray-800 dark:text-gray-200">
                Hello
              </h3>
              <p className="font-semibold text-lg text-green-800 dark:text-green-400">
                {(user.displayName?.split(" ")[0]) || ""}
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
            <Button onClick={handleLogOut} label="Sign Out" />
          </div>
        ) : (
          <Link to="/auth/Login">
            <Button label="Sign In" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

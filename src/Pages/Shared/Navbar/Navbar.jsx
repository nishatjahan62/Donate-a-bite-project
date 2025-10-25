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
import { FaMoon, FaSun } from "react-icons/fa";

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

  // NavLink with dark mode support
  const NavLinkClass = ({ isActive }) =>
    `px-2 py-1 rounded text-base ${
      isActive
        ? "font-bold border-b-4 border-primary text-grey"
        : "font-medium text-grey dark:text-gray-200 hover:text-primary dark:hover:text-secondary-light"
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
      <li>
        <NavLink to="/all-donations" className={NavLinkClass}>
          All Donations
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
        <li tabIndex={0} className="dropdown dropdown-hover">
          <span className="px-2 py-1 rounded text-base font-medium text-grey dark:text-gray-200 hover:text-primary dark:hover:text-secondary-light flex items-center gap-1">
            Donations
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <NavLink to="/donations/verified" className={NavLinkClass}>
                Verified Donations
              </NavLink>
            </li>
            <li>
              <NavLink to="/donations/pending" className={NavLinkClass}>
                Pending Donations
              </NavLink>
            </li>
          </ul>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar fixed top-0 z-5 left-0 w-full bg-secondary/80 dark:bg-[#1E2939]/90 shadow-sm lg:px-20 font-poppins px-8 text-gray-800 dark:text-gray-200 backdrop-blur-md ">
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

        <Link to={"/"}>
          <div className="flex justify-center items-center mb-4">
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
              className=" lg:hidden w-12 items-center pt-2"
            />
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <div className="px-1">
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />
            {/* Moon icon */}
            <FaMoon className="swap-on sm:text-lg fill-current text-indigo-400" />
            <FaSun className="swap-off  sm:text-lg  fill-current text-yellow-400" />
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
             <Link to="/dashboard/profile"> <div className="w-10 rounded-full mx-2 cursor-pointer">
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
              </div></Link>
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
    </div>
  );
};

export default Navbar;

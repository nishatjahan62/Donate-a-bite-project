import React from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = UseAuth();

  // logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged Out. ",
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
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " border-b-3 pb-1 font-extrabold text-lg text-secondary"
              : "font-medium  text-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? " border-b-3 pb-1 font-extrabold text-lg text-secondary"
              : "font-medium  text-lg"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#f9c9a5] shadow-sm  px-20 font-poppins">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-">
            <div className="hidden lg:flex items-center">
              <h3 className="pr-2 font-semibold text-base ">Hello</h3>
              <p className="font-semibold text-green-800 text-lg ">
                {(user && user.displayName?.split(" ")[0]) || ""}
              </p>
               <div className="w-10 mx-2 rounded-full cursor-pointer">
                    <img
                      alt="user's photo"
                      src={`${user ? user.photoURL : "/userIcon"}`}
                      title={user && user.displayName}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/userIcon.png";
                      }}
                    />
                  </div>
            </div>
            <button
              onClick={handleLogOut}
              className="cursor-pointer rounded-md px-5 py-2.5 overflow-hidden group bg-primary relative text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-bold ">Sign Out </span>
            </button>
          </div>
        ) : (
          <Link to="auth/Login">
            <button className="cursor-pointer rounded-md px-5 py-2.5 overflow-hidden group bg-primary relative text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-bold ">Sign In </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

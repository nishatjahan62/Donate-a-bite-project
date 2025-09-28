import React from "react";
import { Link } from "react-router";
import ErrorImg from "../../../src/assets/Banners/ErrorImg.png"; // adjust the path if needed
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 text-center px-4">
      <img
        src={ErrorImg}
        alt="Error"
        className="w-64 md:w-96 mb-6 animate-bounce"
      />
      <h1 className="text-5xl md:text-6xl font-bold text-red-800 mb-4">
        Oops!
      </h1>
      <p className="text-lg md:text-xl text-red-700 mb-8">
        Something went wrong. The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
      >
        <FaHome /> Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

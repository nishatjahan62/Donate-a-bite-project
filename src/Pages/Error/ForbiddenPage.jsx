import React from "react";
import { AiFillLock } from "react-icons/ai";
import Button from "../Shared/Button/Button";
import { Link } from "react-router";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <div className="bg-red-100 p-8 rounded-full shadow-md mb-6">
        <AiFillLock className="text-red-500" size={80} />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Access Forbidden
      </h1>
      <p className="text-lg text-gray-600 max-w-md mb-6">
        You don’t have permission to view this page. Please contact an
        administrator if you think this is a mistake.
      </p>
      <Link to={'/'}>
        <Button label="  Go Back Home" className=""></Button>
      </Link>{" "}
    </div>
  );
};

export default ForbiddenPage;

import React, { useRef } from "react";
import { Link } from "react-router";
import ForgetPass from "../../../assets/Forgot password.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const emailRef = useRef();
  const handleForgetPassword = (e) => {
     e.preventDefault();
    const email = emailRef.current.value;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("A new Password has been sent in your email.", {});
      })
      .catch((error) => {
       toast.error(error.message || "something went wrong")
      });
  };
  return (
    <div className="w-full min-h-screen bg-base-200 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-none h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md ">
            <h2 className="text-3xl font-bold text-gray-800 ">
              Forget Password?
            </h2>
            <p className="py-1 mb-6 text-lg">
              Enter your email address and we’ll send you a reset link.
            </p>
            <form className="space-y-4">
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="your email"
                  required
                  ref={emailRef}
                />
              </div>

              <button
                type="submit"
                onClick={handleForgetPassword}
                className="cursor-pointer rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
              >
                <span className="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative text-black">Send</span>
              </button>
              <p className="text-sm text-center text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/auth/login"
                  className="text-teal-600 hover:underline font-bold"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-10">
          <div>
            <img
              src={ForgetPass}
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

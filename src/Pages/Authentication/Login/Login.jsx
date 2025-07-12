import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import SignIn from "../../../assets/Login.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [authError, setAuthError] = useState("");
  const { signIn } = UseAuth();
  const onsubmit = (data) => {
    const { email, password } = data;

    setAuthError("");

    signIn(email, password)
      .then((result) => {
        result.user;

        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully logged in. ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((error) => {
        console.error(error.code);
      });
  };
  return (
    <div className="w-full min-h-screen bg-base-200 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-none h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md ">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome Back
            </h2>
            <p className="py-1 text-lg">Register with Profast</p>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <button
                type="submit"
                class=" cursor-pointer rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
              >
                <span class="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative text-black">Sign In</span>
              </button>

              <p className="hover:underline">
                {" "}
                <Link to="/auth/forget-password">Forget Password?</Link>
              </p>
              <p className="text-sm text-center text-gray-600">
                Don’t have an account?
                <Link
                  to="/auth/register"
                  className="text-teal-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
              <div className="w-full text-center">
                <p>OR</p>

                <GoogleLogin></GoogleLogin>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-10">
          <div>
            <img
              src={SignIn}
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

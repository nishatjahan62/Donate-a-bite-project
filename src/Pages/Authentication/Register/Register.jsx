import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import SingUp from "../../../assets/Sign up.png";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUser, setUser, user } = UseAuth();
  const onsubmit = (data) => {
    const { email, password, photo, name } = data;
    createUser(email, password)
      .then((res) => {
        res.user;
        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Created Account",
          text: "Your account has been registered successfully. ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="w-full min-h-screen bg-base-200 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-none h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <div className="w-full mx-w-md">
            <h2 className="text-3xl font-bold text-gray-800 ">
              Create an account
            </h2>
            <p className="py-1 mb-6 text-lg">Register with Profast</p>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-600">
                  name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "name is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="your name"
                />
                {errors.email && <p role="alert">{errors.email.message}</p>}
                {errors.email?.type === "required" && (
                  <p role="alert">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="you@example.com"
                  required
                />
                {errors.email && <p role="alert">{errors.email.message}</p>}
                {errors.email?.type === "required" && (
                  <p role="alert">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("photo")}
                  placeholder="Photo URL"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  {...register("password", {
                    maxLength: {
                      value: 6,
                      message: "Password must be less than 6 characters",
                    },
                    validate: {
                      noUpperCase: (value) =>
                        !/[A-Z]/.test(value) ||
                        "Password must not contain capital letters",
                      noSpecialChar: (value) =>
                        !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "Password must not contain special characters",
                    },
                  })}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter your password"
                />

                {errors.password && (
                  <p role="alert" className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                class="cursor-pointer rounded w-full py-2.5 overflow-hidden group bg-primary relative  hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
              >
                <span class="absolute right-0  -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative text-black">Sign up</span>
              </button>

              <p className="text-sm text-center text-gray-600">
                already have an account?
                <Link
                  to="/auth/login"
                  className="text-teal-600 hover:underline font-bold"
                >
                  Sign In here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-10">
          <div>
            <img
              src={SingUp}
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

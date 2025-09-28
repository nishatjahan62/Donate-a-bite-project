import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import SingUp from "../../../assets/Sign up.png";
import useAxios from "../../../Hooks/UseAxios";
import axios from "axios";
import { motion } from "framer-motion";
import LightLogo from "../../../assets/LightLogo.png";
import DarkLogo from "../../../assets/DarkLogo.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, setUser, updateUser } = UseAuth();
  const [image, setImage] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosInstance = useAxios();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onsubmit = async (data) => {
    const { name, email, password } = data;
    let uploadedImageURL = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      try {
        const imageKey = import.meta.env.VITE_ImageBB_api_key;
        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;
        const res = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) uploadedImageURL = res.data.data.url;
      } catch (err) {
        console.log("Image upload failed:", err);
        Swal.fire({ icon: "error", title: "Image Upload Failed" });
        return;
      }
    }

    try {
      const res = await createUser(email, password);
      const user = res.user;
      await updateUser({ displayName: name, photoURL: uploadedImageURL });
      setUser({ ...user, displayName: name, photoURL: uploadedImageURL });

      const userData = { name, email, role: "user", photoURL: uploadedImageURL };
      await axiosInstance.post("/users", userData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigation(from);
    } catch (err) {
      console.log("Registration failed:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row w-full max-w-none h-full">
        {/* Form container */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-10"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full mx-w-md">
            <Link to={"/"}>
                <div className="flex justify-start mb-4">
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
            <h2 className="text-3xl font-bold text-primary">
              Create an account
            </h2>
            <p className="py-1 mb-6 text-lg text-gray-600 dark:text-gray-300">
              Register with <span className="poppins text-primary">"Donate-a-bite"</span>
            </p>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-1 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: { value: 6, message: "Password must be less than 6 characters" },
                    validate: {
                      noUpperCase: (value) =>
                        !/[A-Z]/.test(value) || "Password must not contain capital letters",
                      noSpecialChar: (value) =>
                        !/[!@#$%^&*(),.?\":{}|<>]/.test(value) ||
                        "Password must not contain special characters",
                    },
                  })}
                  className="w-full px-4 py-2 mt-1 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer rounded w-full py-2.5 overflow-hidden group bg-primary relative hover:to-secondary text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300"
              >
                <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative text-black dark:text-white">Sign up</span>
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-teal-600 hover:underline font-bold">
                  Sign In here
                </Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Image container */}
        <motion.div
          className="w-full lg:w-1/2 bg-[#FAFDF0] dark:bg-gray-800 flex items-center justify-center p-10 transition-colors duration-300"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img src={SingUp} alt="" className="max-w-full h-auto object-contain" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;

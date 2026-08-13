import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import SignIn from "../../../assets/Login.png";
import { motion } from "framer-motion";
import LightLogo from "../../../assets/LightLogo.png";
import DarkLogo from "../../../assets/DarkLogo.png";
import UseUserRole from "../../../Hooks/UseUserRole";
import Button from "../../Shared/Button/Button";

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
  const {role}=UseUserRole()

  const onsubmit = (data) => {
    const { email, password } = data;
    setAuthError("");

    signIn(email, password)
      .then((res) => {
        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully logged in.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch(() => {
        setAuthError("Login failed. Please check your credentials.");
      });

  };

      // Login according to Roles:
      const demoAccounts={
        admin :{
          email:"admin@gmail.com",
          pass:"admin1"
        },
        charity :{
          email:"charity@gmail.com",
          pass:"charity"
        },
        restaurant :{
          email:"restaurant@gmail.com",
          pass:"restaurant"
        },
        user :{
          email:"user@gmail.com",
          pass:"user0101"
        }
      }

  // handle the demo logins 
      const handleDemoLogin =(role)=>{
        const account = demoAccounts[role];
        setAuthError("")
        signIn(account.email, account.pass)
        .then(()=>{
          Swal.fire({
          title: "Login Successful!",
          text: `You have successfully logged in as ${role}.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
        })
        .catch(()=>{
          setAuthError("Login failed")
        })
      }

  return (
    <motion.div
      className="w-full min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row w-full max-w-none h-full">
        {/* Form container */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-10"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full max-w-md">
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

            <h2 className="text-3xl font-bold text-primary mb-3">
              Welcome Back
            </h2>
            <p className=" text-lg text-gray-700 dark:text-gray-300">
              Login with{" "}
              <span className="poppins text-primary">"Donate-a-bite"</span>
            </p>
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-2.5">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 mt-1 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-2 mt-1 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && <p className="text-red-500 text-sm">{authError}</p>}

              <Button
                type="submit"
                 label="Sign In"
                className="cursor-pointer rounded w-full "
              >
              </Button>
              <p className="hover:underline dark:text-white text-sm">
                <Link to="/auth/forget-password">Forget Password?</Link>
              </p>
                 <h2 className="text-primary text-xl pb-1 text-center font-semibold">Role wise Login</h2>
             <div className="flex flex-col lg:flex-row  justify-center items-center  space-y-1 lg:space-y-0 lg:space-x-2">
  <Button type="button" label="Admin" size="md" onClick={()=> handleDemoLogin("admin")} />
  <Button type="button" label="Charity" size="md" onClick={()=> handleDemoLogin("charity")}   />
  <Button type="button" label="Restaurant" size="md" onClick={()=> handleDemoLogin("restaurant")} />
      <Button type="button" label="User" size="md" onClick={()=> handleDemoLogin("user")} />
</div>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-teal-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>

            <div className="w-full text-center pt-1">
              <p className="text-gray-600 dark:text-gray-400 pb-2">OR</p>
              <GoogleLogin />
            </div>
          </div>
        </motion.div>

        {/* Image container */}
        <motion.div
          className="w-full lg:w-1/2 bg-[#FAFDF0] dark:bg-gray-800 flex items-center justify-center p-10"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={SignIn}
            alt="Login illustration"
            className="max-w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;

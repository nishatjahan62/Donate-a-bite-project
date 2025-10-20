import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:mx-10 mx-4 sm:mx-7 ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;

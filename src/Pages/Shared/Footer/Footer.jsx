import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import LightLogo from "../../../assets/LightLogo.png";
import DarkLogo from "../../../assets/DarkLogo.png";
import OnlyLogo from "../../../assets/onlyicon.png";

const Footer = () => {
  return (
    <div>
      <footer
        className=" 
            lg:footer-horizontal mt-10 md:mt-15 lg:mt-20  p-5 pt-5 md:px-10 lg:px-20 font-nunito bg-[#F8F8F8] nunito"
      >
        <div
          className="flex lg:flex-row flex-col lg:items-center justify-around lg:gap-10 p-2
         pt-5"
        >
          <div className="">
            <ul className="space-y-1.5">
              <li>
                {" "}
                <img
                  src={LightLogo}
                  alt="Light Logo"
                  className="hidden lg:block dark:hidden w-35"
                />
                <img
                  src={DarkLogo}
                  alt="Dark Logo"
                  className="hidden lg:dark:block  w-35"
                />
                <img
                  src={OnlyLogo}
                  alt="Small Screen Logo"
                  className="block lg:hidden w-10"
                />
              </li>
              <li className="link link-hover font-semibold ">
                <Link to="/about-us">About us</Link>
              </li>
               <li className="link link-hover font-semibold ">
                <Link to="/all-donations">All Donations</Link>
              </li>
            </ul>
          </div>
          <ul className="space-y-1.5">
            {" "}
            <li>
              {" "}
              <h6 className="font-bold text-xl poppins">Terms</h6>
            </li>
            <div className="border-b-2 border-green-500 w-20 "></div>
            <li>
              {" "}
              <a className="link link-hover font-semibold">Terms of service</a>
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">
                Privacy policy
              </a>{" "}
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">Cookie policy</a>
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">
                Refund policy
              </a>{" "}
            </li>
          </ul>
          <ul className="space-y-1.5">
            {" "}
            <li>
              {" "}
              <h6 className="font-bold text-xl poppins">Help</h6>
            </li>
            <div className="border-b-2 border-green-500 w-15 "></div>
            <li>
              {" "}
              <a className="link link-hover font-semibold ">Support Section</a>
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">FAQ</a>{" "}
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">Report</a>
            </li>
            <li>
              {" "}
              <a className="link link-hover font-semibold">Contact</a>{" "}
            </li>
          </ul>
          <ul className="space-y-1.5">
            {" "}
            <li>
              {" "}
              <h6 className="font-bold text-xl poppins">Follow Us</h6>
              <div className="border-b-2 border-green-500 w-25 "></div>
            </li>
            <li className="text-2xl">
              <a href="http://www.facebook.com " target="_blank">
                <FaFacebook />
              </a>
            </li>
            <li className="text-2xl">
              <a href="http://www.linkdin.com">
                <FaLinkedin />
              </a>
            </li>
            <li className="text-2xl">
              <a href="http://www.twitter.com">
                <FaXTwitter />
              </a>
            </li>
            <li className="text-2xl">
              {" "}
              <a href="http://www.github.com">
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:text-center pt-3">
          <aside>
            <span className="text-xl">#</span> Copyright ©{" "}
            {new Date().getFullYear()} - All right reserved by GroveGardener Ltd
          </aside>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

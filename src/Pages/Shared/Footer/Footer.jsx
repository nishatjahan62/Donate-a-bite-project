import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import LightLogo from "../../../assets/LightLogo.png";
import DarkLogo from "../../../assets/DarkLogo.png";
import OnlyLogo from "../../../assets/onlyicon.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-nunito mt-10 md:mt-15 lg:mt-20 p-5 md:px-10 lg:px-20">
      <div className="flex lg:flex-row flex-col lg:items-start justify-around lg:gap-10 p-2 pt-5">
        {/* Logo + Links */}
        <div>
          <Link to="/">
            <div className="mb-4">
              <img
                src={LightLogo}
                alt="Light Logo"
                className="hidden lg:block dark:hidden w-36"
              />
              <img
                src={DarkLogo}
                alt="Dark Logo"
                className="hidden lg:dark:block w-36"
              />
              <img src={OnlyLogo} alt="Small Screen Logo" className="block lg:hidden w-10" />
            </div>
          </Link>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us" className="hover:text-secondary transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/all-donations" className="hover:text0secondary transition">
                All Donations
              </Link>
            </li>
          </ul>
        </div>

        {/* Terms Section */}
        <div className="space-y-2">
          <h6 className="text-xl font-bold poppins hover:text-primary transition">Terms</h6>
          <motion.div
            className="border-b-4 border-green-500 mb-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          />
          <ul className="space-y-1">
            <li>
              <a className="hover:text-secondary transition">Terms of Service</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">Cookie Policy</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">Refund Policy</a>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="space-y-2">
          <h6 className="text-xl font-bold poppins hover:text-primary transition">Help</h6>
          <motion.div
            className="border-b-4 border-green-500 mb-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          />
          <ul className="space-y-1">
            <li>
              <a className="hover:text-secondary transition">Support Section</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">FAQ</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">Report</a>
            </li>
            <li>
              <a className="hover:text-secondary transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="space-y-2">
          <h6 className="text-xl font-bold poppins hover:text-primary transition">Follow Us</h6>
          <motion.div
            className="border-b-4 border-green-500 mb-2"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          />
          <div className="flex gap-3 text-2xl">
            <a
              href="http://www.facebook.com"
              target="_blank"
              className="hover:text-blue-600 transition transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="http://www.linkedin.com"
              target="_blank"
              className="hover:text-blue-500 transition transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="http://www.twitter.com"
              target="_blank"
              className="hover:text-sky-400 transition transform hover:scale-110"
            >
              <FaXTwitter />
            </a>
            <a
              href="http://www.github.com"
              target="_blank"
              className="hover:text-gray-500 transition transform hover:scale-110"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-600 mt-8 w-full"></div>

      {/* Copyright */}
      <div className="text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} - All rights reserved by{" "}
        <span className="text-[--color-secondary] font-semibold">GroveGardener Ltd</span>
      </div>
    </footer>
  );
};

export default Footer;

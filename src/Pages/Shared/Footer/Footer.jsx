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
          lg:footer-horizontal mt-10 md:mt-15 lg:mt-20 p-5 pt-5 md:px-10 lg:px-20
          font-nunito bg-[#F8F8F8] dark:bg-gray-900 text-gray-800 dark:text-gray-200
        "
      >
        <div className="flex lg:flex-row flex-col lg:items-center justify-around lg:gap-10 p-2 pt-5">
          {/* Logo + Links */}
          <Link>
            {" "}
            <div>
              <ul className="space-y-1.5">
                <li>
                  <img
                    src={LightLogo}
                    alt="Light Logo"
                    className="hidden lg:block dark:hidden w-35"
                  />
                  <img
                    src={DarkLogo}
                    alt="Dark Logo"
                    className="hidden lg:dark:block w-35"
                  />
                  <img
                    src={OnlyLogo}
                    alt="Small Screen Logo"
                    className="block lg:hidden w-10"
                  />
                </li>
                <li className="font-semibold hover:text-[--color-secondary] transition">
                  <Link to="/about-us">About us</Link>
                </li>
                <li className="font-semibold hover:text-[--color-secondary] transition">
                  <Link to="/all-donations">All Donations</Link>
                </li>
              </ul>
            </div>
          </Link>

          {/* Terms Section */}
          <ul className="space-y-1.5">
            <li>
              <h6 className="font-bold text-xl poppins">Terms</h6>
            </li>
            <div className="border-b-2 border-green-500 w-20"></div>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Terms of service
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Privacy policy
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Cookie policy
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Refund policy
              </a>
            </li>
          </ul>

          {/* Help Section */}
          <ul className="space-y-1.5">
            <li>
              <h6 className="font-bold text-xl poppins">Help</h6>
            </li>
            <div className="border-b-2 border-green-500 w-15"></div>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Support Section
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                FAQ
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Report
              </a>
            </li>
            <li>
              <a className="font-semibold hover:text-[--color-secondary] transition">
                Contact
              </a>
            </li>
          </ul>

          {/* Social Section */}
          <ul className="space-y-1.5">
            <li>
              <h6 className="font-bold text-xl poppins">Follow Us</h6>
              <div className="border-b-2 border-green-500 w-25"></div>
            </li>
            <li className="text-2xl flex gap-3">
              <a
                href="http://www.facebook.com"
                target="_blank"
                className="hover:text-blue-600 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="http://www.linkdin.com"
                target="_blank"
                className="hover:text-blue-500 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="http://www.twitter.com"
                target="_blank"
                className="hover:text-sky-400 transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="http://www.github.com"
                target="_blank"
                className="hover:text-gray-500 transition"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="lg:text-center pt-3">
          <aside>
            <span className="text-xl">#</span> Copyright ©{" "}
            {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="font-semibold text-[--color-secondary]">
              GroveGardener Ltd
            </span>
          </aside>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

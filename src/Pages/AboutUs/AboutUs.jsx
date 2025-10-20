import React from "react";
import {
  FaBowlFood,
  FaHandshakeSimple,
  FaUserGroup,
  FaGears,
  FaLock,
} from "react-icons/fa6";
import { IoIosColorPalette, IoIosRocket } from "react-icons/io";
import { MdSecurity } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-14 lg:mt-40 sm:mt-34 mt-30 rounded-2xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Mission Statement */}
        <div className="text-center mb-16 border-b border-secondary/50 pb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary dark:text-gray-100 tracking-tight mb-4 motion-safe:animate-fadeIn">
            Our Mission: Every Bite Counts
          </h1>
          <p className="mt-4 max-w-3xl mx-auto sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-medium">
            **Donate-A-Bite** is a dynamic platform dedicated to solving local
            food waste by seamlessly connecting businesses with surplus food to
            charities that need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 sm:p-10 border-l-4 border-secondary transition duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-primary dark:text-gray-100 mb-6">
              Bridging the Gap
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              We recognized a simple but critical problem: valuable surplus food
              was going to waste, not because of a lack of need, but a lack of
              connection. Donate-A-Bite was created to be that essential
              bridge—a secure, efficient, and transparent online ecosystem built
              on the **MERN stack** for local impact. Our platform ensures that
              restaurants can effortlessly turn waste into relief, and charities
              can reliably source food for their critical community services.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border-r-4 border-primary transition duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-primary dark:text-gray-100 mb-4 flex items-center">
              <IoIosColorPalette className="w-6 h-6 mr-3 text-secondary" />
              Our Logo & Vision
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="mb-3">
                Our logo features an **orange, crescent-like shape** within a
                **teal circle**, representing the warmth of giving and the
                completeness of our mission.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <span className="font-semibold text-primary dark:text-gray-200">
                    The Orange Crescent:
                  </span>{" "}
                  Symbolizes a **single, nourishing bite**, evocative of food,
                  warmth, and the immediate relief a donation provides.
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-gray-200">
                    The Teal Circle:
                  </span>{" "}
                  Represents the **trust, security, and complete cycle** of food
                  redistribution—from surplus to need, with zero waste.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-gray-100 mb-10">
            How Our Platform Works: The Four Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoleCard
              title="Restaurant Donors"
              icon={<FaBowlFood />}
              description="Post surplus food listings, view real-time requests from charities, and track their positive impact."
            />

            <RoleCard
              title="Charity Partners"
              icon={<FaHandshakeSimple />}
              description="Browse, save, and request verified donations. Confirm pickup and manage received food via a secure dashboard."
            />

            <RoleCard
              title="General Users"
              icon={<FaUserGroup />}
              description="Browse listings, save favourites, submit reviews, and request to upgrade their role to Charity (via Stripe payment/Admin approval)."
            />

            <RoleCard
              title="Platform Admin"
              icon={<FaGears />}
              description="Manage donations, approve Charity role requests (including Stripe transactions), manage users, and ensure platform integrity."
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-12 border-t-8 border-secondary">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-gray-100 mb-8 flex items-center justify-center">
            <MdSecurity className="w-8 h-8 mr-3 text-secondary" />
            Trust and Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <ConfidencePoint
              icon={<FaLock />}
              title="Secure Roles & Access"
              description="Role-based private routing secured by **JWT tokens** ensures users only access the dashboards and data relevant to their role."
            />

            <ConfidencePoint
              icon={<IoIosRocket />}
              title="Modern UX/UI"
              description="Built with **React, Tailwind CSS, and Framer Motion** for a fast, accessible, and beautiful experience, complete with Dark/Light themes."
            />

            <ConfidencePoint
              icon={<FaBowlFood />}
              title="Payment & Verification"
              description="Integrated with **Stripe** for secure payment processing of Charity role requests, guaranteeing legitimate and verified partners."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, icon, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-secondary/30 hover:border-secondary transform hover:scale-[1.02]">
    <div className="text-4xl text-primary mb-3 mx-auto w-fit">{icon}</div>
    <h3 className="text-xl font-bold text-primary dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

const ConfidencePoint = ({ title, icon, description }) => (
  <div className="p-4">
    <div className="text-4xl text-secondary mb-3 mx-auto w-fit">{icon}</div>
    <h3 className="text-xl font-semibold text-primary dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default AboutUs;

import { motion } from "framer-motion";
import { FaUtensils, FaGift, FaUsers, FaRecycle } from "react-icons/fa";

const steps = [
  {
    title: "Restaurant",
    icon: <FaUtensils />,
    description: "Restaurants share surplus food donations to reduce waste.",
  },
  {
    title: "Donate",
    icon: <FaGift />,
    description: "Donations are securely listed on the platform for charities.",
  },
  {
    title: "Charity",
    icon: <FaUsers />,
    description: "Charities request and pick up the food for those in need.",
  },
  {
    title: "Community",
    icon: <FaRecycle />,
    description:
      "Food reaches the community, helping people and reducing waste.",
  },
];

const HowDonationsHelp = () => {
  return (
    <section className="py-16 px-4 md:px-5 bg-secondary transition-colors duration-300 overflow-x-hidden rounded-2xl">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary dark:text-primary"
        >
          How Donations Help
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 text-gray-100 dark:text-gray-200 text-lg"
        >
          See the journey of a donation from restaurants to the community.
        </motion.p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl mx-auto relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: window.innerWidth >= 768 ? 100 : 0, // from right for md+
              y: window.innerWidth <= 768 ? 50 : 0,   // from bottom for sm
            }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Step Circle */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl mb-4"
            >
              <div className="text-primary dark:text-primary text-3xl md:text-4xl">
                {step.icon}
              </div>
            </motion.div>

            {/* Step Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-primary dark:text-primary">
              {step.title}
            </h3>

            {/* Step Description */}
            <p className="text-gray-900 dark:text-gray-200 mt-2 max-w-xs">
              {step.description}
            </p>

            {/* Arrow Between Steps */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: window.innerWidth >= 768 ? 50 : 0, // horizontal slide for md+
                  y: window.innerWidth < 768 ? 50 : 0,  // vertical slide for sm
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.3 }}
                className="absolute top-full lg:top-12 lg:right-[-50%] lg:left-auto
               flex
                 justify-center items-center w-full"
              >
                {/* Horizontal for md/lg, vertical for sm */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-primary dark:text-primary w-6 h-16 lg:w-16 lg:h-6 transform rotate-90 lg:rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M0 12h24m-4-4l4 4-4 4"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowDonationsHelp;

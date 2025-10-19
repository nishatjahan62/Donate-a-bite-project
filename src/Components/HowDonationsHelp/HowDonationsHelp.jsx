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
    <section className="py-16 px-6 md:px-20 bg-secondary transition-colors duration-300 overflow-x-hidden rounded-2xl ">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary dark:text-primary"
        >
          How Donations Help
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 text-gray-100 dark:text-gray-200 text-lg"
        >
          See the journey of a donation from restaurants to the community.
        </motion.p>
      </div>

      {/* Steps with arrows */}
      <div className="flex items-center justify-center gap-12 relative max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center relative z-10"
          >
            {/* Step Circle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.5 }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl mb-4"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-primary dark:text-primary text-3xl md:text-4xl"
              >
                {step.icon}
              </motion.div>
            </motion.div>

            {/* Step Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.5 }}
              className="text-xl md:text-2xl font-semibold text-primary dark:text-primary"
            >
              {step.title}
            </motion.h3>

            {/* Step Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.5 }}
              className="text-gray-900 dark:text-gray-200 mt-2 max-w-xs"
            >
              {step.description}
            </motion.p>

            {/* Arrow Between Steps */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.5 }}
                className="absolute top-12 right-[-50%] w-full flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-16 h-6 text-primary dark:text-primary"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowDonationsHelp;

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import Button from "../../Pages/Shared/Button/Button";

const faqs = [
  {
    question: "What is Donate-A-Bite?",
    answer:
      "Donate-A-Bite is a community-driven platform that connects restaurants with charities to minimize food waste. Users can browse donations, charities can request food, and admins ensure smooth operation.",
  },
  {
    question: "How can I become a Charity on the platform?",
    answer:
      "To become a Charity, register as a user, then go to your dashboard and request the Charity role. A one-time payment via Stripe is required, and your request must be approved by the Admin.",
  },
  {
    question: "Can restaurants track their past donations?",
    answer:
      "Yes! Restaurants have a dedicated dashboard to manage and track all their added, requested, and completed donations efficiently.",
  },
  {
    question: "Is my data secure on Donate-A-Bite?",
    answer:
      "Absolutely. We use Firebase Authentication and JWT tokens to keep your data safe and secure at every step.",
  },
  {
    question: "What payment method is used for Charity requests?",
    answer:
      "We use Stripe for secure, seamless, and encrypted payment processing during the Charity role request process.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [question, setQuestion] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="  md:px-20 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary poppins"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 text-gray-700 dark:text-gray-300"
        >
          Everything you need to know about Donate-A-Bite and how you can be a
          part of reducing food waste in your community.
        </motion.p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-2 rounded-2xl shadow-sm overflow-hidden border-secondary transition-colors "
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center p-5 text-left font-semibold text-gray-800 dark:text-gray-100 hover:text-primary focus:outline-none transition-colors gap-3"
            >
              <FaQuestionCircle className="text-secondary text-xl flex-shrink-0" />
              <span className="flex-1">{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-gray-800 dark:text-gray-100 hover:text-primary transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 pb-5 leading-relaxed text-gray-800 dark:text-gray-100"
                >
                  <hr className="border-t border-secondary my-3" />
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-secondary text-xl flex-shrink-0 mt-1" />
                    <span>{faq.answer}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center max-w-xl mx-auto"
      >
        <h3 className="text-2xl font-semibold text-primary mb-3">
          Still have a question?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Ask us directly! We’re always happy to help you.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="w-full sm:w-2/3 px-4 py-3 rounded-xl border-2 border-secondary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition-all duration-300 hover:border-primary"
          />

          {/* Reusable Button */}
          <Button label="Send Question" />
        </form>
      </motion.div>
    </section>
  );
};

export default Faq;

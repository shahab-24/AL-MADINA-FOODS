import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <motion.section 
      className="py-16 px-6 bg-white dark:bg-gray-800"
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">How It Works</h2>
      <div className="mt-8 space-y-4">
        <p className="text-gray-700 dark:text-gray-300">1️⃣ Sign up and log in to access the platform.</p>
        <p className="text-gray-700 dark:text-gray-300">2️⃣ Browse or add food donations.</p>
        <p className="text-gray-700 dark:text-gray-300">3️⃣ Request available food items easily.</p>
      </div>
    </motion.section>
  );
};

export default HowItWorks;

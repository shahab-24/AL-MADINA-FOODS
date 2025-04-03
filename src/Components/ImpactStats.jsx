import { motion } from "framer-motion";
import { FaUtensils, FaUsers, FaHandHoldingHeart } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaUtensils />, number: "5K+", label: "Meals Shared" },
  { id: 2, icon: <FaUsers />, number: "1.2K+", label: "Volunteers Joined" },
  { id: 3, icon: <FaHandHoldingHeart />, number: "3K+", label: "Food Requests Fulfilled" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const ImpactStats = () => {
  return (
    <motion.section
      className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-10">
        Our <span className="text-green-600">Impact</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center space-y-3 transform hover:scale-105 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="text-green-600 text-5xl">{stat.icon}</div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.number}</p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ImpactStats;

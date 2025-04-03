import { motion } from "framer-motion";

const Partners = () => {
  return (
    <motion.section 
      className="py-16 px-6 bg-white dark:bg-gray-800 text-center"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Partners</h2>
      <div className="flex justify-center gap-8 mt-6">
        <img src="/partner1.png" alt="Partner 1" className="h-16" />
        <img src="/partner2.png" alt="Partner 2" className="h-16" />
      </div>
    </motion.section>
  );
};

export default Partners;

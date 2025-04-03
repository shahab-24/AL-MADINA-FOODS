import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.section 
      className="py-16 px-6 bg-gray-200 dark:bg-gray-900 text-center"
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bo dark:text-white">Testimonials</h2>
      <div className="mt-6">
        <blockquote className="italic text-gray-700 dark:text-gray-300">"This platform has changed lives! A brilliant initiative!"</blockquote>
        <p className="mt-2 text-gray-500 dark:text-gray-400">— John Doe, Volunteer</p>
      </div>
    </motion.section>
  );
};

export default Testimonials;

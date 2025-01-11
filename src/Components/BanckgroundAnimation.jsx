import { motion } from 'framer-motion';

function BackgroundAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="background"
    >
      {/* Your background content here */}
    </motion.div>
  );
}

export default BackgroundAnimation;

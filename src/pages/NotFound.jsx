import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-zinc-300 mb-6">Oops! This page doesn’t exist.</p>
      <Link to="/" className="text-blue-400 underline">Back to Home</Link>
    </motion.div>
  );
}

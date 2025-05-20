import { motion } from 'framer-motion';
import { bandBio } from '../data/content';

export default function Home() {

  return (
    <motion.div
      className="flex flex-col items-center p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >

      <img
      src="../images/band-photo.jpg"
      alt="band photo"
      className="w-100 h-auto rounded-lg mb-6 shadow-lg"
      />

      <h1 className="self-start text-3xl font-bold text-text">Welcome!</h1>
      <p className="mt-2 text-text">{bandBio}</p>
    </motion.div>
  );
}

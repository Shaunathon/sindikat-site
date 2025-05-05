import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Calendar = lazy(() => import('../pages/Calendar.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const Library = lazy(() => import('../pages/Library.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="text-center text-zinc-400">Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
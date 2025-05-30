import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeaderBackground } from '../utils/backgroundImages';

const underlineTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

export default function Nav() {
  const location = useLocation();
  const bgImage = '/images/header-bg.png';
  const [menuOpen, setMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef({});
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems = [
    { label: 'Home', to: '/home' },
    { label: 'Calendar', to: '/calendar' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Library', to: '/library' },
  ];

  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bgStyle = isMobile ? { backgroundImage: `url(${bgImage})` } : {};

  useEffect(() => {
  const activePath = location.pathname;
  const activeEl = linkRefs.current[activePath];
  const containerEl = containerRef.current;
    if (activeEl && containerEl) {
    const rect = activeEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const width = rect.width;

    // console.log('Underline moves to:', { left, width });
    setUnderlineStyle({ left, width });
  }
}, [location.pathname]);

  return (
    <nav className="sticky top-0 z-40 bg-cover bg-center bg-no-repeat md: bg-primary text-sm font-header relative transition-colors duration-300"
      style={bgStyle}
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between md:justify-center relative"
      >
      {/* Mobile-only translucent overlay */}
        {isMobile && (
        <div className="absolute inset-0 bg-zinc-900/80 backdrop-brightness-100 z-0" />
        )}
          <img
              src="/images/blue-rose.png"
              alt="blue rose"
              className="absolute inset-0 w-32 h-32 opacity-80 z-0 m-auto top-2 pointer-events-none object-contain"
            />
        {/* Band name: only visible on md and smaller */}
        <div className="block md:hidden flex items-center justify-center space-x-2 z-10">
          <span className="text-accent font-header text-lg z-10">
            sindikat
          </span>
          <span className="text-pop font-logo text-4xl z-10">
            Sina Roza
          </span>
        </div>


        {/* Desktop nav links, centered */}
        <div ref={containerRef} className="hidden md:flex gap-6 relative min-h-[1.5rem]">
          {navItems.map(({ label, to }) => (
            <div
              key={to}
              className="relative"
              ref={(el) => (linkRefs.current[to] = el)}
            >
              <NavLink
                to={to}
                className={
                  (to === '/calendar' && (location.pathname === '/' || location.pathname === '/calendar')) || location.pathname === to
                    ? 'text-xl text-accent font-header tracking-wide transition-all duration-300'
                    : 'text-xl text-secondary hover:text-white font-medium uppercase tracking-wide transition-all duration-300'
                }
              >
                {label}
              </NavLink>
            </div>
          ))}

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-1 h-0.5 bg-accent rounded"
            animate={{ left: underlineStyle.left, width: underlineStyle.width }}
            transition={underlineTransition}
          />
          <motion.div
            className="absolute bottom-6 h-0.5 bg-accent rounded"
            animate={{ left: underlineStyle.left, width: underlineStyle.width }}
            transition={underlineTransition}
          />
        </div>

        {/* Hamburger toggle: only visible on mobile, floats right */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-accent  text-3xl px-3 drop-shadow-sm absolute right-4 z-50"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown w/animation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 🔧 Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* 🔧 Dropdown Menu */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-zinc-800/80 backdrop-blur-md px-4 pb-4 space-y-2 text-center z-50 md:hidden"
            >
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    (to === '/calendar' && (location.pathname === '/' || location.pathname === '/calendar')) || isActive
                      ? 'block text-accent text-2xl bg-primary bg-opacity-50 font-header uppercase tracking-wide rounded px-3 py-5'
                      : 'block text-secondary text-2xl font-header uppercase tracking-wide hover:underline px-3 py-5'
                  }
                >
                  {label}
                </NavLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

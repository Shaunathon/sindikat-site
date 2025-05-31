import { bandSubtitle } from '../data/content';
import { useLocation } from 'react-router-dom';
import { getHeaderBackground } from '../utils/backgroundImages';

export default function Header() {

  const location = useLocation();
  const bgImage = '/images/header-bg.png';

  return (
    <header className="hidden md:block relative text-center py-10 bg-repeat shadow-lg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/35 backdrop-brightness-125 z-0" />

      <div className="relative z-10 bg-[rgba(3,1,4,0.75)] backdrop-blur-xs inline-block px-6 py-4 rounded-4xl border-2 border-[var(--color-cream-dark)]">
        <img
          src="/images/blue-rose.png"
          alt="blue rose"
          className="absolute -top-21 -right-24 w-70 h-70 opacity-100 z-0 pointer-events-none"
          />
        <h2 className="text-3xl text-accent font-header mb-1 z-10 relative">sindikat</h2>
        <h1 className="text-6xl text-pop font-logo z-10 relative">Sina Roza</h1>
      </div>
    </header>
  );
}

import { bandSubtitle } from '../data/content';
import { useLocation } from 'react-router-dom';
import { getHeaderBackground } from '../utils/backgroundImages';

export default function Header() {

  const location = useLocation();
  const bgImage = getHeaderBackground(location.pathname);

  return (
    <header className="hidden md:block text-center py-10 bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-background backdrop-blur-xs inline-block px-6 py-4 rounded">
        <h1 className="text-4xl text-white font-header tracking-wide">Sindikat Sina Roza</h1>
        <p className="text-xl mt-2 text-accent font-body-bold-italic">{bandSubtitle}</p>
      </div>
    </header>
  );
}

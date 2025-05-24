import { bandSubtitle } from '../data/content';
import { useLocation } from 'react-router-dom';
import { getHeaderBackground } from '../utils/backgroundImages';

export default function Header() {

  const location = useLocation();
  const bgImage = '/images/header-bg.png';

  return (
    <header className="hidden md:block text-center py-10 bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-background inline-block px-6 py-4 rounded-4xl">
        <h2 className="text-3xl text-accent font-title mb-1">sindikat</h2>
        <h1 className="text-6xl text-pop font-logo">Sina Roza</h1>
        {/*<p className="text-xl mt-2 text-accent font-body-bold-italic">{bandSubtitle}</p>*/}
      </div>
    </header>
  );
}

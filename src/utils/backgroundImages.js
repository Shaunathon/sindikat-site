export function getHeaderBackground(pathname) {
  const backgroundImages = {
    '/': '/images/Skadarlija.jpg',
    '/about': '/images/Kocani.jpg',
    '/calendar': '/images/Guca.jpg',
    '/contact': '/images/Istanbul.jpg',
    '/library': '/images/Mostar.jpg',
  };

  return backgroundImages[pathname] || '/images/Skadarlija.jpg';
}

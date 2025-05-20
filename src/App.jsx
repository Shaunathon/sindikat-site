import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';


function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-white min-h-screen font-sans">
        <Header />

        <Nav />

        <main className="max-w-3xl mx-auto px-4 py-12">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
function App() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen font-sans">
      <header className="text-center py-10 bg-zinc-800 shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">Sindikat Sina Roza</h1>
        <p className="text-lg mt-2 text-zinc-400">Balkan & Turkish Brass • Global Groove</p>
      </header>

      <nav className="flex justify-center gap-6 py-4 bg-zinc-700 text-sm">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Calendar</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">Library</a>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          <p className="text-zinc-300 leading-relaxed">
            We are Sindikat Sina Roza — a brass band bringing high-energy, soul-stirring sounds from the Balkans and Turkey
            to audiences around the world. From wedding marches to dance floor bangers, we live for that deep, joyful groove.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Listen</h2>
          <div className="aspect-video w-full bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
            Your media embed here (Bandcamp, YouTube, etc.)
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-400">Instagram</a>
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-green-400">YouTube</a>
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-zinc-500 py-6 border-t border-zinc-700 mt-10">
        © 2025 Sindikat Sina Roza. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
*/

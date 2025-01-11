"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleLoveButtonClick = () => {
    setShowImage(true);
    const audio = new Audio('https://example.com/love-song.mp3');
    audio.play().catch((error) => console.error("Audio playback blocked:", error));
  };

  return (
    <header className="bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center p-2 relative text-2xl">
        <div className="text-2xl font-bold">💕 EmotionLogo</div>
        <button
          className="lg:hidden text-white focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
        <ul
          className={`absolute top-0 left-0 w-full bg-pink-500 flex-col gap-4 p-4 shadow-md transform transition-transform duration-300 ease-in-out lg:static lg:flex lg:flex-row lg:w-auto lg:gap-8 lg:bg-transparent lg:shadow-none ${
            isMenuOpen || "lg:translate-y-0 lg:translate-x-0"
          } ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
          style={{ zIndex: 40 }}
        >
          <li>
            <Link href="/" className="font-semibold hover:text-yellow-300 transition-colors duration-300 block lg:inline-block">
              Puzzle
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-semibold hover:text-yellow-300 transition-colors duration-300 block lg:inline-block">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="font-semibold hover:text-yellow-300 transition-colors duration-300 block lg:inline-block">
              Contact
            </Link>
          </li>
        </ul>
        <button 
          onClick={handleLoveButtonClick}
          className="hidden lg:block bg-gradient-to-r from-pink-300 to-pink-500 text-white font-bold px-6 py-3 rounded-full hover:scale-110 transition-transform shadow-lg">
          💖 I love you 💖
        </button>
      </nav>
      {showImage && (
        <div className="fixed inset-0 bg-pink-200 bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
            <div className="relative">
              <iframe
                width="100%"
                height="425"
                src="https://www.youtube.com/embed/iWgGWl95pIQ?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-2xl"
              ></iframe>
              <button 
                onClick={() => setShowImage(false)}
                className="absolute top-4 right-4 bg-red-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-500">
                ✖
              </button>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-pink-600">💞 Enjoy the Moment 💞</h3>
              <p className="text-gray-600 mt-2">Feel the love and let your emotions shine. ✨</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
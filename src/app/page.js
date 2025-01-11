"use client";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import PuzzleGame from "../components/PuzzleGame";

export default function Home() {
  const [showPuzzleGame, setShowPuzzleGame] = useState(false);

  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-gradient-to-b from-gray-100 to-gray-200">
      <Head>
        <title>Emotions & Sympathy</title>
        <meta
          name="description"
          content="Explore emotions and feelings of sympathy."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0.5, 0, 0, 0.5), rgba(0, 0, 0, 1)), url('/video/1.gif')",
          backgroundSize: "cover", // Масштабирование на весь экран
          backgroundPosition: "center", // Центрирование изображения
          backgroundRepeat: "no-repeat", // Отключение повторения
        }}
      >
        <h1 className="text-4xl font-bold text-white">
          Привет, дорогая <span className="text-yellow-500">Ажар 💚</span>
        </h1>

        <button
          onClick={() => setShowPuzzleGame(true)}
          className="bg-green-400 text-blue-900 font-bold px-4 py-2 mt-2 rounded-md hover:bg-green-500"
        >
          PLAY?!
        </button>

        {showPuzzleGame && <PuzzleGame onClose={() => setShowPuzzleGame(false)} />}
      </main>

      <Footer />
    </div>
  );
}

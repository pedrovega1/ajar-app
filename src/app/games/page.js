"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

function Page() {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'game1':
        return <div>Игра 1: Пазлы</div>;
      case 'game2':
        return <div>Игра 2: Крестики-нолики</div>;
      case 'game3':
        return <div>Игра 3: Змейка</div>;
      default:
        return <div>Выберите игру из сайдбара.</div>;
    }
  };

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelectGame={setSelectedGame} />

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Header />
        <div className="mt-4 p-4 border rounded bg-gray-100">{renderGame()}</div>
        <Footer />
      </div>
    </main>
  );
}

export default Page;

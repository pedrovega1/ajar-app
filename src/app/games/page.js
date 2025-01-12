"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import LoveDinoGame from "@/components/LoveDinoGame"; // Импортируем игру

function Page() {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case "game1":
        return <div>Игра 1: Пазлы</div>;
      case "game2":
        return <div>Игра 2: Крестики-нолики</div>;
      case "game3":
        return <div>Игра 3: Змейка</div>;
      case "loveDino":
        return <LoveDinoGame />;
      default:
        return <div>Waiting for what?</div>;
    }
  };

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <Sidebar onSelectGame={setSelectedGame} />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-red-200/60">
          <div className="mt-4 p-4 border rounded">{renderGame()}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Page;

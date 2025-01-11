"use client";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const puzzleImage = "/images/wth.jpg";
const gridSize = 3;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const sendTelegramMessage = async (message) => {
  const botToken = "8056958271:AAH7Q_OOjKoZn2_5WwHNUTMS8_ULGAxNrLs";
  const chatId = "-1002437147460"; // Идентификатор вашего канала или группы
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      console.error(
        "Ошибка при отправке сообщения в Telegram:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Ошибка сети при отправке сообщения в Telegram:", error);
  }
};

const PuzzleGame = ({ onClose }) => {
  const [tiles, setTiles] = useState(() => {
    const tempTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    return shuffleArray(tempTiles);
  });
  const [draggedTile, setDraggedTile] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const audioRef = useRef(null);

  const handleDragStart = (index) => {
    setDraggedTile(index);
  };

  const handleDrop = (index) => {
    if (draggedTile === null) return;
    const newTiles = [...tiles];
    [newTiles[draggedTile], newTiles[index]] = [
      newTiles[index],
      newTiles[draggedTile],
    ];
    setTiles(newTiles);
    setDraggedTile(null);
  };

  useEffect(() => {
    const solved = tiles.every((tile, index) => tile === index);
    setIsSolved(solved);

    if (solved) {
      // Воспроизведение звука
      if (audioRef.current) {
        audioRef.current.play();
      }

      // Эффект конфетти
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
      });

      // Отправка уведомления в Telegram
      sendTelegramMessage("🎉 Пользователь завершил пазл!");
    }
  }, [tiles]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden p-4">
        <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
          Solve the Puzzle
        </h3>
        <div
          className={`grid grid-cols-${gridSize} gap-1 mx-auto w-[300px] h-[300px]`}
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {tiles.map((tile, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className="w-full h-full border bg-gray-300 flex items-center justify-center"
              style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundPosition: `${
                  (tile % gridSize) * (100 / (gridSize - 1))
                }% ${
                  Math.floor(tile / gridSize) * (100 / (gridSize - 1))
                }%`,
                backgroundSize: `${gridSize * 100}%`,
              }}
            >
              {tile + 1}
            </div>
          ))}
        </div>
        {isSolved && (
          <p className="text-center text-green-500 font-bold mt-4">
            Congratulations! Puzzle Solved!
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
        >
          Close Game
        </button>
      </div>
      <audio ref={audioRef} src="/sound/kids.mp3" />
    </div>
  );
};

export default PuzzleGame;
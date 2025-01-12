"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Динамический импорт ParticlesBg для отключения SSR
const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

const sendTelegramMessage = async (message) => {
  if (typeof window === "undefined") return; // Убедимся, что функция работает только в браузере

  const botToken = "8056958271:AAH7Q_OOjKoZn2_5WwHNUTMS8_ULGAxNrLs";
  const chatId = "-1002437147460";
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

const QuizGame = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameState, setGameState] = useState({ currentQuestion: 0, score: 0 });
  const [showResult, setShowResult] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [victorySound, setVictorySound] = useState(null);

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      setVictorySound(new Audio("/sound/kids.mp3"));
    }
  }, []);

  const questions = [
    {
      question: "Как зовут вашего любимого корейца?",
      options: ["Влад", "Слава", "Элеонора", "Светлана"],
      correct: "Влад",
    },
    {
      question: "Где вы познакомились?",
      options: ["Кафе", "Дайвинчик", "Tinder", "На работе"],
      correct: "Tinder",
    },
    {
      question: "Какой любимый цвет Влада",
      options: ["Зеленый", "Бордовый", "Коричневый", "Желтый"],
      correct: "Коричневый",
    },
    {
      question: "Любимый ASU",
      options: ["Мята", "Лимон", "Клубника-киви", "Вода"],
      correct: "Мята",
    },
    {
      question: "Любимый исполнитель",
      options: ["Nujabes", "Moldanazar", "PSY", "KPOP"],
      correct: "Nujabes",
    },
  ];

  const startGame = () => {
    setGameState({ currentQuestion: 0, score: 0 });
    setShowResult(false);
    setAnswersHistory([]);
    setIsGameOpen(true);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[gameState.currentQuestion];
    const isCorrect = answer === currentQuestion.correct;

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correct,
        isCorrect,
      },
    ]);

    setGameState((prev) => ({
      ...prev,
      score: prev.score + (isCorrect ? 1 : 0),
      currentQuestion: prev.currentQuestion + 1,
    }));

    if (gameState.currentQuestion + 1 === questions.length) {
      setShowResult(true);

      if (victorySound) {
        victorySound.play().catch((err) => console.error("Ошибка аудио:", err));
      }

      const resultsMessage = `🎮 Итоги игры:\n\n${answersHistory
        .map(
          (entry, index) =>
            `${index + 1}. Вопрос: ${entry.question}\nВыбранный ответ: ${
              entry.selectedAnswer
            }\nПравильный ответ: ${entry.correctAnswer}\nРезультат: ${
              entry.isCorrect ? "✅" : "❌"
            }`
        )
        .join("\n")}\n\nИтоговый счет: ${gameState.score} из ${
        questions.length
      }`;

      sendTelegramMessage(resultsMessage);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200">
 

      <div className="text-center  py-2 ">
        <button
          onClick={startGame}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Начать игру
        </button>
      </div>

      <div className="lg:flex lg:flex-row flex-col lg:max-w-[1200px] md:max-w-[95%] max-w-[90%] mx-auto relative z-10 p-4 lg:p-6 text-gray-700 space-y-6 lg:space-y-0">
        <div className="flex-1">
          <img
            src="/images/about.jpg"
            className="w-full h-auto sm:w-3/4 sm:mx-auto md:w-2/3 lg:w-full rounded-lg"
            alt="About"
          />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <div className="starwars-intro">
            <div className="starwars-line text-2xl">
              <p>Architect</p>
              <p>Lumion 2023</p>
              <p>Фанатка Влада</p>
              <p>Рост 160</p>
              <p>Персик</p>
              <p>Щавель</p>
              <p>Соленая карамель</p>
              <p>Айс латте</p>
              <p>Любит Влада</p>
              <p>Вы случайно не тиктокерша?</p>
              <p>Я где-то вас видела...</p>
              <p>Адидас Макс Про</p>
              <p className="text-red-700 text-bold">Virgin...</p>
            </div>
          </div>
        </div>
      </div>

      {isGameOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setIsGameOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            {showResult ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-500">
                  Игра окончена!
                </h2>
                <p className="mt-4 text-lg">
                  Ваш результат: {gameState.score} из {questions.length}
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
                  {questions[gameState.currentQuestion]?.question}
                </h2>
                <div className="flex flex-col space-y-4">
                  {questions[gameState.currentQuestion]?.options.map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .starwars-intro {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          perspective: 800px;
        }

        .starwars-line {
          position: absolute;
          width: 100%;
          text-align: center;
          font-size: 1.5rem;
          color: white;
          animation: scroll-up 15s linear infinite;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(100%) rotateX(25deg) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(-150%) rotateX(25deg) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizGame;

import React, { useState } from "react";

const Sidebar = ({ onSelectGame }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для мобильного меню

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Кнопка для открытия/закрытия меню на мобильных устройствах */}
      <button
        onClick={toggleSidebar}
        className="md:hidden  top-4 left-4 z-50 bg-pink-500 text-white p-2 rounded"
      >
        Меню
      </button>

      {/* Sidebar для мобильных устройств */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } fixed top-0 left-0 h-full w-full bg-[#f8717166] text-white p-4 flex-col items-center gap-4 md:static md:flex md:w-1/4 lg:w-1/12`}
      >
        <h2 className="text-lg font-bold">Игры</h2>
        <button
          onClick={() => {
            onSelectGame("game1");
            setIsOpen(false); // Закрываем меню после выбора
          }}
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Пазлы
        </button>
        <button
          onClick={() => {
            onSelectGame("game2");
            setIsOpen(false); // Закрываем меню после выбора
          }}
          className="w-full p-2 bg-green-500 rounded hover:bg-green-600"
        >
          Крестики-нолики
        </button>
        <button
          onClick={() => {
            onSelectGame("game3");
            setIsOpen(false); // Закрываем меню после выбора
          }}
          className="w-full p-2 bg-purple-500 rounded hover:bg-purple-600"
        >
          Змейка
        </button>
        <button
          onClick={() => {
            onSelectGame("loveDino");
            setIsOpen(false); // Закрываем меню после выбора
          }}
          className="w-full p-2 bg-pink-500 rounded hover:bg-pink-600"
        >
          Любовный Динозаврик
        </button>
      </div>
    </>
  );
};

export default Sidebar;

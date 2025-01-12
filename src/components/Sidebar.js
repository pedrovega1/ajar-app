import React from 'react';

const Sidebar = ({ onSelectGame }) => {
  return (
    <aside className="w-1/6 bg-red-400/40 text-white p-4">
        
      <h2 className="text-lg font-bold mb-4">Игры</h2>
      <button
        onClick={() => onSelectGame('game1')}
        className="w-full mb-2 p-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Пазлы
      </button>
      <button
        onClick={() => onSelectGame('game2')}
        className="w-full mb-2 p-2 bg-green-500 rounded hover:bg-green-600"
      >
        Крестики-нолики
      </button>
      <button
        onClick={() => onSelectGame('game3')}
        className="w-full p-2 bg-purple-500 rounded hover:bg-purple-600"
      >
        Змейка
      </button>
    </aside>
  );
};

export default Sidebar;

import React, { useState, useEffect, useRef } from 'react';

const LoveDinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [obstacles, setObstacles] = useState([{ id: 1, position: 100, type: 1 }]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(2);
  const heroRef = useRef();

  // Движение препятствий
  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      setObstacles((prevObstacles) => {
        const updatedObstacles = prevObstacles.map((obstacle) => ({
          ...obstacle,
          position: obstacle.position - speed,
        })).filter((obstacle) => {
          if (obstacle.position <= -10) {
            setScore((prevScore) => prevScore + 1);
            return false;
          }
          return true;
        });

        if (
          updatedObstacles.length === 0 ||
          updatedObstacles[updatedObstacles.length - 1].position < 50
        ) {
          const newObstacle = {
            id: Date.now(),
            position: 100,
            type: Math.floor(Math.random() * 3) + 1,
          };
          updatedObstacles.push(newObstacle);
        }

        return updatedObstacles;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [isGameOver, speed]);

  // Проверка столкновений
  useEffect(() => {
    const checkCollision = setInterval(() => {
      if (!heroRef.current || isGameOver) return;

      const heroBounds = heroRef.current.getBoundingClientRect();

      obstacles.forEach((obstacle) => {
        const obstacleElement = document.getElementById(`obstacle-${obstacle.id}`);
        if (obstacleElement) {
          const obstacleBounds = obstacleElement.getBoundingClientRect();

          if (
            heroBounds.right > obstacleBounds.left &&
            heroBounds.left < obstacleBounds.right &&
            heroBounds.bottom > obstacleBounds.top
          ) {
            setIsGameOver(true);
          }
        }
      });
    }, 10);

    return () => clearInterval(checkCollision);
  }, [obstacles, isGameOver]);

  // Управление прыжком
  const handleJump = () => {
    if (isJumping || isFalling || isGameOver) return;

    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
      setIsFalling(true);

      setTimeout(() => {
        setIsFalling(false);
      }, 200);
    }, 300);
  };

  // Обработка клавиши "Space"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Отключаем прокрутку страницы вниз
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, isFalling, isGameOver]);

  // Увеличение скорости со временем
  useEffect(() => {
    const speedInterval = setInterval(() => {
      if (!isGameOver) {
        setSpeed((prevSpeed) => prevSpeed + 0.1);
      }
    }, 3000);

    return () => clearInterval(speedInterval);
  }, [isGameOver]);

  const restartGame = () => {
    setIsGameOver(false);
    setObstacles([{ id: 1, position: 100, type: 1 }]);
    setScore(0);
    setSpeed(2);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ffcccb',
        overflow: 'hidden',
      }}
    >
      <h1 style={{ color: '#ff6b6b' }}>Любовный Динозаврик</h1>
      <p>Счёт: {score}</p>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '20rem',
          backgroundColor: '#fff5f5',
          overflow: 'hidden',
          border: '2px solid #ff6b6b',
        }}
      >
        {/* Герой */}
        <img
          ref={heroRef}
          src="/images/dino.png"
          alt="Динозаврик"
          style={{
            position: 'absolute',
            bottom: isFalling ? '0' : isJumping ? '100px' : '0',
            left: '50px',
            width: '80px',
            height: '80px',
            transition: 'bottom 0.2s',
      
          }}
        />

        {/* Препятствия */}
        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            id={`obstacle-${obstacle.id}`}
            style={{
              position: 'absolute',
              bottom: '0',
              left: `${obstacle.position}%`,
              width: `${35 * obstacle.type}px`,
              height: '35px',
              backgroundColor: '#a83232',
              borderRadius: '10px',
            }}
          ></div>
        ))}
      </div>

      {isGameOver ? (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Игра окончена!</h2>
          <button
            onClick={restartGame}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff6b6b',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Заново
          </button>
        </div>
      ) : (
        <button
          onClick={handleJump}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Прыжок
        </button>
      )}
    </div>
  );
};

export default LoveDinoGame;

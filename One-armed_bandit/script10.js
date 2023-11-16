function startGame() {
    let username = prompt('Будь ласка, введіть ваше ім\'я:');
  
    while (!username) {
      alert('Будь ласка, введіть своє ім\'я!');
      username = prompt('Будь ласка, введіть ваше ім\'я:');
    }
  
    const usernameDisplay = document.getElementById('username-display');
    usernameDisplay.textContent = `Ім'я: ${username}`;
  
    const reels = document.querySelectorAll('.reel');
    const symbols = [
        'apple.jpg',
        'cherry.jpg',
        'banana.jpg',
        'pear.jpg',
      ];
  
    // Функція для отримання випадкового символу
    function getRandomSymbol() {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      return symbols[randomIndex];
    }
  
    reels.forEach(reel => {
        const symbol = getRandomSymbol();
        reel.querySelector('img').src = symbol;
    });

    // Функція для генерації рядків символів на кожному барабані
    function spinReels() {
        for (let i = 0; i < reels.length; i++) {
          const symbol = getRandomSymbol();
          reels[i].querySelector('img').src = symbol;
        }
    }
  
    let iterations = 0;
    let win = false;
  
    function playRound() {
        spinReels();
        iterations++;
    
        const symbolsMatch = reels[0].querySelector('img').src === reels[1].querySelector('img').src && reels[1].querySelector('img').src === reels[2].querySelector('img').src;
    
        if (symbolsMatch) {
            win = true;
            setTimeout(endGame, 500);
            return; // Зупиняємо виконання решти коду у функції playRound(), якщо є виграш
        }
    
        if (iterations === 3) {
            setTimeout(endGame, 500); // Перевіряємо на виграш тільки після трьох раундів, якщо не випали однакові символи
        }
    }
    
    function restartGame() {
        iterations = 0;
        win = false;
        const reels = document.querySelectorAll('.reel');
        reels.forEach(reel => reel.querySelector('img').src = ''); // Очистити картинки на барабанах
    }
  
    // Зупинка гри та показ результату
    function endGame() {
      if (win) {
        alert(`Вітаємо, ${username}! Ви перемогли!`);
      } else {
        alert(`На жаль, ${username}, ви програли. Спробуйте ще раз.`);
      }
      restartGame();
    }
  
    // Функція для крутіння барабана при натисканні кнопки
    function spinButtonClicked() {
      if (iterations < 3) {
        playRound();
      }
    }
  
    // Отримання кнопки по id і додавання обробника подій для крутіння барабана
    const spinButton = document.getElementById('spin-button');
    spinButton.addEventListener('click', spinButtonClicked);
  }
  startGame();
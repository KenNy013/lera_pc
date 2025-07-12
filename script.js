// Смена сообщений
const cards = document.querySelectorAll(".message-card");
let currentCard = 0;
const btn = document.querySelector(".surprise-btn");
const cardContainer = document.querySelector(".card-container");

function showNextCard() {
  cards[currentCard].classList.remove("active");
  currentCard = (currentCard + 1) % cards.length;
  cards[currentCard].classList.add("active");

  // Если это последняя карточка, показываем кнопку
  if (currentCard === cards.length - 1) {
    setTimeout(() => {
      btn.classList.add("visible");
    }, 1000);
  }
}

// Меняем карточки каждые 3 секунды
const cardInterval = setInterval(showNextCard, 3000);

// Обработчик для кнопки сюрприза
btn.addEventListener("click", function () {
  // Останавливаем смену карточек
  clearInterval(cardInterval);

  // Прячем все карточки
  cards.forEach((card) => {
    card.classList.remove("active");
    card.classList.add("fade-out");
  });

  // Прячем кнопку
  btn.classList.remove("visible");
  btn.classList.add("fade-out");

  // Здесь нужно указать путь к фотографии Леры
  document.getElementById("lera-photo").src = "2025-07-12 22.12.48.jpg"; // Замените на реальный путь к фото

  // Показываем фото с сообщением
  setTimeout(() => {
    document.querySelector(".photo-container").classList.add("show");
    document.querySelector(".final-message").classList.add("show");
    createHearts();
  }, 600);
});

// Функция для создания сердечек
function createHearts() {
  const colors = ["#ff4d8d", "#ff85a2", "#ffb6c1", "#ffd1dc", "#ffebf3"];
  const emojis = [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🤍",
    "💖",
    "💗",
    "💘",
    "💝",
    "💞",
    "💟",
  ];

  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.fontSize = Math.random() * 24 + 12 + "px";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + 100 + "vh";
      heart.style.animation = `float ${Math.random() * 6 + 4}s linear forwards`;
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.zIndex = 100;

      document.body.appendChild(heart);

      // Удаляем сердечко после анимации
      setTimeout(() => {
        heart.remove();
      }, 10000);
    }, i * 50);
  }
}

// Адаптация для мобильных устройств
function handleResize() {
  if (window.innerWidth < 768) {
    document.querySelector(".card-container").style.alignItems = "flex-end";
  } else {
    document.querySelector(".card-container").style.alignItems = "flex-end";
  }
}

window.addEventListener("resize", handleResize);
handleResize();

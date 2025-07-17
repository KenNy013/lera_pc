const gifts = [
  { emoji: "👗", text: "Красивое платье" },
  { emoji: "💐", text: "Букет цветов" },
  { emoji: "🎮", text: "Конструктор Гарри Поттера" },
  { emoji: "❤️", text: "Всю свою любовь" },
  { emoji: "🍽️", text: "Свожу тебя в любимый ресторн" },
  { emoji: "💍", text: "Колечко" },
  { emoji: "🚕", text: "Все-таки продам свою почку и куплю мерседес" },
  { emoji: "🤤", text: "Твои любимые духи" },
];

const titleScreen = document.getElementById("title-screen");
const caseScreen = document.getElementById("case-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const caseElement = document.getElementById("case");
const itemsContainer = document.getElementById("items-container");
const resultItem = document.getElementById("result-item");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-button");

let isSpinning = false;
let currentPosition = 0;
let spinInterval;
let selectedGift;

// Заполняем контейнер предметами
function fillItemsContainer() {
  itemsContainer.innerHTML = "";
  // Добавляем больше предметов для эффекта бесконечной прокрутки
  for (let i = 0; i < 50; i++) {
    const gift = gifts[Math.floor(Math.random() * gifts.length)];
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = gift.emoji;
    item.style.left = `${i * 100}px`;
    item.dataset.emoji = gift.emoji;
    item.dataset.text = gift.text;
    itemsContainer.appendChild(item);
  }
}

// Начинаем вращение
function startSpin() {
  if (isSpinning) return;

  isSpinning = true;
  currentPosition = 0;

  // Скрываем все подсветки
  document.querySelectorAll(".item.highlight").forEach((item) => {
    item.classList.remove("highlight");
  });

  // Запускаем анимацию
  spinInterval = setInterval(() => {
    currentPosition += 10;
    itemsContainer.scrollLeft = currentPosition;

    // Подсвечиваем центральный элемент
    const items = document.querySelectorAll(".item");
    const centerIndex = Math.floor(items.length / 2);

    items.forEach((item, index) => {
      item.classList.remove("highlight");
      if (index === centerIndex) {
        item.classList.add("highlight");
        selectedGift = {
          emoji: item.dataset.emoji,
          text: item.dataset.text,
        };
      }
    });
  }, 50);

  // Останавливаем через случайное время (1-3 секунды)
  setTimeout(stopSpin, 1000 + Math.random() * 2000);
}

// Останавливаем вращение
function stopSpin() {
  clearInterval(spinInterval);
  isSpinning = false;

  // Показываем результат
  showResult();
}

// Показываем результат
function showResult() {
  caseScreen.style.display = "none";
  resultScreen.style.display = "block";

  resultItem.textContent = selectedGift.emoji;
  resultText.textContent = `Я куплю тебе ${selectedGift.text}!`;
}

// Обработчики событий
startButton.addEventListener("click", () => {
  titleScreen.style.display = "none";
  caseScreen.style.display = "block";
  fillItemsContainer();
});

caseElement.addEventListener("click", () => {
  if (!isSpinning) {
    startSpin();
  }
});

restartButton.addEventListener("click", () => {
  resultScreen.style.display = "none";
  caseScreen.style.display = "block";
  fillItemsContainer();
});

// Секретная кнопка
const secretBtn = document.querySelector(".secret-btn");
const secretPage = document.getElementById("secret-page");
const closeBtn = document.getElementById("close-secret");

secretBtn.addEventListener("click", function () {
  secretPage.style.display = "flex";
  createHearts();
});

closeBtn.addEventListener("click", function () {
  secretPage.style.display = "none";
});

// Создание сердечек
function createHearts() {
  // Очищаем предыдущие сердечки
  document.querySelectorAll(".heart").forEach((el) => el.remove());

  // Создаем 30 сердечек
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animationDuration = Math.random() * 3 + 2 + "s";
      secretPage.appendChild(heart);

      // Удаляем сердечко после анимации
      setTimeout(() => {
        heart.remove();
      }, 4000);
    }, i * 200);
  }
}

// Продолжаем создавать сердечки каждые 3 секунды
let heartsInterval;
secretBtn.addEventListener("click", function () {
  createHearts();
  heartsInterval = setInterval(createHearts, 3000);
});

closeBtn.addEventListener("click", function () {
  clearInterval(heartsInterval);
});

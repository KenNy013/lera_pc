document.addEventListener("DOMContentLoaded", function () {
  const messages = [
    "Ты самая прекрасная!",
    "Твоя улыбка освещает мой день",
    "Рядом с тобой я счастлив",
    "Ты делаешь мир лучше",
    "Ты вдохновляешь меня",
    "Спасибо, что ты есть ❤️",
    "Ты - самое лучшее, что со мной случилось",
    "Каждый момент с тобой - подарок",
  ];

  const container = document.getElementById("messagesContainer");
  const heartBtn = document.getElementById("heartBtn");
  const secretBtn = document.getElementById("secretBtn");
  const closeBtn = document.getElementById("closeBtn");
  const secretPage = document.getElementById("secretPage");
  const mainCard = document.getElementById("mainCard");
  const floatingHearts = document.getElementById("floatingHearts");

  // Создаем элементы для всех сообщений
  messages.forEach((msg, index) => {
    const msgElement = document.createElement("div");
    msgElement.classList.add("message");
    if (index === 0) {
      setTimeout(() => {
        msgElement.classList.add("active");
      }, 1200);
    }
    msgElement.textContent = msg;
    container.appendChild(msgElement);
  });

  const messageElements = document.querySelectorAll(".message");
  let currentMessage = 0;
  let autoChangeInterval;

  // Функция показа сообщения
  function showMessage(index) {
    messageElements[currentMessage].classList.remove("active");
    currentMessage = (index + messages.length) % messages.length;
    messageElements[currentMessage].classList.add("active");

    // Анимация перехода
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.opacity = 1;
    }, 300);

    resetAutoChange();
  }

  // Автопереключение сообщений
  function startAutoChange() {
    autoChangeInterval = setInterval(() => {
      showMessage((currentMessage + 1) % messages.length);
    }, 5000);
  }

  function resetAutoChange() {
    clearInterval(autoChangeInterval);
    startAutoChange();
  }

  // Переключение по клику на карточку
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("message")) return;
    showMessage(currentMessage + 1);
  });

  // Анимация сердечка
  heartBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    createHearts(10);
    this.style.animation = "pulse 0.8s ease";

    setTimeout(() => {
      this.style.animation = "";
    }, 800);
  });

  // Создание плавающих сердечек
  function createHearts(count) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-particle");
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 20 + 80 + "%";
      heart.style.fontSize = Math.random() * 0.5 + 0.8 + "rem";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";

      floatingHearts.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 4000);
    }
  }

  // Параллакс эффект
  mainCard.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    mainCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  mainCard.addEventListener("mouseenter", () => {
    mainCard.style.transition = "all 0.1s ease";
  });

  mainCard.addEventListener("mouseleave", () => {
    mainCard.style.transition = "all 0.5s ease";
    mainCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  // Секретная кнопка
  secretBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    secretPage.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    secretPage.classList.remove("show");
  });

  // Запускаем автопереключение
  startAutoChange();
});

let currentHeart = 0;

const pages = document.querySelectorAll(".page");
const hearts = document.querySelectorAll(".heart");
const arrow = document.getElementById("arrow");

function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToGame() {
  showPage("gamePage");
}

function showMessagePage() {
  showPage("messagePage");
}

function showFinalPage() {
  showPage("finalPage");
}

let isDragging = false;

arrow.addEventListener("mousedown", startDrag);
arrow.addEventListener("touchstart", startDrag);

arrow.addEventListener("mouseup", shootArrow);
arrow.addEventListener("touchend", shootArrow);

function startDrag() {
  if (currentHeart >= hearts.length) return;

  isDragging = true;
  arrow.classList.add("dragging");
}

function shootArrow() {
  if (!isDragging) return;

  isDragging = false;
  arrow.classList.remove("dragging");

  arrow.style.transition = "transform 0.35s ease-out";
  arrow.style.transform = "translateX(-50%) translateY(-240px)";

  setTimeout(() => {
    popHeart();
    arrow.style.transition = "transform 0.25s ease";
    arrow.style.transform = "translateX(-50%)";
  }, 350);
}

function popHeart() {
  if (currentHeart >= hearts.length) return;

  const heart = hearts[hearts.length - 1 - currentHeart];
  const text = heart.getAttribute("data-msg");

  const msg = document.createElement("div");
  msg.className = "heart-message";
  msg.innerText = text;
  msg.style.bottom = getComputedStyle(heart).bottom;

  heart.parentElement.appendChild(msg);
  heart.classList.add("pop");

  currentHeart++;

  if (currentHeart === hearts.length) {
    setTimeout(() => {
      showPage("flipPage");
    }, 1800);
  }
}
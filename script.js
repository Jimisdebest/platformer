// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawMenu() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "40px sans-serif";
  ctx.fillText("Start Game", 300, 250);
  // Meer menu-items...
}

drawMenu();

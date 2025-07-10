// Canvas en context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Muziek
const bgMusic = document.getElementById("bgMusic");
const suspenseMusic = new Audio("assets/sounds/spannendemuziek.mp3");

bgMusic.volume = 0.4;
suspenseMusic.volume = 1.0;

// Speler
let player = {
  x: 100,
  y: 400,
  width: 30,
  height: 50,
  color: "#0077cc",
  isDead: false,
  velocityY: 0,
  onGround: false
};

// Platforms & spikes
let platforms = [{ x: 0, y: 450, width: 800, height: 50 }];
let spikes = [{ x: 300, y: 420, width: 20, height: 30 }];

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (player.isDead) return;

  if (e.key === "ArrowRight") player.x += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === " " && player.onGround) {
    player.velocityY = -12;
    player.onGround = false;
  }
}

// Game loop
function startGame() {
  player.isDead = false;
  player.x = 100;
  player.y = 400;
  suspenseMusic.pause();
  suspenseMusic.currentTime = 0;
  bgMusic.volume = 0.4;
  requestAnimationFrame(updateGame);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Zwaartekracht
  player.velocityY += 0.6;
  player.y += player.velocityY;

  // Boden check
  platforms.forEach(p => {
    if (
      player.y + player.height > p.y &&
      player.x + player.width > p.x &&
      player.x < p.x + p.width
    ) {
      player.y = p.y - player.height;
      player.velocityY = 0;
      player.onGround = true;
    }
  });

  // Collision met spikes
  spikes.forEach(spike => {
    if (
      player.x < spike.x + spike.width &&
      player.x + player.width > spike.x &&
      player.y < spike.y + spike.height &&
      player.y + player.height > spike.y
    ) {
      player.isDead = true;
    }
  });

  // Teken speler
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Teken platforms
  ctx.fillStyle = "#444";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));

  // Teken spikes
  ctx.fillStyle = "#cc0000";
  spikes.forEach(s => ctx.fillRect(s.x, s.y, s.width, s.height));

  // Herhalen
  if (!player.isDead) {
    requestAnimationFrame(updateGame);
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "40px sans-serif";
    ctx.fillText("Game Over!", 300, 200);
  }
}

// Muziek aan/uit toggle
function toggleMusic() {
  bgMusic.paused ? bgMusic.play() : bgMusic.pause();
}

// Spanning activeren
function triggerSuspenseMoment() {
  bgMusic.volume = 0.2;
  suspenseMusic.play();

  setTimeout(() => {
    suspenseMusic.volume = 0.3;
    setTimeout(() => {
      suspenseMusic.pause();
      suspenseMusic.currentTime = 0;
      bgMusic.volume = 0.4;
    }, 3000);
  }, 6000);
}

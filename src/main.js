import './style.css';

// Create canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Canvas sizing
let width, height, gridSize = 20;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Snake state
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = {};
let gameOver = false;
let isPaused = false;

function spawnFood() {
  food.x = Math.floor(Math.random() * (width / gridSize));
  food.y = Math.floor(Math.random() * (height / gridSize));
}
spawnFood();

// HUD: Players Count
const hud = document.createElement('div');
hud.style.position = 'fixed';
hud.style.bottom = '10px';
hud.style.right = '10px';
hud.style.color = 'white';
hud.style.fontSize = '12px';
hud.style.fontFamily = 'Arial, sans-serif';
hud.style.userSelect = 'none';
hud.innerText = 'PLAYERS: 1';
document.body.appendChild(hud);

// Pause Button
const pauseButton = document.createElement('button');
pauseButton.innerText = '⏸ Pause';
pauseButton.style.position = 'fixed';
pauseButton.style.bottom = '10px';
pauseButton.style.left = '10px';
pauseButton.style.padding = '8px 12px';
pauseButton.style.fontSize = '12px';
pauseButton.style.cursor = 'pointer';
pauseButton.style.fontFamily = 'Arial, sans-serif';
pauseButton.style.background = '#222';
pauseButton.style.color = '#fff';
pauseButton.style.border = '1px solid #444';
pauseButton.style.borderRadius = '4px';
pauseButton.style.userSelect = 'none';
document.body.appendChild(pauseButton);

// Pause toggle
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.innerText = isPaused ? '▶️ Resume' : '⏸ Pause';
});

// Keyboard controls
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
  if (e.key === 'w' && direction.y === 0) direction = { x: 0, y: -1 };
  if (e.key === 's' && direction.y === 0) direction = { x: 0, y: 1 };
  if (e.key === 'a' && direction.x === 0) direction = { x: -1, y: 0 };
  if (e.key === 'd' && direction.x === 0) direction = { x: 1, y: 0 };
});

// Swipe controls for mobile
let touchStartX = 0;
let touchStartY = 0;
window.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && direction.x === 0) direction = { x: 1, y: 0 };
    if (dx < 0 && direction.x === 0) direction = { x: -1, y: 0 };
  } else {
    if (dy > 0 && direction.y === 0) direction = { x: 0, y: 1 };
    if (dy < 0 && direction.y === 0) direction = { x: 0, y: -1 };
  }
});

// Game Loop
function gameLoop() {
  if (!isPaused && !gameOver) {
    updateGame();
  }

  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 100);
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (head.x < 0) head.x = Math.floor(width / gridSize) - 1;
  if (head.y < 0) head.y = Math.floor(height / gridSize) - 1;
  if (head.x >= Math.floor(width / gridSize)) head.x = 0;
  if (head.y >= Math.floor(height / gridSize)) head.y = 0;

  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      gameOver = true;
    }
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    spawnFood();
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'lime';
  for (let s of snake) {
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

gameLoop();
import './style.css';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height, gridSize = 20;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = {};
let gameOver = false;
let isPaused = false;

// Pause/play button
const pauseBtn = document.createElement('div');
styleButton(pauseBtn);
pauseBtn.style.left = '20px';
pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
document.body.appendChild(pauseBtn);

pauseBtn.onclick = () => {
  isPaused = !isPaused;
  pauseBtn.innerHTML = isPaused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
};

// Refresh/confirm button
const refreshBtn = document.createElement('div');
styleButton(refreshBtn);
refreshBtn.style.right = '20px';
refreshBtn.dataset.state = 'refresh';
refreshBtn.innerHTML = '<i class="fas fa-rotate-right"></i>';
document.body.appendChild(refreshBtn);

refreshBtn.onclick = () => {
  if (refreshBtn.dataset.state === 'refresh') {
    refreshBtn.dataset.state = 'confirm';
    refreshBtn.innerHTML = '<i class="fas fa-check"></i>';
  } else {
    location.reload();
  }
};

// Shared button style
function styleButton(btn) {
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.padding = '6px 12px';
  btn.style.border = '1px solid grey';
  btn.style.borderRadius = '5px';
  btn.style.color = 'grey';
  btn.style.cursor = 'pointer';
  btn.style.userSelect = 'none';
  btn.style.background = 'transparent';
  btn.style.fontSize = '14px';
}

// Game loop
function gameLoop() {
  if (!isPaused && !gameOver) {
    updateGame();
  }
  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 100);
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (width / gridSize));
  food.y = Math.floor(Math.random() * (height / gridSize));
}
spawnFood();

// Game update
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
    
    // Trigger mobile haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
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

// Controls
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

// Swipe gestures
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

gameLoop();
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

let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};
let food = {};
let gameOver = false;

function spawnFood() {
  food.x = Math.floor(Math.random() * (width / gridSize));
  food.y = Math.floor(Math.random() * (height / gridSize));
}
spawnFood();

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', width / 2 - 100, height / 2);
    return;
  }

  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 100);

  const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
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

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction.y === 0) direction = {x: 0, y: -1};
  if (e.key === 'ArrowDown' && direction.y === 0) direction = {x: 0, y: 1};
  if (e.key === 'ArrowLeft' && direction.x === 0) direction = {x: -1, y: 0};
  if (e.key === 'ArrowRight' && direction.x === 0) direction = {x: 1, y: 0};
  if (e.key === 'w' && direction.y === 0) direction = {x: 0, y: -1};
  if (e.key === 's' && direction.y === 0) direction = {x: 0, y: 1};
  if (e.key === 'a' && direction.x === 0) direction = {x: -1, y: 0};
  if (e.key === 'd' && direction.x === 0) direction = {x: 1, y: 0};
});

gameLoop();
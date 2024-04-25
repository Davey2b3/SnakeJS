const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set grid size
const gridSize = 20;

// Set snake starting position and direction
let snakeX = 10;
let snakeY = 10;
let snakeDX = 1;
let snakeDY = 0;

// Set food position
let foodX = Math.floor(Math.random() * (canvas.width / gridSize));
let foodY = Math.floor(Math.random() * (canvas.height / gridSize));

// Set snake body
let snakeBody = [];

// Set score
let score = 0;

// Game over flag
let gameOver = false;

// Load background image
const backgroundImage = new Image();
backgroundImage.src = 'Default_forest_jungle_from_above_1.jpg';
backgroundImage.onload = function() {
  update();
};

// Game loop
function update() {
  if (gameOver) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Move snake
  snakeX += snakeDX;
  snakeY += snakeDY;

  // Wrap around edges
  if (snakeX < 0) snakeX = canvas.width / gridSize - 1;
  if (snakeX >= canvas.width / gridSize) snakeX = 0;
  if (snakeY < 0) snakeY = canvas.height / gridSize - 1;
  if (snakeY >= canvas.height / gridSize) snakeY = 0;

  // Draw snake
  ctx.fillStyle = 'green';
  ctx.fillRect(snakeX * gridSize, snakeY * gridSize, gridSize, gridSize);

  // Add snake body
  snakeBody.push({ x: snakeX, y: snakeY });

  // Draw snake body
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakeBody[i].x * gridSize, snakeBody[i].y * gridSize, gridSize, gridSize);
  }

  // Draw food
  ctx.fillStyle = 'pink';
  ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);

  // Check collision with food
  if (snakeX === foodX && snakeY === foodY) {
    score++;
    foodX = Math.floor(Math.random() * (canvas.width / gridSize));
    foodY = Math.floor(Math.random() * (canvas.height / gridSize));
  } else {
    snakeBody.shift();
  }

  // Check collision with self
  for (let i = 0; i < snakeBody.length - 1; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      gameOver = true;
      alert('Game Over! Score: ' + score);
      location.reload();
    }
  }

  // Update score
  document.title = 'Snake Game - Score: ' + score;

  // Request next frame with a delay
  setTimeout(update, 100);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (snakeDY !== 1) {
        snakeDX = 0;
        snakeDY = -1;
      }
      break;
    case 'ArrowDown':
      if (snakeDY !== -1) {
        snakeDX = 0;
        snakeDY = 1;
      }
      break;
    case 'ArrowLeft':
      if (snakeDX !== 1) {
        snakeDX = -1;
        snakeDY = 0;
      }
      break;
    case 'ArrowRight':
      if (snakeDX !== -1) {
        snakeDX = 1;
        snakeDY = 0;
      }
      break;
  }
});
function setup() {
  createCanvas(900, 900);
}

// a function that draws the background
function gameBackground() {}
function Character(x, y, character) {
  push();
  translate(x, y);
  //The character
  strokeWeight(1);
  background(255, 255, 255);
  //The hat
  fill(255, 255, 255);
  triangle(x - 15, y - 10, x, y - 35, x + 15, y - 10);
  fill(255, 0, 0);
  ellipse(x, y, 35);
  ellipse(x, y - 32, 10);
  fill(0, 0, 0);
  ellipse(x - 12, y - 5, 5);
  ellipse(x - 5, y - 9, 5);
  ellipse(x + 4, y - 9, 5);
  ellipse(x + 11, y - 5, 5);
  //The Body
  fill(255, 255, 255);
  rect(x - 14, y + 25, 30, 35, 5);
  rect(x + 12, y + 25, 10, 15, 5);
  rect(x - 21, y + 25, 10, 15, 5);
  line(x - 8, y + 25, x, y + 30);
  line(x + 7, y + 25, x, y + 30);
  line(x, y + 30, x, y + 55);
  ellipse(x, y + 31, 3);
  ellipse(x, y + 40, 3);
  ellipse(x, y + 49, 3);
  //Hands
  fill(0, 0, 0);
  ellipse(x - 16, y + 57, 10, 12);
  ellipse(x + 17, y + 57, 10, 12);
  fill(255, 200, 150);
  rect(x - 21, y + 37, 10, 17, 1);
  rect(x + 12, y + 37, 10, 17, 1);
  //The Face
  fill(255, 200, 150);
  ellipse(x - 17, y + 10, 5, 10);
  ellipse(x + 17, y + 10, 5, 10);
  ellipse(x, y + 10, 33);
  fill(0, 0, 0);
  arc(x, y + 15, 8, 5, 0, 3.14);
  //The Eyes
  fill(255, 255, 255);
  ellipse(x - 5, y + 8, 5, 2);
  ellipse(x + 5, y + 8, 5, 2);
  fill(0, 0, 0);
  ellipse(x - 5, y + 8, 1);
  ellipse(x + 5, y + 8, 1);
  //The Shoes
  fill(0, 0, 0);
  ellipse(x - 6, y + 90, 15, 20);
  ellipse(x + 8, y + 90, 15, 20);
  //jeans
  fill(255, 0, 0);
  rect(x - 14, y + 55, 15, 35, 1);
  rect(x + 1, y + 55, 15, 35, 1);
  line(x - 5, y + 55, x - 14, y + 65);
  line(x + 6, y + 55, x + 15, y + 65);
  //The skate
  fill(255, 255, 255);
  rect(x - 11, y + 97, 10, 27, 3);
  rect(x + 3, y + 97, 10, 27, 3);
  pop();
}

// game logic variable
let x = 250;
let y = 10;
let gravity = 0.1;
let acceleration = 0.1;
let initialGravity = 0.1;
let landingPadSpeed = 1;

// game state variables
let gameState = true;

function draw() {
  background(255, 255, 255); // Clear background for each frame
  gameBackground();

  // Draw character on top of clouds
  Character(x, y, mouseIsPressed);

  y = x + gravity;
  gravity = gravity + acceleration;

  // decrease the velocity when clicking
  if (mouseIsPressed || keyIsDown(32)) {
    gravity = gravity - 0.5;
  }
}

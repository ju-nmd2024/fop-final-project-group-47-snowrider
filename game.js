//Class imports
import MountainBackground from "./mountainBackground.js";

//Character variable
let characterY;

//Class for snowball
//Using return values, taken inspo from Garrits video about return values:
//https://youtu.be/3KggOvOnxHQ
class SnowBall {
  constructor(x, y, size, speed, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.type = type;
  }

  //Drawing the snowballs and the heart
  draw() {
    push();
    if (this.type == "life") {
      fill(155, 50, 50);
      noStroke();
      drawHeart(this.x, this.y, this.size / 2);
    } else {
      fill(255, 255, 255);
      stroke(0, 0, 0);
      ellipse(this.x, this.y, this.size);
    }
    pop();
  }

  //The continous movement of the heart and snowball
  update() {
    this.y += this.speed;
  }

  //When the snowball and heart is out of canvas it disappears
  offCanvas() {
    return this.y > height + this.size / 2;
  }

  //Collision with the character
  collide(characterX, characterY) {
    //Counting the distance from the character
    let distance = dist(this.x, this.y, characterX, characterY);

    return distance < this.size / 2 + 50;
  }
}

//Class for the logs
//Using return values, taken inspo from Garrits video about return values:
//https://youtu.be/3KggOvOnxHQ
class Logs {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  //Drawing the logs
  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  //Continous movement of the logs
  update() {
    this.x += this.speed;
  }

  //When logs are off the canvas, they disappear
  offCanvas() {
    return this.x > width;
  }

  //Logs collision with the character
  collide(characterX, characterY) {
    return (
      characterX + 50 > this.x &&
      characterX - 50 < this.x + this.width &&
      characterY + 50 > this.y &&
      characterY - 50 < this.y + this.height
    );
  }
}

//Setup function with canvas size
function setup() {
  createCanvas(900, 900);

  noStroke();

  width = 900;
  height = 900;
  characterY = height - 150;
}
window.setup = setup;

//Class variables
const mountainB = new MountainBackground(100, 330);

let gameStart;
let endGame;
let option;

//State variable
let state = "start";
let score = 0;
let lives = 3;

//Control for character variable
let controlMode = "arrow";

//Array variables for snowballs and logs
let snowballs = [];
let logs = [];

//Character variable
let characterX = 450;
let speedY = 0;
const gravity = 0.6;
const jumpStrength = -15;
let isJumping = false;

function preload() {
  gameStart = loadImage("Snow-Rider Start Screen.jpg");
  endGame = loadImage("Snow-Rider End Screen.jpg");
  option = loadImage("Snow-Rider Option Screen.jpg");
}
window.preload = preload;

//Function for the Snowball variables and pushing them into the array
function createSnowball() {
  let snowball = new SnowBall(
    random(50, width - 50),
    370,
    random(100, 200),
    4,
    random() < 0.9 ? "score" : "life"
  );

  snowballs.push(snowball);
}

//Function for the log variables and pushing them into the array
function createLogs() {
  let log = new Logs(-150, 770, random(100, 250), 40, 5);

  logs.push(log);
}

//Function for the mechanics of the snowballs and lifes
function updateSnowballs() {
  for (let i = snowballs.length - 1; i >= 0; i--) {
    let snowball = snowballs[i];
    snowball.update();
    snowball.draw();

    // Check for collision with the character
    //If score snowball collides with character it gives one score
    //It life collides with character it gives one life, character can max get 5 lives
    if (snowball.collide(characterX, height - 100)) {
      if (snowball.type === "score") {
        score++;
      } else if (snowball.type === "life") {
        lives = min(lives + 1, 5);
      }

      //Remove snowball after collision
      snowballs.splice(i, 1);
      continue;
    }

    //When the snowballs out of canvas, they disappear
    if (snowball.offCanvas()) {
      snowballs.splice(i, 1);
    }
  }
}

//Function with log mechanics
function updateLogs() {
  for (let i = logs.length - 1; i >= 0; i--) {
    let log = logs[i];
    log.update();
    log.draw();

    //When log collides with character, it takes away one life
    if (log.collide(characterX, characterY)) {
      lives--;

      //If all lives are lost, the result screen is shown
      if (lives <= 0) {
        state = "result";
      }

      logs.splice(i, 1);
      continue;
    }

    //When log is off canvas, they disappear
    if (log.offCanvas()) {
      logs.splice(i, 1);
    }
  }
}

//Function for when the game is reseted so the score starts at 0 again and the lives starts at 3 again
function resetGame() {
  //Resets the score to 0
  score = 0;
  //Resets the lives to 3
  lives = 3;
  //Goes back to the game screen
  state = "game";
}

//Function for when the mouse is pressed
//Inspired from Garrits video about logical operators
// https://youtu.be/T1tfXGeie7k
function mousePressed() {
  //If statement for when the mouse clicks the buttons in the options screen
  //To be able to change controls for the character movement
  if (state === "options") {
    if (
      mouseX > width / 2 - 335 &&
      mouseX < width / 2 - 85 &&
      mouseY > height / 2 + 50 &&
      mouseY < height / 2 + 130
    ) {
      controlMode = "WASD";
      state = "start";
    }
    if (
      mouseX > width / 2 + 75 &&
      mouseX < width / 2 + 325 &&
      mouseY > height / 2 + 50 &&
      mouseY < height / 2 + 130
    ) {
      controlMode = "arrow";
      state = "start";
    }
    if (
      mouseX > width / 2 - 90 &&
      mouseX < width / 2 + 110 &&
      mouseY > height / 2 + 200 &&
      mouseY < height / 2 + 280
    ) {
      controlMode = "mouse";
      state = "start";
    }
    if (
      mouseX > width / 2 - 425 &&
      mouseX < width / 2 - 95 &&
      mouseY > height / 2 + 350 &&
      mouseY < height / 2 + 430
    ) {
      state = "start";
    }
  }

  //If statement for when the buttons clicks on the start screen
  if (state === "start") {
    if (mouseX > 200 && mouseX < 400 && mouseY > 650 && mouseY < 730) {
      state = "game";
      resetGame();
    }
    if (mouseX > 500 && mouseX < 700 && mouseY > 650 && mouseY < 730) {
      state = "options";
    }
  }

  //If statements for when the mouse clicks the buttons in the end screen
  if (state === "result") {
    if (mouseX > 320 && mouseX < 620 && mouseY > 600 && mouseY < 680) {
      state = "start";
    }
    if (mouseX > 320 && mouseX < 620 && mouseY > 750 && mouseY < 830) {
      resetGame();
    }
  }
}
window.mousePressed = mousePressed;

//Function for when the space is clicked for jumping
//Using key codes as keyboard input, taken from Garrits example video:
//https://youtu.be/BBXc7XMrxgg
function keyPressed() {
  if (keyCode === 32 && !isJumping) {
    speedY = jumpStrength;
    isJumping = true;
  }
}
window.keyPressed = keyPressed;

// Function to draw a heart
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size, y - size, x - size * 1.5, y + size / 2, x, y + size);
  bezierVertex(x + size * 1.5, y + size / 2, x + size, y - size, x, y);
  endShape();
}

//Fucntion to draw the character
function character() {
  // Hat
  fill(100, 100, 100);
  triangle(
    characterX - 17,
    characterY - 65,
    characterX,
    characterY - 90,
    characterX + 17,
    characterY - 65
  );

  fill(255, 50, 50);
  ellipse(characterX, characterY - 60, 36, 20);
  ellipse(characterX, characterY - 66, 35, 10);
  ellipse(characterX, characterY - 90, 10);

  // Jacket
  fill(90, 90, 90);
  rect(characterX - 13, characterY - 35, 30, 40, 10);
  rect(characterX + 12, characterY - 35, 10, 30, 5);
  rect(characterX - 18, characterY - 35, 10, 30, 5);

  push();
  stroke(0, 0, 0);
  line(characterX - 10, characterY - 33, characterX, characterY - 27);
  line(characterX + 10, characterY - 33, characterX, characterY - 27);
  line(characterX, characterY - 33, characterX, characterY);
  pop();

  // Jacket buttons
  fill(0, 0, 0);
  ellipse(characterX, characterY - 27, 5);
  ellipse(characterX, characterY - 16, 5);
  ellipse(characterX, characterY - 4, 5);

  // Hands
  fill(0, 0, 0);
  ellipse(characterX - 16, characterY - 3, 10, 12);
  ellipse(characterX + 18, characterY - 3, 10, 12);

  // Face
  fill(255, 200, 150);
  ellipse(characterX - 17, characterY - 50, 5, 10);
  ellipse(characterX + 17, characterY - 50, 5, 10);
  ellipse(characterX, characterY - 50, 33);

  // Mouth
  fill(0, 0, 0);
  arc(characterX, characterY - 45, 8, 5, 0, PI);
  push();

  // Red part of hat, front
  stroke(255, 50, 50);
  strokeWeight(9);
  line(characterX - 13, characterY - 63, characterX + 13, characterY - 63);
  pop();

  // Black dots on hat
  fill(0, 0, 0);
  ellipse(characterX - 13, characterY - 63, 5);
  ellipse(characterX - 5, characterY - 65, 5);
  ellipse(characterX + 3, characterY - 65, 5);
  ellipse(characterX + 11, characterY - 63, 5);

  // Eyes
  fill(0, 0, 0);
  ellipse(characterX - 7, characterY - 52, 3);
  ellipse(characterX + 7, characterY - 52, 3);

  // Shoes
  fill(0, 0, 0);
  ellipse(characterX - 6, characterY + 35, 15, 20);
  ellipse(characterX + 9, characterY + 35, 15, 20);

  // Jeans
  fill(255, 50, 50);
  rect(characterX - 14, characterY, 15, 33, 5);
  rect(characterX + 1, characterY, 15, 33, 5);

  // Skates
  fill(90, 90, 90);
  rect(characterX - 11, characterY + 40, 10, 27, 3);
  rect(characterX + 4, characterY + 40, 10, 27, 3);

  pop();
}

//Function for when character jumps
function characterJump() {
  if (characterY < height - 150 || speedY !== 0) {
    speedY += gravity;
    characterY += speedY;

    if (characterY > height - 150) {
      characterY = height - 150;
      speedY = 0;
      isJumping = false;
    }
  }
}

//Function for the start screen, with buttons
function startScreen() {
  image(option, 0, 0, width, height);

  //Start and options button
  fill(255, 244, 220);
  rect(width / 2 - 250, height - 250, 200, 80, 30);
  rect(width / 2 + 50, height - 250, 200, 80, 30);

  //Start and Options text for button
  push();
  fill(0, 0, 0);
  textSize(70);
  textStyle(BOLD);
  textSize(30);
  text("START", width / 2 - 195, height - 200);
  text("OPTIONS", width / 2 + 85, height - 200);
  pop();
}

//Fucntion for the options screen with buttons
function optionScreen() {
  image(gameStart, 0, 0, width, height);

  //Buttons rectangles
  fill(255, 244, 220);
  rect(width / 2 - 335, height / 2 + 50, 250, 80, 30);
  rect(width / 2 + 75, height / 2 + 50, 250, 80, 30);
  rect(width / 2 - 90, height / 2 + 200, 200, 80, 30);
  rect(width / 2 - 425, height / 2 + 350, 330, 80, 30);

  //Text outside buttons
  push();
  fill(0, 0, 0);
  textSize(50);
  textStyle(BOLD);
  text("Choose between:", width / 2 - 175, height / 2 - 40);

  //Text in buttons
  textSize(30);
  text("WASD KEYS", width / 2 - 300, height / 2 + 100);
  text("ARROW KEYS", width / 2 + 100, height / 2 + 100);
  text("MOUSE", width / 2 - 45, height / 2 + 250);
  text("Back to startscreen", width / 2 - 400, height / 2 + 400);
  pop();
}

//Function for the game screen
function gameScreen() {
  background(133, 206, 244);
  mountainB.draw();

  //Score text
  push();
  stroke(0, 0, 0);
  fill(0, 0, 0);
  textSize(30);
  text("Score:" + score, width / 2 - 420, height / 2 - 410);
  pop();

  //Lives displayed on screen
  fill(255, 50, 50);
  for (let i = 0; i < lives; i++) {
    ellipse(width / 2 + 410 - i * 40, height / 2 - 415, 30);
  }

  //Character movement depending on what you chose in options screen
  //Using key codes as keyboard input, taken from Garrits example video:
  //https://youtu.be/BBXc7XMrxgg
  if (controlMode === "arrow") {
    if (keyIsDown(37)) {
      characterX -= 15;
    }
    if (keyIsDown(39)) {
      characterX += 15;
    }
  } else if (controlMode === "WASD") {
    if (keyIsDown(65)) {
      characterX -= 15;
    }
    if (keyIsDown(68)) {
      characterX += 15;
    }
  } else if (controlMode === "mouse") {
    characterX = mouseX;
  }

  //Constrains the character from moving outside the canvas
  //https://p5js.org/reference/p5/constrain/
  characterX = constrain(characterX, 50, width - 50);

  characterJump();

  updateSnowballs();
  updateLogs();

  //Spawns the logs at a low rate so they don't overlap eachother or spawn too fast
  if (frameCount % 150 === 0) {
    createLogs();
  }

  //Spawns the snowballs at a medium pace
  if (frameCount % 70 === 0) {
    createSnowball();
  }

  character();
}

//Function for the result screen
function resultScreen() {
  image(endGame, 0, 0, width, height);

  //Rectangles for button for restart and start screen
  fill(255, 244, 220);
  rect(width / 2 - 130, height / 2 + 150, 300, 80, 30);
  rect(width / 2 - 130, height / 2 + 300, 300, 80, 30);

  push();
  //Game over text
  fill(255, 50, 50);
  textSize(70);
  textStyle(BOLD);
  text("GAME OVER", width / 2 - 200, height / 2 - 20);

  //Score text
  fill(0, 0, 0);
  textSize(50);
  textStyle(BOLD);
  text("SCORE: " + score, width / 2 - 100, height / 2 + 100);

  //Text in buttons
  textSize(30);
  text("START SCREEN", width / 2 - 95, height / 2 + 200);
  text("RESTART GAME", width / 2 - 100, height / 2 + 350);
  pop();
}

//Draw function using states
function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "options") {
    optionScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}
window.draw = draw;

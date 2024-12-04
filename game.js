//Class imports
import MountainBackground from "./mountainBackground.js";

//Setup function with canvas size
function setup() {
  createCanvas(900, 900);

  noStroke();

  width = 900;
  height = 900;
}
window.setup = setup;

//Class variables
const mountainB = new MountainBackground(100, 330);

//State variable
state = "start";
let score = 0;
let lives = 3;

//Control for character variable
let controlMode = "arrow";

let snowballs = [];

//Character variable
let characterX = 450;
let characterY = height - 150;
let speedY = 0;
const gravity = 0.8;
const jumpStrength = -15;
let isJumping = false;

function createSnowball() {
  let snowball = {
    //Random x positioning
    x: random(50, width - 50),
    //Y position for the spawning
    y: 370,
    //Size of the snowballs
    size: 150,
    //Random speeds for the snowballs
    speed: 7,

    //Random type of snowball
    type: random() < 0.4 ? "score" : random() < 0.7 ? "monster" : "life",
  };
  snowballs.push(snowball);
}

function updateSnowballs() {
  for (let i = snowballs.length - 1; i >= 0; i--) {
    let snowball = snowballs[i];
    snowball.y += snowball.speed;

    //Draw the snowballs
    push();
    if (snowball.type === "monster") {
      fill(255, 0, 0);
    } else if (snowball.type === "life") {
      fill(0, 255, 0);
    } else {
      fill(255, 255, 255);
    }
    stroke(0, 0, 0);
    ellipse(snowball.x, snowball.y, snowball.size);
    /*stroke(0, 0, 0);
    fill(255, 255, 255);
    ellipse(snowball.x, snowball.y, snowball.size);*/
    pop();

    //Check for collision with charcater
    let distance = dist(snowball.x, snowball.y, characterX, height - 100);

    if (distance < snowball.size / 2 + 50) {
      //If the snowball is "good" increase score
      if (snowball.type === "score") {
        score++;
      } else if (snowball.type === "monster") {
        lives--;

        //If all there's no lives left, the game is over
        if (lives <= 0) {
          state = "result";
        }
      } else if (snowball.type === "life") {
        //Gain one life, you can get max 5 lifes
        lives = min(lives + 1, 5);
      }
      //Remove snowball after collision
      snowballs.splice(i, 1);
      continue;
    }

    //Remove the snowballs when they come to the end of the canvas
    if (snowball.y > height + snowball.size / 2) {
      snowballs.splice(i, 1);
    }
  }
}

//Function for when the game is reseted
function resetGame() {
  //Resets the score to 0
  score = 0;

  //Resets the lives to 3
  lives = 3;

  //Resets the snowballs
  snowballs = [];

  //Goes back to the game screen
  state = "game";
}

//Function for when the mouse is pressed
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

function keyPressed() {
  if (keyCode === 32 && !isJumping) {
    speedY = jumpStrength;
    isJumping = true;
  }
}
window.keyPressed = keyPressed;

function character() {
  push();
  stroke(0, 0, 0);
  fill(255, 255, 255);
  rect(characterX - 50, characterY, 100, 100);
  pop();
}

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
  background(133, 206, 244);
  mountainB.draw();

  //Start and options button
  fill(255, 244, 220);
  rect(width / 2 - 250, height - 250, 200, 80, 30);
  rect(width / 2 + 50, height - 250, 200, 80, 30);

  //Start and Options text for button
  push();
  fill(0, 0, 0);
  textSize(70);
  textStyle(BOLD);
  text("SNOW-RIDER", width / 2 - 200, height / 2 - 20);
  textSize(30);
  text("START", width / 2 - 195, height - 200);
  text("OPTIONS", width / 2 + 85, height - 200);
  pop();
}

//Fucntion for the options screen with buttons
function optionScreen() {
  background(133, 206, 244);
  mountainB.draw();

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
  text("Choose between:", width / 2 - 175, height / 2 - 50);

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
  push();
  fill(255, 50, 50);
  for (let i = 0; i < lives; i++) {
    ellipse(width / 2 + 410 - i * 40, height / 2 - 415, 30);
  }
  pop();
  //Character movement
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
  characterX = constrain(characterX, 50, width - 50);

  characterJump();

  updateSnowballs();

  if (frameCount % 20 === 0) {
    createSnowball();
  }

  character();
  //character.draw();
}

//Function for the result screen
function resultScreen() {
  background(133, 206, 244);
  mountainB.draw();

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

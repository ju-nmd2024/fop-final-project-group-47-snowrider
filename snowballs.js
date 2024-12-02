export default class Snowballs {
  constructor() {
    this.x = random(50, width - 50);
    this.y = 370;
    this.size = 150;
    this.speed = 7;
    this.type = random() < 0.4 ? "score" : random() < 0.7 ? "monster" : "life";
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    push();
    if (this.type === "monster") {
      fill(255, 50, 50);
    } else if (this.type === "life") {
      fill(255, 50, 50);
    } else {
      fill(255, 0, 0);
    }

    stroke(0, 0, 0);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  outOfCanvas() {
    return this.y > height + this.size / 2;
  }

  checkCollision(characterX, characterY) {
    let distance = dist(this.x, this.y, characterX, characterY);
    return distance < this.size / 2 + 50;
  }
}

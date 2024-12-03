let x = 450;
let y = 450;
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
ellipse(438, 446, 5);
ellipse(445, 441, 5);
ellipse(454, 441, 5);
ellipse(461, 446, 5);

//The Body
fill(255, 255, 255);
rect(436, 475, 30, 35, 5);
rect(462, 475, 10, 15, 5);
rect(429, 475, 10, 15, 5);
line(442, 475, 450, 480);
line(457, 475, 450, 480);
line(450, 480, 450, 505);
ellipse(450, 481, 3);
ellipse(450, 490, 3);
ellipse(450, 499, 3);

//Hands
fill(0, 0, 0);
ellipse(x - 16, y + 57, 10, 12);
ellipse(x + 17, y + 57, 10, 12);
fill(255, 200, 150);
rect(429, 487, 10, 17, 1);
rect(462, 487, 10, 17, 1);

//The Face
fill(255, 200, 150);
ellipse(x - 17, y + 10, 5, 10);
ellipse(x + 17, y + 10, 5, 10);
ellipse(x, y + 10, 33);
fill(0, 0, 0);
arc(450, 465, 8, 5, 0, 3.14);

//The Eyes
fill(255, 255, 255);
ellipse(x - 5, y + 8, 5, 2);
ellipse(x + 5, y + 8, 5, 2);
fill(0, 0, 0);
ellipse(445, 458, 1);
ellipse(455, 458, 1);

//The Shoes
fill(0, 0, 0);
ellipse(444, 540, 15, 20);
ellipse(458, 540, 15, 20);

//jeans
fill(255, 0, 0);
rect(436, 505, 15, 35, 1);
rect(451, 505, 15, 35, 1);
line(445, 505, 436, 515);
line(456, 505, 465, 515);

//The skate
fill(255, 255, 255);
rect(x - 11, y + 97, 10, 27, 3);
rect(x + 3, y + 97, 10, 27, 3);
pop();

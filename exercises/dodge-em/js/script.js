/**
Exercise: Dodge 'em!
Wayne Huras
ID: 40074423

Brief:
- Change the way the user controls their circle
- Add at least one new if-statement (including at least an else) that changes the nature of the simulation
- Change the way the simulation looks
- Use at least one image

Evaluation:
- Runs and meets the brief
- Has suitable commenting
- Includes a starting commit and then a reasonable number of commits throughout the work that include descriptive messages about what was done. Messages should be prefixed by Ex:,
- Uses good naming for added variables
- Is well structured, with new code added in sensible places in sensible orders
*/

"use strict";

let groundColor = "#abd3d2";
let snowColor = "#bcdddb";

let coal = {
  x: 0,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 5,
  image: undefined
};

let user = {
  x: 250,
  y: 250,
  size: 100,
  imageHappy: undefined,
  imageNormal: undefined
};

/**
Description of preload
*/
function preload() {
  user.imageHappy = loadImage("assets/images/snowman_happy.png");
  user.imageNormal = loadImage("assets/images/snowman_normal.png");
  coal.image = loadImage("assets/images/coal.png");
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  coal.y = random(0, height);
  coal.vx = coal.speed;

  noCursor();
  imageMode(CENTER);
}


/**
Description of draw()
*/
function draw() {
  // Background display
  background(color(groundColor));
  createHills();

  // Coal movement
  coal.x += coal.vx;
  coal.y += coal.vy;

  if(coal.x > width){
    coal.x = 0;
    coal.y = random(0, height);
  }

  // User movement
  user.x = mouseX;
  user.y = mouseY;

  // Check for hit by coal
  let d = dist(user.x, user.y,  coal.x, coal.y);
  if(d <= coal.size/2 + user.size/2){
    noLoop();
  }

  // Coal Display
  image(coal.image, coal.x, coal.y, coal.size, coal.size);

  // User Display
  image(user.imageNormal, user.x, user.y);

}

function createHills(){
  push();
  noFill();
  stroke(color(snowColor));
  strokeWeight(10);

  let offset = 100;

  for(let i =  0; i * offset < width; i++){
    for(let j = 0; j * offset < height; j++){
      bezier(
        i * offset,
        j * offset,
        i * offset,
        100 + j * offset,
        300 + i * offset,
        100 + j * offset,
        400 + i * offset,
        150 + j * offset);
    }
  }

  pop();
}

/**
Exercise: Dodge 'em!
Wayne Huras
ID: 40074423

Brief:
x Change the way the user controls their circle
x Add at least one new if-statement (including at least an else) that changes the nature of the simulation
x Change the way the simulation looks
x Use at least one image

Evaluation:
x Runs and meets the brief
x Has suitable commenting
x Includes a starting commit and then a reasonable number of commits throughout the work that include descriptive messages about what was done. Messages should be prefixed by Ex:,
x Uses good naming for added variables
x Is well structured, with new code added in sensible places in sensible orders
*/

"use strict";

let groundColor = "#abd3d2";
let snowColor = "#bcdddb";
let imageGameOver;
let canReset = false;
let coals = [];

let snowman = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined,
  imageHappy: undefined,
  imageNormal: undefined
};

let coal1 = {
  x: 0,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 2,
  image: undefined,
  angle: 0,
  rotationSpeed: 0.02
};

let coal2 = {
  x: 0,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 5,
  image: undefined,
  angle: 0,
  rotationSpeed: 0.05
};

let coal3 = {
  x: 0,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 10,
  image: undefined,
  angle: 0,
  rotationSpeed: 0.1
};


/**
Description of preload
*/
function preload() {
  imageGameOver = loadImage("assets/images/gameOver.png");

  snowman.imageHappy = loadImage("assets/images/snowman_happy.png");
  snowman.imageNormal = loadImage("assets/images/snowman_normal.png");
  snowman.image = snowman.imageNormal;

  coal1.image = loadImage("assets/images/coal.png");
  coal2.image = loadImage("assets/images/coal.png");
  coal3.image = loadImage("assets/images/coal.png");
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  coals[0] = coal1;
  coals[1] = coal2;
  coals[2] = coal3;

  resetCoalsPositions();

  imageMode(CENTER);
}


/**
Description of draw()
*/
function draw() {

  background(color(groundColor));
  displayHills();

  coalMovement();

  displayCoals();
  displaySnowman();

  hitCheck();
}

/**
Changes snowman position based on dragged mouse position.
*/
function mouseDragged(){
  if(dist(mouseX, mouseY, snowman.x, snowman.y) < snowman.size / 2){
    snowman.x = mouseX;
    snowman.y = mouseY;
  }
}

/**
If the snowman has been hit by a lump of coal, it is game over. If it is
gameOver the player can press the mouse button to reset the game.
*/
function mousePressed(){
  if(canReset){
    canReset = false;
    resetCoalsPositions();
    loop();
  }
}

/**
Checks if the snowman is overlapping with any pieces of coal. If so, the game
is over.
*/
function hitCheck(){
  for(let i = 0; i < coals.length; i ++){
    let d = dist(snowman.x, snowman.y,  coals[i].x, coals[i].y);
    if(d <= coals[i].size/2 + snowman.size/2){
      noLoop();
      background(0, 0, 0, 100);
      image(imageGameOver, width/2, height/2);
      canReset = true;
    }
  }
}

/**
Resets the position of all coal pieces to x = 0, y = random();
*/
function resetCoalsPositions(){
  for(let i = 0; i < coals.length; i++){
    coals[i].y = random(0, height);
    coals[i].x = 0;
    coals[i].vx = coals[i].speed;
  }
}

/**
Displays the snowman image. If the mouse is hovering over the image, or dragging
the image, then the switches to a happy snowman picture.
*/
function displaySnowman(){
  if(dist(mouseX, mouseY, snowman.x, snowman.y) < snowman.size / 2){
    snowman.image = snowman.imageHappy;
  }else{
    snowman.image = snowman.imageNormal;
  }
  image(snowman.image, snowman.x, snowman.y, snowman.size, snowman.size);
}

/**
Displays the coals flying across the screen at their own various speeds and
rotations.
*/
function displayCoals(){
  for(let i = 0; i < coals.length; i++){
    push();
    translate(coals[i].x, coals[i].y);
    rotate(coals[i].angle);
    coals[i].angle += coals[i].rotationSpeed;
    image(coals[i].image, 0, 0, coals[i].size, coals[i].size);
    pop();
  }
}

/**
Handles the movement calculations for the coals.
*/
function coalMovement(){
  for(let i = 0; i < coals.length; i++){
    coals[i].x += coals[i].vx;
    coals[i].y += coals[i].vy;
    if(coals[i].x > width){
      coals[i].x = 0;
      coals[i].y = random(0, height);
    }
  }
}

/**
Creates bezier curves to immitate a snowy background.
*/
function displayHills(){
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

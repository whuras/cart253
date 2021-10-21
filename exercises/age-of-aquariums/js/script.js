/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423
Brief:
x Add a user-controlled shape (or image)
- Make the user interact with the fish (or whatever they are in your simulation)
x Change the fish (or whatever) creation
- Add at least two endings

Evaluation:
- Functional (40%)
- Stylish (20%)
- Committed (20%)
- Creative (20%)
**************************************************/

"use strict";

let school = [];
let schoolSize = 10;

let avoLeft;
let avoRight;
let avoImgWidth = 105;
let avoImgHeight = 190;

let dinoImgWidth = 263;
let dinoImgHeight = 136;
let dinoNomImgWidth = 187;
let dinoNomImgHeight = 190;
let aniIndex = 0;
let dinoAnimationFrames = [];
let eatingAnimationFrames = [];

let isEating = false;
let eatingTimer = 1;
let timer = 0;

let prevX = 0;
let flip = false;

let state;
let states = {
  TITLE: "title",
  INIT: "init",
  SIM: "sim",
  ENDUNO: "end1",
  ENDDOSO: "end2"
}

/**
Description of preload
*/
function preload() {
  avoLeft = loadImage("assets/images/avo_left.png");
  avoRight = loadImage("assets/images/avo_right.png");

  // load dino sprites
  dinoAnimationFrames[0] = loadImage("assets/images/dino6.png");
  dinoAnimationFrames[1] = loadImage("assets/images/dino5.png");
  dinoAnimationFrames[2] = loadImage("assets/images/dino4.png");
  dinoAnimationFrames[3] = loadImage("assets/images/dino3.png");
  dinoAnimationFrames[4] = loadImage("assets/images/dino2.png");
  dinoAnimationFrames[5] = loadImage("assets/images/dino1.png");

  eatingAnimationFrames[0] = loadImage("assets/images/dinonom1.png");
  eatingAnimationFrames[1] = loadImage("assets/images/dinonom2.png");
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  state = states.TITLE;
}

/**
Description of draw()
*/
function draw() {

  background(color("#8EB1C7"));
  drawGround();

  if(isEating){
    eatAnimation();
  }else{
    dinoAnimation();
  }

  if(state == states.TITLE){
    title();
  }
  else if(state == states.INIT){
    init();
  }
  else if(state == states.SIM){
    sim();
  }
  else if(state == states.ENDUNO){

  }
  else if(state == states.ENDDOS){

  }

}


function drawSun(){
  push();
  noStroke;

  fill();
  ellipse();

  pop();
}

function drawGround(){
  push();
  rectMode(CENTER);
  noStroke();
  fill(color("#8C7051"));
  rect(width/2, height/5 * 3, width, height/5 * 4);
  pop();
}


function eatAnimation(){

  let yConstrained = constrain(mouseY, height/5, height);

  let hScalar = map(mouseY, 0, height, 0.25, 1);
  let scaledHeight = dinoNomImgHeight * hScalar;

  let wScalar = map(mouseY, 0, height, 0.25, 1);
  let scaledWidth = dinoNomImgWidth * wScalar;

  if(frameCount % 60 == 0 && timer < eatingTimer){
    timer++;
  }
  else if(timer >= eatingTimer){
    timer = 0;
    isEating = false;
    aniIndex = 0;
  }

  if(mouseX > prevX){
    flip = true;
  }else if(mouseX < prevX){
    flip = false;
  }

  if(flip){
    push();
    scale(-1, 1);
    image(eatingAnimationFrames[floor(aniIndex/5)], -mouseX, yConstrained, scaledWidth, scaledHeight);
    pop();
  }else{
    image(eatingAnimationFrames[floor(aniIndex/5)], mouseX, yConstrained, scaledWidth, scaledHeight);
  }

  aniIndex++;
  if (aniIndex > 9){
    aniIndex = 0;
  }
  prevX = mouseX;
}


function dinoAnimation(){

  let yConstrained = constrain(mouseY, height/5, height);

  let hScalar = map(mouseY, 0, height, 0.25, 1);
  let scaledHeight = dinoImgHeight * hScalar;

  let wScalar = map(mouseY, 0, height, 0.25, 1);
  let scaledWidth = dinoImgWidth * wScalar;

  if(mouseX > prevX){
    flip = true;
  }else if(mouseX < prevX){
    flip = false;
  }

  if(flip){
    push();
    scale(-1, 1);
    image(dinoAnimationFrames[floor(aniIndex/5)], -mouseX, yConstrained, scaledWidth, scaledHeight);
    pop();
  }else{
    image(dinoAnimationFrames[floor(aniIndex/5)], mouseX, yConstrained, scaledWidth, scaledHeight);
  }

  aniIndex++;
  if (aniIndex > 25){
    aniIndex = 0;
  }
  prevX = mouseX;
}


function title(){
  state = states.INIT;
}


function init(){
  for(let i = 0; i < schoolSize; i++){
    let fish = createFish(random(0, width), random(0, height));
    school.push(fish);
  }

  state = states.SIM;
}


function sim(){
  for(let i = 0; i < school.length; i++){
    moveFish(school[i]);
    displayFish(school[i]);
  }
}


function createFish(x, y){
  let fish = {
    x: x,
    y: y,
    fWidth: avoImgWidth,
    fHeight: avoImgHeight,
    vx: 0,
    vy: 0,
    speed: 2
  }
  return fish;
}

// chooses whether a fish changes directions and moves it
function moveFish(fish){
  // choose whether to change direction
  let change = random(0, 1);
  if(change < 0.05){
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, height/5, height);
}

// displays the provided fish on the canvas
function displayFish(fish){
  push();

  let hScalar = map(fish.y, 0, height, 0.25, 1);
  let scaledHeight = fish.fHeight * hScalar;

  let wScalar = map(fish.y, 0, height, 0.25, 1);
  let scaledWidth = fish.fWidth * wScalar;

  let img = fish.vx > 0 ? avoRight : avoLeft;
  image(img, fish.x, fish.y, scaledWidth, scaledHeight);
  pop();
}

// creates a fish at the mouse position
function mousePressed(){
  //let fish = createFish(mouseX, mouseY);
  //school.push(fish);

  aniIndex = 0;
  isEating = true;
}

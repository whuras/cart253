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

let gameTimer = 10;
let timer = 0;

let avoLeft;
let avoRight;
let avoImgWidth = 105;
let avoImgHeight = 190;

let dinoSleepImg;
let dinoSleepImgWidth = 195;
let dinoSleepImgHeight = 100;
let dinoImgWidth = 263;
let dinoImgHeight = 136;
let dinoNomImgWidth = 187;
let dinoNomImgHeight = 190;
let aniIndex = 0;
let dinoAnimationFrames = [];
let eatingAnimationFrames = [];


let isEating = false;
let eatTimer = 1;
let eatingTimer = 0;

let explosionInterval = 3;
let explosionTimer = 0;

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

  dinoSleepImg = loadImage("assets/images/dinosleep.png");
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  state = states.TITLE;
}

/**
Description of draw()
*/
function draw() {
  background(color("#8EB1C7"));

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
    ending(eatingAnimationFrames[0], "Oops, the meteor crashed before the dinosaur could eat its fill! Looks like it died on an empty stomach :(", dinoNomImgWidth, dinoNomImgHeight);
  }
  else if(state == states.ENDDOS){
    ending(dinoSleepImg, "Aww, the dinosaur is sleeping soundly with a full stomach. It didn't even notice the apocalypse :)", dinoSleepImgWidth, dinoSleepImgHeight);
  }
}


function drawMeteor(x, y){
  push();
  rotate(radians(5));
  ellipseMode(CENTER);
  noStroke();

  fill(250, 225, 103, 64);
  ellipse(x - 150, y, 400, 125);

  fill(250, 225, 103, 128);
  ellipse(x - 50, y, 200, 100);

  fill(250, 225, 103, 255);
  ellipse(x, y, 100, 100);

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

  if(frameCount % 60 == 0 && eatingTimer < eatTimer){
    eatingTimer++;
  }
  else if(eatingTimer >= eatTimer){
    eatingTimer = 0;
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
  // game timer
  if(frameCount % 60 == 0 && timer < gameTimer){
    timer++;
  }
  else if(timer >= gameTimer){
    state = school.length > 0 ? states.ENDUNO : states.ENDDUO;
  }

  // meteor animation
  let meteorX = map(timer, 0, gameTimer, 0, width);
  //let meteorY = map(timer, 0, gameTimer, 0, height/5);
  drawMeteor(meteorX, 0);

  drawGround();

  // dino animation
  if(isEating){
    eatAnimation();
  }else{
    dinoAnimation();
  }

  // handle avo movement and display
  for(let i = 0; i < school.length; i++){
    moveFish(school[i]);
    displayFish(school[i]);
  }
}


function ending(img, t, w, h){
  //let explosionInterval = 10;
  //let explosionTimer = 0;

  drawGround();

  push();
  image(img, 400, 400, w * 2, h * 2);
  pop();

  let explosionX = map(timer, 0, gameTimer, 0, width);
  if(frameCount % 60 == 0 && explosionTimer < explosionInterval){
    explosionTimer++;
  }
  else if(explosionTimer >= explosionInterval){
    explosionTimer = 0;
  }

  push();
  noStroke();
  ellipseMode(CENTER);

  fill(232,49,81,50);
  ellipse(explosionX, height/5, width * (explosionTimer + 1), width * (explosionTimer + 1));

  fill(232,49,81,100);
  ellipse(explosionX, height/5, width * (explosionTimer + 1) / 2, width * (explosionTimer + 1) / 2);

  fill(232,49,81,200);
  ellipse(explosionX, height/5, width * (explosionTimer + 1) / 3, width * (explosionTimer + 1) / 3);

  fill(232,49,81,255);
  ellipse(explosionX, height/5, width * (explosionTimer + 1) / 4, width * (explosionTimer + 1) / 4);
  pop();

  push();
  fill(0, 0, 0, 100);
  rect(10, 10, 400, 250);
  fill(255);
  textSize(32);
  text(t, 15, 15, 400, 200);
  textSize(16);
  text("Press F5 to restart.", 15, 200, 200, 20);
  pop();
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

  imageMode(CENTER);
  image(img, fish.x, fish.y, scaledWidth, scaledHeight);
  pop();
}


function mousePressed(){

  for(let i = 0; i < school.length; i++){
    let fish = school[i];
    let d = dist(fish.x, fish.y, mouseX, mouseY);
    if(d < (avoImgWidth + avoImgWidth) / 4){
      school.splice(i, 1);
    }
  }

  aniIndex = 0;
  isEating = true;
}

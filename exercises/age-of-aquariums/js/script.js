/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423
Brief: Focus on for-loops, arrays, and random selection..
x Add a user-controlled shape (or image)
x Make the user interact with the avocado (or whatever they are in your simulation)
x Change the avocado (or whatever) creation
x Add at least two endings

Evaluation:
- Functional (40%)
- Stylish (20%)
- Committed (20%)
- Creative (20%)
**************************************************/

"use strict";

let swarm = [];
let dinoAnimationFrames = [];
let eatingAnimationFrames = [];

let swarmSize = 10;

let gameTimer = 8;
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

let isEating = false;
let eatTimer = 1;
let eatingTimer = 0;

let meteorTails = 3;
let explosionRadiants = 4;
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
  // load sprites
  avoLeft = loadImage("assets/images/avo_left.png");
  avoRight = loadImage("assets/images/avo_right.png");

  dinoSleepImg = loadImage("assets/images/dinosleep.png");

  for(let i = 0; i < 6; i++){
    dinoAnimationFrames[i] = loadImage("assets/images/dino" + (6 - i) + ".png");
  }

  for(let i = 0; i < 2; i++){
    eatingAnimationFrames[i] = loadImage("assets/images/dinonom" + (i + 1) + ".png");
  }
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

  switch(state){
    case states.TITLE:
      title();
      break;
    case states.INIT:
      init();
      break;
    case states.SIM:
      sim();
      break;
    case states.ENDUNO:
      ending(eatingAnimationFrames[0], "Oops, the meteor crashed before the dinosaur could eat its fill! Looks like it died on an empty stomach :(", dinoNomImgWidth, dinoNomImgHeight);
      break;
    case states.ENDDOS:
      ending(dinoSleepImg, "Aww, the dinosaur is sleeping soundly with a full stomach. It didn't even notice the apocalypse :)", dinoSleepImgWidth, dinoSleepImgHeight);
      break;
    default:
      print("Error in draw state switch.");
  }
}


function drawMeteor(){
  let x = map(timer, 0, gameTimer, 0, width);
  let y = 0;

  push();
  rotate(radians(5));
  ellipseMode(CENTER);
  noStroke();
  for(let i = meteorTails; i > 0; i--){
    fill(250, 225, 103, 255 / i);
    ellipse(x - (i - 1) * 100, y, 100 + (i - 1) * 200, 100 + (i - 1) * 10);
  }
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
  if (aniIndex > 24){
    aniIndex = 0;
  }
  prevX = mouseX;
}


function title(){
  push();
  background(0, 104, 56);
  rectMode(CENTER);
  stroke(189, 213, 72);
  strokeWeight(5);
  fill(236, 250, 115);
  rect(width/2, height/2, width/2, height/2);

  noStroke();
  fill(143, 78, 17);
  textAlign(CENTER);
  textSize(64);
  text("Avocalypse", width/2, height/3);
  textSize(32);
  text("Help the Dino eat his full before certain DOOM!\nInstructions: Click to nom.\nClick anywhere to continue.", width/2, height/2);
  pop();
}


function init(){
  for(let i = 0; i < swarmSize; i++){
    let avocado = createAvocado(random(0, width), random(0, height));
    swarm.push(avocado);
  }
  state = states.SIM;
}


function sim(){
  // game timer
  if(frameCount % 60 == 0 && timer < gameTimer){
    timer++;
  }
  else if(timer >= gameTimer){
    state = swarm.length > 0 ? states.ENDUNO : states.ENDDUO;
  }

  drawMeteor();
  drawGround();

  // dino animation
  if(isEating){
    eatAnimation();
  }else{
    dinoAnimation();
  }

  // handle avo movement and display
  for(let i = 0; i < swarm.length; i++){
    moveAvocado(swarm[i]);
    displayAvocado(swarm[i]);
  }
}


function ending(img, t, w, h){
  drawGround();

  // dino image
  push();
  imageMode(CENTER);
  image(img, width/2, height/2, w * 2, h * 2);
  pop();

  // Explosion animation
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
  for(let i = 0; i < explosionRadiants + 1; i++){
    fill(232, 49, 81, 50 * i);
    ellipse(explosionX, height / (explosionRadiants + 1), width * (explosionTimer + 1) / (1 + i), width * (explosionTimer + 1) / (1 + i));
  }
  pop();

  // ending text
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


function createAvocado(x, y){
  let avocado = {
    x: x,
    y: y,
    fWidth: avoImgWidth,
    fHeight: avoImgHeight,
    vx: 0,
    vy: 0,
    speed: 2
  }
  return avocado;
}

// chooses whether a avocado changes directions and moves it
function moveAvocado(avocado){
  // choose whether to change direction
  let change = random(0, 1);
  if(change < 0.05){
    avocado.vx = random(-avocado.speed, avocado.speed);
    avocado.vy = random(-avocado.speed, avocado.speed);
  }

  // move the avocado
  avocado.x = avocado.x + avocado.vx;
  avocado.y = avocado.y + avocado.vy;

  // constrain the avocado to the canvas
  avocado.x = constrain(avocado.x, 0, width);
  avocado.y = constrain(avocado.y, height/5, height);
}

// displays the provided avocado on the canvas
function displayAvocado(avocado){
  push();

  let hScalar = map(avocado.y, 0, height, 0.25, 1);
  let scaledHeight = avocado.fHeight * hScalar;

  let wScalar = map(avocado.y, 0, height, 0.25, 1);
  let scaledWidth = avocado.fWidth * wScalar;

  let img = avocado.vx > 0 ? avoRight : avoLeft;

  imageMode(CENTER);
  image(img, avocado.x, avocado.y, scaledWidth, scaledHeight);
  pop();
}


function mousePressed(){
  if(state == states.TITLE){
    state = states.INIT;
  }
  else if(state == states.SIM){
    for(let i = 0; i < swarm.length; i++){
      let avocado = swarm[i];
      let d = dist(avocado.x, avocado.y, mouseX, mouseY);
      if(d < (avoImgWidth + avoImgWidth) / 3){
        swarm.splice(i, 1);
      }
    }
    aniIndex = 0;
    isEating = true;
  }
}

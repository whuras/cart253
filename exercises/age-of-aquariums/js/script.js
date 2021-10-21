/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423
Brief:
- Add a user-controlled shape (or image)
- Make the user interact with the fish (or whatever they are in your simulation)
- Change the fish (or whatever) creation
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
let imgWidth = 105;
let imgHeight = 190;

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
  background(color("#5C9EAD"));

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
    fWidth: imgWidth,
    fHeight: imgHeight,
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
  fish.y = constrain(fish.y, 0, height);
}

// displays the provided fish on the canvas
function displayFish(fish){
  push();
  let img = fish.vx > 0 ? avoRight : avoLeft;
  image(img, fish.x, fish.y);
  //fill(200, 100, 100);
  //noStroke();
  //ellipse(fish.x, fish.y, fish.size);
  pop();
}

// creates a fish at the mouse position
function mousePressed(){
  let fish = createFish(mouseX, mouseY);
  school.push(fish);
}

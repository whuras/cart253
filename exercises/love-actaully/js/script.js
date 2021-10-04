/**************************************************
Exercise: Love, actually!
Wayne Huras ID 40074423

Brief:
- Allow the user to control one of the circles
- Make the non-user circle move differently
- Add at least one extra function
- Add at least one extra ending

Evaluation:
- Functional: The program runs and meets the brief in terms of functionality and code requirements, shows mastery of the course material
- Stylish: Code follows the relevant parts of the style guide
- Committed: Commits and messages follow the style guide
- Creative: The program is an interesting and expressive experience for the user
**************************************************/

"use strict";

let bgColor = undefined;
let startBGColor = 'rgba(128,128,128,255)';
let endBGColor = 'rgba(255,128,255,255)';

let timer = 5;

let state = undefined;
const states = {
  START: "start",
  SIM: "sim",
  SEND: "END"
}

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  bgColor = startBGColor;
  state = states.START;

  textSize(64);
  fill(255);
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

  if(state == states.START){
    startSim();
  }
  else if(state == states.END){
    endSim();
  }
}

function keyPressed(){
  state = states.END;
}

function startSim(){
  bgColor = startBGColor;
  text("game started", width/2, height/2);
}

function endSim(){
  bgColor = endBGColor;
  text("game over", width/2, height/2);

  // timer credit: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  if(frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  if(timer <= 0){
    timer = 0;
    state = states.START;
  }
}

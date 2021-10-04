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

let heartSize = 200;

let player;
let npc;

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

  player = new Character(100, 100, 10);
  npc = new Character(200, 200, 20);

  textSize(64);
  fill(255);
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

  player.display();
  npc.display();

/*
  if(state == states.START){
    startSim();
  }
  else if(state == states.END){
    endSim();
  }*/
}

function keyPressed(){
  state = states.END;
}

function startSim(){
  bgColor = startBGColor;
  //drawHearts();
}

function endSim(){
  bgColor = endBGColor;

  // timer credit: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  if(frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  if(timer <= 0){
    timer = 0;
    state = states.START;
  }

}

// heart credit: https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
function drawHearts(){
  for(let i = 0; i < width; i+= heartSize){
    for(let j = 0; j < height; j+=heartSize){
      fill(255,128,255);
      heartShape(i + heartSize/2, j + heartSize/2, heartSize/2);
    }
  }
}

function heartShape(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

class Character{
  constructor(x, y, d){
    this.x = x;
    this.y = y;
    this.diameter = d;

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
  }

  color(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  display(){
    push();
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.diameter, this.diameter)
    pop();
  }
}

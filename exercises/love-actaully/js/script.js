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
let startBGColor = 'rgba(224,255,236,255)';
let endBGColor = 'rgba(255,128,255,255)';

let timer = 5;

let state = undefined;
const states = {
  OPENING: "opening",
  START: "start",
  INPROGRESS: "inprogress",
  END: "end"
}

let player;
let npc;
let randDirection = [-1, 1];

let hearts = [];
let heartSize = 200;

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
  state = states.OPENING;

  noCursor();
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
  else if(state == states.INPROGRESS){
    sim();
  }
  else if(state == states.END){
    endSim();
  }
}

function keyPressed(){
  switch(state){
    case states.OPENING:
      state = states.START;
      break;
    case states.END:
      state = states.OPENING;
      break;
  }
}

function startSim(){
  setupObjects();
  state = states.INPROGRESS;
}

function sim(){
  bgColor = startBGColor;
  displayObjects();
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

function setupObjects(){
  player = new Character(100, 100, 10);
  npc = new Character(200, 200, 20);
  npc.setRandomVelocity();

  for(let i = 0; i < width + heartSize; i += heartSize){
    hearts[i] = [];
    for(let j = 0; j < height + heartSize; j += heartSize){
      hearts[i][j] = new Heart(i + heartSize/2 - heartSize, j + heartSize/2 - heartSize, heartSize/2);
    }
  }
}

function displayObjects(){
  player.move(mouseX, mouseY);
  player.display();

  while(npc.x + npc.vx <= 0 || npc.x + npc.vx >= width || npc.y + npc.vy <= 0 || npc.y + npc.vy >= height){
    npc.setRandomVelocity();
  }
  npc.move(npc.x + npc.vx, npc.y + npc.vy);
  npc.display();

  for(let i = 0; i < width + heartSize; i += heartSize){
    for(let j = 0; j < height + heartSize; j += heartSize){
      let a = dist(player.x, player.y, npc.x, npc.y);
      let amap1 = 255 - map(a, 0, width, 0, 255);
      let amap2 = map(a, 0, width, heartSize * 2, 0);

      hearts[i][j].color(hearts[i][j].r, hearts[i][j].g, hearts[i][j].b, amap1);
      hearts[i][j].changeSize(amap2);
      hearts[i][j].display();
    }
  }
}

// Heart Class
class Heart{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;

    this.r = 255;
    this.g = 128;
    this.b = 255;
    this.a = 255;
  }

  color(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  changeSize(size){
    this.size = size;
  }

  display(){
    push();
    fill(this.r, this.g, this.b, this.a);
    noStroke();

    // heart credit: https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);

    pop();
  }
}

// Character Class
class Character{
  constructor(x, y, diameter){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.diameter = diameter;

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

  diameter(diameter){
    this.diameter = diameter;
  }

  move(x, y){
    this.x = x;
    this.y = y;
  }

  setRandomVelocity(){
    this.vx = this.speed * random(randDirection) * random(1, 5);
    this.vy = this.speed * random(randDirection) * random(1, 5);
  }

  display(){
    push();
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.diameter, this.diameter)
    pop();
  }
}

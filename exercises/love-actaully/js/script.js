/**************************************************
Exercise: Love, actually!
Wayne Huras ID 40074423

Brief:
x Allow the user to control one of the circles
x Make the non-user circle move differently
x Add at least one extra function
x- Add at least one extra ending

Evaluation:
x Functional: The program runs and meets the brief in terms of functionality and code requirements, shows mastery of the course material
x Stylish: Code follows the relevant parts of the style guide
x Committed: Commits and messages follow the style guide
x Creative: The program is an interesting and expressive experience for the user
**************************************************/

"use strict";

let timer = 5;

let bgColor;
let startBGColor = 'rgba(224,255,236,255)';
let endBGColor = 'rgba(255,128,255,255)';

let state;
const states = {
  OPENING: "opening",
  START: "start",
  INPROGRESS: "inprogress",
  END: "end",
  ENDREAL: "endReal"
}

let player;
let playerSize = 10;
let npcFake;
let npcReal;
let npcSize = 20;
let realNPCSpeed = 0;
let randDirection = [-1, 1];

let hearts = [];
let heartSize = 200;

/**
Description of preload
*/
function preload() {

}


/**
Scene setup.
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  bgColor = startBGColor;
  state = states.OPENING;

  textAlign(CENTER, CENTER);
  noCursor();
  noStroke();
  textSize(64);
  fill(255);
}


/**
Controls the progression of the simulation.
*/
function draw() {
  background(bgColor);

  if(state == states.OPENING){
    openingSim();
  }
  else if(state == states.START){
    startSim();
  }
  else if(state == states.INPROGRESS){
    sim();
  }
  else if(state == states.END){
    endSim();
  }
  else if(state == states.ENDREAL){
    endSimReal();
  }
}


/**
Allows changing of states with a keypress
*/
function keyPressed(){
  stateSwitch();
}

/**
Allows changing of states with mousedown
*/
function mousePressed(){
  stateSwitch();
}

/**
Manages changing of states
*/
function stateSwitch(){
  if(state == states.OPENING){
    state = states.START;
  }else if (state == states.END || state == states.ENDREAL){
    state = states.OPENING;
  }
}

/**
Displays the instructions for the simulation
*/
function openingSim(){
  push();
  fill(0, 0, 0, 255);
  textSize(128);
  text("LOVE IS BLIND", width/2, height/3);
  textSize(32);
  text("1. Move your mouse to control the red circle.\n2. Make two circles touch.\n3. The closer you get the harder it is to see!", width/2, height/2);
  pop();
}


/**
Starts simulation by constructing objects
*/
function startSim(){
  bgColor = startBGColor;
  setupObjects();
  state = states.INPROGRESS;
}


/**
Main simulation displays objects
*/
function sim(){
  displayObjects();
  overlapCheck();
}


/**
End sumulation with countdown to auto restart
*/
function endSim(){
  bgColor = endBGColor;

  // timer credit: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  if(frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  if(timer <= 0){
    timer = 5;
    state = states.OPENING;
  }

  text("Oh no! This isn't the love of your life!\nTry again in " + timer, width/2, height/2);
}


/**
End real simulation with countdown to auto restart
*/
function endSimReal(){
  bgColor = endBGColor;

  // timer credit: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  if(frameCount % 60 == 0 && timer > 0){
    timer --;
  }
  if(timer <= 0){
    timer = 5;
    state = states.OPENING;
  }

  text("Congratulations!\nYou found the love of your life!\nBut try to find someone better in " + timer, width/2, height/2);
}


/**
Checks for overlaps between the player and the npcs
*/
function overlapCheck(){
  let d1 = dist(player.x, player.y, npcFake.x, npcFake.y);
  if(d1 <= (player.diameter / 2) + (npcFake.diameter / 2)){
    state = states.END;
  }

  let d2 = dist(player.x, player.y, npcReal.x, npcReal.y);
  if(d2 <= (player.diameter / 2) + (npcFake.diameter / 2)){
    state = states.ENDREAL;
  }
}


/**
Creates player, npc, and heart objects and sets baseline parameters
*/
function setupObjects(){
  player = new Character(mouseX, mouseY, playerSize);
  player.color(235, 66, 56, 255);

  npcFake = new Character(random(1, width), random(1, height), npcSize);
  npcFake.setRandomVelocity();
  npcFake.color(104, 143, 232, 255);

  npcReal = new Character(npcSize, npcSize, npcSize);
  npcReal.color(255, 255, 255, 200);
  npcReal.speed = realNPCSpeed;

  for(let i = 0; i < width + heartSize; i += heartSize){
    hearts[i] = [];
    for(let j = 0; j < height + heartSize; j += heartSize){
      hearts[i][j] = new Heart(i + heartSize/2 - heartSize, j + heartSize/2 - heartSize, heartSize/2);
    }
  }
}


/**
Displays player, npc, and heart visuals
*/
function displayObjects(){
  player.move(mouseX, mouseY);
  player.display();
  displayNPC(npcFake);
  npcReal.display();

  for(let i = 0; i < width + heartSize; i += heartSize){
    for(let j = 0; j < height + heartSize; j += heartSize){
      let a = dist(player.x, player.y, npcFake.x, npcFake.y);
      let amap1 = 255 - map(a, 0, width, 0, 255);
      let amap2 = map(a, 0, width, heartSize * 2, 0);

      hearts[i][j].color(hearts[i][j].r, hearts[i][j].g, hearts[i][j].b, amap1);
      hearts[i][j].changeSize(amap2);
      hearts[i][j].display();
    }
  }
}


/**
Displays npc visuals
*/
function displayNPC(npc){
  while(npc.x + npc.vx <= 0 || npc.x + npc.vx >= width || npc.y + npc.vy <= 0 || npc.y + npc.vy >= height){
    npc.setRandomVelocity();
  }
  npc.move(npc.x + npc.vx, npc.y + npc.vy);
  npc.display();
}


/**
Heart class manages position, size, and display of background heart objects
*/
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

    // heart credit: https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);

    pop();
  }
}


/**
Character class manages the position, size, and display of the player and npcs
*/
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

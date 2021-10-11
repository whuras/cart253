/**************************************************
Project 1: Simulation
Wayne Huras ID 40074423
Requirements:
- At least two moving elements
- Interactivity
- Aesthetic, conceptual, and procedural harmony
- Beginning, middle, and end (if it makes sense)
Evaluation:
- Functional: The program runs and meets the brief in terms of functionality and code requirements, shows mastery of the course material
- Stylish: Code follows the relevant parts of the style guide
- Committed: Commits and messages follow the style guide
- Creative: The program is an interesting and expressive experience for the user

PLAN: Survival of the Fittest
- 3 Groups of creatures (identified by shades of red, green, blue)
- Each creature has variables set with random values for speed, size, ...?
- Creatures are made up for two components: body and head/mouth
- When a creature's head/mouth runs into another creature's body, they are eaten (if they are from a different group)
- A baby is then spawned with the eater's stats +/- X amount
- the background gets more red/green/blue as there are greater numbers of each creature group
- The player can manually do something? NEED IDEAS ON USER INTERACTION !!

IDEAS:
- Add number to indicate generation
**************************************************/

"use strict";

let bgColor = 'rgba(128, 128, 128, 255)';
let randDirection = [-1, 1];

let creatures = [];
let creaturesCurrentCount = 0;
let creaturesMaxCount = 100; // to save our computers
let creatureMinSpeed = 2;
let creatureReproductionTime = 5;
let creatureReproductionChance = 0.5;

let reproductionTimeVariance = 1;
let speedVariance = 0.5;
let colorVariance = 50;

let numCreatureTypes = 3;
let creatureTypes = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
  YELLOW: "yellow",
  CYAN: "cyan",
  PURPLE: "purple"
}

let gameState;
let gameStates = {
  TITLE: "title",
  INIT: "init",
  SIM: "sim",
  END: "end"
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

  rectMode(CENTER);
  ellipseMode(CENTER);


  gameState = gameStates.TITLE;

}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

  if(gameState == gameStates.TITLE){
    title();
  }
  else if (gameState == gameStates.INIT){
    init();
  }
  else if (gameState == gameStates.SIM){
    simulation();
  }
  else if (gameState == gameStates.END){
    end();
  }
}

function title(){
  push();
  textAlign(CENTER);
  textSize(64);
  text("Survival Simulator", width/2, height/3);
  textSize(32);
  text("Enter the number of different types of creatures to simulate (1-6).", width/2, height/2);
  pop();
}

function keyPressed(){
  if(gameState == gameStates.TITLE){
    if(key >= 1 && key <= 6){
      numCreatureTypes = key;
      gameState = gameStates.INIT;
    }
  }
}

function init(){
  createInitialCreatures();
  gameState = gameStates.SIM;
}

function simulation(){
  moveObjects();
  displayObjects();
  reproduction();
}

function end(){

}

function createInitialCreatures(){
  switch(numCreatureTypes){
    case "6":
      append(creatures, new Creature(width/4 * 1, height/3 * 2, creatureMinSpeed, 50, 0, 255, 255, creatureTypes.CYAN));
    case "5":
      append(creatures, new Creature(width/4 * 2, height/3 * 1, creatureMinSpeed, 50, 255, 255, 0, creatureTypes.YELLOW));
    case "4":
      append(creatures, new Creature(width/4 * 3, height/3 * 2, creatureMinSpeed, 50, 255, 0, 255, creatureTypes.PURPLE));
    case "3":
      append(creatures, new Creature(width/4 * 2, height/3 * 2, creatureMinSpeed, 50, 0, 0, 255, creatureTypes.BLUE));
    case "2":
      append(creatures, new Creature(width/4 * 3, height/3 * 1, creatureMinSpeed, 50, 0, 255, 0, creatureTypes.GREEN));
    case "1":
      append(creatures, new Creature(width/4 * 1, height/3 * 1, creatureMinSpeed, 50, 255, 0, 0, creatureTypes.RED));
      break;
    default:
      print("ERROR with numCreatureTypes");
      break;
  }
}

// CREDIT: https://editor.p5js.org/pippinbarr/sketches/zCUNjNuEI
function screenWrapTarget(target) {
  if (target.x < 0) {
    target.x += width;
  } else if (target.x > width) {
    target.x -= width;
  }

  if (target.y < 0) {
    target.y += height;
  } else if (target.y > height) {
    target.y -= height;
  }
}

function moveObjects(){
  for(let i = 0; i < creatures.length; i++){
    moveCreature(creatures[i]);
  }
}

function moveCreature(c){
  c.move();
  screenWrapTarget(c);
}

function displayObjects(){
  for(let i = 0; i < creatures.length; i++){
    displayCreature(creatures[i]);
  }
}

function displayCreature(c){
  c.display();
}

function reproduction(){
  for(let i = 0; i < creatures.length; i++){
    creatures[i].reproductionTimer();
  }
}

class Creature{
  constructor(x, y, speed, headDiameter, r, g, b, type){
    this.power = 1;
    this.type = type;

    this.x = x;
    this.y = y;

    this.speed = speed;
    this.angle = 0;
    this.t = 0;

    this.headDiameter = headDiameter;
    this.bodySize = 50;

    this.reproductionTime = creatureReproductionTime;
    this.reproductionCurrentTime = 0;
    this.reproductionChance = creatureReproductionChance;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;
  }

  reproductionTimer(){
    if(frameCount % 60 == 0 && this.reproductionCurrentTime < this.reproductionTime){
      this.reproductionCurrentTime++;
    }
    else if(this.reproductionCurrentTime >= this.reproductionTime){
      this.reproductionCurrentTime = 0;
      if(random() < this.reproductionChance && creaturesCurrentCount < creaturesMaxCount){
        creaturesCurrentCount += 1;
        this.reproduce();
      }
    }
  }

  reproduce(){
    // randomize some variables, inherit some variables
    let cv = colorVariance * random(randDirection);
    let r = this.r + (
              this.type == creatureTypes.RED ||
              this.type == creatureTypes.PURPLE ||
              this.type == creatureTypes.YELLOW ?
              cv : 0);
    let g = this.g + (
              this.type == creatureTypes.GREEN ||
              this.type == creatureTypes.YELLOW ||
              this.type == creatureTypes.CYAN ?
              cv : 0);
    let b = this.b + (
              this.type == creatureTypes.BLUE ||
              this.type == creatureTypes.CYAN ||
              this.type == creatureTypes.PURPLE ?
              cv : 0);
    let speed = this.speed + speedVariance * random(randDirection);

    let c = new Creature(
      this.x,
      this.y,
      speed < creatureMinSpeed ? creatureMinSpeed : speed,
      this.headDiameter,
      r > 255 ? 255 : r,
      g > 255 ? 255 : g,
      b > 255 ? 255 : b,
      this.type);

    let rt = this.reproductionTime + reproductionTimeVariance * random(randDirection);
    c.reproductionTime = rt <= 0 ? reproductionTimeVariance : rt; // min reproduction time

    append(creatures, c);
  }

  eat(i){
    this.power += creatures[i].power;
    creaturesCurrentCount -= 1;
    creatures.splice(i, 1);
  }

  // CREDIT: https://editor.p5js.org/pippinbarr/sketches/zCUNjNuEI
  move(){
    this.angle = map(noise(this.t), 0, 1, 0, radians(360));

    // Calculate the cartesian velocity of the target with black magic
    // Or at least with some trigonometry
    let vx = cos(this.angle) * this.speed;
    let vy = sin(this.angle) * this.speed;

    // Update the target's position with its velocity
    this.x += vx;
    this.y += vy;

    // Update the time value to make the target turn randomly over time
    this.t += random(0.01, 0.05) * random(randDirection);

    // Eating logic
    for(let i = 0; i < creatures.length; i++){
      // ignore self collision or collision with creatures of the same type
      if(creatures[i] == this || creatures[i].type == this.type){
        continue;
      }
      // check distance between creatures
      let d = dist(this.x, this.y, creatures[i].x, creatures[i].y);
      if(d <= this.headDiameter){
        // figure out who eats who based on power, or if power is the same then based on reproductionChance
        if(this.power > creatures[i].power || (this.power == creatures[i].power && this.reproductionChance > random())){
          this.eat(i);
        }
        break;
      }
    }
  }

  display(){
    push();
    fill(this.r, this.g, this.b, this.a);
    translate(this.x, this.y);
    rotate(this.angle);
    // Create body
    rect(0, 0, this.bodySize, this.bodySize);
    // Create head
    ellipse(this.bodySize / 2, 0, this.headDiameter);
    pop();

    push();
    translate(this.x, this.y);
    fill(0);
    text(this.power, 5, 5);
    pop();
  }
}

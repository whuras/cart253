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
**************************************************/

"use strict";

let bgColor = 'rgba(128, 128, 128, 255)';
let randDirection = [-1, 1];
let c1;
const creatureTypes = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue"
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

  createInitialCreatures();
  setupCreatures();
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

  displayObjects();
}


function createInitialCreatures(){
  c1 = new Creature(500, 500, 2, 50, 255, 0, 0);
}

function setupCreatures(){
  c1.setRandomVelocity();
}


function displayObjects(){
  displayCreature(c1);
}


function displayCreature(c){
  while(c.x + c.vx <= 0 || c.x + c.vx >= width || c.y + c.vy <= 0 || c.y + c.vy >= height){
    c.setRandomVelocity();
  }
  c.move(c.x + c.vx, c.y + c.vy);
  c.display();
}

class Creature{
  constructor(x, y, speed, headDiameter, r, g, b, type){
    this.type = type;

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    this.headDiameter = headDiameter;
    this.bodySize = 50;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;
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

    // Create body
    rect(this.x, this.y, this.bodySize, this.bodySize);
    // Create head
    ellipse(this.x + this.bodySize / 2, this.y, this.headDiameter);

    pop();
  }
}

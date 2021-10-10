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

  moveObjects();
  displayObjects();
}


function createInitialCreatures(){
  c1 = new Creature(250, 250, 2, 50, 255, 0, 0);
}

function setupCreatures(){

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
  moveCreature(c1);
}

function moveCreature(c){
  c.move();
  screenWrapTarget(c);
}

function displayObjects(){
  displayCreature(c1);
}

function displayCreature(c){
  c.display();
}

class Creature{
  constructor(x, y, speed, headDiameter, r, g, b, type){
    this.type = type;

    this.x = x;
    this.y = y;

    this.speed = speed;
    this.angle = 0;
    this.t = 0;

    this.headDiameter = headDiameter;
    this.bodySize = 50;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;
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
    this.t += 0.03;
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
  }
}

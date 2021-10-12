/**************************************************
Project 1: Simulation
Wayne Huras ID 40074423
Requirements:
x At least two moving elements
x Interactivity
- Aesthetic, conceptual, and procedural harmony
x Beginning, middle, and end (if it makes sense)

Evaluation:
x Functional: The program runs and meets the brief in terms of functionality and code requirements, shows mastery of the course material
x Stylish: Code follows the relevant parts of the style guide
x Committed: Commits and messages follow the style guide
x Creative: The program is an interesting and expressive experience for the user
**************************************************/

"use strict";

let bgColor = 'rgba(128, 128, 128, 255)';
let randDirection = [-1, 1];

let creatures = [];
let creaturesCurrentCount = 0;
let creaturesMaxCount = 50; // to save our processing power
let creatureMinSpeed = 2;
let creatureReproductionTime = 5;
let creatureReproductionChance = 0.5;

let rCount = 0;
let gCount = 0;
let bCount = 0;
let yCount = 0;
let pCount = 0;
let cCount = 0;

let reproductionTimeVariance = 1;
let speedVariance = 0.5;
let colorVariance = 50;
let childPowerMultiplier = 0.5;

let numCreatureTypes = 3;
let creatureTypes = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
  YELLOW: "yellow",
  CYAN: "cyan",
  PURPLE: "purple"
}

let paused = false;
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
    displayMenu();
  }
  else if (gameState == gameStates.END){
    end();
  }
}


/**
Displays the menu in the top left of the game screen
*/
function displayMenu(){
  push();
  rectMode(CORNER);
  fill(0, 0, 0, 128);
  rect(0, 0, 275, 170);
  fill(255);
  textAlign(LEFT, TOP);

  let menuText = "Press ESQ to un/pause.";
  menuText += "\nPress Left/Right Arrows to adjust speed."
  menuText += "\nPress Up/Down Arrows to adjust reproduction."
  menuText += "\nMax Count: " + creaturesMaxCount;

  switch(numCreatureTypes){
    case "6":
      menuText += "\nCyan: " + cCount;
    case "5":
      menuText += "\nYellow: " + yCount;
    case "4":
      menuText += "\nPurple: " + pCount;
    case "3":
      menuText += "\nBlue: " + bCount;
    case "2":
      menuText += "\nGreen: " + gCount;
    case "1":
      menuText += "\nRed: " + rCount;
    break;
    default:
    print("ERROR with numCreatureTypes");
  }

  text(menuText, 10, 10);
  pop();
}


/**
Welcome/Title screen display
*/
function title(){
  push();
  textAlign(CENTER);
  textSize(64);
  text("Survival Simulator", width/2, height/3);
  textSize(32);
  text("Enter the number of different types of creatures to simulate (1-6).", width/2, height/2);
  pop();
}


/**
Handles key presses of increasing reproduction/speed of creatures and pausing
*/
function keyPressed(){
  if(gameState == gameStates.TITLE){
    if(key >= 1 && key <= 6){
      numCreatureTypes = key;
      gameState = gameStates.INIT;
    }
  }
  else if(gameState == gameStates.SIM){
    if(keyCode == 27 && !paused){
      paused = !paused;
      noLoop();
    }
    else if(keyCode == 27 && paused){
      paused = !paused;
      loop();
    }
    else if(keyCode == 37){
      for(let i = 0; i < creatures.length; i++){
        creatures[i].speed -= 1;
        if(creatures[i].speed <= 0){
          creatures[i].speed = 1;
        }
      }
    }
    else if(keyCode == 39){
      for(let i = 0; i < creatures.length; i++){
        creatures[i].speed += 1;
      }
    }
    else if(keyCode == 38){
      for(let i = 0; i < creatures.length; i++){
        creatures[i].reproductionTime -= 1;
      }
    }
    else if(keyCode == 40){
      for(let i = 0; i < creatures.length; i++){
        creatures[i].reproductionTime += 1;
      }
    }
  }
}


/**
Initializes first set of creatures
*/
function init(){
  createInitialCreatures();
  gameState = gameStates.SIM;
}


/**
Handles the survival simulation
*/
function simulation(){
  moveObjects();
  displayObjects();
  reproduction();
}


/**
End screen
*/
function end(){

}


/**
Initializes the first creatures with their spaced-out positioning
*/
function createInitialCreatures(){
  switch(numCreatureTypes){
    case "6":
      append(creatures, new Creature(width/4 * 1, height/3 * 2, creatureMinSpeed, 50, 0, 255, 255, creatureTypes.CYAN, 1));
    case "5":
      append(creatures, new Creature(width/4 * 2, height/3 * 1, creatureMinSpeed, 50, 255, 255, 0, creatureTypes.YELLOW, 1));
    case "4":
      append(creatures, new Creature(width/4 * 3, height/3 * 2, creatureMinSpeed, 50, 255, 0, 255, creatureTypes.PURPLE, 1));
    case "3":
      append(creatures, new Creature(width/4 * 2, height/3 * 2, creatureMinSpeed, 50, 0, 0, 255, creatureTypes.BLUE, 1));
    case "2":
      append(creatures, new Creature(width/4 * 3, height/3 * 1, creatureMinSpeed, 50, 0, 255, 0, creatureTypes.GREEN, 1));
    case "1":
      append(creatures, new Creature(width/4 * 1, height/3 * 1, creatureMinSpeed, 50, 255, 0, 0, creatureTypes.RED, 1));
      break;
    default:
      print("ERROR with numCreatureTypes");
      break;
  }
}


/**
Moves creatures from one side of the screen to another if they move off it
CREDIT: https://editor.p5js.org/pippinbarr/sketches/zCUNjNuEI
*/
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


/**
Handles movement of all objects
*/
function moveObjects(){
  for(let i = 0; i < creatures.length; i++){
    moveCreature(creatures[i]);
  }
}


/**
Handles movement specifically for creatures
*/
function moveCreature(c){
  c.move();
  screenWrapTarget(c);
}


/**
Handles display of all objects
*/
function displayObjects(){
  for(let i = 0; i < creatures.length; i++){
    displayCreature(creatures[i]);
  }
}


/**
Handles display specifically for creatures
*/
function displayCreature(c){
  c.display();
}


/**
Increments the reproduction timer for all creatures
*/
function reproduction(){
  for(let i = 0; i < creatures.length; i++){
    creatures[i].reproductionTimer();
  }
}


/**
Adjusts the counts of different types of creatures to help manage processing power
*/
function adjCreatureCount(t, x){

  creaturesCurrentCount += x;

  switch(t){
    case creatureTypes.CYAN:
      cCount += x;
      break;
    case creatureTypes.YELLOW:
      yCount += x;
      break;
    case creatureTypes.PURPLE:
      pCount += x;
      break;
    case creatureTypes.BLUE:
      bCount += x;
      break;
    case creatureTypes.GREEN:
      gCount += x;
      break;
    case creatureTypes.RED:
      rCount += x;
      break;
    default:
      print("ERROR with adjCreatureCount");
      break;
  }
}


/**
Creature class
*/
class Creature{
  constructor(x, y, speed, headDiameter, r, g, b, type, generation){
    this.power = 1;
    this.generation = generation;
    this.type = type;

    this.x = x;
    this.y = y;

    this.speed = speed;
    this.angle = 0;
    this.t = 0;

    this.headDiameter = headDiameter;
    this.size = 50;

    this.reproductionTime = creatureReproductionTime;
    this.reproductionCurrentTime = 0;
    this.reproductionChance = creatureReproductionChance;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;

    adjCreatureCount(type, 1);
  }

  reproductionTimer(){
    if(frameCount % 60 == 0 && this.reproductionCurrentTime < this.reproductionTime){
      this.reproductionCurrentTime++;
    }
    else if(this.reproductionCurrentTime >= this.reproductionTime){
      this.reproductionCurrentTime = 0;
      if(random() < this.reproductionChance && creaturesCurrentCount < creaturesMaxCount){
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
      r > 255 || r < 0 ? 255 : r,
      g > 255 || g < 0 ? 255 : g,
      b > 255 || b < 0 ? 255 : b,
      this.type,
      this.generation + 1);

    let rt = this.reproductionTime + reproductionTimeVariance * random(randDirection);
    c.reproductionTime = rt <= 0 ? reproductionTimeVariance : rt; // min reproduction time

    let pow = this.power * childPowerMultiplier;
    c.power = pow < 1 ? 1 : pow;

    append(creatures, c);
  }

  eat(i){
    this.power += creatures[i].power;
    adjCreatureCount(creatures[i].type, -1);
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
    rotate(this.angle + 180);

    let halfbase = ((2 / sqrt(3)) * this.size) / 2;
    // Create body
    triangle(0, 0, -halfbase / 2, -this.size, halfbase / 2, -this.size);

    // Create head
    triangle(0, this.size / 2, -halfbase, -this.size / 2, halfbase, -this.size / 2);

    // Create eye
    fill(0);
    //circle(5, 0, 3);
    circle(-5, 0, 3);

    // Create eyebrow
    noFill();
    //arc(5, 0, 10, 10, 180, 200);
    arc(-5, 0, 10, 10, 180, 200);

    // Create mouth
    arc(0, 0, 25, 25, radians(310), radians(375));

    pop();

    push();
    textAlign(CENTER);
    translate(this.x, this.y);
    fill(0);
    textSize(8);
    text("Pow: " + round(this.power, 2), 0, -15);//+ "\nGen: " + this.generation, 0, 0);
    pop();
  }
}

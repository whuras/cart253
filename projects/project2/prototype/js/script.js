/**************************************************
Project 2: Anything
Wayne Huras ID 40074423

Brief: Part 1 - Proposal (see pdf) and Prototype
- A small experiment that explores one or more ideas that will be fully implemented in the final project
- The key is that is should give you a chance to make progress on the project code
- Roughly the scale of one of the exercises

Explanation:
Begin the program and click on the circle at the very bottom of the screen.
With a vine following your cursor, click on another circle which is within reach of the vine.
Once the vine is anchored to the circle, select a segment of any vine to grow another from that location.
Again, anchor the new vine to a circle. Repeat to grow a gnarly tree.

**************************************************/

"use strict";

let bgColor = "#eef1ef";
let groundColor = "#BA5624"

let groundHeight = 50;

let spiralImage;

let bgMusic;
let playMusic = true;

let soundEffect;

let targets = [];
let numTargets = 10; // even number, max 10 for testing
let targetDiameter = 50;
let targetActiveColor = "#fff4d6";
let targetInactiveColor = "#5e6572";
let playTargetNotes = false;

let notes1 = ["A4", "C4", "E4"]; // to all be played at once
let notes2 = ["B4", "D4", "F4"]; // to all be played at once
let notes3 = ["C4", "E4", "G4"]; // to all be played at once
let notes4 = ["D4", "F4", "A4"]; // to all be played at once
let notes5 = ["E4", "G4", "B4"]; // to all be played at once
let notes = [notes1, notes2, notes3, notes4, notes5];

let vines =[];
let activeVine;

/**
Description of preload
*/
function preload() {
  bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
  soundEffect = loadSound("assets/sounds/whoosh.wav");
  spiralImage = loadImage("assets/images/spiral.png")
}


/**
Description of setup
*/
function setup() {
  createCanvas(600, 600);

  // create initial target which hosts notes and sound effects
  //Target constructor(x, y, maxDiameter, activeColor, inactiveColor, notes, soundEffect);
  append(targets, new Target(
    width / 2,
    height  - (groundHeight + targetDiameter / 8 + 1),
    targetDiameter,
    targetActiveColor,
    targetInactiveColor,
    random(notes),
    soundEffect,
    spiralImage
  ));

  for(let i = 0; i < numTargets / 2; i++){
    append(targets, new Target(
      width / 3 * 1,
      height  - (groundHeight + targetDiameter / 8 + 100 + 100 * i),
      targetDiameter,
      targetActiveColor,
      targetInactiveColor,
      random(notes),
      soundEffect,
      spiralImage
    ));
  }

  for(let i = 0; i < numTargets / 2; i++){
    append(targets, new Target(
      width / 3 * 2,
      height  - (groundHeight + targetDiameter / 8 + 100 + 100 * i),
      targetDiameter,
      targetActiveColor,
      targetInactiveColor,
      random(notes),
      soundEffect,
      spiralImage
    ));
  }




  // create buttons for toggling music and sound - more for my own sanity
  var buttonMusic = createButton("Toggle Music");
  buttonMusic.mousePressed(toggleMusic);

  var buttonSound = createButton("Toggle Sound");
  buttonSound.mousePressed(toggleSound);

  userStartAudio();
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);
  displayGround();

  // Display Objects
  for(let i = targets.length - 1; i >= 0; i--){
    targets[i].displaySpirals();
  }
  for(let i = 0; i < targets.length; i++){
    targets[i].display();
  }
  for(let i = 0; i < vines.length; i++){
    vines[i].display();
  }

  // Play/stop target sounds
  if(playTargetNotes){
    for(let i = 0; i < targets.length; i++){
      targets[i].playNotes();
    }
  }
  else{
    for(let i = 0; i < targets.length; i++){
      targets[i].stopNotes();
    }
  }
}


/**
When mouse is pressed, if the mouse is within the target it will play
its sound effect.
*/
function mousePressed(){

  if(activeVine == undefined){
    // if the mouse is over the active base [0] target then grow starting vine
    let dBase = dist(mouseX, mouseY, targets[0].x, targets[0].y);
    if(targets[0].isActive && dBase < targets[0].diameter / 2){
      activeVine = new Vine(targets[0].x, targets[0].y, 10, 26);
      append(vines, activeVine);
      targets[0].isActive = false;
    }
    // we do no have an active vine and we are not growing the base
    else{
      // Check vine intersections and grow from an intersection if valid
      for(let i = 0; i < vines.length; i++){
        for(let j = 0; j < vines[i].x.length; j++){
          let dVine = dist(mouseX, mouseY, vines[i].x[j], vines[i].y[j]);
          if(dVine < 5){
            activeVine = new Vine(vines[i].x[j], vines[i].y[j], 10, 26);
            append(vines, activeVine);
            break;
          }
        }
        // Stop looping if we've created a new vine
        if(activeVine != undefined){
           break;
        }
      }
    }
  }
  // there is an activeVine
  else{
    // Check if we're on an active target, if so anchor vine
    for(let i = 0; i < targets.length; i++){
      let dMouse = dist(targets[i].x, targets[i].y, mouseX, mouseY);
      let dVineToTarget = dist(
        targets[i].x,
        targets[i].y,
        activeVine.x[0],
        activeVine.y[0]);
      if(targets[i].isActive && dMouse < targets[i].maxDiameter / 2 && dVineToTarget < activeVine.segLength * 2){
        activeVine.isActive = false;
        targets[i].isActive = false;
        activeVine = undefined;
      }
    }
  }
}


/**
Displays Ground
*/
function displayGround(){
  push();
  noStroke();
  fill(groundColor);
  rectMode(CENTER);
  rect(width/2, height - groundHeight / 2, width, groundHeight);
  pop();
}


/**
Toggles the music on and off
*/
function toggleMusic(){
  if(playMusic){
    bgMusic.loop();
  }else{
    bgMusic.stop();
  }
  playMusic = !playMusic;
}


/**
Toggles the sound (velocity based on distance of mouse to target) on and off
*/
function toggleSound(){
  playTargetNotes = !playTargetNotes;
}

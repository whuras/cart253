/**************************************************
Project 2: Anything
Wayne Huras ID 40074423

Brief: Part 1 - Proposal (see pdf) and Prototype
- A small experiment that explores one or more ideas that will be fully implemented in the final project
- The key is that is should give you a chance to make progress on the project code
- Roughly the scale of one of the exercises

Explanation:

**************************************************/

"use strict";

let bgColor = "#eef1ef";
let groundColor = "#BA5624"

let groundHeight = 50;

let bgMusic;
let playMusic = false;

let soundEffect;

let targets = [];
let targetDiameter = 50;
let targetActiveColor = "#fff4d6";
let targetInactiveColor = "#5e6572";
let playTargetNotes = false;
let notes = ["A4", "C4", "E4"]; // to all be played at once

let vines =[];
let activeVine;

/**
Description of preload
*/
function preload() {
  // Comment out for speedy reloads during testing
  //bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
  //soundEffect = loadSound("assets/sounds/whoosh.wav");
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
    notes,
    soundEffect
  ));
  targets[0].isBase = true;

  append(targets, new Target(
    width / 3 * 1,
    height  - (groundHeight + targetDiameter / 8 + 100),
    targetDiameter,
    targetActiveColor,
    targetInactiveColor,
    notes,
    soundEffect
  ));

  append(targets, new Target(
    width / 3 * 2,
    height  - (groundHeight + targetDiameter / 8 + 100),
    targetDiameter,
    targetActiveColor,
    targetInactiveColor,
    notes,
    soundEffect
  ));

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
  for(let i = 0; i < targets.length; i++){
    targets[i].display();
  }
  for(let i = 0; i < vines.length; i++){
    vines[i].display();
  }

  // Play/stop target sounds
  if(playTargetNotes){
    for(let i = 0; i < targets.length; i++){
      if(targets[i].isActive){
        targets[i].playNotes();
      }
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


  for(let i = 0; i < targets.length; i++){
    let d = dist(mouseX, mouseY, targets[i].x, targets[i].y);

    // if the mouse is over the target, and it is active..
    if(d < targets[i].diameter / 2 && targets[i].isActive){

      // if the target is the base, then we start the first vine, growing from the target
      if(targets[i].isBase && targets[i].isActive){
        activeVine = new Vine(targets[i].x, targets[i].y, 10, 26);
        append(vines, activeVine);
      }
      // else if we have a valid target, stop moving the active vine
      else if(targets[i].isActive && activeVine != undefined){
        activeVine.isActive = false;
      }

      targets[i].isActive = false;
      //targets[i].playSoundEffect();
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

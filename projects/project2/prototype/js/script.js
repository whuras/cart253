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

let bgMusic;
let playMusic = false;

let soundEffect;

let targets = [];
let targetActiveColor = "#fff4d6";
let targetInactiveColor = "#5e6572";
let playTargetNotes = false;

let notes = ["A4", "C4", "E4"]; // to all be played at once

/**
Description of preload
*/
function preload() {
  //bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
  //soundEffect = loadSound("assets/sounds/whoosh.wav");
}


/**
Description of setup
*/
function setup() {
  createCanvas(600, 600);

  // create initial target which hosts notes and sound effects
  append(targets, new Target(width / 2, height  - 100, 50, targetActiveColor, targetInactiveColor, notes, soundEffect));

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

  // Display Objects
  for(let i = 0; i < targets.length; i++){
    targets[i].display();
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
  // Target On-Click Sound Effects
  for(let i = 0; i < targets.length; i++){
    let d = dist(mouseX, mouseY, targets[i].x, targets[i].y);
    if(d < targets[i].diameter / 2){
      targets[i].playSoundEffect();
    }
  }
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

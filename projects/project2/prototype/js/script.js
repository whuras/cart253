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

let rnds = [0, 1, 2, 3, 4, 5, 6];

let bgColor;
let groundColor;

let groundHeight = 50;

let spiralImage;

let bgMusic;
let playMusic = true;

let soundEffect;

let targets = [];
let playingTargets = [];
let numTargets = 10; // even number, max 10 for testing
let targetDiameter = 60;
let targetActiveColors;
let targetInactiveColor;
let playTargetNotes = false;

let notes1 = ["A4", "C4", "E4"]; // to all be played at once
let notes2 = ["B4", "D4", "F4"]; // to all be played at once
let notes3 = ["C4", "E4", "G4"]; // to all be played at once
let notes4 = ["D4", "F4", "A4"]; // to all be played at once
let notes5 = ["E4", "G4", "B4"]; // to all be played at once
let notes = [notes1, notes2, notes3, notes4, notes5];

let noteA = "A4";
let noteB = "B4";
let noteC = "C4";
let noteD = "D4";
let noteE = "E4";
let noteF = "F4";
let noteG = "G4";
let singleNotes = [noteA, noteB, noteC, noteD, noteE, noteF, noteG];
let maxNotes = 3;

let vines = [];
let activeVine;
let vineColor;

/**
Description of preload
*/
function preload() {
  bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
  soundEffect = loadSound("assets/sounds/whoosh.wav");
  spiralImage = loadImage("assets/images/spiral.png")

  bgColor = color(36, 36, 36);
  groundColor = color(104, 81, 85);

  targetActiveColors = [
    color(206, 66, 87), //red
    color(249, 160, 108), //orange
    color(244, 185, 66), //yellow
    color(96, 147, 93), //green
    color(0, 148, 198), //blue
    color(202, 177, 189), //purple
    color(205, 83, 59)]; // dark orange

    targetInactiveColor = color(221, 221, 221);

}


/**
Description of setup
*/
function setup() {
  createCanvas(800, 600);

  // create initial target which hosts notes and sound effects
  //Target constructor(x, y, maxDiameter, activeColor, inactiveColor, notes, soundEffect);
  let index = 0;
  append(targets, new Target(
    width / 2,
    height  - (groundHeight + targetDiameter / 8 + 10),
    targetDiameter,
    targetActiveColors[index],
    targetActiveColors[index],
    singleNotes[index],
    soundEffect,
    spiralImage
  ));

  for(let i = 0; i < 2; i++){
    index += 1;
    if(index > 6) index = 0;

    append(targets, new Target(
      width / 3 * (i + 1),
      height  - (groundHeight + targetDiameter / 8 + 100),
      targetDiameter,
      targetActiveColors[index],
      targetInactiveColor,
      singleNotes[index],
      soundEffect,
      spiralImage
    ));
  }

  for(let i = 0; i < 3; i++){
    index += 1;
    if(index > 6) index = 0;

    append(targets, new Target(
      width / 4 * (i + 1),
      height  - (groundHeight + targetDiameter / 8 + 200),
      targetDiameter,
      targetActiveColors[index],
      targetInactiveColor,
      singleNotes[index],
      soundEffect,
      spiralImage
    ));
  }

  for(let i = 0; i < 4; i++){
    index += 1;
    if(index > 6) index = 0;

    append(targets, new Target(
      width / 5 * (i + 1),
      height  - (groundHeight + targetDiameter / 8 + 300),
      targetDiameter,
      targetActiveColors[index],
      targetInactiveColor,
      singleNotes[index],
      soundEffect,
      spiralImage
    ));
  }

  for(let i = 0; i < 5; i++){
    index += 1;
    if(index > 6) index = 0;

    append(targets, new Target(
      width / 6 * (i + 1),
      height  - (groundHeight + targetDiameter / 8 + 400),
      targetDiameter,
      targetActiveColors[index],
      targetInactiveColor,
      singleNotes[index],
      soundEffect,
      spiralImage
    ));
  }

  // create buttons for toggling music and sound - more for my own sanity
  var buttonMusic = createButton("Toggle Background Music");
  buttonMusic.mousePressed(toggleMusic);

  var buttonSound = createButton("Toggle Music Notes");
  buttonSound.mousePressed(toggleSound);

  userStartAudio();
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

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

  displayGround();
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
      activeVine = new Vine(targets[0].x, targets[0].y, 10, 26, vineColor);
      append(vines, activeVine);
      targets[0].isActive = false;
      addPlayNotes(targets[0]);
    }
    // we do no have an active vine and we are not growing the base
    else{
      // Check vine intersections and grow from an intersection if valid
      for(let i = 0; i < vines.length; i++){
        for(let j = 0; j < vines[i].x.length; j++){
          let dVine = dist(mouseX, mouseY, vines[i].x[j], vines[i].y[j]);
          if(dVine < 5){
            activeVine = new Vine(vines[i].x[j], vines[i].y[j], 10, 26, vineColor);
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

      let dVineToTarget = 1;
      if(activeVine != undefined){
        dVineToTarget = dist(
          targets[i].x,
          targets[i].y,
          activeVine.x[0],
          activeVine.y[0]);
      }

      if(targets[i].isActive && dMouse < targets[i].maxDiameter / 2 && dVineToTarget < activeVine.segLength * 2){
        activeVine.isActive = false;
        targets[i].isActive = false;
        addPlayNotes(targets[i]);
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
  rect(width / 2, height - groundHeight / 2, width, groundHeight);

  fill(bgColor);
  textSize(32);
  textAlign(CENTER);
  let words = "";
  for(let i = 0; i < playingTargets.length; i++){
    words += playingTargets[i].note.toString().charAt(0) + " ";
  }

  text(words, width / 2, height - groundHeight / 2 + 10);

  pop();
}

function addPlayNotes(newPlayer){

  newPlayer.playNote = true;

  if(playingTargets.length < maxNotes){
    append(playingTargets, newPlayer);
  }
  else{
    playingTargets[0].playNote = false;
    for(let i = 1; i < playingTargets.length; i++){
      playingTargets[i - 1] = playingTargets[i];
    }
    playingTargets[playingTargets.length - 1] = newPlayer;
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

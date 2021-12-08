/**************************************************
Project 2: Anything
Wayne Huras ID 40074423

Explanation:
Begin the program and click on the circle at the very bottom of the screen.
With a vine following your cursor, click on another circle which is within reach of the vine.
Once the vine is anchored to the circle, select a segment of any vine to grow another from that location.
Again, anchor the new vine to a circle. Repeat to grow a gnarly tree.

**************************************************/

"use strict";

// Colors
let bgColor;
let groundColor;
let targetActiveColors;
let targetInactiveColor;

// Images
let welcomeImage;
let spiralImage;

// Targets
let targets = [];
let playingTargets = [];
let targetDiameter = 60;
let playTargetNotes = true;

// Vines
let vines = [];
let activeVine;
let vineColor;

// Musci
let bgMusic;
let soundEffect;
let playMusic = true;

// Notes/tunes
let noteA = "A4";
let noteB = "B4";
let noteC = "C4";
let noteD = "D4";
let noteE = "E4";
let noteF = "F4";
let noteG = "G4";
let singleNotes = [noteA, noteB, noteC, noteD, noteE, noteF, noteG];
let maxNotes = 3;

// Misc
let groundHeight = 50;
let state;
const states = {
  WELCOME: "welcome",
  START: "start"
}

/**
Description of preload
*/
function preload() {
  // Preload music and images
  bgMusic = createAudio("assets/sounds/szegvari__dark-tundra-nature-atmo.wav");
  spiralImage = loadImage("assets/images/spiral.png")
  welcomeImage = loadImage("assets/images/Welcome.png")

  // Set colors
  bgColor = color(36, 36, 36);
  groundColor = color(104, 81, 85);
  targetInactiveColor = color(221, 221, 221);
  targetActiveColors = [
    color(206, 66, 87), //red
    color(249, 160, 108), //orange
    color(244, 185, 66), //yellow
    color(96, 147, 93), //green
    color(0, 148, 198), //blue
    color(202, 177, 189), //purple
    color(205, 83, 59)]; // dark orange
}


/**
Description of setup
*/
function setup() {
  createCanvas(800, 600);
  state = states.WELCOME;

  createTargets();

  var buttonStart = createButton("Click to Start");
  buttonStart.mousePressed(startPiece);

  // create buttons for toggling music and sound - more for my own sanity
  var buttonMusic = createButton("Toggle Background Music");
  buttonMusic.mousePressed(toggleMusic);

  var buttonSound = createButton("Toggle Music Notes");
  buttonSound.mousePressed(toggleSound);

  userStartAudio();
  toggleMusic();
}


/**
Description of draw()
*/
function draw() {
  background(bgColor);

  if(state == states.WELCOME){
    push();
    imageMode(CENTER);
    image(welcomeImage, width/2, height/2);
    pop();
  }
  else{
    // Display Objects in Scene
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
}

/**
Create initial target which hosts notes
Target constructor(x, y, maxDiameter, activeColor, inactiveColor, notes, soundEffect);
*/
function createTargets(){
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
}


/**
When mouse is pressed, if the mouse is within the target it will play
its sound effect. This includes the logic for creating vines connected
to targets.
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

  // display which notes are being played
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

/**
Logic to play the 3 most recently selected notes
*/
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


function startPiece(){
  state = states.START;
}

/**
Toggles the music on and off
*/
function toggleMusic(){
  if(playMusic){
    bgMusic.loop();
    bgMusic.volume(0.2);
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

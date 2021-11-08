/**************************************************
Exercise: Make Some Noise
Wayne Huras ID 40074423

Brief:
- Focus on working with p5.sound (sound files, oscillators, synthesizers, and audio input)
- Ideally produce a prototype that explores how you will use sound in your final project

Explanation:
- Background music toggle with button
- Chord toggle with button
- Different chords played when mouse in on various target circles
- Velocity of target chords changes based on mouse distance (mapped 0 to diameter)
- Sound effect plays when the target is clicked

**************************************************/

"use strict";

let bgMusic;
let playMusic = false;

let soundEffect;

let targets = [];
let targetActiveColor = "#fff4d6";
let targetInactiveColor = "#5e6572";
let playTargetNotes = false;

let notes1 = ["A4", "C4", "E4"]; // to all be played at once
let notes2 = ["B4", "D4", "F4"]; // to all be played at once
let notes3 = ["C4", "E4", "G4"]; // to all be played at once
let notes4 = ["D4", "F4", "A4"]; // to all be played at once
let notes5 = ["E4", "G4", "B4"]; // to all be played at once


/**
Preload music files
*/
function preload() {
  bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
  soundEffect = loadSound("assets/sounds/whoosh.wav");
}


/**
Description of setup
*/
function setup() {
  createCanvas(600, 600);

  // create target which hosts notes and sound effects
  append(targets, new Target(100 * 1, 100 * 1, 100, targetActiveColor, targetInactiveColor, notes1, soundEffect));
  append(targets, new Target(100 * 3, 100 * 3, 100, targetActiveColor, targetInactiveColor, notes2, soundEffect));
  append(targets, new Target(100 * 5, 100 * 5, 100, targetActiveColor, targetInactiveColor, notes3, soundEffect));
  append(targets, new Target(100 * 5, 100 * 1, 100, targetActiveColor, targetInactiveColor, notes4, soundEffect));
  append(targets, new Target(100 * 1, 100 * 5, 100, targetActiveColor, targetInactiveColor, notes5, soundEffect));

  // create buttons for toggling music and sound
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
  background("#eef1ef");

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

/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423

Brief:
- Focus on working with p5.sound (sound files, oscillators, synthesizers, and audio input)
- Ideally produce a prototype that explores how you will use sound in your final project

Explanation:
- Background music
- Tone when the mouse is close to various objects (volume dependent on dist)
- Sound effect when something happens

**************************************************/

"use strict";

let synth;

let bgMusic;
let musicIsPlaying = false;

let soundEffect;

let target;
let targetSoundIsPlaying = false;
let notes = ["C4", "E4", "G4", "A4"]; // to all be played at once

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
  createCanvas(800, 600);

  synth = new p5.PolySynth();

  // create target which hosts notes and sound effects
  target = new Target(100, 100, 100, "#fff4d6", notes, soundEffect)

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

  // Music
  if(musicIsPlaying){
    bgMusic.loop();
  }else{
    bgMusic.stop();
  }

  // Display Objects
  target.display();

  // Play target sounds
  if(targetSoundIsPlaying){
    target.playNotes(synth);
  }

}


/**
When mouse is pressed, if the mouse is within the target it will play
its sound effect.
*/
function mousePressed(){
  let d = dist(mouseX, mouseY, target.x, target.y);
  if(d < target.diameter / 2){
    target.playSoundEffect();
  }
}


/**
Toggles the music on and off
*/
function toggleMusic(){
  musicIsPlaying = !musicIsPlaying;
}


/**
Toggles the sound (velocity based on distance of mouse to target) on and off
*/
function toggleSound(){
  targetSoundIsPlaying = !targetSoundIsPlaying;
}

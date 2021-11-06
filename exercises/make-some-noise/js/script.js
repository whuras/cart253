/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423

Brief:
- Focus on working with p5.sound (sound files, oscillators, synthesizers, and audio input)
- Ideally produce a prototype that explores how you will use sound in your final project

Explanation:
- Background song
- Tone when the mouse is close to various objects (volume dependent on dist)
- Sound effect when something happens

**************************************************/

"use strict";

let bgMusic;

/**
Description of preload
*/
function preload() {
  bgMusic = loadSound("assets/sounds/Crowander - Underwater.mp3");
}


/**
Description of setup
*/
function setup() {
  createCanvas(800, 600);
  bgMusic.loop();
  userStartAudio();
}


/**
Description of draw()
*/
function draw() {
  background(128);
}

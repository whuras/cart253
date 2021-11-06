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

let targets = [];
let targetDiameter = 50;
let targetColors = ["#000000", "#FFFFFF", "#272727", "#000000", "#FFFFFF"];
let maxNumber = 5;

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

  //bgMusic.loop();
  userStartAudio();

  createTargets(5);
}


/**
Description of draw()
*/
function draw() {
  background(128);

  for(let i = 0; i < targets.length; i++){
    targets[i].display();
  }
}


function createTargets(number){

  if(number > maxNumber) number = maxNumber;

  let xVals = [100, 200, 300, 400, 500];
  let yVals = [100, 200, 300, 400, 500];

  for(let i = 0; i < number; i++){
    append(targets, new Target(xVals[i], yVals[i], targetDiameter, targetColors[i]));
  }
}

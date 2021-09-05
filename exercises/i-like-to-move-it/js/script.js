/**************************************************
Exercise: I like to move it!
Wayne Huras ID 40074423

Brief:
x Include three shapes
x Include movement
x Include size changes
x Include color changes
x Use map() and constrain()
x Respond to the mouse position using mouseX and mouseY

Evaluation:
x Runs and meets the brief
x Has suitable commenting
x Includes a starting commit and then a reasonable number of commits throughout the work that include descriptive messages about what was done. Messages should be prefixed by Ex:.
x Uses good naming for added variables
x Is well structured, with new code added in sensible places in sensible orders
**************************************************/

"use strict";

// Canvas
let canvas = {
  width: 300,
  height: 450,
  positionType: 'fixed'
};

// Background / Sky
let bgRainColor = '#eef1ef';
let bgSunColor = '#fff4d6';
let bgColor;
let sunnyHeight = 100;
let lerpAmt = 0;
let lerpSpeed = 0.0005;

// Clouds
let frontCloudColor = "#a9b4c2"
let bgCloudColor = "#5e6572"
let bgCloudOffset = 25;

// Rain
let numRainDropsMin = 3;
let numRainDropsMax = 256;
let rainColorHex = '#7d98a1';
let rainDropSize = 10;
let raindDropMinSize = 0.5;
let raindDropMaxSize = 5;

// Puddle
let puddleOffset = 25;

/**
Description of preload
*/
function preload() {

}


/**
setup();
*/
function setup() {
  createCanvas(canvas.width, canvas.height).position(windowWidth / 2 - canvas.width / 2, windowHeight/2 - canvas.height / 2,'fixed');
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();
  bgColor = bgRainColor;
}


/**
draw();
*/
function draw() {

  // Background
  // lerps between rainy/sunny background color based on the mouseY position.
  if(mouseY < sunnyHeight){
    lerpAmt += lerpSpeed;
    lerpAmt = constrain(lerpAmt, 0, 1);
    bgColor = lerpColor(color(bgColor), color(bgSunColor), lerpAmt);

  }else{
    lerpAmt -= lerpSpeed;
    lerpAmt = constrain(lerpAmt, 0, 1);
    bgColor = lerpColor(color(bgColor), color(bgRainColor), lerpAmt);
  }

  background(bgColor);

  // Raindrops
  // Raindrop and puddle alpha transparency is dependend on the mouseX position.
  // Raindrop x and y positions, as well as size (length) are randomized within
  // constraints.
  let rainColor = color(rainColorHex);
  rainColor.setAlpha(constrain(mouseY, 0, 255));
  fill(rainColor);

  let numRainDrops = constrain(mouseX, numRainDropsMin, numRainDropsMax);
  for(let i = 0; i < numRainDrops; i++){

    let dropSizeMultiplier =  random() * mouseY;
    dropSizeMultiplier = map(dropSizeMultiplier, 0, mouseY, raindDropMinSize, raindDropMaxSize);

    let xMin = canvas.width / 2 - 50;
    let xMax = canvas.width / 2 + 50;
    let randX = random(xMin, xMax);

    let yMin = canvas.height / 5;
    let yMax = canvas.height - rainDropSize * dropSizeMultiplier - puddleOffset + 10;
    let randY = random(yMin, yMax);

    rect(randX, randY, 1, rainDropSize * dropSizeMultiplier);
  }

  // Puddles
  ellipse(canvas.width / 2, canvas.height - puddleOffset, 115, 10);
  ellipse(canvas.width / 2 + 55, canvas.height - puddleOffset + 10, 40, 8);
  ellipse(canvas.width / 2 - 55, canvas.height - puddleOffset + 10, 25, 5);

  // Back Cloud
  fill(bgCloudColor);
  rect(canvas.width / 2 + bgCloudOffset, canvas.height / 6, canvas.width / 2, 20, 25);
  circle(canvas.width / 2 - 30 + bgCloudOffset, canvas.height / 7, 50);
  circle(canvas.width / 2 + 5 + bgCloudOffset, canvas.height / 9, 75);
  circle(canvas.width / 2 + 45 + bgCloudOffset, canvas.height / 7, 35);

  // Front Cloud
  fill(frontCloudColor);
  rect(canvas.width / 2, canvas.height / 5, canvas.width / 2, 20, 25);
  circle(canvas.width / 2 - 30, canvas.height / 6, 50);
  circle(canvas.width / 2 + 5, canvas.height / 8, 75);
  circle(canvas.width / 2 + 45, canvas.height / 6, 35);

}

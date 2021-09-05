/**************************************************
Exercise: I like to move it!
Wayne Huras ID 40074423

Brief:
x Include three shapes
- Include movement
- Include size changes
- Include color changes
- Use map() and constrain()
- Respond to the mouse position using mouseX and mouseY

Evaluation:
- Runs and meets the brief
- Has suitable commenting
- Includes a starting commit and then a reasonable number of commits throughout the work that include descriptive messages about what was done. Messages should be prefixed by Ex:.
- Uses good naming for added variables
- Is well structured, with new code added in sensible places in sensible orders
**************************************************/

"use strict";

// Canvas
let canvas = {
  width: 300,
  height: 450,
  positionType: 'fixed'
};

// Clouds
let frontCloudColor = "#a9b4c2"
let bgCloudColor = "#5e6572"
let bgCloudOffset = 25;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(canvas.width, canvas.height).position(windowWidth / 2 - canvas.width / 2, windowHeight/2 - canvas.height / 2,'fixed');
  ellipseMode(CENTER);
  rectMode(CENTER);
}


/**
Description of draw()
*/
function draw() {

  // back cloud
  fill(bgCloudColor);
  rect(canvas.width / 2 + bgCloudOffset, canvas.height / 6, canvas.width / 2, 20, 25);
  circle(canvas.width / 2 - 30 + bgCloudOffset, canvas.height / 7, 50);
  circle(canvas.width / 2 + 5 + bgCloudOffset, canvas.height / 9, 75);
  circle(canvas.width / 2 + 45 + bgCloudOffset, canvas.height / 7, 35);

  // front cloud
  noStroke();
  fill(frontCloudColor);
  rect(canvas.width / 2, canvas.height / 5, canvas.width / 2, 20, 25);
  circle(canvas.width / 2 - 30, canvas.height / 6, 50);
  circle(canvas.width / 2 + 5, canvas.height / 8, 75);
  circle(canvas.width / 2 + 45, canvas.height / 6, 35);

}

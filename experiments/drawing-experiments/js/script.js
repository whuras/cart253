"use strict";

/**************************************************
Drawing Experiment
Wayne Huras ID 40074423

Experimenting with p5's drawing and color functions.
Currently draws multiple rectangles.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

  let n = 1000;
  let a = 255 / n;

  createCanvas(windowWidth, windowHeight);
  background('#decbdf');

  rectMode(CENTER);
  noStroke();

  for(let i = 0; i < n; i++){
    if (a > 255) a = 255;
    a += 10;
    fill(200, 255, 200, a)
    rect(windowWidth/2, windowHeight/2, windowWidth/(i+2), windowHeight/(i+2));
  }

  line(0, 0, windowWidth/4, windowHeight/4);
  line(windowWidth*0.75, windowHeight*0.75, windowWidth, windowHeight);
  line(windowWidth, 0, windowWidth*0.75, windowHeight*0.25);
  line(windowWidth*0.25, windowHeight*0.75, 0, windowHeight);

}

// draw()
//
// Description of draw() goes here.
function draw() {

}

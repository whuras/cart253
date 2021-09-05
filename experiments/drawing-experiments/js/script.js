"use strict";

/**************************************************
Drawing Experiment
Wayne Huras ID 40074423

Experimenting with p5's drawing and color functions.
Currently draws multiple rectangles.
**************************************************/

let bgColor = '#decbdf';
let n = 1000;
let a = 255 / n;

let circleObj = {
  xPos: 200,
  yPos: 250,
  size: 200,
  speed: 5
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  //noStroke();

  /*
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
  */
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgColor);

  if(circleObj.xPos > windowWidth - circleObj.size / 2 || circleObj.xPos < 0 + circleObj.size / 2){
    circleObj.speed *= -1;
  }

  circleObj.xPos += circleObj.speed;
  ellipse(circleObj.xPos, circleObj.yPos, circleObj.size);

}

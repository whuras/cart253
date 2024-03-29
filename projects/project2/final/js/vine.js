/**************************************************
Exercise: Make Some Noise
Wayne Huras ID 40074423

Base Code Credit: https://p5js.org/examples/interaction-reach-2.html
Explanation: Logic to calculate vine segment locations, angles, and length.
Base code is credited to the example found in p5js.org.
**************************************************/

class Vine{
  constructor(baseXPos, baseYPos, numSegments, segLength, strokeColor){
    this.numSegments = numSegments;
    this.x = [];
    this.y = [];
    this.angle = [];
    this.segLength = segLength;
    this.targetX;
    this.targetY;
    this.isActive = true;
    this.strokeColor = strokeColor;
    this.strokeColor.setAlpha(192);

    for(let i = 0; i < this.numSegments; i++){
      this.x[i] = 0;
      this.y[i] = 0;
      this.angle[i] = 0;
    }

    this.x[this.x.length - 1] = baseXPos; // sets base x-coord
    this.y[this.x.length - 1] = baseYPos; // sets base y-coord

  }

  display(){
    push();

    strokeWeight(20);
    stroke(this.strokeColor);
    if(this.isActive){
      this.reachSegment(0, mouseX, mouseY);
      for(let i = 0; i < this.numSegments; i++){
        this.reachSegment(i, this.targetX, this.targetY);
      }
      for (let j = this.x.length - 1; j >= 1; j--) {
        this.positionSegment(j, j - 1);
      }
    }
    for (let k = 0; k < this.x.length; k++) {
      this.segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 2);
    }

    pop();
  }

  positionSegment(a, b){
    this.x[b] = this.x[a] + cos(this.angle[a]) * this.segLength;
    this.y[b] = this.y[a] + sin(this.angle[a]) * this.segLength;
  }

  reachSegment(i, xin, yin){
    const dx = xin - this.x[i];
    const dy = yin - this.y[i];
    this.angle[i] = atan2(dy, dx);
    this.targetX = xin - cos(this.angle[i]) * this.segLength;
    this.targetY = yin - sin(this.angle[i]) * this.segLength;
  }

  segment(x, y, a, sw){
    push();
    strokeWeight(sw);
    translate(x, y);
    rotate(a);
    line(0, 0, this.segLength, 0);
    pop();
  }
}

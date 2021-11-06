/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423

Explanation:

**************************************************/

class Target{
  constructor(x, y, diameter, color){
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color = color;
  }

  display(){
    push();
    fill(this.color);
    circle(this.x, this.y, this.diameter);
    pop();
  }
}

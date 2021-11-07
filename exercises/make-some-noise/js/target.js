/**************************************************
Exercise: Age of Aquariums
Wayne Huras ID 40074423

Explanation:

**************************************************/

class Target{
  constructor(x, y, diameter, color, notes, soundEffect){
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color = color;
    this.notes = notes;
    this.soundEffect = soundEffect;
  }

  display(){
    push();
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.diameter);
    pop();
  }

  playNotes(synth){

    let d = dist(this.x, this.y, mouseX, mouseY);
    let velocity = map(d, 0, width, 0.2, 0);

    if(frameCount % 2 == 0){
      synth.play(notes[0], velocity, 0, 1/60);
      synth.play(notes[1], velocity, 0, 1/60);
      synth.play(notes[2], velocity, 0, 1/60);
      synth.play(notes[3], velocity, 0, 1/60);
    }
  }

  playSoundEffect(){
    soundEffect.play();
  }

}

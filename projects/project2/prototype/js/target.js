/**************************************************
Exercise: Make Some Noise
Wayne Huras ID 40074423

Explanation: A target is a circle which is displayed on the screen and plays
an array of notes (chords) when the mouse is close to it. It also plays a
sound effect when clicked.

**************************************************/

class Target{
  // Target constructor
  constructor(x, y, maxDiameter, activeColor, inactiveColor, notes, soundEffect, spiralImage){
    this.x = x;
    this.y = y;
    this.maxDiameter = maxDiameter;
    this.inactiveDiameter = maxDiameter / 4;
    this.diameter = 0;
    this.theta = 0; // used for pulsing display
    this.thetaIncrement = 0.02; // used for pulsing display
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.notes = notes;
    this.soundEffect = soundEffect;
    this.synths = [];
    this.isActive = true;
    this.spiralImage = spiralImage;

    // Creates a synth for each note passed
    for(let i = 0; i < notes.length; i++){
      append(this.synths, new p5.PolySynth());
    }
  }

  // Visual display of target
  display(){
    if(this.isActive){
      let d = dist(this.x, this.y, mouseX, mouseY);

      push();
      noStroke();

      if(d <= this.maxDiameter){ // pulses if mouse is within maxDistance
        fill(this.activeColor);
        this.diameter = sin(this.theta) * this.maxDiameter;
        circle(this.x, this.y, this.diameter);
        this.theta += this.thetaIncrement;
      }
      else{ //
        fill(this.inactiveColor);
        circle(this.x, this.y, this.inactiveDiameter);
        this.theta = 0;
        this.diameter = this.inactiveDiameter;
      }

      pop();
    }
  }

  // Separate display function so we can make them all in the background
  displaySpirals(){
    if(!this.isActive){
      push();
      imageMode(CENTER);
      image(this.spiralImage, this.x, this.y);
      pop();
    }
  }

  // Plays notes if mouse is within the maxDimater
  playNotes(){
    let d = dist(this.x, this.y, mouseX, mouseY);
    let velocity = map(d, 0, this.maxDiameter, 0.2, 0);

    if(d <= this.maxDiameter && this.isActive){
      for(let i = 0; i < this.synths.length; i++){
        this.synths[i].noteAttack(this.notes[i], velocity, 0);
      }
    }
    else{
      this.stopNotes();
    }
  }

  // Stops notes
  stopNotes(){
    for(let i = 0; i < this.synths.length; i++){
      this.synths[i].noteRelease(this.notes[i]);
    }
  }

  // Plays sound effect
  playSoundEffect(){
    if(this.isActive){
      this.soundEffect.play();
    }
  }

}

/**************************************************
Exercise: Make Some Noise
Wayne Huras ID 40074423

Explanation: A target is a circle which is displayed on the screen and plays
an array of notes (chords) when the mouse is close to it. It also plays a
sound effect when clicked.

**************************************************/

class Target{
  // Target constructor
  constructor(x, y, maxDiameter, activeColor, inactiveColor, note, soundEffect){
    this.x = x;
    this.y = y;
    this.maxDiameter = maxDiameter;
    this.inactiveDiameter = maxDiameter / 4;
    this.diameter = 0;
    this.theta = 0; // used for pulsing display
    this.thetaIncrement = 0.02; // used for pulsing display
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.note = note;
    this.soundEffect = soundEffect;
    this.synths = new p5.PolySynth();
    this.isActive = true;
    this.spiralImage = spiralImage;
    this.playNote = false;

    this.spiralWidth = 203;
    this.spiralHeight = 196;
    this.spiralScale = 0;
    this.spiralMaxScale = 1;
  }

  // Visual display of target
  display(){
    if(this.isActive){
      let d = dist(this.x, this.y, mouseX, mouseY);
      push();
      noStroke();

      if(d <= this.maxDiameter){ // pulses if mouse is within maxDistance
        vineColor = this.activeColor;
        fill(this.activeColor);
        this.diameter = sin(this.theta) * this.maxDiameter;
        circle(this.x, this.y, this.diameter);
        this.theta += this.thetaIncrement;

        fill(bgColor);
        textSize(32);
        textAlign(CENTER);
        text(this.note.toString().charAt(0), this.x, this.y + 10);
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

      if(this.spiralScale < this.spiralMaxScale)
        this.spiralScale += 0.01;

      imageMode(CENTER);
      tint(this.activeColor);
      image(this.spiralImage, this.x, this.y, this.spiralWidth * this.spiralScale, this.spiralHeight * this.spiralScale);
      pop();
    }
  }

  // Plays notes if mouse is within the maxDimater
  playNotes(){

    if(this.playNote){
      let d = 1;
      let velocity = 0.1;
      this.synths.noteAttack(this.note, velocity, 0);
    }
    else
    {
      let d = dist(this.x, this.y, mouseX, mouseY);
      let velocity = map(d, 0, this.maxDiameter, 0.2, 0);

      if(d <= this.maxDiameter && this.isActive){
        this.synths.noteAttack(this.note, velocity, 0);
      }
      else{
        this.stopNotes();
      }
    }
  }

  // Stops notes
  stopNotes(){
    this.synths.noteRelease(this.note);
  }

  // Plays sound effect
  playSoundEffect(){
    if(this.isActive){
      this.soundEffect.play();
    }
  }

}

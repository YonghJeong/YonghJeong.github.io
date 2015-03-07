
// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var input;
var analyzer;
function setup() {
   createCanvas(windowWidth, windowHeight);
  current = createVector(0,0);
  previous = createVector(0,0);
     mic = new p5.AudioIn();
    mic.start();

};
function draw() {


  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// Start it up
function mouseReleased() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop


// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

// Display plath
Path.prototype.display = function() {

  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 50;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
     var vol = mic.getLevel();
    var h = map(vol, 0, 1, 0, 255);
    var diameter = float(h);
    var mX = map(this.position.x, 0, width, 0, 255);
    var mY = map(this.position.y, 0, height, 0, 255);
    var colorX = float(mX);
    var colorY = float(mY);
    stroke(diameter);
     fill(colorY/colorX*255,colorY,colorX/colorY*255, h);
     ellipse(this.position.x,this.position.y,diameter, diameter);
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);

  }
}


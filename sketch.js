var input;
var analyzer;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
        var vol = mic.getLevel();
        var h = map(vol, 0, 1, 0, 255);
        var diameter = float(h);
        var mX = map(mouseX, 0, width, 0, 255);
        var mY = map(mouseY, 0, height, 0, 255);
        var colorX = float(mX);
        var colorY = float(mY);
        fill(colorY / colorX * 255, colorY, colorX / colorY * 255, diameter);
        ellipse(mouseX, mouseY, diameter * 4, diameter * 4);
    }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var sakuraNum = 350;
var fubuki = [];
var colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < sakuraNum; i++) { 
    fubuki.push(new Sakura());
  }
  
  //desine color
  b1 = color(254, 228, 235, 150);
  b2 = color(254, 238, 237, 150);
  
  noStroke(); 
  colors.push(color(247, 173, 195, 150)); //some clolour ver.
  colors.push(color(255, 170, 205, 150));
  colors.push(color(239, 147, 182, 150));
}

function draw() {
  
  //Background
  background(254, 228, 235, 150);
  for (var i = 0; i < sakuraNum; i++) { //花びらの数だけ描画
    fubuki[i].draw();
    fubuki[i].move();
  }
}

function Sakura() { 
  var n = 4;
  var A, md, r, x, y;
  this.xDef = random(width); 
  this.xAmp = random(50,100);
  this.xSpeed = random(1,2);
  this.xTheta = random(360);
  this.ox = this.xDef + this.xAmp * sin(radians(this.xTheta));
  this.oy = random(height);
  this.rotateT = random(360);
  this.size = random(20, 50);
  this.ySpeed = this.size / 20;
  this.sizeYScale = 1;
  this.sizeYT = random(360);
  this.sizeYSpeed = this.size / 30;
  this.c = floor(random(3));
 
  this.draw = function() {
    fill(colors[this.c]);
    push();
    translate(this.ox, this.oy);
    rotate(radians(this.rotateT));
    beginShape();
    for (var t = 0; t < 360 / 4; t++) { //この辺からバラ関数の出番
      A = n / PI * radians(t);
      md = floor(A) % 2;
      r = pow(-1, md) * (A - floor(A)) + md;
      R = r + 2 * calcH(r);
      x = this.size * R * cos(radians(t));
      y = this.size * this.sizeYScale * R * sin(radians(t));
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  };
 
  this.move = function() {
    this.ox = this.xDef + this.xAmp * sin(radians(this.xTheta));
    this.xTheta += this.xSpeed;
    this.oy += this.ySpeed;
    this.sizeYT += this.sizeYSpeed;
    this.sizeYScale = abs(sin(radians(this.sizeYT)));
    if (this.oy > height + this.size) {
      this.oy = -this.size;
    }
  };
}
 
function calcH(x) {
  if (x < 0.8) {
    return 0;
  } else {
    return 0.8 - x;
  }
}

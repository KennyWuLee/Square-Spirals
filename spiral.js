
var os = require('os');
var EOL = os.EOL;
process.stdin.setEncoding('utf8');

function readline(callback) {
  process.stdin.resume();
  process.stdin.on('data', function (text) {
    process.stdin.pause();
    //remove linebreak
    text = text.toString().trim().replace(new RegExp(EOL), '');
    callback(text);
  });
}

readline(function(input) {
  var S = parseInt(input);
  if(! isNaN(S)) {
    readline(function(input) {
      var parts = input.split(/\s+/);
      if(parts.length == 1) {
        var N = parseInt(parts[0]);
        if(! isNaN(N)) {
          findPoint(S, N);
        }
      }
      else if(parts.length == 2) {
        var X = parseInt(parts[0]);
        var Y = parseInt(parts[1]);
        if(! isNaN(X) && ! isNaN(Y)) {
          findNumber(S, X, Y);
        }
      }
    });
  }
});

function Sequence(S) {
  this.direction = "right";
  this.maxX = Math.floor(S/2)+1;
  this.maxY = this.maxX;
  this.minX = this.maxX;
  this.minY = this.maxX;
  this.point = {x: this.maxX, y: this.maxY};
}

Sequence.prototype.getPoint = function() {
  return this.point;
}

Sequence.prototype.next = function() {
  switch(this.direction) {
    case "right":
      this.point.x += 1;
      if(this.point.x > this.maxX) {
        this.maxX = this.point.x;
        this.direction = "up";
      }
      break;
    case "up":
      this.point.y -= 1;
      if(this.point.y < this.minY) {
        this.minY = this.point.y;
        this.direction = "left";
      }
      break;
    case "left":
      this.point.x -= 1;
      if(this.point.x < this.minX) {
        this.minX = this.point.x;
        this.direction = "down";
      }
      break;
    case "down":
      this.point.y += 1;
      if(this.point.y > this.maxY) {
        this.maxY = this.point.y;
        this.direction = "right";
      }
      break;
  }
}

function findPoint(S, N) {
  var seq = new Sequence(S);
  for(var i = 1; i < N; i++)
    seq.next();
  var point = seq.getPoint();
  console.log("(" + point.x + ", " + point.y + ")");
}

function findNumber(S, X, Y) {
  var seq = new Sequence(S);
  var point = seq.getPoint();
  var counter = 1;
  while(point.x != X || point.y != Y) {
    seq.next();
    point = seq.getPoint();
    counter++;
  }
  console.log(counter);
}

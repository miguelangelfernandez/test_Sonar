'use strict';

function Player(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x = 50;
  this.y = 100;
  this.velocityY = 0;
  this.velocityX = 0;
  this.maxSpeed = 2;
  this.friction = 0.98;
  this.size = 50;
  this.characterIcon;
  this.points;
  this.playerID = 'player1';
}

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

var keys = [];

Player.prototype.updatePlayer = function() {
  if (keys[87]) {  //up
    if (this.velocityY > -this.maxSpeed) {
      console.log('key pressed e.keyCode');
      this.velocityY--;
    }
  }

  if (keys[83]) { //down
    if (this.velocityY < this.maxSpeed) {
      console.log('key pressed e.keyCode');
      this.velocityY++;
    }
  }

  if (keys[65]) { //left
    if (this.velocityX > -this.maxSpeed) {
      console.log('key pressed e.keyCode');
      this.velocityX--;
    }
  }

  if (keys[68]) { //right
    if (this.velocityX < this.maxSpeed) {
      console.log('key pressed e.keyCode');
      this.velocityX++;
    }
  }

  this.movement();
}

Player.prototype.movement = function() {
  this.velocityY *= this.friction;
  this.y += this.velocityY;
  this.velocityX *= this.friction;
  this.x += this.velocityX;

  if (this.x >= canvas.width - this.size) {
    this.x = this.size;
  }

  if (this.x <= 0) {
    this.x = canvas.width - this.size;
  }

  if (this.y >= canvas.height - this.size) {
    this.y = this.size;
  }

  if (this.y <= 0) {
    this.y = canvas.height - this.size;
  }
}

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

Player.prototype.checkCollisions = function(particle) {
  if ((this.x <= particle.x && this.x + this.size >= particle.x) &&
  (this.y <= particle.y && this.y + this.size >= particle.y)) {
    return true;
  }
  return false;
}


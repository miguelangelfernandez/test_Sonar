'use strict';

function Player(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x = 50;
  this.y = 100;
  this.srcX = 32;
  this.srcY = 0;
  this.velocityY = 0;
  this.velocityX = 0;
  this.maxSpeed = 5;
  this.friction = 1;
  this.size = 32;
  this.characterSpriteSheet = new Image();
  this.characterSpriteSheet.src = './Assets/Image/astronaut1-sprite.png';
  this.playerID;
  this.points = 0;
}

var keys = [];

Player.prototype.draw = function() {
  this.ctx.drawImage(this.characterSpriteSheet, this.srcX, this.srcY, this.size,this.size, this.x, this.y, this.size, this.size);
}


Player.prototype.updatePlayer = function() {
  if (keys[87]) {  //up
    this.srcY = 96;
    this.srcX = 32;
    if (this.velocityY > -this.maxSpeed) {
      this.velocityY--;
    }
  }

  else if (keys[83]) { //down
    this.srcY = 0;
    this.srcX = 64;
    if (this.velocityY < this.maxSpeed) {
      this.velocityY++;
    }
  }

  else if (keys[65]) { //left
    this.srcY = 32;
    this.srcX = 0;
    if (this.velocityX > -this.maxSpeed) {
      this.velocityX--;
    }
  }

  else if (keys[68]) { //right
    this.srcY = 64;
    this.srcX = 0;
    if (this.velocityX < this.maxSpeed) {
      this.velocityX++;
    }
  } else {
    this.srcX = 32;
    this.srcY = 0;
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

window.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

Player.prototype.checkCollisions = function(particle) {
  if ((this.x <= particle.x && this.x + this.size >= particle.x) &&
  (this.y <= particle.y && this.y + this.size >= particle.y)) {
    return true;
  }
  return false;
}





'use strict';

function Player(canvas, src, x, y) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.srcX = 32;
  this.srcY = 0;
  this.velocityY = 0;
  this.velocityX = 0;
  this.maxSpeed = 5;
  this.friction = 1;
  this.size = 32;
  this.characterSpriteSheet = new Image();
  this.characterSpriteSheet.src = src;
  this.points = 0;
}

Player.prototype.draw = function() {
  this.ctx.drawImage(this.characterSpriteSheet, this.srcX, this.srcY, this.size, this.size, this.x, this.y, this.size, this.size);
}

Player.prototype.goUp = function() {
  this.srcY = 96;
  this.srcX = 32;
  if (this.velocityY > -this.maxSpeed) {
    this.velocityY--;
  }
}

Player.prototype.goDown = function() {
  this.srcY = 0;
  this.srcX = 64;
  if (this.velocityY < this.maxSpeed) {
    this.velocityY++;
  }
}

Player.prototype.goLeft = function() {
  this.srcY = 32;
  this.srcX = 0;
  if (this.velocityX > -this.maxSpeed) {
    this.velocityX--;
  }
}

Player.prototype.goRight = function() {
  this.srcY = 64;
  this.srcX = 0;
  if (this.velocityX < this.maxSpeed) {
    this.velocityX++;
  }
}

Player.prototype.movement = function() {
  this.velocityY *= this.friction;
  this.y += this.velocityY;
  this.velocityX *= this.friction;
  this.x += this.velocityX;

  if (this.x >= this.canvas.width - this.size) {
    this.x = this.size;
  }

  if (this.x <= 0) {
    this.x = this.canvas.width - this.size;
  }

  if (this.y >= this.canvas.height - this.size) {
    this.y = this.size;
  }

  if (this.y <= 0) {
    this.y = this.canvas.height - this.size;
  }
}

Player.prototype.checkCollisions = function(particle) {
  if ((this.x <= particle.x && this.x + this.size >= particle.x) &&
    (this.y <= particle.y && this.y + this.size >= particle.y)) {
    return true;
  }
  return false;
}
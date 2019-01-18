'use strict';

function Player(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x = 500;
  this.y = 200;
  this.size = 50;
  this.characterIcon;
  this.points;
  this.playerID = 'player1';
  this.speed = 2;
  this.direction = 'E';
}

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

Player.prototype.update = function() {

}

Player.prototype.checkCollisions = function() {

}

Player.prototype.move = function() {

}

Player.prototype.setDirection = function() {

}

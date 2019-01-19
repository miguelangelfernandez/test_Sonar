'use strict';

function Player(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x = 500;
  this.y = 200;
  this.velocityY = 0;
  this.velocityX = 0;
  this.speed = 2;
  this.friction = 0.98;
  this.size = 50;
  this.characterIcon;
  this.points;
  this.playerID = 'player1';
  this.direction = 'E';
}

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

var keys = [];

Player.prototype.updatePlayer = function() {
  if (keys[87]) {  //up
    if (this.velocityY > -this.speed) {
      console.log('key pressed e.keyCode');
      this.velocityY--;
    }
  }

  if (keys[83]) { //down
    if (this.velocityY < this.speed) {
      console.log('key pressed e.keyCode');
      this.velocityY++;
    }
  }

  if (keys[65]) { //left
    if (this.velocityX > -this.speed) {
      console.log('key pressed e.keyCode');
      this.velocityX--;
    }
  }

  if (keys[68]) { //right
    if (this.velocityX < this.speed) {
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
}

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

Player.prototype.checkCollisions = function() {

}

Player.prototype.setDirection = function(direction) {

}

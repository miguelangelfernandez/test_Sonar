'use strict';

function Game(){

  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  this.particles = [];
}

Game.prototype.clearCanvas = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function() {
  
}

Game.prototype.updateGame = function() {

}

Game.prototype.createParticles = function() {
  if(Math.floor(Math.random() > 0.95)) {
    this.particles.push(new Particle());
  };

};

Game.prototype.start = function() {

}

Game.prototype.onGameOver = function() {

}



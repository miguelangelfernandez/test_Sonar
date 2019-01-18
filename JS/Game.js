'use strict';

function Game(canvas, printTime){
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  this.timer = new Timer();
  this.timer.changeTime(printTime)

  this.particles = [];
  this.animation;
}

Game.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function() {
  this.player.draw();
}

Game.prototype.updateGame = function() {
}

Game.prototype.createParticles = function() {
  if(Math.floor(Math.random() > 0.95)) {
    this.particles.push(new Particle());
  };

};

Game.prototype.start = function() {
  function gameLoop() {
    this.updateGame();
    this.clearCanvas();
    this.drawCanvas();

    this.animation = window.requestAnimationFrame(gameLoop.bind(this));
  };
  gameLoop.call(this);
}

Game.prototype.onGameOver = function() {

}

Game.prototype.stop = function() {

}



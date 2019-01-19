'use strict';

function Game(canvas, printTime) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.particles = [];
  this.player = new Player(canvas, keys);
  this.timer = new Timer();
  this.timer.changeTime(printTime);
  this.animation;
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.particles.forEach(function (particle) {
    particle.draw();
  });
}

Game.prototype.updateGame = function () {
  this.createParticles();
  this.player.updatePlayer();
}

Game.prototype.createParticles = function () {
  if (this.particles.length < 55) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    this.particles.push(new Particle(canvas, x, y));
  }
};

Game.prototype.start = function () {
  function gameLoop() {
    this.updateGame();
    this.clearCanvas();
    this.drawCanvas();
    this.timeOver();

    this.animation = window.requestAnimationFrame(gameLoop.bind(this));
  };

  gameLoop.call(this);
}

Game.prototype.timeOver = function () {
  if (this.timer.timeLeft === 0) {
    this.timer.stopTimer();
  }
}
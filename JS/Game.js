'use strict';

function Game(canvas, printTime, printPoints) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.gems = []
  this.meteorites = [];
  this.player = new Player(canvas);
  this.timer = new Timer();
  this.timer.changeTime(printTime);
  this.printPoints = printPoints;
  this.animation;

  this.particlesCollection = [{
    type: 'gem',
    speed: 0.5,
    src: './Assets/Image/red-crystal.png',
    size: 20
  },
  
  {
    type: 'meteorite',
    speed: 2,
    src: './Assets/Image/Meteorite.png',
    size: 80
  }];
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.gems.forEach(function (gem) {
    gem.draw();
  });
}

Game.prototype.updateGame = function () {
  this.player.updatePlayer();
  this.createParticles(this.gems, 'gem', 15);
  this.printPoints(this.player);

  this.gems = this.gems.filter(function(gem) {
    return gem.isInScreen();
  });

  this.gems.forEach(function(gem) {
    gem.updateParticle();
  });

  this.gems.forEach(function(gem) {
    if(this.player.checkCollisions(gem)) {
      gem.dissapear();
      this.player.points++;
    };
  }.bind(this));
}

Game.prototype.createParticles = function (typeArray, maxNumberInScreen, particleType) {
  
  if (typeArray.length < maxNumberInScreen) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    typeArray.push(new Particle(canvas, x, y, particleType));
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

Game.prototype.points = function () {

}

Game.prototype.timeOver = function () {
  if (this.timer.timeLeft === 0) {
    this.timer.stopTimer();
  }
}


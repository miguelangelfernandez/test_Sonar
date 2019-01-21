'use strict';

function Game(canvas, printTime, printPoints) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.player1Presses = [];
  this.player2Presses = [];
  this.gems = []
  this.meteorites = [];
  this.player1Src = './Assets/Image/astronaut1-sprite.png';
  this.player1 = new Player(canvas, this.player1Src, 50, 100);
  this.player2Src = './Assets/Image/astronaut2-sprite.png';
  this.player2 = new Player(canvas, this.player2Src, 1400, 500);
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
      size: 40
    }
  ];
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function () {
  this.player1.draw();
  this.player2.draw();
  this.gems.forEach(function (gem) {
    gem.draw();
  });
  this.meteorites.forEach(function (meteorite) {
    meteorite.draw();
  });
}

Game.prototype.checkIsInScreen = function (listItems) {
  return listItems.filter(function (item){
    return item.isInScreen()
  })
}

Game.prototype.updateGame = function () {
  this.updatePlayer1Position();
  this.updatePlayer2Position();
  this.createParticles(this.gems, 15, this.particlesCollection[0]);
  this.createParticles(this.meteorites, 2, this.particlesCollection[1]);
  this.printPoints();
  this.gems = this.checkIsInScreen(this.gems);
  this.meteorites = this.checkIsInScreen(this.meteorites);

  this.gems.forEach(function (gem) {
    if (this.player1.checkCollisions(gem)) {
      gem.dissapear();
      this.player1.points++;
    }
    else if (this.player2.checkCollisions(gem)) {
      gem.dissapear();
      this.player2.points++;
    }
  }.bind(this));

  this.meteorites.forEach(function (meteorite) {
    if (this.player1.checkCollisions(meteorite)) {
      meteorite.dissapear();
      (this.player1.points >= 5 ? this.player1.points -= 5 : this.player1.points = 0);
    }
    else if (this.player2.checkCollisions(meteorite)) {
      meteorite.dissapear();
      (this.player2.points >= 5 ? this.player2.points -= 5 : this.player2.points = 0);      
    }
  }.bind(this));

  this.gems.forEach(function (gem) {
    gem.updateParticle('gem');
  });
  
  this.meteorites.forEach(function (meteorite) {
    meteorite.updateParticle('meteorite');
  });
}

Game.prototype.createParticles = function (typeArray, maxNumberInScreen, particleType) {

  if (typeArray.length < maxNumberInScreen) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    typeArray.push(new Particle(canvas, x, y, particleType));
  }
};

Game.prototype.updatePlayer1Position = function() {
  if (this.player1Presses[87]) {  //up player 1
    this.player1.goUp();
  }

  else if (this.player1Presses[83]) { //down player 1
    this.player1.goDown();
  }

  else if (this.player1Presses[65]) { //left player 1
    this.player1.goLeft();
  }

  else if (this.player1Presses[68]) { //right player 1
    this.player1.goRight();

  } else{
    this.player1.srcX = 32;
    this.player1.srcY = 0;
  }

  this.player1.movement();
}

Game.prototype.updatePlayer2Position = function() {
  if (this.player2Presses[38]) {  //up player 2
    this.player2.goUp();
  }

  else if (this.player2Presses[40]) { //down player 2
    this.player2.goDown();
  }

  else if (this.player2Presses[37]) { //left player 2
    this.player2.goLeft();
  }

  else if (this.player2Presses[39]) { //right player 2
      this.player2.goRight();

  } else {
    this.player2.srcX = 32;
    this.player2.srcY = 0;
  }

  this.player2.movement();
}

Game.prototype.start = function () {  

  window.addEventListener("keydown", function(e) {
    this.player1Presses[e.keyCode] = true;
    this.player2Presses[e.keyCode] = true;
  }.bind(this));
  
  window.addEventListener("keyup", function(e) {
    this.player1Presses[e.keyCode] = false;
    this.player2Presses[e.keyCode] = false;
  }.bind(this));

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
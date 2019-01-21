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
  this.key = [];

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
  this.player.draw();
  this.gems.forEach(function (gem) {
    gem.draw();
  });
  this.meteorites.forEach(function (meteorite) {
    meteorite.draw();
  });
}

// Game.prototype.checkIsInScreen = function (listItems) {
//   return filteredItems = listItems.filter(function (item){
//     return item.isInScreen()
//   })
// }

Game.prototype.updateGame = function () {
  this.updatePlayerPosition();
  this.createParticles(this.gems, 15, this.particlesCollection[0]);
  this.createParticles(this.meteorites, 2, this.particlesCollection[1]);
  this.printPoints(this.player);

  this.gems = this.gems.filter(function (gem) {
    return gem.isInScreen();
  });

  this.meteorites = this.meteorites.filter(function (meteorite) {
    return meteorite.isInScreen();
  });


  this.gems.forEach(function (gem) {
    if (this.player.checkCollisions(gem)) {
      gem.dissapear();
      this.player.points++;
    };
  }.bind(this));

  this.meteorites.forEach(function (meteorite) {
    if (this.player.checkCollisions(meteorite)) {
      meteorite.dissapear();
      (this.player.points >= 5 ? this.player.points -= 5 : this.player.points = 0);
    };
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

Game.prototype.updatePlayerPosition = function() {
  if (keys[87]) {  //up
    this.player.goUp();
  }

  else if (keys[83]) { //down
    this.player.goDown();
  }

  else if (keys[65]) { //left
    this.player.goLeft();
  }

  else if (keys[68]) { //right
    this.player.goRight();
  
  } else {
    this.player.srcX = 32;
    this.player.srcY = 0;
  }
  this.player.movement();
}

Game.prototype.start = function () {  

  window.addEventListener("keydown", function(e) {
    this.keys[e.keyCode] = true;
  });
  
  window.addEventListener("keyup", function(e) {
    this.keys[e.keyCode] = false;
  });

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
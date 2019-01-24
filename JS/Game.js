'use strict';

function Game(canvas, printTime, printPoints) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.gems = []
  this.meteorites = [];
  this.satellites = [];

  this.player1Presses = [];
  this.player2Presses = [];
  this.player1Src = './Assets/Image/astronaut1-sprite.png';
  this.player1 = new Player(canvas, this.player1Src, 50, 100);
  this.player2Src = './Assets/Image/astronaut2-sprite.png';
  this.player2 = new Player(canvas, this.player2Src, 1400, 500);

  this.timer = new Timer();
  this.timer.changeTime(printTime);

  this.printPoints = printPoints;
  this.animation;

  this.gemAudio = new Audio('./Assets/Sounds/GemSound.mp3');
  this.meteoriteAudio = new Audio('./Assets/Sounds/Comet-Sound.mp3');
  this.satelliteAudio = new Audio('./Assets/Sounds/satelliteSound.mp3');

  this.cheatsArray = [];
  this.cheatsString;

  this.particlesCollection = [{
      type: 'gem',
      speed: 0.5,
      src: './Assets/Image/red-crystal.png',
      size: 20
    },
    {
      type: 'meteorite',
      speed: 3,
      src: './Assets/Image/Meteorite.png',
      size: 40
    },
    {
      type: 'satellite',
      speed: 3,
      src: './Assets/Image/Satellite.png',
      size: 50
    }
  ];
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Game.prototype.drawCanvas = function () {
  this.gems.forEach(function (gem) {
    gem.draw();
  });
  this.meteorites.forEach(function (meteorite) {
    meteorite.draw();
  });
  this.satellites.forEach(function (satellite) {
    satellite.draw();
  });
  this.player1.draw();
  this.player2.draw();
}

Game.prototype.checkIsInScreen = function (listItems) {
  return listItems.filter(function (item) {
    return item.isInScreen()
  })
}

Game.prototype.playersCollision = function () {
  if (this.player1.checkCollisions(this.player2)) {
    this.player1.velocityX *= -1.1;
    this.player1.velocityY *= -1.1;
    this.player2.velocityX *= -1.1;
    this.player2.velocityY *= -1.1;
  }
}

Game.prototype.updateGame = function () {
  this.playersCollision();
  this.updatePlayer1Position();
  this.updatePlayer2Position();

  this.createParticles(this.gems, 15, this.particlesCollection[0]);
  this.createParticles(this.meteorites, 4, this.particlesCollection[1]);
  this.createParticles(this.satellites, 2, this.particlesCollection[2]);

  this.printPoints();

  this.gems = this.checkIsInScreen(this.gems);
  this.meteorites = this.checkIsInScreen(this.meteorites);
  this.satellites = this.checkIsInScreen(this.satellites);

  this.gems.forEach(function (gem) {
    if (this.player1.checkCollisions(gem)) {
      (gem.state === 'active') ? this.player1.points++: null;
      gem.particleImage.src = './Assets/Image/Crystal_01.png';
      gem.state = 'inactive';

      setTimeout(function () {
        gem.dissapear();
      }, 200);

      this.gemAudio.play();

    } else if (this.player2.checkCollisions(gem)) {
      (gem.state === 'active') ? this.player2.points++: null;
      gem.particleImage.src = './Assets/Image/Crystal_01.png';
      gem.state = 'inactive';

      setTimeout(function () {
        gem.dissapear();
      }, 200);

      this.gemAudio.play();
    }
  }.bind(this));

  this.meteorites.forEach(function (meteorite) {
    if (this.player1.checkCollisions(meteorite)) {
      if (meteorite.state === 'active') {
        (this.player1.points >= 50 ? this.player1.points -= 50 : this.player1.points = 0);
        this.player1.velocityX = 0;
        this.player1.velocityY = 0;
      };

      meteorite.particleImage.src = './Assets/Image/Explosion_02.png';
      meteorite.state = 'inactive';

      setTimeout(function () {
        meteorite.dissapear();
      }, 200);

      this.meteoriteAudio.play();

    } else if (this.player2.checkCollisions(meteorite)) {
      if (meteorite.state === 'active') {
        (this.player2.points >= 50 ? this.player2.points -= 50 : this.player2.points = 0);
        this.player2.velocityX = 0;
        this.player2.velocityY = 0;
      };

      meteorite.particleImage.src = './Assets/Image/Explosion_02.png';
      meteorite.state = 'inactive';

      setTimeout(function () {
        meteorite.dissapear();
      }, 200);

      this.meteoriteAudio.play();
    }
  }.bind(this));

  this.satellites.forEach(function (satellite) {
    if (this.player1.checkCollisions(satellite)) {
      (satellite.state === 'active') ? this.player1.points += 50: null;
      satellite.particleImage.src = './Assets/Image/Satellite-Open.png';
      satellite.state = 'inactive';

      setTimeout(function () {
        satellite.dissapear();
      }, 200);

      this.satelliteAudio.play();

    } else if (this.player2.checkCollisions(satellite)) {
      (satellite.state === 'active') ? this.player2.points += 50: null;
      satellite.particleImage.src = './Assets/Image/Satellite-Open.png';
      satellite.state = 'inactive';

      setTimeout(function () {
        satellite.dissapear();
      }, 200);

      this.satelliteAudio.play();
    }
  }.bind(this));

  this.gems.forEach(function (gem) {
    gem.updateParticle('gem');
  });

  this.meteorites.forEach(function (meteorite) {
    meteorite.updateParticle('meteorite');
  });

  this.cheatCommand();
}

Game.prototype.createParticles = function (typeArray, maxNumberInScreen, particleType) {
  if (typeArray.length < maxNumberInScreen) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    typeArray.push(new Particle(canvas, x, y, particleType));
  }
};

Game.prototype.updatePlayer1Position = function () {
  if (this.player1Presses[87]) { //up player 1
    this.player1.goUp();
  } else if (this.player1Presses[83]) { //down player 1
    this.player1.goDown();
  } else if (this.player1Presses[65]) { //left player 1
    this.player1.goLeft();
  } else if (this.player1Presses[68]) { //right player 1
    this.player1.goRight();

  } else {
    this.player1.srcX = 32;
    this.player1.srcY = 0;
  }

  this.player1.movement();
}

Game.prototype.updatePlayer2Position = function () {
  if (this.player2Presses[38]) { //up player 2
    this.player2.goUp();
  } else if (this.player2Presses[40]) { //down player 2
    this.player2.goDown();
  } else if (this.player2Presses[37]) { //left player 2
    this.player2.goLeft();
  } else if (this.player2Presses[39]) { //right player 2
    this.player2.goRight();

  } else {
    this.player2.srcX = 32;
    this.player2.srcY = 0;
  }

  this.player2.movement();
}

Game.prototype.start = function () {

  window.addEventListener('keydown', function (e) {
    this.player1Presses[e.keyCode] = true;
    this.player2Presses[e.keyCode] = true;
  }.bind(this));

  window.addEventListener('keyup', function (e) {
    this.player1Presses[e.keyCode] = false;
    this.player2Presses[e.keyCode] = false;
  }.bind(this));

  window.addEventListener('keypress', function (e) {
    if (e.keyCode === 48 ||
      e.keyCode === 56 ||
      e.keyCode === 57 ||
      e.keyCode === 49
    ) {
      this.cheatsArray.push(e.keyCode);
    }
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

Game.prototype.timeOver = function () {
  if (this.timer.timeLeft === 0) {
    this.timer.stopTimer();
  }
}

Game.prototype.cheatCommand = function () {
  this.cheatsString = this.cheatsArray.join('')
  if (this.cheatsString.indexOf('48565749') != -1) {

    this.meteoriteAudio = new Audio('../Assets/Image/secret/Sounds/goldPot.wav');
    this.gemAudio = new Audio('../Assets/Image/secret/Sounds/gold.wav');

    this.gems.forEach(function (gem) {
      gem.particleImage.src = './Assets/Image/secret/gold.png';
      gem.speed = 0;
    });

    this.meteorites.forEach(function (meteorite) {
      meteorite.particleImage.src = './Assets/Image/secret/cactus.png';
      meteorite.speed = 0;
    });

    this.satellites.forEach(function (satellite) {
      satellite.particleImage.src = './Assets/Image/secret/goldpot.png';
      satellite.size = 30;
    });

    this.particlesCollection[0].src = './Assets/Image/secret/gold.png';
    this.particlesCollection[0].speed = 0;

    this.particlesCollection[1].src = './Assets/Image/secret/cactus.png';
    this.particlesCollection[1].speed = 0;

    this.particlesCollection[2].src = './Assets/Image/secret/goldpot.png';
    this.particlesCollection[2].size = 30;

    document.body.style.backgroundImage = 'url(./Assets/Image/secret/Background.jpeg)';
    this.player1.friction = 0.95;
    this.player2.friction = 0.95;
    this.player1.characterSpriteSheet.src = './Assets/Image/secret/miner1.png';
    this.player2.characterSpriteSheet.src = './Assets/Image/secret/miner2.png';

    this.cheatsArray = [];
  }
};
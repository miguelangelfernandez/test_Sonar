# Gold-Rush

## Description

Gold Rush (name under review) is a timed game where you must catch as many gold as possible and get rich. Once the timer is on you must go get as many gold nuggets as you can and try to avoid the dangers of the desert, especially the pointy cactus.

## MVP

The basic game will be based on Canvas technology and will feature a single player level where random items appear an you need to catch as many as possible in a set time avoiding collisions with the objects.
It will consist on three screens, the splash screen, canvas game and Game Over.

## Backlog

* 2 players.
* Set playing time.
* Travers the canvas to the opposite side when hitting the border.
* Choose character's image.
* Music.
* Event sounds.
* Random decoration
* Powerup items.
* Levels.
* Flip color.
* Cheat commands.
* Count down from three before starting.
* Ranking.
* Gamepad.

## Data Structure

* index.html
* main.css
* main.js (handles DOM manipulation, transitions, inputs and start game)
* Game.js (handles canvas creation and update)
* Player.js (handles controllable elements)
* Particles.js (handles decoration and collectibles)
* Timer.js (controls game time and game stop)

```

//DOM manipulation and screen transition

StartGame() {
  var game;
  var canvas;
  var keyDown;
  game.start();

  //event listeners for the key presses

}

//Classes:

Game () {
  self.canvas;
  self.ctx;
  self.player;
  self.particles;
  self.animation;

  self.clearCanvas();
  self.drawCanvas();
  self.updateGame();
  self.createParticles();
  self.start();
}

Player () {
  self.x;
  self.y;
  self.size;
  self.image;
  self.points;
  self.playerId;
  self.speed;
  self.direction;

  self.setDirection();
  self.draw();
  self.update();
  self.checkCollisions();
  self.move();
}

Particle () {
  self.x;
  self.y;
  self.size;
  self.image;
  self.type;

  self.appear();
  self.disappear();
  self.draw();
  self.update();
}

//Particles children

GoldenNuggets(){};
Visuals(){};

Timer () {
  self.startTimer();
  self.setMinutes();
  self.setSeconds();
  self.stopTimer();
}

```

## Tasks

1. File structure
2. Game screen and canvas
3. Start game and game loop logic
4. Constructors and properties for every object class
5. Draw and Update logic
6. Draw and update logic for player
7. Key binds for controls
8. Direction and Movement
9. Debug movement and direction
10. Particles random creation and interval
11. Check collisions
12. Debug collisions
13. Particles dissapearing
14. Timer
15. Stop game (game over)
16. Screens html and css
17. Screens transition

## Technologies

* HTML
* CSS
* Vanilla JavaScript
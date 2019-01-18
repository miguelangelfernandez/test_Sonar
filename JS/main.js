'use strict';

// BuildDom sections

function main() {
  function buildDom(domHtml) {
    var container = document.getElementById('container');
    container.innerHTML = domHtml;

    return container;
  }

  function buildSplashScreen() {
    var splashScreen = `<h1 class='game-title'>Gold Rush</h1>
    <div class='buttons-container'>
    <a id='player1' class='button' href='#'>I'm a solo miner</a>
    <a id='instructions' class='button' href='#'>Wanna know how to be rich?</a>
    <a id='player2' class='button' href='#'>We work in pairs</a>
    </div>`;

    buildDom(splashScreen);

    var player1 = document.getElementById('player1');
    player1.addEventListener('click', buildGameScreen);
  }

  
  function buildGameOverScreen() {
    var gameOverScreen = `<div class='final-screen'>
    <div class='header'>
    <h1 class='game-over'>Game Over</h1>
    <h2 id='result' class='result'>Player 1 Won with 150 Points!</h2>
    <a id='replay' class='replay'>Insert Coin</a>
    </div>
    <div class='ranking'></div>
    </div>`;
    
    buildDom(gameOverScreen);
    
    var replay = document.getElementById('replay');
    replay.addEventListener('click', buildSplashScreen);
  }
  
  // Start main Screen
  
  function loadGame() {
    buildSplashScreen();
  }
  
  loadGame()

  //Start Game

  function buildGameScreen() {
    var gameScreen = `<div class="buttons-container">
    <div class="button">
      <span class="player1Points">10</span>
      <span>Points</span>
    </div>
    <div class="button">
      <span class="minDec">0</span>
      <span class="minUni">2</span>
      <span>:</span>
      <span class="secDec">0</span>
      <span class="secUni">0</span>
    </div>
    <div class="button">
        <span class="player2Points">10</span>
        <span>Points</span>
    </div>
    </div>
    <canvas id='canvas' class='canvas' width='940px' height='520px'></canvas>`;
    
    buildDom(gameScreen);
    
    var canvas = document.getElementById('canvas');
    var game = new Game(canvas);
    
    game.start();

    
    // For testing only
    var counter = 0;
    var interval = setInterval(function () {
      counter++;
      console.log(counter);
    }, 1000);

    setTimeout(function () {
      clearInterval(interval);
      buildGameOverScreen();
    }, 120000);
  }

  //Key events Player 1



}

window.addEventListener('load', main);
'use strict';

// BuildDom sections

function main() {

  var themeSound = new Audio("./Assets/Sounds/I-Robot2 Loop.wav");
  themeSound.loop = true;
  themeSound.play().then(function(){
    console.log('music playing')
  })
  .catch(function(error) {
    console.log(error)
  })

  function buildDom(domHtml) {
    var container = document.getElementById('container');
    container.innerHTML = domHtml;

    return container;
  }

  // Start main Screen

  
  function loadGame() {
    buildSplashScreen();
  }

  loadGame()

  function buildSplashScreen() {
    var splashScreen = `<div class="splash-screen-container">
    <h1 class="game-title">Gravity Zero</h1>
    <div class="splash-controls-container">
      <p class="intro">
        Collecting space gems is a tough business. Only the most skilled
        can swimm in the vacumn and survive the dangers it hides. Are you
        among them?
      </p>
      <a id="player1" class="button" href="#">3, 2, 1,... Ejection!</a>
    </div>
  </div>`;

    buildDom(splashScreen);
    var player1 = document.getElementById('player1');
    player1.addEventListener('click', buildGameScreen);
  }

  //Start Game

  function buildGameScreen() {
    var gameScreen = `<div class="markers-container">
    <div class="markers">
      <span id="player1-points">10</span>
      <span>Points</span>
    </div>
    <div class="markers">
      <span id="minDec">0</span>
      <span id="minUni">2</span>
      <span>:</span>
      <span id="secDec">0</span>
      <span id="secUni">0</span>
    </div>
    <div class="markers">
      <span id="player2-points">10</span>
      <span>Points</span>
    </div>
  </div>
  <canvas id="canvas" class="canvas" width="1500px" height="600px"></canvas>`;

    buildDom(gameScreen);

    var canvas = document.getElementById('canvas');
    var game = new Game(canvas, printTime, printPoints);

    //Timer

    var minDec = document.getElementById('minDec');
    var minUni = document.getElementById('minUni');
    var secDec = document.getElementById('secDec');
    var secUni = document.getElementById('secUni');

    function printMinutes() {
      minDec.textContent = game.timer.minutes[0];
      minUni.textContent = game.timer.minutes[1];
    }

    function printSeconds() {
      secDec.textContent = game.timer.seconds[0];
      secUni.textContent = game.timer.seconds[1];
    }

    function printTime() {
      printMinutes();
      printSeconds();
    }

    // Points

    var player1Points = document.getElementById('player1-points');
    var player2Points = document.getElementById('player2-points');

    function printPoints() {
      player1Points.textContent = game.player1.points;
      player2Points.textContent = game.player2.points;
    }

    game.timer.startTimer();

    game.start();

    setTimeout(buildGameOverScreen, 120000);
  }

  // Finish game

  function buildGameOverScreen() {
    var gameOverScreen = `<div class="final-screen">
    <div class="left-content">
      <h1 class="game-over">Game Over</h1>
      <h2 id="result" class="result">Player 1 Won with 150 Points!</h2>
    </div>
    <div class="right-content">
      <h2 class="ranking-title">Space Ranking</h2>
      <ol class="ranking">
        <li class="player-ranking">Anakin 200 Points</li>
        <li class="player-ranking">Spock 190 Points</li>
        <li class="player-ranking">Jabbah The Hut 170 Points</li>
        <li class="player-ranking">Rick 140 Points</li>
        <li class="player-ranking">Sheppard 120 Points</li>
        <li class="player-ranking">Paquito 50 Points</li>
        <li class="player-ranking">Pedro el Panadero 25 Points</li>
      </ol>
      <a id="replay" class="replay">Insert credits to go back in Space</a>
    </div>
  </div>`;

    buildDom(gameOverScreen);

    var replay = document.getElementById('replay');
    var winner = document.getElementById('result'); 
    replay.addEventListener('click', buildSplashScreen);
  }

}

window.addEventListener('load', main);
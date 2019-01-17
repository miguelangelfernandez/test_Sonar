'use strict';

var instructions = document.getElementById('instructions');
var player2 = document.getElementById('player2');

var result = document.getElementById('result');

var splashScreen = `<h1 class="game-title">Gold Rush</h1>
  <div class="buttons-container">
  <a id="player1" class="button" href="#">I'm a solo miner</a>
  <a id="instructions" class="button" href="#">Wanna know how to be rich?</a>
  <a id="player2" class="button" href="#">We work in pairs</a>
  </div>`;
var gameScreen = `<div class="buttons-container">
  <a class="button" href="#">10 points</a>
  <a class="button" href="#">02:00</a>
  <a class="button" href="#">10 points</a>
  </div>`;
var gameOverScreen = `<div class="final-screen">
  <div class="header">
  <h1 class="game-over">Game Over</h1>
  <h2 id="result" class="result">Player 1 Won with 150 Points!</h2>
  <a id="replay" class="replay">Insert Coin</a>
  </div>
  <div class="ranking"></div>
  </div>`;
  
function buildDom(domHtml) {
  var container = document.getElementById('container');
  container.innerHTML = domHtml;

  return container;
}

function destroyDom(container) {
  container.innerHTML = "";
}

function startGame() {
  buildSplashScreen();
}

function buildSplashScreen() {
  buildDom(splashScreen);
  
  var player1 = document.getElementById('player1');
  player1.addEventListener("click", function() {
    buildGameScreen();
  });
}

function buildGameScreen() {
  buildDom(gameScreen);
  
  // For testing only
  var counter = 0;
  var interval = setInterval(function() {
    counter++;
    console.log(counter);
  }, 1000);

  setTimeout(function() {
    clearInterval(interval);
    buildGameOverScreen();
  }, 5000);
}

function buildGameOverScreen() {
  buildDom(gameOverScreen);

  var replay = document.getElementById('replay');
  replay.addEventListener("click", function() {
    buildSplashScreen();
  });
}

function destroySplashScreen(splashScreen) {
  destroyDom(splashScreen);
}

function destroyGameScreen(gameScreen) {
  destroyDom(gameScreen);
}

function destroyGameOverScreen(gameOverScreen) {
  destroyDom(gameOverScreen);
}



window.addEventListener('load', startGame);
'use strict';

var player1 = document.getElementById('player1');
var instructions = document.getElementById('instructions');
var player2 = document.getElementById('player2');

var result = document.getElementById('result');
var replay = document.getElementById('replay');

function buildDom(domHtml) {
  var container = document.getElementById('container');
  container.innerHTML = domHtml;

  return container;
}

function destroyDom(container) {
  container.innerHTML = "";
}

function buildSplashScreen() {
  var splashScreen = `<h1 class="game-title">Gold Rush</h1>
  <div class="buttons-container">
    <a id="player1" class="button" href="#">I'm a solo miner</a>
    <a id="instructions" class="button" href="#">Wanna know how to be rich?</a>
    <a id="player2" class="button" href="#">We work in pairs</a>
  </div>`;

  buildDom(splashScreen);
}

function buildGameScreen() {
  var gameScreen = `<div class="buttons-container">
  <a class="button" href="#">10 points</a>
  <a class="button" href="#">00:00</a>
  <a class="button" href="#">10 points</a>
  </div>`;

  buildDom(gameScreen);
}

function buildGameOverScreen() {
  var gameOverScreen = `<div class="final-screen">
  <div class="header">
    <h1 class="game-over">Game Over</h1>
    <h2 id="result" class="result">Player 1 Won with 150 Points!</h2>
    <a id="replay" class="replay">Insert Coin</a>
  </div>
  <div class="ranking"></div>
  </div>`;

  buildDom(gameOverScreen);
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
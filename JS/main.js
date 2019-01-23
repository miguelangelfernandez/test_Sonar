'use strict';

// BuildDom sections

function main() {
  var mainDiv = document.getElementById('container');
  window.addEventListener("keypress", function(event) {
    (event.keyCode === 32) ? mainDiv.classList.add('filtered') : null; 
  });

  function buildDom(domHtml) {
    var container = document.getElementById('container');
    container.innerHTML = domHtml;

    return container;
  }

  var backgroundAudio = new Audio('./Assets/Sounds/I-Robot2 Loop.wav');
  backgroundAudio.loop = true;
  backgroundAudio.play();

  // Start main Screen


  function loadGame() {
    buildSplashScreen();
  }

  loadGame()

  function buildSplashScreen() {
    var splashScreen = `<div class="splash-screen-container">
    <h1 class="game-title">Gravity Zero</h1>
    <div class="splash-controls-container">
      <div class="intro-container">
      <p id="intro" class="intro flip">
        Collecting space gems is a tough business. Only the most skilled
        can swimm in the vacumn and survive the dangers it hides. Are you
        among them?
      </p>
      <img src="./Assets/Image/InstructionsTransparent.png" class="flip instructions hidden">
      </div>
      <a id="play" class="button" href="#">3, 2, 1,... Ejection!</a>
    </div>
  </div>`;

    buildDom(splashScreen);
    var play = document.getElementById('play');
    var introText = document.getElementById('intro');
    var instructions = document.querySelector('img');

    play.addEventListener('mouseover', function() {
      instructions.classList.remove('hidden');
      introText.classList.add('hidden');
    });

    play.addEventListener('mouseout', function() {
      introText.classList.remove('hidden');
      instructions.classList.add('hidden');
    });

    play.addEventListener('click', buildGameScreen);
  }

  //Start Game

  function buildGameScreen() {
    var gameScreen = `<div class="markers-container">
    <div class="markers">
      <span id="player1-points" class="player1">10</span>
      <span class="player1">Points</span>
    </div>
    <div class="markers">
      <span id="minDec">0</span>
      <span id="minUni">1</span>
      <span>:</span>
      <span id="secDec">3</span>
      <span id="secUni">0</span>
    </div>
    <div class="markers">
      <span id="player2-points" class="player2">10</span>
      <span class="player2">Points</span>
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

    setTimeout(function () {
      buildGameOverScreen();

    }, 90000);
  }

  // Finish game

  function buildGameOverScreen() {
    var gameOverScreen = `<div class="final-screen">
    <div class="left-content" id="left-content">
      <h1 class="game-over">Game Over</h1>
      <h2 class="result">
        <input class="input" id="input" type="text" placeholder="Explorer" maxlength="16" onfocus="this.placeholder = ''">
        <span class="flicker" id="flicker">|</span>
        <span id="result">Won with 150 Points</span>
      </h2>
    </div>
    <div class="right-content">
      <h2 class="ranking-title">Space Ranking</h2>
      <ol id="ranking">
      </ol>
      <a id="replay" class="replay button">Insert credits</a>
    </div>
  </div>`;

    var pointsP1 = parseInt(document.getElementById('player1-points').textContent);
    var pointsP2 = parseInt(document.getElementById('player2-points').textContent);
    
    buildDom(gameOverScreen);

    var astronaut = document.getElementById('left-content');
    var replay = document.getElementById('replay');
    var result = document.getElementById('result');
    var winningResult = 0;

    function winnerText() {
      if (pointsP1 > pointsP2) {
        result.textContent = `Won with ${pointsP1} Points`;
        winningResult = pointsP1;
        astronaut.style.backgroundImage = 'url(./Assets/Image/astronaut1.png)';

      } else {
        result.textContent = `Won with ${pointsP2} Points`;
        winningResult = pointsP2;
        astronaut.style.backgroundImage = 'url(./Assets/Image/astronaut2.png)';
      };
    }

    winnerText();

    window.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        window.localStorage.setItem(input.value, winningResult);
      };
    });

    var parsedLocalStorage = JSON.parse(JSON.stringify(localStorage));

    var localStorageObject = Object.keys(parsedLocalStorage).map(function (e) {
      return {
        name: e,
        points: parseInt(parsedLocalStorage[e])
      }
    });

    var localStorageObjectSorted = localStorageObject.sort(function(a, b){
      return b.points - a.points;
    }).slice(0, 5);

    function printRankingList() {
      var ol = document.getElementById('ranking');

      localStorageObjectSorted.forEach(function(player) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(`${player.name} ${player.points} Points`));
        ol.appendChild(li);
      });
    }

    printRankingList();
    
    var flicker = document.querySelector('.flicker');
    setInterval(function () {
      flicker.classList.toggle('hidden');
    }, 1000);

    replay.addEventListener('click', buildSplashScreen);
  }
  
}

window.addEventListener('load', main);
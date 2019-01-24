'use strict';

//Ranking

function deleteRankingList() {
  var ol = document.getElementById('ranking');
  ol.innerHTML = '';
}

function printRankingList() {
  var parsedLocalStorage = JSON.parse(JSON.stringify(localStorage));

  var localStorageObject = Object.keys(parsedLocalStorage).map(function (e) {
    return {
      name: e,
      points: parseInt(parsedLocalStorage[e])
    }
  });

  var localStorageObjectSorted = localStorageObject.sort(function (a, b) {
    return b.points - a.points;
  }).slice(0, 5);

  var ol = document.getElementById('ranking');

  localStorageObjectSorted.forEach(function (player) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(`${player.name} ${player.points} Points`));
    ol.appendChild(li);
  });
}
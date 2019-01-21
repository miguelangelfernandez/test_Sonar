function Timer() {
  this.timeLeft = 90;
  this.intervalId = 0;
  this.minutes;
  this.seconds;
  this.updateTimeDom;
}

Timer.prototype.startTimer = function() {
  this.intervalId = setInterval(function() {
    this.timeLeft--;
    this.setTime();
    this.updateTimeDom();

  }.bind(this), 1000);
}

Timer.prototype.setMinutes = function() {
  return Math.floor(this.timeLeft / 60);
}

Timer.prototype.setSeconds = function() {
  return this.timeLeft % 60;
}

Timer.prototype.twoDigitsNumber = function(value) {
  var stringValue = value.toString();

  return (stringValue.length === 1) ? "0" + stringValue : stringValue;
}

Timer.prototype.setTime = function() {
  this.minutes = this.twoDigitsNumber(this.setMinutes());
  this.seconds = this.twoDigitsNumber(this.setSeconds());
}

Timer.prototype.stopTimer = function() {
  clearInterval(this.intervalId);
  this.timeLeft = 120;
  this.minutes = 0;
  this.seconds = 0;
};

Timer.prototype.changeTime = function(printTime) {
  this.updateTimeDom = printTime;
}

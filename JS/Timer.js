function Timer() {
  this.timeLeft = 120;
  this.intervalId = 0;
  this.minutes;
  this.seconds;
}

Timer.prototype.startTimer = function() {
  this.intervalId = setInterval(function() {
    this.timeLeft--;
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
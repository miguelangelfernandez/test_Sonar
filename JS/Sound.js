function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("autostart", "true");
  this.sound.style.display = "none";

  document.body.appendChild(this.sound);
}

Sound.prototype.play = function() {
  this.play = function() {
    this.sound.play();
  }
}

Sound.prototype.pause = function() {
  this.sound.pause();
}
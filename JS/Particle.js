function Particle(canvas, x, y) {
  this.ctx = canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.size = 20;
  this.image;
  this.type;
}

Particle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

Particle.prototype.dissapear = function() {
  this.x = -999;
};

Particle.prototype.isInScreen = function() {
  return this.x >= 0 &&
          this.x + this.size <= canvas.width &&
          this.y + this.size < canvas.height &&
          this.y >= 0;
}
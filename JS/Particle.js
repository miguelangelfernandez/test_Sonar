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

Particle.prototype.disappear = function() {
  this.x = -999;
};
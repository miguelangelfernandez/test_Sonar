function Particles(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x;
  this.y;
  this.size = 20;
  this.image;
  this.type;

  this.draw = function() {
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  this.disappear = function() {
    this.x = -999;
  };

  this.update();
}
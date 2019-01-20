function Particle(canvas, x, y, type) {
  this.ctx = canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.speed = 0.5;
  this.size = 20;
  this.gemImage = new Image();
  this.gemImage.src = './Assets/Image/red-crystal.png'
  this.type = type;
}

Particle.prototype.draw = function() {
  if(this.type === 'gem') {
    this.ctx.drawImage(this.gemImage, this.x, this.y, this.size, this.size);
  }
};

Particle.prototype.updateParticle = function() {
  if(Math.random() > 0.3) {
    this.x += this.speed;
  } else {
    this.y += this.speed;
  }
}

Particle.prototype.dissapear = function() {
  this.x = -999;
};

Particle.prototype.isInScreen = function() {
  return this.x >= 0 &&
          this.x + this.size <= canvas.width &&
          this.y + this.size < canvas.height &&
          this.y >= 0;
}
function Particle(canvas, x, y, particleType) {
  this.ctx = canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.speed = particleType.speed;
  this.size = particleType.size;
  this.particleImage = new Image();
  this.particleImage.src = particleType.src;
  this.type = particleType.type;
}

Particle.prototype.draw = function () {
  this.ctx.drawImage(this.particleImage, this.x, this.y, this.size, this.size);

}

Particle.prototype.updateParticle = function (particleType) {
  switch (particleType) {
    case 'gem':
      if (Math.random() > 0.3) {
        this.x += this.speed;
      } else {
        this.y += this.speed;
      }
      break;
    case 'meteorite':
      this.x += this.speed;
      this.y += this.speed;
      break;
  };
}

Particle.prototype.dissapear = function () {
  this.x = -999;
};

Particle.prototype.isInScreen = function () {
  return this.x >= 0 &&
    this.x + this.size <= canvas.width &&
    this.y + this.size < canvas.height &&
    this.y >= 0;
}
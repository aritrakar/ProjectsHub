const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  Ball.prototype.update = function() {
      if ((this.x + this.size) >= width){this.velX = -this.velX;}
      if ((this.x - this.size) <= 0) {this.velX = -(this.velX);}
      if ((this.y + this.size) >= height){this.velY = -this.velY;}
      if ((this.y - this.size) <= 0) {this.velY = -(this.velY);}
      
      this.x += this.velX;
      this.y += this.velY;
  }

  let balls = []

  while (balls.length < 25){
      var c = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
      var size = random(10,20);
      var newBall = new Ball(
          random(0 + size, width - size),
          random(0 + size, height - size),
          random(-7,7), 
          random(-7,7),
          c, 
          size
      );
      balls.push(newBall);
  }

  Ball.prototype.collision = function(){
      for(var i=0; i<balls.length;i++){
          if(!(this === balls[i])){
              var dx = this.x - balls[i].x; 
              var dy = this.y - balls[i].y;
              var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
              if (dist <= this.size + balls[i].size){
                  balls[i].color = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
              }
          }
      }
  }

  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collision();
    }
  
    requestAnimationFrame(loop);
  }

  loop();
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
		this.degree = attributes.degree;
		this.speed = attributes.speed;
    this.radius = attributes.radius;
    this.color = attributes.color;
    this.game = attributes.game;
  };

  MovingObject.prototype.draw = function(ctx) {
    if (this instanceof Asteroids.Asteroid) {
      var that = this;
      var img = new Image();
      img.src = "./assets/images/kanyeface1.png"
      var img2 = new Image()
      img2.src = "./assets/images/kanyeface2.png"
      var d = new Date();
      if(d.getSeconds() % 2 === 0) {
        ctx.drawImage(img, that.pos[0] - 22, that.pos[1] - 22, 45, 45);
      }
      else {
        ctx.drawImage(img2, that.pos[0] - 22, that.pos[1] - 22, 45, 45);
      }
    }

    if (this instanceof Asteroids.Ship) {
      var that = this;
			ctx.beginPath();
			ctx.moveTo(that.pos[0], that.pos[1]);
			var coordinates_left = Asteroids.Util.convertDegreesToCoordinates(Asteroids.Util.wrapDegrees(that.degree + 20) % 360);
			var left_adjustment = Math.sqrt(Math.pow(coordinates_left[0], 2) + Math.pow(coordinates_left[1], 2));
			var coordinates_right = Asteroids.Util.convertDegreesToCoordinates(Asteroids.Util.wrapDegrees(that.degree - 20) % 360);
			var right_adjustment = Math.sqrt(Math.pow(coordinates_right[0], 2) + Math.pow(coordinates_right[1], 2));

			ctx.lineTo(that.pos[0] + coordinates_left[0]/left_adjustment*35*-1, that.pos[1] + coordinates_left[1]/left_adjustment*35*-1)
			ctx.lineTo(that.pos[0] + coordinates_right[0]/right_adjustment*35*-1, that.pos[1] + coordinates_right[1]/right_adjustment*35*-1)
			ctx.closePath();
			ctx.fillStyle = "white";
			ctx.fill();
    }
		
    if (this instanceof Asteroids.Bullet) {
      var that = this;
			ctx.beginPath();
			ctx.arc(that.pos[0], that.pos[1], 5, 2*Math.PI, false);
			ctx.fillStyle = "white";
			ctx.fill();
    }
  };

  MovingObject.prototype.move = function () {

		if (this instanceof Asteroids.Ship) {
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];
		}
		else {
			var coordinates = Asteroids.Util.convertDegreesToCoordinates(this.degree);

			this.pos[0] += coordinates[0] * this.speed;
			this.pos[1] += coordinates[1] * this.speed;
		}
		
		if (this instanceof Asteroids.Bullet) {
			return;
		}
		else {
			this.game.wrap(this.pos);
		}
	
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2)
    + Math.pow((this.pos[1] - otherObject.pos[1]), 2));

    if (dist < (this.radius + otherObject.radius)) {
      return true;
    }
    else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    if ( otherObject instanceof Asteroids.Ship ) {
			$(".losing-message").addClass("active");
			clearInterval(Asteroids.intervalId);
			$(".play-again").toggleClass("active");
			return;
    };

    if (this instanceof Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

})();

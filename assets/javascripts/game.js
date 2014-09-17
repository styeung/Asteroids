(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (){
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
		this.ammo = 50;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;

  Game.NUM_ASTEROIDS = 10;
	
  Game.prototype.addAsteroids = function () {
    var outputArray = [];

    var that = this;

    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      outputArray.push(new Asteroids.Asteroid(Asteroids.Util.randomPosition(), that));
    }

    return outputArray;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,600,600);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 600, 600);
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    pos[0] = (pos[0] > 600 ? pos[0] % Game.DIM_X : pos[0])

    pos[1] = (pos[1] > 600 ? pos[1] % Game.DIM_Y : pos[1])

    pos[0] = (pos[0] < 0 ? pos[0] += 600 : pos[0])

    pos[1] = (pos[1] < 0 ? pos[1] += 600 : pos[1])

    return pos
  };

  Game.prototype.checkCollisions = function () {
    var that = this
    that.allObjects().forEach (function (object1) {
      that.allObjects().forEach (function(object2) {
        if (object1 === object2) {
          return;
        }

        if (object1.isCollidedWith(object2)) {
          object1.collideWith(object2);
        }
      });
    });
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
		
		if(this.asteroids.length < 1) {
			$(".winning-message").addClass("active");
			clearInterval(Asteroids.intervalId);
			$(".play-again").toggleClass("active");
			
		}
		else if(this.ammo < 1) {
			$(".losing-message").addClass("active");
			clearInterval(Asteroids.intervalId);
			$(".play-again").toggleClass("active");
		}
  };

  Game.prototype.remove = function(object1) {
    if (object1 instanceof Asteroids.Asteroid) {
      this.asteroids = this.asteroids.filter(function(object2) {
        return object1 !== object2;
      });
    }
    if (object1 instanceof Asteroids.Bullet) {
      this.bullets = this.bullets.filter(function(object2) {
        return object1 !== object2;
      });
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets.concat(this.ship));
  }
})();

(function () {
  // If window.Zoo does not exist yet, set it to a new blank object.
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (){
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;

  Game.NUM_ASTEROIDS = 15;

  Game.prototype.addAsteroids = function () {
    var outputArray = [];

    var that = this;

    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      outputArray.push(new Asteroids.Asteroid(Asteroids.Util.randomPosition(), that));
    }

    return outputArray;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,800,800);
    ctx.drawImage(img, 0, 0, 800, 800)
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
    pos[0] = (pos[0] > 800 ? pos[0] % Game.DIM_X : pos[0])

    pos[1] = (pos[1] > 800 ? pos[1] % Game.DIM_Y : pos[1])

    pos[0] = (pos[0] < 0 ? pos[0] += 800 : pos[0])

    pos[1] = (pos[1] < 0 ? pos[1] += 800 : pos[1])

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

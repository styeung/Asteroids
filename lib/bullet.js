(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (game, ship){			
	    Asteroids.MovingObject.call(this, {pos: ship.pos.slice(0),
	                       color: Bullet.COLOR,
	                       radius: Bullet.RADIUS,
												 degree: ship.degree,
												 speed: 6,
	                       game: game});
  };

  Bullet.RADIUS = 3;
	Bullet.COLOR = "#ffffff"

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();

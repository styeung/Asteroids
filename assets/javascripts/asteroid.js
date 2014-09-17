(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game){
    Asteroids.MovingObject.call(this,{pos: pos,
                       color: Asteroid.COLOR,
                       radius: Asteroid.RADIUS,
											 degree: Asteroids.Util.randomDegree(),
											 speed: Asteroids.Util.randomSpeed(),
                       game: game});
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 22;

  var HEX_DIGITS = "0123456789ABCDEF";
  Asteroid.COLOR = Asteroids.Util.randomColor();

})();

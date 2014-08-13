(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game){
    Asteroids.MovingObject.call(this,{pos: pos,
                       color: Asteroid.COLOR,
                       radius: Asteroid.RADIUS,
                       vel: Asteroids.Util.randomVelocity(),
                       game: game});
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.RADIUS = 15;

  var HEX_DIGITS = "0123456789ABCDEF";
  Asteroid.COLOR = Asteroids.Util.randomColor();

})();

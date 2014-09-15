(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    var that = this;
    that.bindKeyHandlers();
    Asteroids.intervalId = setInterval(function() {
      that.game.draw(that.ctx);
      that.game.step();
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
		key('up', function() {ship.power(1) });
		key('down', function() {ship.power(-1)});
		key('left', function() {ship.degree = Asteroids.Util.wrapDegrees(ship.degree-20) });
		key('right', function() {ship.degree = Asteroids.Util.wrapDegrees(ship.degree+20) });
    key('space', function() { 
			ship.fireBullet()
		});
  };

})();
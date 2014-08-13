(function () {
  // If window.Zoo does not exist yet, set it to a new blank object.
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
    setInterval(function() {
      that.game.draw(that.ctx);
      that.game.step();
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function() { ship.power([0,-1])});
    key('down', function() { ship.power([0,1])});
    key('left', function() { ship.power([-1,0])});
    key('right', function() { ship.power([1,0])});
    key('space', function() { ship.fireBullet()});
  };

})();
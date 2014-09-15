(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game){
    Asteroids.MovingObject.call(this, {pos: [400, 400],
                       color: Ship.COLOR,
                       radius: Ship.RADIUS,
											 degree: 0,
											 speed: 0,
											 vel: [0, 0],
                       game: game})
  };

  Ship.RADIUS = 10;
  Ship.COLOR = Asteroids.Util.randomColor();

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = [400,400];
    this.vel = [0,0];
  }

  Ship.prototype.power = function(impulse) {
		var coordinates = Asteroids.Util.convertDegreesToCoordinates(this.degree);
		this.vel[0] += coordinates[0] * impulse;
		this.vel[1] += coordinates[1] * impulse;
		
		if (this.vel[0] > 5) {
			this.vel[0] = 5;
		}
		else if (this.vel[1] > 5) {
			this.vel[1] = 5;
		}

  };

  Ship.prototype.fireBullet = function(){
		
    var bullet = new Asteroids.Bullet(this.game, this);
    this.game.bullets.push(bullet);
		this.game.ammo--;
		$(".ammo").html("Ammo: "+ this.game.ammo);
  }

})();

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

	var dMIN = -1;
	var dMAX = 1;
  var pMIN = 0;
  var pMAX = 800;

  var Util = Asteroids.Util = function () {};

  Util.inherits = function (SubClass, ParentClass) {
    function Surrogate (){};
    Surrogate.prototype = ParentClass.prototype;
    SubClass.prototype = new Surrogate();
  };

	Util.randomDegree = function() {
		return Math.random() * 360;
	}
	
	Util.randomSpeed = function() {
		return Math.random() * 3 + 2;
	};

  Util.randomPosition = function () {
    return[Math.ceil((Math.random() * (pMAX - pMIN)) + pMIN),
           Math.ceil((Math.random() * (pMAX - pMIN)) + pMIN)];
  };

  var HEX_DIGITS = "0123456789ABCDEF";

  Util.randomColor = function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }
    return color;
  }
	
	Util.convertDegreesToCoordinates = function (degree) {
	
		if(degree >= 0 && degree <= 90) {
			var val_0 = 1 * (degree / 90);
			var val_1 = -1 * ((90 - degree) / 90);
		}
		else if (degree > 90 && degree <= 180) {
			var diff = degree - 90;
			var val_0 = 1 * ((90 - diff) / 90);
			var val_1 = 1 * (diff / 90); 
		}
		else if (degree > 180 && degree <= 270) {
			var diff = degree - 180;
			var val_0 = -1 * (diff / 90);
			var val_1 = 1 * ((90 - diff) / 90); 
		}
		else if (degree > 270 && degree <= 360) {
			var diff = degree - 270;
			var val_0 = -1 * ((90 - diff) / 90);
			var val_1 = -1 * (diff / 90);
		}
	
		return [val_0, val_1];
	}
	
	Util.wrapDegrees = function(degree) {
		if (degree >= 0 && degree <=360) {
			return degree
		}
		else if(degree < 0) {
			return 360 + degree;
		}
		else if (degree > 360) {
			return degree - 360;
		}
	}

})();

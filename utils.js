(function () {
  // If window.Zoo does not exist yet, set it to a new blank object.
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var vMIN = -5;
  var vMAX = 5;
  var pMIN = 0;
  var pMAX = 800;

  var Util = Asteroids.Util = function () {};

  Util.inherits = function (SubClass, ParentClass) {
    function Surrogate (){};
    Surrogate.prototype = ParentClass.prototype;
    SubClass.prototype = new Surrogate();
  };

  Util.randomVelocity = function () {
    return[Math.ceil((Math.random() * (vMAX - vMIN)) + vMIN),
           Math.ceil((Math.random() * (vMAX - vMIN)) + vMIN)];
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

})();

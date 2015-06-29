(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	Asteroids.Utils = {};

	Asteroids.Utils.inherits = function(child, parent) {
		function Surrogate () {};
  	Surrogate.prototype = parent.prototype;
  	child.prototype = new Surrogate();
	};


})();

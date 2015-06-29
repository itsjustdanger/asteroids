(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Asteroid = function(pos) {

		var vel = [(Math.random() * 10) - 5 , (Math.random() * 10) - 5];
		Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
	};

	Asteroid.COLOR = "FFFFFF";
	Asteroid.RADIUS = 30;

	Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);
	Asteroids.Asteroid = Asteroid;
})();

(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Asteroid = Asteroids.Asteroid = function(pos, game) {

		var vel = [(Math.random() * 10) - 5 , (Math.random() * 10) - 5];
		Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game);
	};
	Asteroid.COLOR = "black";
	Asteroid.RADIUS = 30;

	Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

	Asteroid.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
			otherObject.relocate();
		}
	}
})();

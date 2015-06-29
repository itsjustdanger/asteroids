(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Bullet = Asteroids.Bullet = function (pos, vel, game) {
		var newVel = [];
		if (vel[0] === 0 && vel[1] === 0){
			newVel[0] = Bullet.VELOCITY;
			newVel[1] = 0;
		} else {
			newVel[0] = Bullet.VELOCITY * (vel[0] / Math.abs(vel[0] + .0001));
			newVel[1] = Bullet.VELOCITY * (vel[1] / Math.abs(vel[1] + .0001));
		};
		Asteroids.MovingObject.call(this, pos, newVel, Bullet.RADIUS, Bullet.COLOR, game);
	}

	Bullet.COLOR = "purple";
	Bullet.RADIUS = 2;
	Bullet.VELOCITY = 15

	Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function(otherObject) {
		console.log("Bullet collision detected");
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.removeAsteroid(otherObject);
		}
	}

	Bullet.prototype.isWrappable = false;


})();

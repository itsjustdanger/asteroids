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

		var bulParams = {};
		bulParams.pos = pos;
		bulParams.vel = newVel;
		bulParams.rad = Bullet.RADIUS;
		bulParams.color = Bullet.COLOR;
		bulParams.game = game;

		Asteroids.MovingObject.call(this, bulParams);
	}

	Bullet.COLOR = "yellow";
	Bullet.RADIUS = 2;
	Bullet.VELOCITY = 15

	Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.removeAsteroid(otherObject);
			this.game.removeBullet(this);
		}
	};

	Bullet.prototype.isWrappable = false;


})();

(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Bullet = Asteroids.Bullet = function (pos, vel, game) {
		var newVel = [];
			newVel[0] = 0
			newVel[1] = Bullet.VELOCITY;

		var bulParams = {};
		bulParams.pos = pos;
		bulParams.vel = newVel;
		bulParams.rad = Bullet.RADIUS;
		bulParams.color = Bullet.COLOR;
		bulParams.game = game;

		Asteroids.MovingObject.call(this, bulParams);
		this.img.src = "./bullet.png";
	}

	Bullet.COLOR = "yellow";
	Bullet.RADIUS = 2;
	Bullet.VELOCITY = -15

	Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.removeAsteroid(otherObject);
			this.game.removeBullet(this);
		}
	};

	Bullet.prototype.isWrappable = false;


})();

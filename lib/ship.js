(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Ship = Asteroids.Ship = function(pos, game) {
		var shipParams = {};
		shipParams.pos = pos;
		shipParams.game = game;
		shipParams.vel = [0,0];
		shipParams.rad = Ship.RADIUS;
		shipParams.color = Ship.COLOR;
		Asteroids.MovingObject.call(this, shipParams)
		this.img.src = './assets/ship.gif';
	}
	Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

	Ship.RADIUS = 5;
	Ship.COLOR = "red";

	Ship.prototype.draw = function(ctx) {
		ctx.drawImage(this.img, this.pos[0] - 16, this.pos[1] - 20);
	};

	Ship.prototype.relocate = function(){
		this.pos = this.game.randomPosition();
		this.vel = [0,0];
		this.game.lives = this.game.lives - 1;
	}

	Ship.prototype.power = function (impulse) {

			this.vel[0] += impulse[0];
			this.vel[1] += impulse[1];
	};

	Ship.prototype.fireBullet = function () {
		var bPos = [this.pos[0], this.pos[1]];
		var bVel = [this.vel[0], this.vel[1]];
		var bullet = new Asteroids.Bullet(bPos, bVel, this.game);
		this.game.addObject(bullet);
	}

})();

(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Asteroid = Asteroids.Asteroid = function(pos, rad, game, frag) {

		var vel = [((Math.random() * 10) - 5) , (Math.random() * 5)];
		var astParams = {}
		astParams.pos = pos;
		astParams.game = game;
		astParams.vel = vel;
		astParams.rad = rad
		Asteroids.MovingObject.call(this, astParams);
		this.frag = frag;
		if (this.frag) {
			this.img.src = './small_asteroid' + (Math.floor(Math.random() * 2) + 1) + '.png';
		} else {
			this.img.src = './asteroid' + (Math.floor(Math.random() * 2) + 1) + '.png';
		}

	};

	Asteroid.COLOR = "grey";



	Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

	Asteroid.prototype.draw = function(ctx) {

		if (this.frag) {
			ctx.drawImage(this.img, this.pos[0] - 25, this.pos[1] - 20);
		} else {
			ctx.drawImage(this.img, this.pos[0] - 50, this.pos[1] - 50);
		}
	};


	Asteroid.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
			this.game.score = Math.floor(this.game.score / 2);
			otherObject.relocate();
		} else if (otherObject instanceof Asteroids.Bullet) {
			this.fragment();
		}
	}

	Asteroid.prototype.fragment = function () {

		var newRad = this.rad/2;
		var newPos1 = [this.pos[0]+5, this.pos[1]+5];
		var newPos2 = [this.pos[0]-5, this.pos[1]-5];

		this.game.addObject(new Asteroid(newPos1, newRad, this.game, true));
		this.game.addObject(new Asteroid(newPos2, newRad, this.game, true));

	}
})();

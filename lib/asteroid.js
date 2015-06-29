(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Asteroid = Asteroids.Asteroid = function(pos, rad, game, frag) {

		var vel = [(Math.random() * 10) - 5 , (Math.random() * 10) - 5];
		var astParams = {}
		astParams.pos = pos;
		astParams.game = game;
		astParams.vel = vel;
		astParams.rad = rad
		astParams.color = Asteroid.COLOR;
		Asteroids.MovingObject.call(this, astParams);
		this.frag = frag;
	};

	Asteroid.COLOR = "grey";


	Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

	Asteroid.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
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

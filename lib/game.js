(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

Game = function (dim_x ,dim_y, num_asteroids) {
	this.DIM_X = dim_x;
	this.DIM_Y = dim_Y;
	this.NUM_ASTEROIDS = num_asteroids;
	this.asteroids = [];
}

	Game.prototype.addAsteroids() {
		asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
	}

	Game.prototype.randomPosition() {
		var x = Math.random() * this.DIM_X;
		var y = Math.random() * this.DIM_Y;

		return [x, y];
	}

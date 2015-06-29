(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Game = function (dim_x ,dim_y, num_asteroids) {
		this.DIM_X = dim_x;
		this.DIM_Y = dim_y;
		this.NUM_ASTEROIDS = num_asteroids;
		this.asteroids = [];

		this.addAsteroids();
	};

	Game.prototype.addAsteroids = function() {
		for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
			this.asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
		};
	};

	Game.prototype.randomPosition = function() {
		var x = Math.random() * this.DIM_X;
		var y = Math.random() * this.DIM_Y;

		return [x, y];
	};

	Game.prototype.draw = function(ctx) {
		ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
		this.asteroids.forEach( function(asteroid){
			asteroid.draw(ctx);
		});
	};

	Game.prototype.moveObjects = function(){
		this.asteroids.forEach( function(asteroid){
			asteroid.move();
		});
	};

	Asteroids.Game = Game;
})();

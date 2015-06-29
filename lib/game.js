(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var Game = Asteroids.Game = function (dim_x ,dim_y, num_asteroids) {
		this.DIM_X = dim_x;
		this.DIM_Y = dim_y;
		this.NUM_ASTEROIDS = num_asteroids;
		this.asteroids = [];
		this.bullets = [];
		this.ship = new Asteroids.Ship(this.randomPosition(), this);
		this.addAsteroids();
	};

	Game.prototype.addAsteroids = function() {
		for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
			this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
		};
	};

	Game.prototype.addBullet = function (bullet) {
		this.bullets.push(bullet);
	}

	Game.prototype.randomPosition = function() {
		var x = Math.random() * this.DIM_X;
		var y = Math.random() * this.DIM_Y;

		return [x, y];
	};

	Game.prototype.draw = function(ctx) {
		ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
		this.allObjects().forEach( function(obj){
			obj.draw(ctx);
		});
	};

	Game.prototype.moveObjects = function(){
		this.allObjects().forEach( function(obj){
			obj.move();
		});
	};

	Game.prototype.wrap = function(pos){
		var x = pos[0];
		var y = pos[1];
		var result = [];

		result[0] = x % this.DIM_X;
		result[1] = y % this.DIM_Y;

		if (result[0] <= 0) {
			result[0] += this.DIM_X;
		};

		if (result[1] <= 0) {
			result[1] += this.DIM_Y;
		};

		return result;
	}

	Game.prototype.checkCollisions = function(){
		var objects = this.allObjects();
		for(var i = 0; i < objects.length - 1; i++){
			for(var j = i + 1; j < objects.length; j++){
				if (objects[i].isCollidedWith(objects[j])){
					objects[i].collideWith(objects[j]);
				};
			};
		};
	};

	Game.prototype.step = function(){
		this.moveObjects();
		this.checkCollisions();
	}

	Game.prototype.removeAsteroid = function(asteroid){
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].pos === asteroid.pos) {
				this.asteroids.splice(i, 1);
			};
		};
	};

	Game.prototype.removeBullet = function (bullet) {
		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].pos === bullet.pos) {
				this.bullets.splice(i, 1);
			};
		};
	};

	Game.prototype.allObjects = function () {
		return this.bullets.concat(this.asteroids).concat(this.ship);
	};

	Game.prototype.outOfBounds = function (pos) {
		if(pos[0] > this.DIM_X ||
			 pos[0] < 0 ||
			 pos[1] > this.DIM_Y ||
			 pos[1] < 0) {
				return true;
			} else {
				return false;
			};
	};

})();

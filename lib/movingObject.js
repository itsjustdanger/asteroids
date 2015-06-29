(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};


	var MovingObject = Asteroids.MovingObject = function (pos, vel, rad, color, game) {
		this.pos = pos;
		this.vel = vel;
		this.rad = rad;
		this.color = color;
		this.game = game;
	};

	MovingObject.prototype.draw = function(ctx) {
		var path = new Path2D();
		ctx.strokeStyle = this.color;
		path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, true);
		ctx.stroke(path);
	};

	MovingObject.prototype.move = function(){
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		if (this.isWrappable){
			this.pos = this.game.wrap(this.pos);
		} else {
			if (this.game.outOfBounds(this.pos)){
				this.game.removeBullet(this);
			}
		}
	}

	MovingObject.prototype.isCollidedWith = function (otherObject){
		var radSum = (this.rad + otherObject.rad);
		var xDist = Math.abs(this.pos[0] - otherObject.pos[0]);
		var yDist = Math.abs(this.pos[1] - otherObject.pos[1]);
		var centerDist = Math.sqrt((xDist*xDist) + (yDist*yDist));
		if (centerDist < radSum){
			return true;
		} else {
			return false;
		}
	}

	MovingObject.prototype.collideWith = function (otherObject) {
	}

	MovingObject.prototype.isWrappable = true;


})();

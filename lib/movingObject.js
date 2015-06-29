(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};


	var MovingObject = function (pos, vel, rad, color) {
		this.pos = pos;
		this.vel = vel;
		this.rad = rad;
		this.color = color;
	};

	MovingObject.prototype.draw = function(ctx) {
		var path = new Path2D();
		path.arc(this.pos[0], this.pos[1], this.rad, 0, Math.PI*2, true);
		ctx.stroke(path);
	};

	MovingObject.prototype.move = function(){
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

	Asteroids.MovingObject = MovingObject;

})();

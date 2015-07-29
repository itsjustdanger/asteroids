(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var GameView = Asteroids.GameView = function(dim_x ,dim_y, num_asteroids){
		this.score = 0;
		this.dim_x = dim_x;
		this.dim_y = dim_y;
		this.game = new Asteroids.Game(dim_x ,dim_y, num_asteroids);
		this.ctx = window.document.getElementById('canvas').getContext('2d');
		this.level = 1;
		this.lives = 5;
		this.paused = true;

	};

	GameView.prototype.start = function(){
		var gv = this;
		this.keyBindHandlers();

		var img = new Image();
		img.onload = function(){
			gv.ctx.drawImage(img, 0, 0);
		};

		img.src = './space.gif';
		var y = 0;
		var x = 0;

		setInterval(function(){
			if (!gv.paused) {
				var speed = gv.level;
				if (gv.game.asteroids.length === 0) {
					gv.level += 1;
					var tScore = gv.game.score;
					gv.game = new Asteroids.Game(gv.dim_x, gv.dim_y, (1 + gv.level));
					gv.game.score = tScore;
					gv.game.level = gv.level;
					gv.ctx = window.document.getElementById('canvas').getContext('2d');
				}

				y += speed;

				if (y >= gv.dim_y) {
					y = 0;
				}

				gv.game.step();
				gv.game.draw(gv.ctx, img, y);
				$(".score").html("Score: " + gv.game.score);
				$(".level").html("Level: " + gv.level);

				if (gv.lives < 0) {
					return
				}
			}

		}, 20);
	};


	GameView.prototype.keyBindHandlers = function () {
		var gv = this;

		key('r', function(){
			if (gv.paused) {
				debugger
				gv.paused = false;
				$(".replay").addClass("hidden");
				$(".paused").addClass("hidden");
			} else {
				gv.paused = true;
				$(".replay").removeClass("hidden");
				$(".paused").removeClass("hidden");
			}
		});

		key('up', function(){
			gv.game.ship.power([0, -2.5]);
		});

		key('down', function(){
			gv.game.ship.power([0,2.5]);
		});

		key('left', function(){
			gv.game.ship.power([-2.5, 0]);
		});

		key('right', function(){
			gv.game.ship.power([2.5, 0]);
		});

		key('space', function(){
			gv.game.ship.fireBullet();
		})
	};

})();

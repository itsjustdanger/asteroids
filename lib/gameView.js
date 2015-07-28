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
		this.level = 1

		this.ctx.font = "24px Press Start 2P"
	};

	GameView.prototype.start = function(){
		var gv = this;
		this.keyBindHandlers();

		var img = new Image();
		img.onload = function(){
			gv.ctx.drawImage(img, -150,0);
		};

		img.src = './space.gif';

		setInterval(function(){
			if (gv.game.asteroids.length === 0) {
				gv.level += 1;
				var tScore = gv.game.score;
				gv.game = new Asteroids.Game(gv.dim_x, gv.dim_y, (1 + gv.level));
				gv.game.score = tScore;
				gv.ctx = window.document.getElementById('canvas').getContext('2d');
			}
			gv.game.step();
			gv.game.draw(gv.ctx, img);
			gv.ctx.fillText("Score: " + gv.game.score, 0, 0);
			console.log(gv.game.score);
		}, 20);
	};




	GameView.prototype.keyBindHandlers = function () {
		var gv = this;
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

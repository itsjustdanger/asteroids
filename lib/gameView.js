(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var GameView = Asteroids.GameView = function(dim_x ,dim_y, num_asteroids){
		this.game = new Asteroids.Game(dim_x ,dim_y, num_asteroids);
		this.ctx = window.document.getElementById('canvas').getContext('2d');
	};

	GameView.prototype.start = function(){
		var gv = this;
		this.keyBindHandlers();
		setInterval(function(){

			gv.game.step();
			gv.game.draw(gv.ctx);
		}, 20);
	};

	GameView.prototype.keyBindHandlers = function () {
		var gv = this;
		key('up', function(){
			gv.game.ship.power([0, -1]);
		});

		key('down', function(){
			gv.game.ship.power([0,1]);
		});

		key('left', function(){
			gv.game.ship.power([-1, 0]);
		});

		key('right', function(){
			gv.game.ship.power([1, 0]);
		});

		key('space', function(){
			gv.game.ship.fireBullet();
		})
	};

})();

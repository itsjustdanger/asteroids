(function(){
	if (window.Asteroids === undefined) {
		window.Asteroids = {};
	};

	var GameView = function(dim_x ,dim_y, num_asteroids){
		this.game = new Asteroids.Game(dim_x ,dim_y, num_asteroids);
		this.ctx = window.document.getElementById('canvas').getContext('2d');
	};

	GameView.prototype.start = function(){
		var gv = this;
		setInterval(function(){

			gv.game.moveObjects();
			gv.game.draw(gv.ctx);
		}, 20);
	};

	Asteroids.GameView = GameView;
})();

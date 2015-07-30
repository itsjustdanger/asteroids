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
					gv.game.level += 1;
					gv.copilotText();
					gv.game.NUM_ASTEROIDS = gv.game.level + 1;
					gv.game.addAsteroids();


					// gv.ctx = window.document.getElementById('canvas').getContext('2d');
				}

				y += speed;

				if (y >= gv.dim_y) {
					y = 0;
				}

				gv.game.step();
				gv.game.draw(gv.ctx, img, y);
				$(".score").html("Score: " + gv.game.score);
				$(".level").html("Level: " + gv.game.level);
				if (gv.game.ship == 0) {

				}
				if (gv.lives < 0) {
					return
				}
			}

		}, 20);
	};

	GameView.prototype.copilotText = function () {
		var text = ["Lonnie: Where exactly are we going that necessitates travel through an asteroid field?",
						"Lonnie: These things look less like asteroids and more like chocolate chip cookies...or maybe I'm just hungry.",
						"Lonnie: Can you explain why exactly we are speeding up in an asteroid field?",
						"Lonnie: What a strange place, if we travel left, right, up , or down, it seems like we're in the same location",
						"Lonnie: Are you sure you know how to fly this thing? Try TAPPING the throttle instead of jamming it in!",
						"Lonnie: I read in The Developer's Book that the holy number is 6851, whatever that means...",
						"Lonnie: Okay, I'm getting a bit dizzy now...can you slow down?",
						"Lonnie: Followers of The Developer do not believe in Game Over. They just keep going..."
		]

		$(".hints").html(text[(Math.floor(Math.random() * 7))])
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

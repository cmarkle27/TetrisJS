
// --------------------------------------------------------------------

"use strict";

var Game = function() {

	var speed = 800;
	var speedAdjustment = 0;

	var boardCanvas = document.getElementById("board");
	var boardContext = boardCanvas.getContext("2d");

	var piecesCanvas = document.getElementById("pieces");
	var piecesContext = piecesCanvas.getContext("2d");

};

var boardWidth = 480; //
var boardHeight = 600; //
var tileSize = 40;
var tileImage = new Image();
tileImage.src = 'img/tile4.png';


// --------------------------------------------------------------------

"use strict";

var TetrisBoard = function(boardContext) {
	this.ctx = boardContext;
	this.blocks = [];
};

TetrisBoard.prototype.render = function() {
	var xCoord, yCoord;
	this.ctx.clearRect(0, 0, 480, 600);
	_.each(this.blocks, function(block) {
		xCoord = (block.x*tileSize);
		yCoord = (block.y*tileSize);
		this.ctx.beginPath();
		this.ctx.rect(xCoord, yCoord, tileSize, tileSize);
		this.ctx.fillStyle = block.color;
		this.ctx.fill();
		this.ctx.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
	});
};

TetrisBoard.prototype.hitCheck = function(xCoord, yCoord) {
	var hits = 0;
	_.each(this.blocks, function(block) {
		if (block.y === yCoord && block.x === xCoord) {
			hits += 1;
		}
	});
	return hits;
};

TetrisBoard.prototype.addTetrimino = function(tetrimino) {
	var i, j;
	var line;
	var removals = [];
	var tetriminoBlocks = tetrimino.shape[tetrimino.orientation];
	var blocks = this.blocks;
	var adjustment = 0;

	// break em apart, and add em
	for (i = 3; i >= 0; i--) {
		this.blocks.push({
			x: tetriminoBlocks.x[i]+tetrimino.position,
			y: tetriminoBlocks.y[i]+tetrimino.depth,
			color: tetrimino.color
		});
	}

	// get line counts, and track em
	// fix func in loop!!!
	for (j = 14; j >= 0; j--) {
		line = 0;
		_.each(blocks, function(block) {
			if (block.y == j) {
				line += 1;
			}
			if (line == 12) {
				removals.push(j);
			}
		});
	}
	removals = _.uniq(removals);

	// get rid of em, and adjust em
	_.each(removals, function(removal) {
		removal += adjustment;
		_.each(blocks, function(block, index) {
			if (block.y == removal) {
				delete blocks[index];
			}
			if (block.y < removal) {
				block.y += 1;
			}
		});
		adjustment += 1;
	});
	removals = [];
};

TetrisBoard.prototype.checkHeight = function() {
	var overBoard = 0;
	_.each(this.blocks, function(block) {
		if (block.y < 0) {
			overBoard += 1;
		}
	});
	return (overBoard === 0);
};

TetrisBoard.prototype.checkFall = function(tetrimino) {
	var i;
	var shape = tetrimino.shape;
	var orientation = tetrimino.orientation;
	var depth = tetrimino.depth;
	var position = tetrimino.position;
	var x = shape[orientation]["x"];
	var y = shape[orientation]["y"];
	var xCoord, yCoord;
	var hits = 0;

	for (i = 0; i < 4; i++) {
		xCoord = x[i] + position;
		yCoord = y[i] + depth;

		// hit floor
		if (yCoord === (boardHeight/tileSize)) {
			hits += 1;
		}

		// hit blocks
		hits += this.hitCheck(xCoord, yCoord);
	}

	if (hits > 0) {
		tetrimino.depth -= 1;
		return false;
	}

	return true;
};

TetrisBoard.prototype.checkMove = function(tetrimino, direction) {
	var i;
	var shape = tetrimino.shape;
	var orientation = tetrimino.orientation;
	var depth = tetrimino.depth;
	var position = tetrimino.position;
	var x = shape[orientation]["x"];
	var y = shape[orientation]["y"];
	var hits = 0;
	var xCoord, yCoord;

	for (i = 0; i < 4; i++) {
		xCoord = x[i] + position;
		yCoord = y[i] + depth;

		// hit wall
		if (xCoord == (boardWidth/tileSize) || xCoord < 0) {
			hits += 1;
		}

		// hit blocks
		hits += this.hitCheck(xCoord, yCoord);
	}

	if (hits > 0) {
		tetrimino.position += (direction === "left") ? 1 : -1;
		return false;
	}

	return true;
};

TetrisBoard.prototype.checkRotate = function(tetrimino, direction) {
	var i;
	var shape = tetrimino.shape;
	var orientation = tetrimino.orientation;
	var depth = tetrimino.depth;
	var position = tetrimino.position;
	var x = shape[orientation]["x"];
	var y = shape[orientation]["y"];
	var xCoord, yCoord;
	var hits = 0;

	for (i = 0; i < 4; i++) {
		xCoord = x[i] + position;
		yCoord = y[i] + depth;

		// hit wall
		if (xCoord == (boardWidth/tileSize) || xCoord < 0) {
			hits += 1;
		}

		// hit blocks
		hits += this.hitCheck(xCoord, yCoord);
	}

	if (hits > 0) {
		direction = (direction === "left") ? "right" : "left";
		tetrimino.rotate(direction);
		return false;
	}

	return true;
};

// --------------------------------------------------------------------

var Tetrimino = function(piecesContext) {
	this.ctx = piecesContext;
	this.orientation = 0;
	this.depth = -3;
	this.position = 5;
	this.shape = this.randomShape();
	this.color = this.randomColor(); // this should be based on shape apparently
	// speed??? or is that Game???
};

Tetrimino.prototype.randomShape = function() {
	var shapeArray = ["j", "o", "i", "l", "s", "z", "t"];
	var shapes = {
		j : [
			{ "x" : [0, 1, 1, 1], "y" : [2, 2, 1, 0] },
			{ "x" : [0, 0, 1, 2], "y" : [0, 1, 1, 1] },
			{ "x" : [0, 0, 0, 1], "y" : [0, 1, 2, 0] },
			{ "x" : [0, 1, 2, 2], "y" : [0, 0, 0, 1] }
		],
		o : [
			{ "x" : [0, 1, 0, 1], "y" : [0, 1, 1, 0] }
		],
		i : [
			{ "x" : [0, 0, 0, 0], "y" : [0, 1, 2, 3] },
			{ "x" : [0, 1, 2, 3], "y" : [0, 0, 0, 0] }
		],
		l : [
			{ "x" : [0, 1, 0, 0], "y" : [2, 2, 1, 0] },
			{ "x" : [0, 1, 2, 0], "y" : [0, 0, 0, 1] },
			{ "x" : [0, 1, 1, 1], "y" : [0, 0, 1, 2] },
			{ "x" : [0, 1, 2, 2], "y" : [1, 1, 1, 0] }
		],
		s : [
			{ "x" : [0, 1, 1, 2], "y" : [1, 1, 0, 0] },
			{ "x" : [1, 1, 2, 2], "y" : [0, 1, 1, 2] }
		],
		z : [
			{ "x" : [0, 1, 1, 2], "y" : [0, 0, 1, 1] },
			{ "x" : [2, 1, 2, 1], "y" : [0, 1, 1, 2] }
		],
		t : [
			{ "x" : [0, 1, 1, 1], "y" : [1, 2, 1, 0] },
			{ "x" : [1, 0, 1, 2], "y" : [0, 1, 1, 1] },
			{ "x" : [0, 0, 0, 1], "y" : [0, 1, 2, 1] },
			{ "x" : [0, 1, 2, 1], "y" : [0, 1, 0, 0] }
		]
	};
	return shapes[shapeArray[Math.floor(Math.random() * shapeArray.length)]];
};

Tetrimino.prototype.randomColor = function() {
	var colors = ["#cc0000", "#3399ff", "#ffff33", "#33cc00", "#666666", "#3333ff", "#339900", "#bbbbbb"];
	return colors[Math.floor(Math.random() * colors.length)];
}

Tetrimino.prototype.render = function() {
	var i;
	var position = this.position;
	var depth = this.depth;
	var color = this.color;
	var x = this.shape[this.orientation]["x"];
	var y = this.shape[this.orientation]["y"];
	var xCoord, yCoord;
	var context = this.ctx;

	context.clearRect(0, 0, 480, 600);

	for (i = 0; i < 4; i++) {
		xCoord = (x[i]*tileSize) + (position*tileSize);
		yCoord = (y[i]*tileSize) + (depth*tileSize);
		context.beginPath();
		context.rect(xCoord, yCoord, tileSize, tileSize);
		context.fillStyle = color;
		context.fill();
		context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
	}
};

Tetrimino.prototype.fall = function() {
	if (window.loop === false) { return false; } // these should happen at game level!!!
	this.depth += 1;
};

Tetrimino.prototype.rotate = function(direction) {
	if (window.loop === false) { return false; }
	if (direction === "left") {
		this.orientation++;
	} else {
		this.orientation--;
	}
	if (this.orientation === this.shape.length) {
		this.orientation = 0;
	} else if (this.orientation < 0) {
		this.orientation = this.shape.length - 1;
	}
};

Tetrimino.prototype.move = function(direction) {
	if (window.loop === false) { return false; }
	if (direction === "left") {
		this.position -= 1;
	} else {
		this.position += 1;
	}
}

// --------------------------------------------------------------------



function gameLoop() {

	if (window.loop === false) { return false; }

	PubSub.publish("fall");

	var mainTimeout = setTimeout(function() {
		gameLoop();
	}, speed + speedAdjustment);

}

// --------------------------------------------------------------------

// view stuff??? globals???









// --------------------------------------------------------------------

function dropTetrimino(currentBoard) {
	// move to Board???

	var activeTetrimino = new Tetrimino();

	var tokenFall = PubSub.subscribe("fall", function(message) {
		activeTetrimino.fall();
		if (currentBoard.checkFall(activeTetrimino) === true) {
			activeTetrimino.render(piecesContext);
		} else {

			PubSub.unsubscribe(tokenFall);
			PubSub.unsubscribe(tokenMove);
			PubSub.unsubscribe(tokenRotate);

			// add tetri
			currentBoard.addTetrimino(activeTetrimino);
			currentBoard.render();

			// check height
			if (currentBoard.checkHeight() === false) {
				alert("Failure!!!");
				window.loop = false;
			} else {
				dropTetrimino(currentBoard);
			}

			// check lines
			//...
			//currentBoard.checkLines();

		}
	});

	var tokenMove = PubSub.subscribe("move", function(message, direction) {
		activeTetrimino.move(direction);
		if (currentBoard.checkMove(activeTetrimino, direction) === true) {
			activeTetrimino.render(piecesContext);
		}
	});

	var tokenRotate = PubSub.subscribe("rotate", function(message, direction) {
		activeTetrimino.rotate(direction);
		if (currentBoard.checkRotate(activeTetrimino, direction) === true) {
			activeTetrimino.render(piecesContext);
		}
	});

}

// we need a killGame function
// put it in board too???

// --------------------------------------------------------------------

$(document).ready(function() {

	$('#start').on('click', function(e) {
		var newBoard = new TetrisBoard();
		window.loop = true;
		e.preventDefault();
		dropTetrimino(newBoard);
		gameLoop();
		$(this).hide();
		$('#restart').show();
		$('#pause').removeClass("disabled");
	});

	$('#restart').on('click', function(e) {
		var newBoard = new TetrisBoard();
		window.loop = true;
		e.preventDefault();
		dropTetrimino(newBoard);
		gameLoop();
	});

	$('#pause').on('click', function(e) {
		window.loop = false;
		$(this).hide();
		$('#unpause').show();
	});

	$('#unpause').on('click', function(e) {
		window.loop = true;
		gameLoop();
		$(this).hide();
		$('#pause').show();
	});

	$(document).on('keydown', function(e) {
		switch (e.keyCode) {
			case 39:
			case 68:
				PubSub.publish("move", "right");
			break;

			case 37:
			case 65:
				PubSub.publish("move", "left");
			break;

			case 190:
				PubSub.publish("rotate", "right");
			break;

			case 188:
				PubSub.publish("rotate", "left");
			break;

			case 38:
			case 87:
				speedAdjustment = 300;
			break; // up

			case 40:
			case 83:
				speedAdjustment = speed * -1 + 100;
			break; // down
		}
	});

	$(document).on('keyup', function(e) {
		switch (e.keyCode) {
			case 38:
			case 87:
				speedAdjustment = 0;
			break; // up

			case 40:
			case 83:
				speedAdjustment = 0;
			break; // down
		}
	});

});

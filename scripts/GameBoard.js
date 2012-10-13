define("GameBoard", ["Tetrimino", "Canvas"], function(Tetrimino, Canvas) {

	// static vars
	var boardWidth = 480;
	var boardHeight = 600;
	var boardCanvas, pieceCanvas;

	// --------------------------------------------------------------------
	// GameBoard constructor
	// --------------------------------------------------------------------

  var GameBoard = function(boardContext, pieceContext) {
		this.speed = 700;
		this.paused = true;
		this.blockStack = [];
		this.currentPiece = "";
		boardCanvas = new Canvas(boardContext, boardWidth, boardHeight);
		pieceCanvas = new Canvas(pieceContext, boardWidth, boardHeight);
		this.loop();
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.startGame = function() {
		boardCanvas.clear();
		pieceCanvas.clear();
		this.paused = false;
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.dropPiece = function(action) {
		this.speed = (action === "start") ? 70 : 700;
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.createPiece = function() {
		// we really need to create two pieces, so that we can show the user whats on deck!!!
		this.currentPiece = new Tetrimino();
		this.drawCurrentPiece();
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.drawCurrentPiece = function() {

		var blocks = this.currentPiece.getBlocks();
		var tileSize = this.currentPiece.tileSize;
		var tileColor = this.currentPiece.tileColor;

		pieceCanvas.clear();

		for (var i = 0; i < 4; i++) {
			pieceCanvas.renderTile({
				x: blocks.x[i],
				y: blocks.y[i],
				color: tileColor,
				size: tileSize
			});

		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.movePiece = function(direction) {

		var piecePosition = this.currentPiece.position;
		var pieceDepth = this.currentPiece.depth;
		var pieceOrientation = this.currentPiece.orientation;
		var pieceRotations = this.currentPiece.getShape().length;
		var canMove = false;

		if (direction === "left") {
			piecePosition -= 1;
		} else if (direction === "right") {
			piecePosition += 1;
		} else if (direction === "down") {
			pieceDepth += 1;
		} else if (direction === "clockwise") {
			pieceOrientation += 1;
		} else if (direction === "counterclockwise") {
			pieceOrientation -= 1;
		}

		// check for overrotatation
		if (pieceOrientation === pieceRotations) {
			pieceOrientation = 0;
		} else if (pieceOrientation < 0) {
			pieceOrientation = (pieceRotations -1);
		}

		// check our new location
		canMove = this.checkMove(piecePosition, pieceDepth, pieceOrientation);

		if (canMove) {
			this.currentPiece.position = piecePosition;
			this.currentPiece.depth = pieceDepth;
			this.currentPiece.orientation = pieceOrientation;
			this.drawCurrentPiece();
		} else {
			if (direction === "down") {
				this.addPiece(this.currentPiece);
				this.currentPiece = null;
				this.createPiece();
			}
		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.checkMove = function(position, depth, orientation) {

		var hits = 0;
		var shape = this.currentPiece.getShape();
		var x = shape[orientation].x;
		var y = shape[orientation].y;
		var tileSize = this.currentPiece.tileSize;
		var xCoord, yCoord;

		for (i = 0; i < 4; i++) {
			xCoord = x[i] + position;
			yCoord = y[i] + depth;

			// hit wall
			if (xCoord === (boardWidth/tileSize) || xCoord < 0) {
				hits += 1;
			}

			// hit floor
			if (yCoord === (boardHeight/tileSize)) {
				hits += 1;
			}

			// hit blocks
			if (this.blockCheck(xCoord, yCoord)) {
				hits += 1;
			}

		}

		if (hits > 0) {
			return false;
		}

		return true;
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.addPiece = function(piece) {

		var blocks = piece.getBlocks();
		var tileSize = piece.tileSize;
		var tileColor = piece.tileColor;
		var blockStack = this.blockStack;

		for (var i = 4; i--;) {
			this.blockStack.push({
				x: blocks.x[i],
				y: blocks.y[i],
				color: tileColor,
				size: tileSize
			});
		}

		boardCanvas.clear();

		for (var j = blockStack.length; j--;) {
			boardCanvas.renderTile(blockStack[j]);
		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.blockCheck = function(x, y) {

		var blockStack = this.blockStack;

		for (var i = blockStack.length; i--;) {
			if (blockStack[i].x === x && blockStack[i].y === y) {
				return true;
			}
		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.loop = function() {

		var _this = this;

		if (this.paused === false) {

			if (this.currentPiece === "") {
				this.createPiece();
			}

			this.movePiece("down");
		}

		setTimeout(function() {
			_this.loop();
		}, this.speed);

	};


	// ------------------------------------------------------------------------

	return GameBoard;

});
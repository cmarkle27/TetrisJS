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
		this.blocks = [];
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
		if (action === "start") {
			this.speed = 70;
		} else {
			this.speed = 700;
		}
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
		var tileSize = this.currentPiece.getTileSize();
		pieceCanvas.renderBlocks(blocks, tileSize);
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.movePiece = function(direction) {

		var piecePosition = this.currentPiece.position;
		var pieceDepth = this.currentPiece.depth;
		var pieceOrientation = this.currentPiece.orientation;
		var pieceRotations = this.currentPiece.getShape().length;

		// move the piece
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
		if (this.checkMove(piecePosition, pieceDepth, pieceOrientation)) {
			this.currentPiece.position = piecePosition;
			this.currentPiece.depth = pieceDepth;
			this.currentPiece.orientation = pieceOrientation;
			this.drawCurrentPiece();
		} else if (direction === "down") {
			// add the current piece to the board array!!!
			this.addPiece(this.currentPiece);
			this.currentPiece = null;
			this.createPiece();
		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.checkMove = function(position, depth, orientation) {

		var shape = this.currentPiece.getShape();
		var hits = 0;
		var x = shape[orientation].x;
		var y = shape[orientation].y;
		var tileSize = this.currentPiece.getTileSize();
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
			//hits += this.hitCheck(xCoord, yCoord);
			//console.log(xCoord, yCoord);

		}

		if (hits > 0) {
			return false;
		}

		return true;
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.addPiece = function(piece) {
		console.log("the eagle has landed!");
		console.log(piece);



		//debugger;
		// for each block in piece
/*		this.blocks.push({
			x: tetriminoBlocks.x[i]+tetrimino.position,
			y: tetriminoBlocks.y[i]+tetrimino.depth,
			color: tetrimino.color
		});*/
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.loop = function() {

		var _this = this;

		if (this.paused === false) {

			if (this.currentPiece === "") {
				this.createPiece();
			}

			this.movePiece("down");
			console.log("weee!!!");
		}

		setTimeout(function() {
			console.log("tick");
			_this.loop();
		}, this.speed);

	};


	// ------------------------------------------------------------------------

	return GameBoard;

});
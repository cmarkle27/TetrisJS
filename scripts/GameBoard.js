define("GameBoard", ["Tetrimino", "Canvas"], function(Tetrimino, Canvas) {

	// static vars
	var boardCanvas;
	var pieceCanvas;

	// --------------------------------------------------------------------
	// GameBoard constructor
	// --------------------------------------------------------------------

    function GameBoard(boardContext, pieceContext) {
		boardCanvas = new Canvas(boardContext);
		pieceCanvas = new Canvas(pieceContext);
		this.speed = 700; // setting
		this.paused = true;
		this.blocks = [];
		this.currentPiece = "";
		this.loop();
	}

	// ------------------------------------------------------------------------

	GameBoard.prototype.startGame = function() {
		boardCanvas.clear();
		pieceCanvas.clear();
		//this.currentPiece = "";
		this.paused = false;
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.createPiece = function() {
		// we really need to create two pieces, so that we can show the user whats on deck!!!
		this.currentPiece = new Tetrimino();
		//debugger;
		this.drawCurrentPiece();
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.drawCurrentPiece = function() {
		var blocks = this.currentPiece.getBlocks();
		pieceCanvas.renderBlocks(blocks);
	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.movePiece = function(direction) {

		var piecePosition = this.currentPiece.position,
			pieceDepth = this.currentPiece.depth,
			pieceOrientation = this.currentPiece.orientation,
			pieceRotations = this.currentPiece.getShape().length;

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
		if ( this.checkMove(piecePosition, pieceDepth, pieceOrientation) ) {
			this.currentPiece.position = piecePosition;
			this.currentPiece.depth = pieceDepth;
			this.currentPiece.orientation = pieceOrientation;
			this.drawCurrentPiece();
		} else if (direction === "down") {
			// add the current piece to the board array!!!
			this.addPiece(this.currentPiece);
			// delete it
			//this.currentPiece = "";
			this.createPiece();
		}

	};

	// ------------------------------------------------------------------------

	GameBoard.prototype.checkMove = function(position, depth, orientation) {

		var piece = this.currentPiece,
			shape = piece.getShape(),
			hits = 0,
			x = shape[orientation]["x"],
			y = shape[orientation]["y"],
			xCoord,
			yCoord;

		for (i = 0; i < 4; i++) {
			xCoord = x[i] + position;
			yCoord = y[i] + depth;

			// hit wall
			if (xCoord === (this.boardWidth/this.tileSize) || xCoord < 0) {
				hits += 1;
			}

			// hit floor
			if (yCoord === (this.boardHeight/this.tileSize)) {
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

		var that = this;

		if (that.paused === false) {

			if (that.currentPiece === "") {
				that.createPiece();
			}

			that.movePiece("down");
			console.log("weee!!!");
		}

		setTimeout(function() {
			console.log("tick");
			that.loop();
		}, that.speed);

	};


	// ------------------------------------------------------------------------

	return GameBoard;

});
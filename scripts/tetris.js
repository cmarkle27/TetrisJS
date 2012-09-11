define(function() {

	var pieceContext = document.getElementById("piece").getContext("2d"),
		boardContext = document.getElementById("board").getContext("2d"),
		tileImage = new Image(),
		GameBoard, // require gb (pass ctx's)
		Tetrimino, // require tm (pass new image)
		gameBoard; // = new(). init()

	// --------------------------------------------------------------------
	// GameBoard
	// --------------------------------------------------------------------

	GameBoard = function() {
		this.boardWidth = 480;
		this.boardHeight = 600;
		this.tileSize = 40;
	};

	GameBoard.prototype.init = function() {
		this.paused = true;
		this.loop();
		this.speed = 700;
		this.blocks = [];
	};

	GameBoard.prototype.startGame = function() {
		this.currentPiece = "";
		this.clearContexts();
		this.paused = false;
	};

	GameBoard.prototype.createPiece = function() {
		// we really need to create two pieces, so that we can show the user whats on deck
		this.currentPiece = new Tetrimino();
		this.currentPiece.render();


	};

	GameBoard.prototype.movePiece = function(direction) {

		var piecePosition = this.currentPiece.position,
			pieceDepth = this.currentPiece.depth,
			pieceOrientation = this.currentPiece.orientation,
			pieceRotations = this.currentPiece.getShape(this.currentPiece.shape).length;

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
			this.currentPiece.render();
		} else if (direction === "down") {
			// add the current piece to the board array!!!
			this.addPiece(this.currentPiece);
			// delete it
			//this.currentPiece = "";
			this.createPiece();
		}

	};

	GameBoard.prototype.checkMove = function(position, depth, orientation) {

		var piece = this.currentPiece,
			shape = piece.getShape(piece.shape),
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
			console.log(xCoord, yCoord);

		}

		if (hits > 0) {
			return false;
		}

		return true;
	};

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

	GameBoard.prototype.clearContexts = function() {
		pieceContext.clearRect(0, 0, this.boardWidth, this.boardHeight);// global
		boardContext.clearRect(0, 0, this.boardWidth, this.boardHeight);// global
	};

	// --------------------------------------------------------------------
	// Tetrimino
	// --------------------------------------------------------------------

	Tetrimino = function() {
		this.orientation = 0;
		this.depth = -4;
		this.position = 5;

		this.boardWidth = 480; // settings
		this.boardHeight = 600; // settings
		this.tileSize = 40; // settings

		this.shape = this.randomShape();
		this.color = this.getColor(this.shape);
		this.tileImage = tileImage; // global
		tileImage.src = "images/tile.png";
	};

	Tetrimino.prototype.randomShape = function() {
		var shapeArray = ["j", "o", "i", "l", "s", "z", "t"];
		return shapeArray[Math.floor(Math.random() * shapeArray.length)];
	};

	Tetrimino.prototype.getShape = function(shape) {
		var shapeList = {
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
		return shapeList[shape];
	};

	Tetrimino.prototype.getColor = function(shape) {

		var colors = {
			j: "#cc0000",
			o: "#cccccc",
			i: "#ffff33",
			l: "#33cc00",
			s: "#666666",
			z: "#3333ff",
			t: "#339900"
		};

		return colors[shape];
	};

	// this render could live outside???
	Tetrimino.prototype.render = function() {
		var that = this,
			shape = that.getShape(that.shape),
			x = shape[that.orientation]["x"],
			y = shape[that.orientation]["y"],
			xCoord,
			yCoord;

		// global
		pieceContext.clearRect(0, 0, that.boardWidth, that.boardHeight);
		// this.clearContext()???

		for (var i = 0; i < 4; i++) {
			xCoord = (x[i]*that.tileSize) + (that.position*that.tileSize);
			yCoord = (y[i]*that.tileSize) + (that.depth*that.tileSize);
			// global
			pieceContext.beginPath();
			pieceContext.rect(xCoord, yCoord, that.tileSize, that.tileSize);
			pieceContext.fillStyle = that.color;
			pieceContext.fill();
			pieceContext.drawImage(that.tileImage, xCoord, yCoord, that.tileSize, that.tileSize);
		}

	};

	// --------------------------------------------------------------------
	// Events
	// --------------------------------------------------------------------

	$(document).on('keydown', function(e) {
		switch (e.keyCode) {
			case 39:
			case 68:
				gameBoard.movePiece("right");
			break;

			case 37:
			case 65:
				gameBoard.movePiece("left");
			break;

			case 190:
				gameBoard.movePiece("clockwise");
			break;

			case 188:
				gameBoard.movePiece("counterclockwise");
			break;

			// down / speed-up
		}
	});

	////////////////////////////////////////////////////////////////////////

	$("#start").on('click', function(e) {

		var startButton = $(this),
			pauseButton = $("#pause");

		e.preventDefault();

		pauseButton.html("Pause Game");

		if (startButton.hasClass("firsties")) {

			startButton
				.html("New Game")
				.removeClass("firsties");

			pauseButton
				.removeClass("disabled")
				.toggle(function() {
					pauseButton.html("Resume Game");
					gameBoard.paused = true;
				}, function() {
					pauseButton.html("Pause Game");
					gameBoard.paused = false;
				});

		}

		gameBoard.startGame();

	});

	////////////////////////////////////////////////////////////////////////

	$("#options").on('click', function(e) {
		//...
	});


	// --------------------------------------------------------------------
	// on ready
	gameBoard = new GameBoard();

	// --------------------------------------------------------------------

});

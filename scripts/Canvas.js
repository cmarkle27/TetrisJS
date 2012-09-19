define("Canvas", function() {

	var boardWidth = 480,
		boardHeight = 600,
		tileSize = 40,
		tileImage = new Image();

	// ------------------------------------------------------------------------

	tileImage.src = "images/tile.png"; // preload tile image

	// --------------------------------------------------------------------
	// Canvas constructor
	// --------------------------------------------------------------------

	function Canvas(ctx) {
		this.context = ctx; // should we just make this a var???
	}

	// ------------------------------------------------------------------------

	Canvas.prototype.clear = function() {
		this.context.clearRect(0, 0, boardWidth, boardHeight);
	};

	// ------------------------------------------------------------------------

	Canvas.prototype.renderBlocks = function(blocks) {

		var context = this.context,
			blockLength = blocks["x"].length;

		this.clear();

		for (var i = 0; i < blockLength; i++) {

			xCoord = blocks["x"][i]*tileSize;
			yCoord = blocks["y"][i]*tileSize;

			console.log(yCoord);

			// globals
			context.beginPath();
			context.rect(xCoord, yCoord, tileSize, tileSize);
			context.fillStyle = blocks["color"][i];
			context.fill();
			context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize); // global in here
		}

	};


	return Canvas;

});
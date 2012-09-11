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

		// blocks should be an array of x,y coords
		var context = this.context,
			x, y, xCoord, yCoord;


		console.log("left off here");

		///////////////////////////////
		/// this needs work!!!
		// we should just get the x and y with pos & depth alradt added

		x = block["x"],
		y = block["y"],

		// global
		this.clear();

		for (var i = 0; i < 4; i++) {
			xCoord = (x[i]*tileSize) + (that.position*tileSize);
			yCoord = (y[i]*tileSize) + (that.depth*tileSize);
			// globals
			context.beginPath();
			context.rect(xCoord, yCoord, tileSize, tileSize);
			context.fillStyle = that.color;
			context.fill();
			context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize); // global in here
		}

	};


	return Canvas;

});
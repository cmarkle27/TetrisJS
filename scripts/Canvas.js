define("Canvas", function() {

	var tileImage = new Image();
	tileImage.src = "images/tile.png"; // preload tile image

	// --------------------------------------------------------------------
	// Canvas constructor
	// --------------------------------------------------------------------

	var Canvas = function(ctx, width, height) {
		this.context = ctx;
		this.canvasWidth = width;
		this.canvasHeight = height;
	};

	// ------------------------------------------------------------------------

	Canvas.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	};

	// ------------------------------------------------------------------------

	Canvas.prototype.renderBlocks = function(blocks, tileSize) {

		var context = this.context;
		var blockLength = blocks["x"].length;
		var xCoord, yCoord;

		this.clear();

		for (var i = 0; i < blockLength; i++) {

			xCoord = blocks["x"][i]*tileSize;
			yCoord = blocks["y"][i]*tileSize;

			context.beginPath();
			context.rect(xCoord, yCoord, tileSize, tileSize);
			context.fillStyle = blocks["color"];
			context.fill();
			context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize); // global in here
		}

	};

	// ------------------------------------------------------------------------

	return Canvas;

});
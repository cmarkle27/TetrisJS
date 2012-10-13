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

	Canvas.prototype.renderTile = function(tile) {

		var context = this.context;
		var tileSize = tile.size;
		var xCoord = tile.x * tileSize;
		var yCoord = tile.y * tileSize;
		var color = tile.color;

		context.beginPath();
		context.rect(xCoord, yCoord, tileSize, tileSize);
		context.fillStyle = color;
		context.fill();
		context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);

	};

	// ------------------------------------------------------------------------

	return Canvas;

});
define("Tetrimino", function() {

	// --------------------------------------------------------------------
	// Tetrimino constructor
	// --------------------------------------------------------------------

	var Tetrimino = function() {
		this.orientation = 0;
		this.depth = -4;
		this.position = 5;
		this.shape = this.randomShape();
		this.color = this.getColor();
		//...
	};

	// ------------------------------------------------------------------------

	Tetrimino.prototype.randomShape = function() {
		var shapeArray = ["j", "o", "i", "l", "s", "z", "t"];
		return shapeArray[Math.floor(Math.random() * shapeArray.length)];
	};

	// ------------------------------------------------------------------------

	Tetrimino.prototype.getShape = function() {
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
		return shapeList[this.shape];
	};

	// ------------------------------------------------------------------------

	Tetrimino.prototype.getColor = function() {

		var colors = {
			j: "#cc0000",
			o: "#cccccc",
			i: "#ffff33",
			l: "#33cc00",
			s: "#666666",
			z: "#3333ff",
			t: "#339900"
		};

		return colors[this.shape];
	};

	// ------------------------------------------------------------------------

	Tetrimino.prototype.getBlocks = function() {

		var shape = this.getShape(),
			xPoints = shape[this.orientation]["x"],
			yPoints = shape[this.orientation]["y"];

		for (var i = 0; i < 4; i++) {
			xPoints[i] += this.position;
			yPoints[i] += this.depth;
		}

		return {
			"x" : xPoints,
			"y" : yPoints,
			"color" : this.color
		};

	};

	// ------------------------------------------------------------------------

	return Tetrimino;

});
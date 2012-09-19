define("Tetrimino", function() {

	// --------------------------------------------------------------------
	// Tetrimino constructor
	// --------------------------------------------------------------------

	function Tetrimino() {
		this.orientation = 0;
		this.depth = -4;
		this.position = 5;
		this.shape = this.randomShape();
		this.color = this.getColor(this.shape);
	}

	// ------------------------------------------------------------------------

	Tetrimino.prototype.randomShape = function() {
		var shapeArray = ["j", "o", "i", "l", "s", "z", "t"];
		return shapeArray[Math.floor(Math.random() * shapeArray.length)];
	};

	// ------------------------------------------------------------------------

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

	// ------------------------------------------------------------------------

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

	// ------------------------------------------------------------------------

	Tetrimino.prototype.getCoordinates = function() {

		var thisShape = this.getShape(this.shape);

		//////////////////////
		/////
		console.log("left off here");

		/// need to get each coord instead of smashing into a single number, oops!

		return {
			"x" : parseInt(thisShape[this.orientation]["x"], 10) + this.position,
			"y" : parseInt(thisShape[this.orientation]["y"], 10) + this.depth,
			"color" : this.color
		};

	};

	// ------------------------------------------------------------------------

	return Tetrimino;

});
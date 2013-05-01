
// --------------------------------------------------------------------
// Tetrimino constructor
// --------------------------------------------------------------------

var Tetrimino = function() {
    this.orientation = 0;
    this.depth = 0;
    this.position = 5;
    this.shape = this.randomShape();
    this.tileColor = this.getColor();
    this.tileSize = 40;
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
        j: "#ff8000", //#cc0000 red //#ddddbb pale?
        o: "#ffff33", //#33cc00
        i: "#cccccc", //#ffff33
        l: "#3333dd",
        s: "#339900", //3333ff
        z: "#cc0000", //"#3333ff"
        t: "#666666" //#339900
    };

    return colors[this.shape];
};

// ------------------------------------------------------------------------

Tetrimino.prototype.getBlocks = function() {

    var shape = this.getShape();
    var xPoints = shape[this.orientation].x;
    var yPoints = shape[this.orientation].y;

    for (var i = 4; i--;) {
        xPoints[i] += this.position;
        yPoints[i] += this.depth;
    }

    return {
        "x" : xPoints,
        "y" : yPoints
    };

};

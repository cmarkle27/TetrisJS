function Tetris(options) {

    var boardWidth = 480;
    var boardHeight = 760;
    var blockStack = [];
    var currentPiece = null;
    var nextPiece = null;
    var paused = true;
    var boardCtx = options.boardContext;
    var pieceCtx = options.pieceContext;
    var speed = options.speed || 500;
    var tileImage = new Image();
	var thing = new Date();
    var preview = function(color){};
    var tempSpeed = speed;

    function startGame() {
        boardCtx.clearRect(0, 0, boardWidth, boardHeight);
        pieceCtx.clearRect(0, 0, boardWidth, boardHeight);
        createPiece();
        paused = false;
    }

    function createPiece() {
        stopQuickDrop();
        currentPiece = nextPiece;
        nextPiece = new Tetrimino();
        preview(nextPiece.getColor());
        drawCurrentPiece();
    }

    function setPreviewAction(func) {
        preview = func;
    }

    function drawCurrentPiece() {
        var blocks = currentPiece.getBlocks();
        var tileSize = currentPiece.tileSize;
        var tileColor = currentPiece.tileColor;

        pieceCtx.clearRect(0, 0, boardWidth, boardHeight);

        for (var i = 0; i < 4; i++) {
            renderTile({
                x: blocks.x[i],
                y: blocks.y[i],
                color: tileColor,
                size: tileSize
            }, pieceCtx);
        }
    }

    function renderTile(tile, context) {
        var tileSize = tile.size;
        var xCoord = tile.x * tileSize;
        var yCoord = tile.y * tileSize;
        var color = tile.color;

        context.beginPath();
        context.rect(xCoord, yCoord, tileSize, tileSize);
        context.fillStyle = color;
        context.fill();
        context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
    }

    function movePiece(direction) {
        var piecePosition = currentPiece.position;
        var pieceDepth = currentPiece.depth;
        var pieceOrientation = currentPiece.orientation;
        var pieceRotations = currentPiece.getShape().length;

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
        if (checkMove(piecePosition, pieceDepth, pieceOrientation)) {
            currentPiece.position = piecePosition;
            currentPiece.depth = pieceDepth;
            currentPiece.orientation = pieceOrientation;
            drawCurrentPiece();
            return true;
        }
    }

    // ------------------------------------------------------------------------

    function checkMove(position, depth, orientation) {
        var hits = 0;
        var shape = currentPiece.getShape();
        var x = shape[orientation].x;
        var y = shape[orientation].y;
        var tileSize = currentPiece.tileSize;
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
            if (blockStack[yCoord][xCoord]) {
                hits += 1;
            }
        }

        return hits === 0;
    }

    function blockInit() {
        for (var i = 0; i < 20; i++) { // 4 are hidden
            blockStack[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //12
        }
    }

    // ------------------------------------------------------------------------

    function addPiece() {
        var blocks = currentPiece.getBlocks();
        var tileSize = currentPiece.tileSize;
        var tileColor = currentPiece.tileColor;
        var x, y;

        for (var i = 4; i--;) {
            x = blocks.x[i];
            y = blocks.y[i];
            if (y < 4) {
                return false;
            }
            blockStack[y][x] = tileColor;
        }

        var lineBlocks;
        var lineRemovals = [];
        for (var j = 0; j < 20; j++) {
            lineBlocks = 0;
            for (var k = 0; k < 12; k++) {
                if (blockStack[j][k]) {
                    lineBlocks += 1;
                }
            }
            if (lineBlocks === 12) {
                stopQuickDrop();
                lineRemovals.push(j);
            }
        }

        for (var h = 0; h < lineRemovals.length; h++) {
            blockStack.splice(lineRemovals[h], 1);
            blockStack.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            speed *= 0.94;
            tempSpeed = speed;
        }

        boardCtx.clearRect(0, 0, boardWidth, boardHeight);
        for (var l = 0; l < 20; l++) {
            for (var m = 0; m < 12; m++) {
                if (blockStack[l][m]) {
                    renderTile({
                        x: m,
                        y: l,
                        color: blockStack[l][m],
                        size: tileSize
                    }, boardCtx);
                }
            }
        }

        return true;
    }

    function pauseGame(bool) {
        paused = bool;
    }

    function loop() {
        if (paused === false) {
            if ( ! movePiece("down")) {
                if (addPiece()) {
                    createPiece();
                } else {
                    pauseGame(true);
                    alert('fail');
                }
            }
        }
        setTimeout(loop, speed);
    }

    function quickDrop() {
        speed = 10;
    }

    function stopQuickDrop() {
        speed = tempSpeed;
    }

    nextPiece = new Tetrimino();
    tileImage.src = "img/tile.png";
    blockInit();
    loop();

    // api
    return {
        pauseGame: pauseGame,
        startGame: startGame,
        movePiece: movePiece,
        quickDrop: quickDrop,
        setPreviewAction: setPreviewAction
    }
}
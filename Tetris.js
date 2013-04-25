function Tetris(options) {

    var boardWidth = 480;
    var boardHeight = 760;
    var blockStack = [];
    var currentPiece = null;
    var paused = true;
    var boardCtx = options.boardContext;
    var pieceCtx = options.pieceContext;
    var speed = options.speed || 400;
    var tileImage = new Image();
	var thing = new Date();

    function startGame() {
        boardCtx.clearRect(0, 0, boardWidth, boardHeight);
        pieceCtx.clearRect(0, 0, boardWidth, boardHeight);
        createPiece();
        paused = false;
    }

    function createPiece() {
        // we really need to create two pieces, so that we can show the user whats on deck!!!
        currentPiece = new Tetrimino();
        drawCurrentPiece();
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
            blockStack [i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //12
        }
    }

    // function removeRow(depth) {
    //     //var startRow = parseInt(depth, 10) - 1;

    //     for (var i = depth; i--;) {
    //         if (i === 0) {
    //             blockStack [i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //-4?
    //         } else {
    //             blockStack [i] = blockStack [i-1];
    //         }
    //     }


    //     // if (new_index >= this.length) {
    //     //     var k = new_index - this.length;
    //     //     while ((k--) + 1) {
    //     //         this.push(undefined);
    //     //     }
    //     // }
    //     // this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //     //return this; // for testing purposes
    // }



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
            renderTile({
                x: x,
                y: y,
                color: tileColor,
                size: tileSize
            }, boardCtx);
        }


        // for (var i = 0; i < 4; i++) {
        //     renderTile({
        //         x: blocks.x[i],
        //         y: blocks.y[i],
        //         color: tileColor,
        //         size: tileSize
        //     }, boardCtx);
        // }



      // var count = 0;
      // while(blockStack[j].y ){
      //     ++count;
      //     ++i;
      // }


        // hmmmm...
        // maybe we should be building a multidimential array of colors???


        // reset lines
        //lines = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


///////////......
        // for (var k = blockStack.length; k--;) {
        //     //lines[parseInt(blockStack[k].y, 10)-1]++;
        //     //renderTile(blockStack[k], boardCtx);
        //     if (blockStack[k].y < 0) {
        //         return false;
        //     }
        // }
///////////......

        // console.log(blockStack);
        // for (var k = lines.length; k--;) {
        //     console.log(lines[k]);
        //     if (lines[k] === 12) {
        //         for (var l = blockStack.length; l--;) {
        //             if (blockStack[l+1].y === k) {
        //                 blockStack.splice(l+1, 1);
        //             }
        //         }
        //     }
        // }

        return true;
    }

    function pauseGame(bool) {
        paused = bool;
    }

    function loop() {
        if (paused === false) {
            // console.log('---------------------------------------------------')
            // for (var i = 0; i < 19; i++) {
            //     console.log(blockStack[i]);
            // }
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

    tileImage.src = "images/tile.png";
    blockInit();
    loop();

    // api
    return {
        pauseGame: pauseGame,
        startGame: startGame,
        movePiece: movePiece
    }
}
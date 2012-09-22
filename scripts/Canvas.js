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
text = this.context,
   blockLength = blocks["x"].length;

blocks["x"].length;

clear();

].length;

clear();

var i = 0; i < blockLength; i++) {

blockLength; i++) {

   xCoord = blocks["x"][i]*tileSize;
ks["x"][i]*tileSize;
   yCoord = blocks["y"][i]*tileSize;

s["y"][i]*tileSize;

   console.log(yCoord);

                        // globals
                        context.beginPath();
                        context.rect(xCoord, yCoord, tileSize, tileSize);
inPath();
                        context.rect(xCoord, yCoord, t                        context.fill();
                        context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize); // global in here
                }

        };


        return Canvas;

});
jQuery(document).ready(function($) {

    var tetris;
    var backboard = $(".backboard");

    // need to fix new game when unpaused!!!
    $("#start").on('click', function start(e) {
        e.preventDefault()
        var startButton = $(this)
        var pauseButton = $("#pause")
        pauseButton.html("Pause Game")

        tetris = new Tetris({
            pieceContext: $("#piece")[0].getContext("2d"),
            boardContext: $("#board")[0].getContext("2d")
        });

        tetris.setPreviewAction(function(color) {
            backboard.css("borderColor", color);
        });

        if (startButton.hasClass("firsties")) {

            startButton
            .html("New Game")
            .removeClass("firsties")

            pauseButton
            .removeClass("disabled")
            .toggle(function() {
                pauseButton.html("Resume Game")
                tetris.pauseGame(true);
            }, function() {
                pauseButton.html("Pause Game")
                tetris.pauseGame(false);
            })
        }

        tetris.startGame();
    });

    $("#options").on('click', function(e) {
        //...
    });

    $(document).on('keydown', function(e) {
        // if object
        switch (e.keyCode) {
            case 39:
            case 68:
                tetris.movePiece("right")
            break

            case 37:
            case 65:
                tetris.movePiece("left")
            break

            case 190:
                tetris.movePiece("clockwise")
            break

            case 188:
                tetris.movePiece("counterclockwise")
            break

            case 32:
                tetris.quickDrop();
            break
        }
    });

});
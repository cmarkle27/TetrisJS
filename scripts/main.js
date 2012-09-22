require(["jquery", "GameBoard"], function($, GameBoard) {

	var pieceContext = document.getElementById("piece").getContext("2d"),
		boardContext = document.getElementById("board").getContext("2d"),
		gameBoard = new GameBoard(boardContext, pieceContext);

	// ------------------------------------------------------------------------

	$(document).on('keydown', function(e) {
		switch (e.keyCode) {
			case 39:
			case 68:
				gameBoard.movePiece("right");
			break;

			case 37:
			case 65:
				gameBoard.movePiece("left");
			break;

			case 190:
				gameBoard.movePiece("clockwise");
			break;

			case 188:
				gameBoard.movePiece("counterclockwise");
			break;

			// down / speed-up
		}
	});

	// ------------------------------------------------------------------------

	$("#start").on('click', function(e) {

		var startButton = $(this),
			pauseButton = $("#pause");

		e.preventDefault();

		pauseButton.html("Pause Game");

		if (startButton.hasClass("firsties")) {

			startButton
				.html("New Game")
				.removeClass("firsties");

			pauseButton
				.removeClass("disabled")
				.toggle(function() {
					pauseButton.html("Resume Game");
					gameBoard.paused = true;
				}, function() {
					pauseButton.html("Pause Game");
					gameBoard.paused = false;
				});

		}

		gameBoard.startGame();

	});

	// ------------------------------------------------------------------------

	$("#options").on('click', function(e) {
		//...
	});

});
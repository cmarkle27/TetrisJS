jQuery(document).ready(function($) {

	var tetris = new Tetris({
		pieceContext: $("#piece")[0].getContext("2d"),
		boardContext: $("#board")[0].getContext("2d")
	})

	$("#start").on('click', function(e) {
		e.preventDefault()
		var startButton = $(this)
		var pauseButton = $("#pause")
		pauseButton.html("Pause Game")

		if (startButton.hasClass("firsties")) {

			startButton
			.html("New Game")
			.removeClass("firsties")

			pauseButton
			.removeClass("disabled")
			.toggle(function() {
				pauseButton.html("Resume Game")
				tetris.paused = true;
			}, function() {
				pauseButton.html("Pause Game")
				tetris.paused = false;
			})
		}

		tetris.startGame()
	})

	$("#options").on('click', function(e) {
		//...
	})

	$(document).on('keydown', function(e) {
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

			case 40:
				tetris.dropPiece("start")
			break
		}
	})

	$(document).on('keyup', function(e) {
		if (e.keyCode === 40) {
			tetris.dropPiece("stop")
		}
	})

})
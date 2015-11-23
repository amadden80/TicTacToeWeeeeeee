console.log('...loaded');


// GameState & Logic

// Display

// Interactions


function TicTacToeGame(){

  this.gameState = [
    'a', 'b', 'c',
    'd', 'e', 'f',
    'g', 'h', 'i',
  ];

  this.currentPlayer = 1;
}

TicTacToeGame.prototype.makeMove = function(cellNumber){
  this.gameState[cellNumber] = this.currentPlayer;
  this.currentPlayer = (this.currentPlayer%2) + 1;
}


TicTacToeGame.prototype.$el = $('<table>');

TicTacToeGame.prototype.render = function(){

  this.$el.empty();
  var row;
  var cell;
  var cellNumber = 0;

  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
    row = $('<tr>');
    for (var colIdx = 0; colIdx < 3; colIdx++) {
      cell = $('<td>');
      cell.addClass('cell');
      cell.addClass('player-' + this.gameState[cellNumber]);
      cell.data('cell-number', cellNumber);
      row.append(cell);
      cellNumber++;
    }
    this.$el.append(row);
  }
}

TicTacToeGame.prototype.renderGameOver = function(winner){
  $('#game-board').empty();
  var $winningMessage = $('<h1>').text("Great Job " + winner);
  $winningMessage.hide();
  $('#game-board').append($winningMessage);
  $winningMessage.fadeIn(4000);
}


TicTacToeGame.prototype.addEventListeners = function(){

  var scope = this;
  this.$el.on('click', 'td', function(){
    var cellNumber = $(this).data('cell-number');
    scope.makeMove(cellNumber);
    scope.render();
    var winner = scope.checkGameStatus();
    if (winner){
      scope.renderGameOver(winner);
    }
  });

};


TicTacToeGame.prototype.checkGameStatus = function(){

  var winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var combo = winningCombinations[i];
    if(
      this.gameState[combo[0]] == this.gameState[combo[1]]
        &&
      this.gameState[combo[1]] == this.gameState[combo[2]]
      //   &&
      // this.gameState[combo[0]] == this.gameState[combo[2]]
    ){
      return this.gameState[combo[0]]; // Return the winner!
    }
  }

  return false; // no winner :(

};




var game = new TicTacToeGame();
game.render();
$('#game-board').append(game.$el);
game.addEventListeners();

//

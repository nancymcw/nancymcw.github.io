//Here I declare some variables to be altered later including the current player, the grid cells being shortened to 'cells' and the gameBoard being an empty array.
let currentPlayer = "x";
let cells = document.querySelectorAll(".grid-cell");
let gameBoard = ["", "", "", "", "", "", "", "", ""];

//With every click the code is checking for a winner or if there is a draw and then finally if it is just time to change whose turn it is with each of my respective functions.
function handleClick(index) {
  if (gameBoard[index] === "" && !checkWinner()) {
    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    if (checkWinner()) {
      showResultAlert(`Player ${currentPlayer} wins!`, "success");
    } else if (checkDraw()) {
      showResultAlert("It's a draw!", "warning");
    } else {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      updateTurnIndicator();
    }
  }
}

//A function to check the winning patterns,
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  //including whether or not the gameBoard equals to these patterns so far.
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }

  return false;
}
//Changing the text of whose turn it is at the top of the page including calling hte turnIndicator div with jquery to change the text.
function updateTurnIndicator() {
  $("#turnIndicator").text(`Player ${currentPlayer}'s Turn`);
}
//This function declares a draw if every cell is not equal to empty (and also the winner would have been declared by now with my checkWinner function.)
function checkDraw() {
  return gameBoard.every((cell) => cell !== "");

  //A function for the clear board button that resets the gameboard to empty strings and resets the turn indicator.
}
function clearBoard() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerText = ""));
  currentPlayer = "x";
  updateTurnIndicator();
}
// Here is my function for the different types of alerts using jquery. I liked the jquery fadein and fadeout methods I'd read about and decided to use them in this project. The parameters are defined earlier in the initial handleClick function so that we know what type will show up and what text will be presented.
function showResultAlert(text, type) {
  $("#resultText").text(text);
  $("#resultAlert").addClass(`alert-${type}`).fadeIn();
}
//Finally this function is included for when someone closes the alert and then it goes back to being hidden.
function hideResultAlert() {
  $("#resultAlert").fadeOut().removeClass("alert-success alert-warning");
}

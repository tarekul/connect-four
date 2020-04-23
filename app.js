const player1 = "red";
const player2 = "blue";
const squares = document.querySelectorAll(".circle");
let player;
let board;

startGame();
function startGame() {
  player = player1;
  board = Array.from(Array(48).keys());
  document.querySelector(".endgame").style.display = "none";
  for (let i = 0; i < squares.length; i++) {
    if (i > 41) board[i] = "taken";
    squares[i].style.backgroundColor = "white";
    squares[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (
    typeof board[square.target.id] === "number" &&
    typeof board[parseInt(square.target.id) + 7] !== "number"
  ) {
    checkWin(board, player);
    turn(square.target.id);
  }
}

function turn(squareId) {
  console.log(player);
  board[squareId] = player;
  squares[squareId].style.backgroundColor = player;
  const gameWon = checkWin(board, player);
  if (gameWon) gameOver(gameWon);
  player = player === player1 ? player2 : player1;
}

function gameOver(gameWon) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector("#result").innerHTML =
    gameWon.player === "red" ? "You Win" : "You Lose";
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", turnClick, false);
  }
}

function emptySquares() {
  return board.filter(
    (s, i) => typeof board[i] === "number" && typeof board[i + 7] !== "number"
  );
}

//check the board for a win or lose
function checkWin(board, player) {
  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 7, 25, 33],
    [8, 16, 24, 32],
    [11, 7, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34]
  ];

  let gameWon = null;
  //now take the 4 values in each and plug into the squares
  for (let i = 0; i < winningArrays.length; i++) {
    const square1 = board[winningArrays[i][0]];
    const square2 = board[winningArrays[i][1]];
    const square3 = board[winningArrays[i][2]];
    const square4 = board[winningArrays[i][3]];

    //now check if these squares have class of player-one
    if (
      square1 === "red" &&
      square2 === "red" &&
      square3 === "red" &&
      square4 === "red"
    ) {
      //if they do, player one is passed as the winner
      gameWon = { index: i, player };
    }

    //now check if these squares have class of player-two
    else if (
      square1 === "blue" &&
      square2 === "blue" &&
      square3 === "blue" &&
      square4 === "blue"
    ) {
      //if they do, player one is passed as the winner
      gameWon = { index: i, player };
    }
  }
  return gameWon;
}

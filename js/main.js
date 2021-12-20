/*----- constants -----*/
const players = {
  1: "x",
  "-1": "o",
};
/*----- app's state (variables) -----*/
let board;
let turn;
let winner;
let clickedId;
const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

/*----- cached element references -----*/
const btnEl = document.querySelector("button");
const msgEl = document.querySelector("h1");
const divEls = [...document.querySelectorAll("#board > div")]; //take all of the divs with a parent element of #board and store them into an array
/*----- event listeners -----*/
btnEl.addEventListener("click", resetBoard);
document.querySelector("#board").addEventListener("click", handleMove);

/*----- functions -----*/

init(); //initialize the games base state

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn = 1;
  winner = null;
  
  renderMessage();
}

function handleMove(evt) {
  const divIdx = divEls.indexOf(evt.target); //get the index of the div element from the array created
  if (divIdx === -1 || winner) return; //if idx doesnt match a number in the array (aka not one of the divs that are a child of the #board) cancel the function call
  clickedId = divIdx;
  board[divIdx] = turn; //occupy the corresponding array index with the value of the player who clicked it
  renderImage(); //render the image of the player who clicked the square
  winner = checkWinner();
  turn *= -1; //switch to next player
  renderMessage();
}


function renderMessage() {
  if (winner === "T") {
    msgEl.innerHTML = "It's a tie!!!";
  } else if (winner) {
    msgEl.innerHTML = `${players[winner].toUpperCase()} Wins!`;
  } else {
    msgEl.innerHTML = `It is ${players[turn].toUpperCase()}'s turn!`;
    
  }
  
}

function renderImage() {
  document.getElementById(clickedId).src = `css/player-${players[turn]}.png`;
}
function resetBoard() {
  imgEls = document.querySelectorAll('img');
  imgEls.forEach(function(img, imgIdx) {
    document.getElementById(imgIdx).removeAttribute("src");
  })
  init();
}

function checkWinner() {

  
  for (let i = 0; i < possibleWins.length; i++) {
    //if index found in board matches index in possiblewins 1 is added, if this happens 3 times it means there is a winning array combo that matches in the current board array
    //it then returns the value of whoever occupies the first index of the winning array ie: [2,5,8] was the winning array that was hit, it will return board[2] and if its 
    //p1 that is 1 and if it's p2 it'll return -1
    if (Math.abs(board[possibleWins[i][0]] + board[possibleWins[i][1]] + board[possibleWins[i][2]]) === 3) return board[possibleWins[i][0]]; 
   
  }
  return checkTie();
}

function checkTie() {
  let tieCounter = 0;
  board.forEach(function(arg, idx) {
    if(Math.abs(board[idx]) === 1) tieCounter++;
    
  })
  if(tieCounter === 9) return "T";
}

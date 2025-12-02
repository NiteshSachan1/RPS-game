let userMove = '';
let computerMove = '';
let result = '';
let game = {
  wins: 0,
  looses: 0,
  ties:0
};
let gameHistory = [];

function captureUserMove(move){
  userMove = move;
  console.log("userMove: " + userMove);
}
function generateComputerMove(){
  const randNum = Math.random(); // will be between 0 and 1
  if (randNum < 1/3){ // it is greater than 0
    computerMove = 'Rock';
  } else if (randNum < 2/3){ // it is already greater than or equal to 1/3
    computerMove = 'Paper';
  } else { // it is greater than 2/3 and less than 1
    computerMove = 'Scissors';
  }
  console.log("computerMove: " + computerMove);
}

function evaluateMoves(){
  if (userMove === computerMove){ // (R,R) , (P,P) ,(S,S)
    result = 'Tie';
  } else if ((userMove === 'Rock' && computerMove === 'Scissors') ||
             (userMove === 'Scissors' && computerMove === 'Paper') ||
             (userMove === 'Paper' && computerMove === 'Rock')){
    // (R,S) , (S,P) , (P,R)
    result = 'Win';
  } else{ 
    // (R,P), (P,S),(S,R)
    result = 'Loose';
  }
  console.log('result: ' + result);
}


function updateScores(){
  if (result === 'Win'){
    game.wins++;
  } else if (result === 'Tie'){
    game.ties++;
  } else if (result === 'Loose'){
    game.looses++;
  } // else result === ''
  console.log(game);
  const gameHistoryItem = {
    userMove: userMove,
    computerMove: computerMove,
    result: result
  };
  gameHistory.push(gameHistoryItem);
}


function renderGameSummary(){
  const gamesPlayed = game.wins + game.looses + game.ties;
  document.getElementById('wins').innerHTML = game.wins;
  document.getElementById('ties').innerHTML = game.ties;
  document.getElementById('looses').innerHTML = game.looses;
  document.getElementById('gamesPlayed').innerHTML = gamesPlayed;
}

function renderGameHistory(){
  let gameHistoryHTML = `
  <tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
  </tr>
  `;
  for(let i = 0; i < gameHistory.length;i++){
    const gameItem = gameHistory[i];  // object
    gameHistoryHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${gameItem.userMove}</td>
      <td>${gameItem.computerMove}</td>
      <td>${gameItem.result}</td>
    </tr>
    `;
  }
    document.getElementById('gameHistory').innerHTML = gameHistoryHTML;
}

function playGame(move){
    captureUserMove(move);
    generateComputerMove();
    evaluateMoves();
    updateScores();
    renderGameSummary();
    renderGameHistory();
}

function resetScores(){
    game.wins = 0;
    game.ties = 0;
    game.looses = 0;
    gameHistory = [];
}
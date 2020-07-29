// Initial scores
let playerScore = 0;
let computerScore = 0;

// UI elements
let scoreboard = {
  player: document.getElementById("player-score"),
  computer: document.getElementById("cpu-score"),
};

const modal = document.querySelector(".modal");
const message = document.querySelector(".message").children[0];
const result = document.getElementById("result");
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
const gunBtn = document.getElementById("gun-btn");
const spockBtn = document.getElementById("spock-btn");
const defaultMessage = "The first player to score 5 points wins.";
const roundMessages = [
    "Rock beats Scissors!",
    "Scissors beats Paper!",
    "Paper beats Rock!",
  ];

// Dynamic buttons in the Modal Pop-up
const restartBtn = () => {
  document.getElementById("restart").addEventListener("click", () => {
    modal.style.display = "none";
    restart();
  });
};
const closeBtn = () => {
  document.getElementById("close").addEventListener("click", () => {
    modal.style.display = "none";
  });
};

// Sound effects to make things fun
let winGameSound = document.querySelector(".win-game");
let loseGameSound = document.querySelector(".lose-game");

let winSound = document.querySelector(".win-round");
let loseSound = document.querySelector(".lose-round");
let gunSound = document.querySelector(".gun");
let spockSound = document.querySelector(".mr-spock");

// Global Values
const ROCK_VALUE = "ROCK";
const SCISSORS_VALUE = "SCISSORS";
const PAPER_VALUE = "PAPER";

// The computer will make its choice
function computerPlay() {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  let random = Math.floor(Math.random() * 3);
  return choices[random];
}

function playerWinRound() {
  playerScore++;
  scoreboard.player.textContent = `${playerScore}`;
  if (playerScore < 5) {
    winSound.play();
  }
}

function computerWinRound() {
  computerScore++;
  scoreboard.computer.textContent = `${computerScore}`;
  if (computerScore < 5) {
    loseSound.play();
  }
}

// Each round will compare the player's choice with the computer's choice
function round(player, computer) {
  switch (true) {
    case player === computer:
      message.textContent = "Draw!";
      break;
    case player === ROCK_VALUE && computer === "SCISSORS":
      message.textContent = `Player wins round, ${roundMessages[0]}`;
      playerWinRound();
      break;
    case player === ROCK_VALUE && computer === "PAPER":
      message.textContent = `Computer wins round, ${roundMessages[2]}`;
      computerWinRound();
      break;
    case player === SCISSORS_VALUE && computer === "PAPER":
      message.textContent = `Player wins round, ${roundMessages[1]}`;
      playerWinRound();
      break;
    case player === SCISSORS_VALUE && computer === "ROCK":
      message.textContent = `Computer wins round, ${roundMessages[0]}`;
      computerWinRound();
      break;
    case player === PAPER_VALUE && computer === "ROCK":
      message.textContent = `Player wins round, ${roundMessages[2]}`;
      playerWinRound();
      break;
    case player === PAPER_VALUE && computer === "SCISSORS":
      message.textContent = `Computer wins round, ${roundMessages[1]}`;
      computerWinRound();
      break;
  }
}

function showModal() {
  modal.style.opacity = 1;
  modal.style.display = "block";
  modal.style.transform = "scale(1)";
  modal.style.transition =
    "visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s";
}

// first player to reach 5 points wins!
function game(playerChoice) {
  let computerChoice = computerPlay();
  round(playerChoice, computerChoice);
  if (playerScore == 5) {
    showModal();
    result.innerHTML = `
            <img src="images/x-all-the-y.png" class="win-img">
            <h1 class="final-message">You Win!</h1>
            <button id="restart">NEW GAME</button>
        `;
    winGameSound.play();
    restartBtn();
  } else if (computerScore == 5) {
    showModal();
    result.innerHTML = `
            <img src="images/trollface.png" class="lose-img">
            <h1 class="final-message">You Lose!</h1>
            <button id="restart">NEW GAME</button>
        `;
    loseGameSound.play();
    restartBtn();
  }
}

// start a new game
function restart() {
  playerScore = 0;
  computerScore = 0;
  scoreboard.player.textContent = `0`;
  scoreboard.computer.textContent = `0`;
  message.textContent = defaultMessage;
}

function buttonHandlers() {
  rockBtn.addEventListener("click", () => {
    game(ROCK_VALUE);
  });

  scissorsBtn.addEventListener("click", () => {
    game(SCISSORS_VALUE);
  });

  paperBtn.addEventListener("click", () => {
    game(PAPER_VALUE);
  });

  // gunBtn.addEventListener("click", () => {
  //   showModal();
  //   result.innerHTML = `
  //     <img src="images/clint-eastwood.jpg" class="gun">
  //     <h1 class="gun-message">Feeling lucky?<br>
  //     You still have to choose<br>
  //     Rock, Paper, or S</h1>
  //     <button id="close">Return to Game</button>
  //   `;
  //   gunSound.play();
  //   closeBtn();
  // })

  spockBtn.addEventListener("click", () => {
    showModal();
    result.innerHTML = `
      <img src="images/mr-spock.jpg" class="mr-spock">
      <h1 class="spock-message">Live Long and Prosper indeed,<br>
      but you have to choose<br>
      Rock, Paper, or Scissors!</h1>
      <button id="close">Return to Game</button>
    `;
    spockSound.play();
    closeBtn();
  });
}

buttonHandlers();

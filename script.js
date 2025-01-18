// Variables for storing data
let userChoice = '';
let computerChoice = '';

let playerScore = 0;
let computerScore = 0;

function getUserChoice(userInput) {
  userChoice = userInput;
  document.getElementById('userChoice').innerHTML = ('Player Selected: ' + userChoice); // Changes the HTML to show what was selected
  computerChoice = getComputerChoice();
  document.getElementById('computerChoice').innerHTML = ('Computer Selected: ' + computerChoice);
  determineWinner(userChoice, computerChoice);
} // Takes the input from the pressed button and the string from getComputerChoice and puts them into determineWinner
  
function getComputerChoice() {
  let computerNumber = Math.floor(Math.random() * 3); // Generates a number from 0 to 2
  if (computerNumber === 0) {
    return 'Rock';
  } else if (computerNumber === 1) {
    return 'Paper';
  } else if (computerNumber === 2) {
    return 'Scissors';
  }
}
  
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) { // A series of if else statements inside of if statements that determine who won
    document.getElementById('winner').innerHTML = (`It's a tie...`); // Shows if it was a tie
  }
  if (userChoice === 'Rock') {
    if (computerChoice === 'Paper') {
      computerScore++;
      document.getElementById('winner').innerHTML = ('Computer wins!'); // Shows that the computer won
    } else if (computerChoice === 'Scissors') {
      playerScore++;
      document.getElementById('winner').innerHTML = ('Player wins!'); // Shows that the player won
    }
  }
  if (userChoice === 'Paper') {
    if (computerChoice === 'Scissors') {
      computerScore++;
      document.getElementById('winner').innerHTML = ('Computer wins!');
    } else if (computerChoice === 'Rock') {
      playerScore++;
      document.getElementById('winner').innerHTML = ('Player wins!');
    }
  }
  if (userChoice === 'Scissors') {
    if (computerChoice === 'Rock') {
      computerScore++;
      document.getElementById('winner').innerHTML = ('Computer wins!');
    } else if (computerChoice === 'Paper') {
      playerScore++;
      document.getElementById('winner').innerHTML = ('Player wins!');
    }
  }
  if (userChoice === 'Bomb') {
    playerScore++;
    document.getElementById('winner').innerHTML = ('Player wins!');
  }
  document.getElementById('computerScore').innerHTML = ('Computer Score: ' + computerScore); // Updates score on HTML
  document.getElementById('playerScore').innerHTML = ('Player Score: ' + playerScore);
} // Takes the strings from getUserChoice and puts them into the if statements to determine the winner
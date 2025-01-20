// Variables for storing data
let userChoice = '';
let computerChoice = '';

let playerScore = 0;
let computerScore = 0;

// Object containing all selectable options
const options = {
    'rock': { beats: ['scissors', 'man'], tiesWith: ['rock'], value: 2 },
    'paper': { beats: ['rock', 'man'], tiesWith: ['paper', 'paper towel'], value: 1 },
    'scissors': { beats: ['paper', 'paper towel', 'man'], tiesWith: ['scissors','water'], value: 5 },
    'bomb': { beats: ['rock', 'paper', 'scissors', 'paper towel', 'man'], tiesWith: ['bomb'], value: 20 },
    'water': { beats: ['rock', 'paper', 'bomb', 'man'], tiesWith: ['water','scissors'], value: 1 },
    'paper towel': { beats: ['rock', 'water'], tiesWith: ['paper towel', 'paper'], value: 2 },
    'man': { beats: ['paper towel', 'random number'], tiesWith: ['man'], value: 100 },
    'random number': { beats: [], tiesWith: ['rock', 'paper', 'scissors', 'bomb', 'water', 'paper towel', 'random number'], value: Math.floor(Math.random() * 20) + 1 },
    'wind': { beats: [], tiesWith: [], value: 0 },
    'shoot': { beats: ['man'], tiesWith: ['shoot'], value: 0 },
    'gun': { beats: [], tiesWith: [], value: 30 }
} // 'template': { beats: [], tiesWith: [], value: 0 }

// Essentially unmodified from the original. Gets the input from the pressed button, runs getComputerChoice(), and then puts them into determineWinner()
function getUserChoice(userInput) {
    userChoice = userInput.toLowerCase();
    document.getElementById('userChoice').innerHTML = ('Player Selected: ' + captitalize(userChoice));
    computerChoice = getComputerChoice();
    document.getElementById('computerChoice').innerHTML = ('Computer Selected: ' + captitalize(computerChoice));
    determineWinner(userChoice, computerChoice);
}

// Takes all of the options from the options object and makes an array with them. It then selects a random index of that array, returning a random option (this works no matter how many options are added)
function getComputerChoice() {
    choices = Object.keys(options);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Using an object to keep track of all of this was an excellent decision. It not only saved me from having to write a million if statements, but also streamlined adding new options. This function takes the 2 choice variables and plugs them into some simple if statements
function determineWinner(userChoice, computerChoice) {
    if (options[userChoice].tiesWith.includes(computerChoice)) { // Checks if computerChoice is on the list of things that userChoice ties with
        document.getElementById('winner').innerHTML = (`It's a tie...`); 
    } else if (options[userChoice].beats.includes(computerChoice)) { // If there isn't a tie, checks if computerChoice is on the list of things userChoice beats
        playerScore++;
        document.getElementById('winner').innerHTML = ('Player wins!');
    } else if (options[computerChoice].beats.includes(userChoice)) { // If it isn't on that list, checks if userChoice is on the list of things that computerChoice beats
        computerScore++;
        document.getElementById('winner').innerHTML = ('Computer wins!');
    }
    // Updates score in HTML
    document.getElementById('computerScore').innerHTML = ('Computer Score: ' + computerScore);
    document.getElementById('playerScore').innerHTML = ('Player Score: ' + playerScore);
}

function captitalize(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
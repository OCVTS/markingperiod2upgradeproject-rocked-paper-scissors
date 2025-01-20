// Variables for storing data
let userChoice = '';
let computerChoice = '';

let playerScore = 0;
let computerScore = 0;

// let randomizedNumber = 0;

// Object containing all selectable options
const options = {
    'rock': { beats: ['scissors', 'man'], tiesWith: ['rock'], value: 2, info: 'Despite the image, this is just a plain old rock.' },
    'paper': { beats: ['rock', 'man'], tiesWith: ['paper', 'paper towel'], value: 1, info: 'A basic piece of paper.' },
    'scissors': { beats: ['paper', 'paper towel', 'man'], tiesWith: ['scissors','water'], value: 5, info: 'A generic pair of scissors.' },
    'bomb': { beats: ['rock', 'paper', 'scissors', 'paper towel', 'man'], tiesWith: ['bomb'], value: 20, info: 'An explosive. It blows up.' },
    'water': { beats: ['rock', 'paper', 'bomb', 'man'], tiesWith: ['water','scissors'], value: 1, info: '71% of the Earth\'s surface and about 60% of YOU.' },
    'paper towel': { beats: ['rock', 'water'], tiesWith: ['paper towel', 'paper'], value: 1, info: 'Good for cleaning spills and not much else.' },
    'man': { beats: ['paper towel', 'random number'], tiesWith: ['man'], value: 100, info: 'This is Ben. Say hi! (he has a very weak constitution)' },
    'random number': { beats: ['Technically nothing'], tiesWith: ['Probably itself'], value: numberRandomizer(), info: 'LET\'S GO GAMBLING!' },
    'wind': { beats: [], tiesWith: [], value: 0, info: 'A gust of wind.' },
    'shoot': { beats: ['man'], tiesWith: ['shoot'], value: 0, info: 'You ever play normal Rock Paper Scissors and have someone treat "SHOOT" as something you can actually pick? No? Well now you can!' },
    'gun': { beats: [], tiesWith: [], value: 30, info: 'This is a firearm.' }
} // 'template': { beats: [], tiesWith: [], value: 0, info: '' }

// Essentially unmodified from the original. Gets the input from the pressed button, runs getComputerChoice(), and then puts them into determineWinner()
function getUserChoice(userInput) {
    userChoice = userInput.toLowerCase();
    document.getElementById('userChoice').innerHTML = ('Player Selected: ' + formatText(userChoice));
}

// Takes all of the options from the options object and makes an array with them. It then selects a random index of that array, returning a random option (this works no matter how many options are added)
function getComputerChoice() {
    choices = Object.keys(options);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Using an object to keep track of all of this was an excellent decision. It not only saved me from having to write a million if statements, but also streamlined adding new options. This function takes the 2 choice variables and plugs them into some simple if statements
function determineWinner(userChoice) {
    computerChoice = getComputerChoice();
    document.getElementById('computerChoice').innerHTML = ('Computer Selected: ' + formatText(computerChoice));
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

// This is for when I want to capitalize the first letter of each word in something and add spaces after commas if there aren't any. It also detects whether something is an array or string
function formatText(input) {
    if (Array.isArray(input)) {
        return input.map(item => item.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')).join(', ');
    } else if (typeof input === 'string') {
        return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}

// This is for the tooltip when you hover a button. I searched a lot to try to get it to work how I wanted, and eventually just asked chatGPT and it gave me what I wanted immediately. I also did a ton of messing with it to make it work exactly how I wanted. I've spent hours on this single feature...
const buttons = document.querySelectorAll('.optionButton');
const tooltip = document.getElementById('tooltip');
const buttonIdP = document.getElementById('buttonId');
const buttonValueP = document.getElementById('buttonValue');
const buttonInfoP = document.getElementById('buttonInfo');
const buttonBeatsP = document.getElementById('buttonBeats');
const buttonTiesWithP = document.getElementById('buttonTiesWith');

buttons.forEach(button => {
    // Makes the tooltip div visible and changes the text of it for which button you hover
    button.addEventListener('mouseover', (e) => {
        numberRandomizer();
        const buttonId = e.target.id;
        const buttonValue = options[e.target.id].value;
        const buttonInfo = options[e.target.id].info;
        const buttonBeats = options[e.target.id].beats;
        const buttonTiesWith = options[e.target.id].tiesWith;
        
        buttonIdP.innerText = `${formatText(buttonId)}`;
        buttonValueP.innerText = `Value: ${buttonValue}`;
        buttonInfoP.innerText = `${buttonInfo}`;
        buttonBeatsP.innerText = `Beats: ${formatText(buttonBeats)}`;
        buttonTiesWithP.innerText = `Ties with: ${formatText(buttonTiesWith)}`;
        
        tooltip.style.display = 'inline-block';
        tooltip.style.opacity = 0.9;
    });

    // Tracks the position of the tooltip div based on the cursor
    button.addEventListener('mousemove', (e) => {
        numberRandomizer();
        const offsetX = 10; 
        const offsetY = 20;
        tooltip.style.left = `${e.pageX + offsetX}px`;
        tooltip.style.top = `${e.pageY + offsetY}px`;
    });

    // Hides the tooltip div again
    button.addEventListener('mouseout', () => {
        numberRandomizer();
        tooltip.style.display = 'none';
        tooltip.style.opacity = 0;
    });
});

function numberRandomizer() {
    return Math.floor(Math.random() * 30) + 1;
}
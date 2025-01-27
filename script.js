// Variables for storing data
let userChoice = 'none';
let computerChoice = 'none';

let playerScore = 0;
let computerScore = 0;

let currentModifier = 'none';
let userChoice2 = '';

// Object containing all selectable options
const options = {
    'rock': { beats: ['scissors', 'man'], tiesWith: ['rock'], value: 2, info: 'Despite the image, this is just a plain old rock.', upgrade: 'boulder' },
    'paper': { beats: ['rock', 'man'], tiesWith: ['paper', 'paper towel'], value: 1, info: 'A basic piece of paper.', upgrade: 'carbon fiber reinforced polymer' },
    'scissors': { beats: ['paper', 'paper towel', 'man'], tiesWith: ['scissors','water'], value: 5, info: 'A generic pair of scissors.', upgrade: 'hedge trimmers' },
    'bomb': { beats: ['rock', 'paper', 'scissors', 'paper towel', 'man'], tiesWith: ['bomb'], value: 20, info: 'An explosive. It blows up.', upgrade: 'nuke' },
    'water': { beats: ['rock', 'paper', 'bomb', 'man'], tiesWith: ['water','scissors'], value: 1, info: '71% of the Earth\'s surface and about 60% of YOU.', upgrade: 'ocean' },
    'paper towel': { beats: ['rock', 'water'], tiesWith: ['paper towel', 'paper'], value: 1, info: 'Good for cleaning spills and not much else.', upgrade: '' },
    'man': { beats: ['paper towel', 'random number'], tiesWith: ['man'], value: 100, info: 'This is Ben. Say hi! (he has a very weak constitution)', upgrade: '' },
    'random number': { beats: ['Technically nothing'], tiesWith: ['Probably itself'], value: 0, info: 'LET\'S GO GAMBLING!!! (Note: This option forces the Value Mod)', upgrade: 'Nice Try' },
    'wind': { beats: [], tiesWith: [], value: 0, info: 'A gust of wind.', upgrade: '' },
    'shoot': { beats: ['man'], tiesWith: ['shoot'], value: 0, info: 'You ever play normal Rock Paper Scissors and have someone treat "SHOOT" as something you can actually pick? No? Well now you can!', upgrade: '' },
    'gun': { beats: [], tiesWith: [], value: 30, info: 'This is a firearm.', upgrade: '' }
} // 'template': { beats: [], tiesWith: [], value: 0, info: '', upgrade: '' }

// Object containing all merge-only options
const mergedOptions = {
    'corpse': { beats: [], tiesWith: [], value: 0, info: 'I\'m sure he\'s fine.', combos: ['man' + 'bomb'] }
} // 'template': { beats: [], tiesWith: [], value: 0, info: '', combos: [] }

// Object containing all upgrade-only options
const upgradedOptions = {
    'boulder': { beats: [], tiesWith: [], value: 0, info: 'That\'s a big rock....', origin: 'rock' }
} // 'template': { beats: [], tiesWith: [], value: 0, info: '', origin: '' }

// Essentially unmodified from the original. Gets the input from the pressed button, runs getComputerChoice(), and then puts them into determineWinner()
function getUserChoice(userInput) {
    userChoice = userInput;
    if (currentModifier == 'upgrade') {
        userChoice = options[userChoice].upgrade;
    }
    document.getElementById('userChoice').innerHTML = ('Player: ' + formatText(userChoice));
}

// Takes all of the options from an options object and makes an array with them. It then selects a random index of that array, returning a random option (this works no matter how many options are added). Has a 10% chance to use an alternate options object
function getComputerChoice() {
    num = Math.floor(Math.random() * 100) + 1;

    if (num >= 1 && num <= 5) {
        choices = Object.keys(mergedOptions); // Uses mergedOptions (5%)
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    } else if (num >= 6 && num <= 10) {
        choices = Object.keys(upgradedOptions); // Uses upgradedOptions (5%)
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    } else {
        choices = Object.keys(options); // Uses options (90%)
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
}

function setModifier(mod) {
    currentModifier = mod;
    document.getElementById('modifier').innerHTML = ('Modifier: ' + formatText(currentModifier));

    // Sets userChoice to none if none mod is selected
    if (currentModifier === 'none') {
        userChoice = 'none'; 
        document.getElementById('userChoice').innerHTML = ('Player: ' + formatText(userChoice));
    } 

    // 
    if (currentModifier == 'upgrade') {
        userChoice = options[userChoice].upgrade;
        document.getElementById('userChoice').innerHTML = ('Player: ' + formatText(userChoice));
    }
    
    if (currentModifier == 'none') {
        userChoice = upgradedOptions[userChoice].origin;
    }
}

// Go button runs this, checks modifier and runs correct determineWinner
function modifierCheck(userChoice) {
    if (userChoice == 'none') {
        document.getElementById('winner').innerHTML = ('Select an option.'); // 
    } else {
        if (userChoice == 'random number') { // Forces Value Mod
            currentModifier = 'value';
            document.getElementById('modifier').innerHTML = ('Modifier: ' + formatText(currentModifier));
        }
        
        if (currentModifier == 'none') {
            determineWinner(userChoice);
        } else if (currentModifier == 'value') {
            determineValueWinner(userChoice);
        } else if (currentModifier == 'upgrade') {
            determineUpgradeWinner(userChoice);
        }
    }
}

// Using an object to keep track of all of this was an excellent decision. It not only saved me from having to write a million if statements, but also streamlined adding new options 
function determineWinner(userChoice) { // This function takes the 2 choice variables and plugs them into some simple if statements
    computerChoice = getComputerChoice(); // Does computer stuff first
    document.getElementById('computerChoice').innerHTML = ('Computer: ' + formatText(computerChoice));

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

// Same as above except it uses Value
function determineValueWinner(userChoice) {
    options['random number'].value = numberRandomizer(); // Randomizes the value of Random Number so that it isn't what it was when it was hovered

    computerChoice = getComputerChoice();
    document.getElementById('computerChoice').innerHTML = ('Computer: ' + formatText(computerChoice));

    if (options[userChoice].value === options[computerChoice].value) {
        document.getElementById('winner').innerHTML = (`It's a tie...`); 
    } else if (options[userChoice].value > options[computerChoice].value) {
        playerScore++;
        document.getElementById('winner').innerHTML = ('Player wins!');
    } else if (options[userChoice].value < options[computerChoice].value) {
        computerScore++;
        document.getElementById('winner').innerHTML = ('Computer wins!');
    }

    document.getElementById('computerScore').innerHTML = ('Computer Score: ' + computerScore);
    document.getElementById('playerScore').innerHTML = ('Player Score: ' + playerScore);
}

// Same as above except it uses the upgradedOptions object
function determineUpgradeWinner(userChoice) {
    computerChoice = getComputerChoice(); // Does computer stuff first
    document.getElementById('computerChoice').innerHTML = ('Computer: ' + formatText(computerChoice));

    if (upgradedOptions[userChoice].tiesWith.includes(computerChoice)) { 
        document.getElementById('winner').innerHTML = (`It's a tie...`); 
    } else if (upgradedOptions[userChoice].beats.includes(computerChoice)) { 
        playerScore++;
        document.getElementById('winner').innerHTML = ('Player wins!');
    } else if (upgradedOptions[computerChoice].beats.includes(userChoice)) { 
        computerScore++;
        document.getElementById('winner').innerHTML = ('Computer wins!');
    }

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
const buttonNameP = document.getElementById('buttonName');
const buttonValueP = document.getElementById('buttonValue');
const buttonInfoP = document.getElementById('buttonInfo');
const buttonBeatsP = document.getElementById('buttonBeats');
const buttonTiesWithP = document.getElementById('buttonTiesWith');

buttons.forEach(button => {
    // Makes the tooltip div visible and changes the text of it for which button you hover
    button.addEventListener('mouseover', (hover) => {
        options['random number'].value = numberRandomizer(); // Randomizer runs on each hover
        
        const buttonName = hover.target.id;
        const buttonValue = options[hover.target.id].value;
        const buttonInfo = options[hover.target.id].info;
        const buttonBeats = options[hover.target.id].beats;
        const buttonTiesWith = options[hover.target.id].tiesWith;
        
        buttonNameP.innerText = `${formatText(buttonName)}`;
        buttonValueP.innerText = `Value: ${buttonValue}`;
        buttonInfoP.innerText = `${buttonInfo}`;
        buttonBeatsP.innerText = `Beats: ${formatText(buttonBeats)}`;
        buttonTiesWithP.innerText = `Ties with: ${formatText(buttonTiesWith)}`;
        
        tooltip.style.display = 'inline-block';
        tooltip.style.opacity = 0.9;
    });

    // Tracks the position of the tooltip div based on the cursor
    button.addEventListener('mousemove', (pos) => {
        const offsetX = 10; 
        const offsetY = 20;
        tooltip.style.left = `${pos.pageX + offsetX}px`;
        tooltip.style.top = `${pos.pageY + offsetY}px`;
    });

    // Hides the tooltip div again
    button.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
        tooltip.style.opacity = 0;
    });
});

// Randomizes Random Number
function numberRandomizer() {
    return Math.floor(Math.random() * 30) + 1;
}

function getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    document.getElementById('dateCorner').innerHTML = (`${month}/${day}/${year}`);
    return `${month}/${day}/${year}`;
}

getDate();
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];
let guessCount = 10;

const guessField = document.getElementById('guessField');
const submitGuess = document.getElementById('submitGuess');
const resetButton = document.getElementById('reset');
const previousGuessesPara = document.getElementById('previousGuesses');
const lastResultPara = document.getElementById('lastResult');
const lowOrHiPara = document.getElementById('lowOrHi');
const remainingGuessesPara = document.getElementById('remainingGuesses');

submitGuess.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessField.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        checkGuess();
    }
});

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        lastResultPara.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    guesses.push(userGuess);
    previousGuessesPara.textContent = `Previous guesses: ${guesses.join(', ')}`;

    guessCount--;
    remainingGuessesPara.textContent = guessCount;

    if (userGuess === randomNumber) {
        lastResultPara.textContent = 'Congratulations! You got it right!';
        lastResultPara.style.color = '#00ff00';
        lowOrHiPara.textContent = '';
        setGameOver();
    } else if (guessCount === 0) {
        lastResultPara.textContent = '!!!GAME OVER!!!';
        lastResultPara.style.color = '#8b0000';
        lowOrHiPara.textContent = '';
        setGameOver();
    } else {
        lastResultPara.textContent = 'Wrong!';
        lastResultPara.style.color = '#8b0000';
        if (userGuess < randomNumber) {
            lowOrHiPara.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHiPara.textContent = 'Last guess was too high!';
        }
        
    }

    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    submitGuess.disabled = true;
    resetButton.style.display = 'inline';
}

function resetGame() {
    guessCount = 10;
    guesses = [];

    guessField.disabled = false;
    submitGuess.disabled = false;
    resetButton.style.display = 'none';

    lastResultPara.style.color = '#ddd';
    lastResultPara.textContent = '';
    lowOrHiPara.textContent = '';
    previousGuessesPara.textContent = '';
    remainingGuessesPara.textContent = guessCount;

    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessField.focus();
}

/*
*********************************************
*                                           *
*            On webpage load                *
*                                           *
*********************************************
- aanmaken constanten
- event listeners toevoegen
- functie shuffleLetters
*/

const addButton = document.querySelector('#addWord');
const boardButtons = document.querySelectorAll("#board button");
const letterButtons = document.querySelectorAll('.letterButton');
const resultaat = document.getElementById("resultaat");
const wordDiv = document.querySelector("#word");
document.querySelector("#addWord").addEventListener("click", addWordButton);
document.querySelector("#undo").addEventListener("click", undoButton);
let addWord = 0;
let totalPoints = 0;
let wordPointsArray = [];

shuffleLetters()

boardButtons.forEach(button => {
    button.addEventListener("click", () => {
        boardLetterButton(button);
    });
});

/*
*********************************************
*                                           *
*            Functions                      *
*                                           *
*********************************************
- shuffleLetters
- boardLetterButton
- undoButton000
- addWordButton
- letterButtons
- timer
*/

// Geeft elke button een random letter als er teveel medeklinkers zijn worden er klinkers bijgevoegd
function shuffleLetters() {
    const letters = ["A", "A", "A", "B", "C", "D", "E", "E", "E", "E", "F", "G", "H", "I", "I", "I", "J", "K", "L", "M", "N", "O", "O", "O", "O", "P", "R", "S", "T", "T", "U", "U", "V", "W", "X", "Y", "Z"];
    const buttons = document.querySelectorAll('.letterButton');

    for (let i = 0; i < buttons.length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const letter = letters[randomIndex];
        buttons[i].textContent = letter;
        letters.splice(randomIndex, 1);
    }
}

function boardLetterButton(button) {
    const currentWord = wordDiv.textContent;
    const letter = button.textContent;
    button.disabled = true;
    wordDiv.textContent = currentWord + letter;
}

// Zet alle buttons terug aan, zet "woord" weer op NULL 
function undoButton() {
    const addWordButton = document.querySelector("#addWord");
    const pressedButtons = document.querySelectorAll('.letterButton');
    const wordDiv = document.querySelector("#word");

    // Enabled alle buttons dat de class "pressed" heeft
    pressedButtons.forEach(pressedButtons => {
        pressedButtons.disabled = false;
    });

    // Verwijderd de class "pressed" van alle buttons
    pressedButtons.forEach(pressedButtons => {
        pressedButtons.classList.remove('pressed');
    });
    addWord = 0;
    addWordButton.disabled = true;
    wordDiv.textContent = null;
}

// Stuurt een verzoek naar de API om te checken of het woord wel bestaat (momenteel alleen engels)
async function addWordButton() {
    let points;
    let word = wordDiv.textContent;
    const woordDiv = document.querySelector(`#woorden`)
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);

    if (data.title == "No Definitions Found") {
        resultaat.innerText = `${word}: word doesn't exist`;
        undoButton();
    } else {
        const existingWord = wordPointsArray.find(w => w.word === word);
        if (existingWord) {
            resultaat.innerText = `${word}: word is has already been used`;
            undoButton();
            return;
        }

        if (word.length == 3 || word.length == 4) {
            points = 1;
            resultaat.innerText = `${word}: is ${points} point`
        } else if (word.length == 5) {
            points = 2;
            resultaat.innerText = `${word}: is ${points} points`
        } else if (word.length == 6) {
            points = 3;
            resultaat.innerText = `${word}: is ${points} points`
        } else if (word.length == 7) {
            points = 5;
            resultaat.innerText = `${word}: is ${points} points`
        } else if (word.length >= 8) {
            points = 11;
            resultaat.innerText = `${word}: is ${points} points`
        }
        wordPointsArray.push({ word: word, points: points });
        totalPoints = wordPointsArray.reduce((acc, curr) => acc + curr.points, 0);
        let output = "";
        for (let i = 0; i < wordPointsArray.length; i++) {
            output += `Word ${i + 1}: ${wordPointsArray[i].word}, Points: ${wordPointsArray[i].points}\n`;
        }
        woordDiv.innerText = output;
        console.log(wordPointsArray);
        console.log(totalPoints);
        undoButton();
    }
}

letterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const square = parseInt(button.dataset.square);
        const isTopRow = square <= 4;
        const isBottomRow = square >= 13;
        const isLeftColumn = square % 4 === 1;
        const isRightColumn = square % 4 === 0;
        button.classList.add("pressed");
        addWord++;

        // Zolang "addWord" niet groter is dan 2 is de addWord button disabled
        if (addWord >= 3) {
            const addWord = document.querySelector("#addWord");
            addWord.disabled = false;
        }

        // Disabled alle andere buttons
        letterButtons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.disabled = true;
            }
        });

        // Enabled alle aanliggende buttons
        if (!isTopRow && !isLeftColumn) {
            const topLeftButton = document.querySelector(`[data-square="${square - 5}"]`);
            topLeftButton.disabled = false;
        }

        if (!isTopRow) {
            const topButton = document.querySelector(`[data-square="${square - 4}"]`);
            topButton.disabled = false;
        }

        if (!isTopRow && !isRightColumn) {
            const topRightButton = document.querySelector(`[data-square="${square - 3}"]`);
            topRightButton.disabled = false;
        }

        if (!isLeftColumn) {
            const leftButton = document.querySelector(`[data-square="${square - 1}"]`);
            leftButton.disabled = false;
        }

        if (!isRightColumn) {
            const rightButton = document.querySelector(`[data-square="${square + 1}"]`);
            rightButton.disabled = false;
        }

        if (!isBottomRow && !isLeftColumn) {
            const bottomLeftButton = document.querySelector(`[data-square="${square + 3}"]`);
            bottomLeftButton.disabled = false;
        }

        if (!isBottomRow) {
            const bottomButton = document.querySelector(`[data-square="${square + 4}"]`);
            bottomButton.disabled = false;
        }

        if (!isBottomRow && !isRightColumn) {
            const bottomRightButton = document.querySelector(`[data-square="${square + 5}"]`);
            bottomRightButton.disabled = false;
        }

        // Zorgt ervoor dat een button geen twee keer kan gedrukt worden
        const pressedButtons = document.querySelectorAll(".pressed");
        pressedButtons.forEach(button => {
            button.disabled = true;
        });
    });
});

// Timer van 3 minuten als de timer gedaan is worden alle buttons gedisabled
const duration = 180;
const timerEl = document.querySelector('#timer');
let timeLeft = duration;

// Zorgt dat de tekst elke seconde wordt geupdate
const countdownInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `Time ${minutes}:${seconds.toString().padStart(2, '0')}`;
    timerEl.innerText = formattedTime;

    // Checken of de timer nog niet 0 is
    if (timeLeft === 0) {
        clearInterval(countdownInterval);
        addButton.disabled = true;
        setTimeout(function () {
            letterButtons.forEach(button => {
                button.disabled = true;
            });
            timerEl.innerText = 'Time\'s up!';
            resultaat.innerText = `Your total score is: ${totalPoints}`;
        }, 500);
    }
}, 1000);
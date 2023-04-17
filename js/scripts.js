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
let wordPoints;

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
- undoButton
- addWordButton
- letterButtons
- timer
*/

// Geeft elke button een random letter als er teveel medeklinkers zijn worden er klinkers bijgevoegd
function shuffleLetters() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Qu", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const vowels = ["A", "E", "I", "O", "U"];

    let randomIndex, letter;
    let vowelCount = 0;
    let consonantCount = 0;

    // telt de klinkers en medeklinkers in de array
    letters.forEach(letter => {
        if (vowels.includes(letter)) {
            vowelCount++;
        } else {
            consonantCount++;
        }
    });

    // zolang de klinker teller minder dan 3 is worden er medeklinkers vervangen
    while (vowelCount < 3) {
        randomIndex = Math.floor(Math.random() * consonantCount);
        letter = letters.find(letter => !vowels.includes(letter));
        boardButtons[randomIndex].textContent = letter;
        letters[randomIndex] = letter;
        consonantCount--;
        vowelCount++;
    }

    // shuffled de letters
    boardButtons.forEach(button => {
        randomIndex = Math.floor(Math.random() * letters.length);
        letter = letters[randomIndex];
        button.textContent = letter;
        letters.splice(randomIndex, 1);
    });
}

function boardLetterButton(button) {
    const currentWord = wordDiv.textContent;
    const letter = button.textContent;
    const shuffle = document.querySelector("#shuffle")
    button.disabled = true;
    wordDiv.textContent = currentWord + letter;
}

// Zet alle buttons terug aan, zet "woord" weer op NULL 
function undoButton() {
    const addWordButton = document.querySelector("#addWord");
    const pressedButtons = document.querySelectorAll('.letterButton');
    const shuffle = document.querySelector(".shuffle");
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
    let word = wordDiv.textContent;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);

    if (data.title == "No Definitions Found") {
        resultaat.innerText = `${word}: woord bestaat niet`;
        undoButton();
    }
    else {
        if (word.length == 3 || word.length == 4) {
            resultaat.innerText = `${word}: is 1 punt`
        }
        else if (word.length == 5) {
            resultaat.innerText = `${word}: is 2 punten`
        }
        else if (word.length == 6) {
            resultaat.innerText = `${word}: is 3 punten`
        }
        else if (word.length == 7) {
            resultaat.innerText = `${word}: is 5 punten`
        }
        else if (word.length >= 8) {
            resultaat.innerText = `${word}: is 11 punten`
        }
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
        letterButtons.forEach(button => {
            button.disabled = true;
        });
        timerEl.innerText = 'Time\'s up!';
    }
}, 1000);
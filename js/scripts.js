// On load 
const addButton = document.querySelector('#addWord');
const letterButtons = document.querySelectorAll('.letterButton');
const wordDiv = document.querySelector("#word");
document.querySelector("#shuffle").addEventListener("click", shuffleLetters);
document.querySelector("#undo").addEventListener("click", undoButton);
let addWord = 0;
let wordPoints;

shuffleLetters()

const boardButtons = document.querySelectorAll("#board button");
boardButtons.forEach(button => {
    button.addEventListener("click", () => {
        buttonClick(button);
    });
});

// Functions

function shuffleLetters() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Qu", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const vowels = ["A", "E", "I", "O", "U"];
    const buttons = document.querySelectorAll("#board button");

    let vowelCount = 0;
    let consonantCount = 0;
    let randomIndex, letter;

    // count the number of vowels and consonants in the array
    letters.forEach(letter => {
        if (vowels.includes(letter)) {
            vowelCount++;
        } else {
            consonantCount++;
        }
    });

    // if there are not enough vowels, replace some consonants with vowels
    while (vowelCount < 3) {
        randomIndex = Math.floor(Math.random() * consonantCount);
        letter = letters.find(letter => !vowels.includes(letter));
        buttons[randomIndex].textContent = letter;
        letters[randomIndex] = letter;
        consonantCount--;
        vowelCount++;
    }

    // shuffle the remaining letters
    buttons.forEach(button => {
        randomIndex = Math.floor(Math.random() * letters.length);
        letter = letters[randomIndex];
        button.textContent = letter;
        letters.splice(randomIndex, 1);
    });
}



function buttonClick(button) {
    const letter = button.textContent;
    button.disabled = true;

    const currentWord = wordDiv.textContent;
    wordDiv.textContent = currentWord + letter;
    const shuffle = document.querySelector("#shuffle")
    shuffle.disabled = true;
}

function undoButton() {
    const buttons = document.querySelectorAll(".letterButton");
    buttons.forEach(button => {
        button.disabled = false;
    });
    const shuffle = document.querySelector(".shuffle");
    shuffle.disabled = false;
    const wordDiv = document.querySelector("#word");
    wordDiv.textContent = null;
    const pressedButtons = document.querySelectorAll('.letterButton.pressed');

    pressedButtons.forEach(button => {
        button.classList.remove('pressed');
        button.classList.add('letterButton');
    });
    addWord = 0;
    const addWordButton = document.querySelector("#addWord");
    addWordButton.disabled = true;

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
        console.log(addWord);

        if (addWord >= 3) {
            const addWord = document.querySelector("#addWord");
            addWord.disabled = false;
        }

        // Disable all other buttons
        letterButtons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.disabled = true;
            }
        });

        // Enable adjacent buttons
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
        const pressedButtons = document.querySelectorAll(".pressed");
        pressedButtons.forEach(button => {
            button.disabled = true;
        });
    });
});

//timer
const duration = 180;
const timerEl = document.querySelector('#timer');
let timeLeft = duration;

// Create an interval that updates the timer every second
const countdownInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    // Check if the timer has reached zero
    if (timeLeft === 0) {
        clearInterval(countdownInterval);
        letterButtons.forEach(button => {
            button.disabled = true;
        });
        timerEl.innerText = 'Time\'s up!';
    }
}, 1000);

addWordButton();
async function addWordButton() {
    let word;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.title);
    addButton.addEventListener(`click`, function () {
        word = wordDiv.textContent;
        if (data.title == "No Definitions Found") {
            resultaat.innerText = `${word}: woord bestaat niet`;
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
            undoButton()
        }
    });
}
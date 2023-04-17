// On load
document.querySelector("#shuffle").addEventListener("click", shuffleLetters);
document.querySelector("#undo").addEventListener("click", undoLetters);

shuffleLetters()

const boardButtons = document.querySelectorAll("#board button");
boardButtons.forEach(button => {
    button.addEventListener("click", () => {
        buttonClick(button);
    });
});

// Functions

function undoLetters() {
    enableButtons()
}

function shuffleLetters() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]; // create an array of letters to choose from
    const buttons = document.querySelectorAll("#board button"); // select all the buttons

    buttons.forEach(button => {
        const randomIndex = Math.floor(Math.random() * letters.length); // generate a random index based on the length of the letters array
        const letter = letters[randomIndex];
        button.textContent = letter;
    });
}

function buttonClick(button) {
    const letter = button.textContent;
    button.disabled = true;
    const wordDiv = document.querySelector("#word");
    const currentWord = wordDiv.textContent;
    wordDiv.textContent = currentWord + letter;
    const shuffle = document.querySelector("#shuffle")
    shuffle.disabled = true;
}

function enableButtons() {
    const buttons = document.querySelectorAll(".letterButton");
    buttons.forEach(button => {
        button.disabled = false;
    });
    const wordDiv = document.querySelector("#word");
    wordDiv.textContent = null;
}

const buttons = document.querySelectorAll('.letterButton');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const square = parseInt(button.dataset.square);
    const isTopRow = square <= 4;
    const isBottomRow = square >= 13;
    const isLeftColumn = square % 4 === 1;
    const isRightColumn = square % 4 === 0;
    
    // Disable all other buttons
    buttons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.disabled = true;
        }
      });
      
    // Check if the adjacent buttons can be clicked
    if (!isTopRow) {
      const topButton = document.querySelector(`[data-square="${square - 4}"]`);
      topButton.disabled = false;
    }
    
    if (!isBottomRow) {
      const bottomButton = document.querySelector(`[data-square="${square + 4}"]`);
      bottomButton.disabled = false;
    }
    
    if (!isLeftColumn) {
      const leftButton = document.querySelector(`[data-square="${square - 1}"]`);
      leftButton.disabled = false;
    }
    
    if (!isRightColumn) {
      const rightButton = document.querySelector(`[data-square="${square + 1}"]`);
      rightButton.disabled = false;
    }
  });
});
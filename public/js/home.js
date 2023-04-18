document.querySelector(".popupButton").addEventListener("click", showPopup);
document.querySelector(".startButton").addEventListener("click", startGame);
function startGame() {
  window.location.href = 'index.html';
}
function showPopup() {
  const message = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/popup.css">
        <title>Rules</title>
      </head>
      <body>
        <div class="popup-header">
          <h1>Rules</h1>
        </div>
        <ul>
          <li>A valid word must be composed by following a sequence of adjacent dice. Two dice are adjacent if they are horizontal, vertical, or diagonal neighbors.</li>
          <li>A valid word can use each dice at most once.</li>
          <li>A valid word must contain at least 3 letters.</li>
          <li>A valid word must be in the dictionary (which typically does not contain proper nouns)</li>
          <li>Scoring:
            <ul>
              <li>Word length: 3&dash;4 &#8594; pts: 1</li>
              <li>Word length: 5 &#8594; pts: 2</li>
              <li>Word length: 6 &#8594; pts: 3</li>
              <li>Word length: 7 &#8594; pts: 5</li>
              <li>Word length: 8&plus; &#8594; pts: 11</li>
            </ul>
          </li>
        </ul>
        <button class="close-btn" onclick="window.close()">Close</button>
      </body>
    </html>`;

  const popup = window.open("", "Rules", "width=400,height=550");
  popup.document.write(message);
}

/*
*********************************************
*                                           *
*            On webpage load                *
*                                           *
*********************************************
*/

let email = null;
let password = null;
const emailInput = document.querySelector('#email');
const loginButton = document.querySelector('#buttonlogin');
const passwordInput = document.querySelector('#password');
document.querySelector(".popupButton").addEventListener("click", showPopup);
document.querySelector(".popupButton2").addEventListener("click", showPopup2);
document.querySelector(".startButton").addEventListener("click", startGame);
emailInput.addEventListener('input', updateLoginButtonState);
passwordInput.addEventListener('input', updateLoginButtonState);

/*
*********************************************
*                                           *
*            Functions                      *
*                                           *
*********************************************
*/

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  email = emailInput.value;
  password = passwordInput.value;
  loginButtonClick();
  // perform login logic here
});

async function loginButtonClick() {
  const formdata = new FormData();
  formdata.append("identity", email);
  formdata.append("password", password);

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://lucas-miserez.be/api/collections/person/auth-with-password", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.record?.verified) {
        console.log("log-in correct");
        const loginDiv = document.querySelector("#login");
        loginDiv.classList.add("hidden");
        const startDiv = document.querySelector("#start")
        startDiv.classList.remove("hidden");
      }
      else {
        console.log("log-in incorrect")
        const loginError = document.querySelector("#loginError")
        loginError.innerText = "Wrong credentials";
      }

    })
    .catch(error => console.log('error', error));
}

function updateLoginButtonState() {
  if (emailInput.value && passwordInput.value) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function startGame() {
  window.location.href = 'game.html';
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

function showPopup2() {
  const message = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/popup.css">
    <title>about</title>
</head>

<body>
    <h1>Documentatie Boggle Groep 3</h1>
    <h2>How to use</h2>
    <p>Using our site and game are very simple. When you start it up you first come to the
        login page. Using your ODISEE E-mail address and password you can log in to access
        the game. On the home page you can view the rules under the start button. After this you press start, and your
        game
        begins. </p>
    <p>Our game obviously follows the same rules as the classic game Boggle. The player must link letters by clicking on
        them to form a word. Some conditions come into play here in order to have a valid word
        have: </p>
    <ul>
        <li>The word must be in the English dictionary according to our API</li>
        <li>The word must be at least 3 letters long</li>
        <li>Letters (the specific box) may only be used once per word</li>
        <li>Singular and plural of the same word are both valid</li>
        <li>The letters chosen must always be adjacent to the previous letter chosen (left, right, top, bottom
            and diagonally linked)</li>
        <li>All your words must be found within a 3 minute timer</li>
        <li class="red">Please note: If 2 or more players have the same word, this word is no longer unique and does
            not count (multiplayer only)</li>
    </ul>
    <p>To validate your word press the &#96;add word&#96; button. If you have made a mistake while choosing your
        word you can cancel it by pressing the &#96;undo&#96; button. </p>
    <p>So the goal is to find as many words as possible in the 4x4 grid within the 3 minutes. Once the 3 minutes
        past, no new words can be added.</p>
    <p>If all these conditions are met, your word is validated and then you get points. The distribution of points goes
        as follows: </p>
    <ul>
        <li>Word length: 3&dash;4 &#8594; pts: 1</li>
        <li>Word length: 5 &#8594; pts: 2</li>
        <li>Word length: 6 &#8594; pts: 3</li>
        <li>Word length: 7 &#8594; pts: 5</li>
        <li>Word length: 8&plus; &#8594; pts: 11</li>
    </ul>
    <p>After this, the players add up their points and the player with the most points wins. </p>
    <p>May the best one win!</p>
    <button class="close-btn" onclick="window.close()">Close</button>
</body>

</html>
`;

  const popup = window.open("", "About", "width=1200,height=870");
  popup.document.write(message);
}
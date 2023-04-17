function showPopup() {
    const message = "<ul>" + 
                    "<li>A valid word must be composed by following a sequence of adjacent dice—two dice are adjacent if they are horizontal, vertical, or diagonal neighbors.</li>" + 
                    "<li>A valid word can use each dice at most once.</li>" + 
                    "<li>A valid word must contain at least 3 letters.</li>" + 
                    "<li>A valid word must be in the dictionary (which typically does not contain proper nouns)</li>" + 
                    "<li>Scoring: " + 
                    "<ul>" + 
                    "<li>Word length: 3-4 → pts: 1</li>" + 
                    "<li>Word length: 5 → pts: 2</li>" + 
                    "<li>Word length: 6 → pts: 3</li>" + 
                    "<li>Word length: 7 → pts: 5</li>" + 
                    "<li>Word length: 8+ → pts: 11</li>" + 
                    "</ul>" + 
                    "</li>" + 
                    "</ul>";
    
    const popup = window.open("", "Rules", "width=400,height=300");
    popup.document.write(message);
  }
  
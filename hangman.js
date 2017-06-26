var secretWord = "durian";
var wordsGuessed = ["h", "b", "i", "n"];
var chars;
var life = 8;
var gameOver = false;
var secretWordLength = secretWord.length;
var input = document.querySelector("input");
var resultContainer = document.querySelector("#result-container");
var lifeDisplay = document.querySelector("#life");
var secretWordLengthDisplay = document.querySelector("#word-length");


document.addEventListener("DOMContentLoaded", function(){

    for (var i = 0; i < secretWordLength; i++){
        var newChar = document.createElement("div");
        newChar.classList.add("char");
        resultContainer.appendChild(newChar);

        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            newChar.textContent = secretWord[i];
        }
    }

    chars = document.querySelectorAll(".char");
    secretWordLengthDisplay.textContent = secretWordLength;

});

function showWordsGuessed(){
    for (var i = 0; i < secretWordLength; i++){
        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            chars[i].textContent = secretWord[i];
        }
    }
}

input.addEventListener("input", function(){

    if (life > 0){
        if(wordsGuessed.indexOf(this.value) !== -1){
            alert("hey, kamu sudah tebak huruf ini");
            this.value = "";
        } else if (secretWord.indexOf(this.value) === -1){
        
            life--;
            if(life == 0){
                gameOver = !gameOver;
                input.setAttribute("disabled", "");
            }
            alert("Ayo lebih keras berpikir lagi, kesempatan kamu berkurang");
            this.value = "";
            lifeDisplay.textContent = life;
            if(this.value){
                wordsGuessed.push(this.value);
            }
        } else {
            if(this.value){
                wordsGuessed.push(this.value);
                showWordsGuessed();
            }
            this.value = "";
        }
    } else {
        gameOver = !gameOver;
    }
});

var secretWord = "hangman";
var wordsGuessed = ["h", "b", "i", "n"];
var chars;
var secretWordLength = secretWord.length;
var input = document.querySelector("input");
var resultContainer = document.querySelector("#result-container");


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
});

function showWordsGuessed(){
    for (var i = 0; i < secretWordLength; i++){
        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            chars[i].textContent = secretWord[i];
        }
    }
}

input.addEventListener("input", function(){
    if(wordsGuessed.indexOf(this.value) !== -1){
        alert("hey, kamu sudah tebak huruf ini");
    } else {
        if(this.value){
            wordsGuessed.push(this.value);
            showWordsGuessed();
        }
        this.value = "";
    }
});

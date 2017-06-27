var bulanHijriah = ["muharrom", "shofar", "robiulawwal", "robiutstsani",
    "jumadilawal", "jumaditstsani", "rojab", "syaban", "romadhon", "syawwal", "dzulqodah", "dzulhijjah"]
var secretWord = pickSecretWord();
var wordsGuessed = [];
var chars;
var life = 8;
var gameOver = false;
var win;
var secretWordLength = secretWord.length;
var input = document.querySelector("input");
var resultContainer = document.querySelector("#result-container");
var wordsGuessedDisplay = document.querySelector("#word-guessed");
var lifeDisplay = document.querySelector("#life");
var secretWordLengthDisplay = document.querySelector("#word-length");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", reset);


document.addEventListener("DOMContentLoaded", function(){

    for (var i = 0; i < secretWordLength; i++){
        var newChar = document.createElement("span");
        newChar.classList.add("char");
        resultContainer.appendChild(newChar); 
        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            newChar.textContent = secretWord[i];
        } else {
            newChar.textContent = "_";
        }
    }

    chars = document.querySelectorAll(".char");
    showWordGuessed();

});

function showKotakKosong(){
    resultContainer.textContent = "";
    for (var i = 0; i < secretWord.length; i++){
        var newChar = document.createElement("span");
        newChar.classList.add("char");
        resultContainer.appendChild(newChar); 
        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            newChar.textContent = secretWord[i];
        } else {
            newChar.textContent = "_";
        }
    }
}

function pickSecretWord(){
    var index = Math.floor(Math.random() * bulanHijriah.length);
    return bulanHijriah[index];
}

function showWordGuessed(){
    wordsGuessedDisplay.textContent = "";

    for (var x=0; x < wordsGuessed.length; x++) {
        var newChar = document.createElement("div");
        newChar.classList.add('char');
        wordsGuessedDisplay.appendChild(newChar);
        newChar.textContent = wordsGuessed[x];
    }
}

function showCorrectWordsGuessed(){
    for (var i = 0; i < secretWordLength; i++){
        if (wordsGuessed.indexOf(secretWord[i]) !== -1){
            chars[i].textContent = secretWord[i];
        }
    }
}

input.addEventListener("input", function(){

    if (life > 0){
        if(wordsGuessed.indexOf(this.value) !== -1){
            messageDisplay.textContent = "Huruf " + this.value + " sudah kamu tebak";
            this.value = "";
        } else if (secretWord.indexOf(this.value) === -1){
            if(this.value){
                wordsGuessed.push(this.value);
                showWordGuessed();
            }
        
            life--;

            if(life == 0){
                gameOver = !gameOver;
                input.setAttribute("disabled", "");

                var x = document.createElement("span");
                x.classList.add("glyphicon");
                x.classList.add("glyphicon-remove");
                lifeDisplay.textContent = "";
                lifeDisplay.appendChild(x);
                lifeDisplay.classList.add("alert-danger");
            } else {
                lifeDisplay.textContent = life;
            }

            messageDisplay.textContent = "tebakan salah, coba lagi!";
            this.value = "";


        } else {
            if(this.value){
                wordsGuessed.push(this.value);
                showCorrectWordsGuessed();
                showWordGuessed();

                // check kalau sudah penuh semua
                checkWin();

                if(win){
                    this.setAttribute("disabled", "");
                    var x = document.createElement("span");
                    x.classList.add("glyphicon");
                    x.classList.add("glyphicon-ok");
                    lifeDisplay.textContent = "";
                    lifeDisplay.appendChild(x);
                    lifeDisplay.classList.add("alert-info");
                }
            }
            this.value = "";
        }
    } else {
        gameOver = !gameOver;
    }
});

function reset(){
    secretWord = pickSecretWord();

    showKotakKosong();


    chars = document.querySelectorAll("p#result-container span.char");
    for (var x=0; x < secretWord.length; x++) {
        chars[x].textContent = '_';
    }

    win = false;
    gameOver = false;
    life = 8;

    input.removeAttribute("disabled");
    lifeDisplay.textContent = life;
    wordsGuessed.splice(0, wordsGuessed.length);
    wordsGuessedDisplay.textContent = "";
    messageDisplay.textContent = "";
    lifeDisplay.classList.remove("alert-danger");


}

function checkWin() {
    win = true;

    for (var x = 0; x < secretWord.length; x++){
        win = win && wordsGuessed.indexOf(secretWord[x]) !== -1;
    }
}

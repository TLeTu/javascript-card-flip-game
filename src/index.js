const board = document.getElementById("game-board");
const resetBtn = document.getElementById("restart");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const highscoreText = document.getElementById("highscore");

const cardValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const emojiMap = {
    1: "🐶", 2: "🐱", 3: "🐭", 4: "🐹",
    5: "🐰", 6: "🦊", 7: "🐻", 8: "🐼"
};
let cardArray = [...cardValues];
let flippedCardArray = [];
let correctCard = [];
let isChecking = false;
let score = 0;
let seconds;
let timer;
let gameOverBool = false;

function setHighScore() {
    localStorage.setItem('highscore', score);
    highscoreText.innerHTML = localStorage.getItem('highscore');
}

function setScore(value) {
    score += value;
    scoreText.innerHTML = score;
}

function resetScore() {
    score = 100;
    scoreText.innerHTML = score;
}

function setUpTimer() {
    seconds = 100;
    clearInterval(timer);
    timer = setInterval(updateTimer, 100);
}

function updateTimer() {
    if(seconds <= 0) {
        gameOver();
        return;
    }
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerText.innerHTML = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


function cardCheck() {
    if (gameOver || isChecking || this.classList.contains("flipped")) {
        return;
    }

    if (flippedCardArray.length < 2 && !flippedCardArray.includes(this)) {
        this.classList.add("flipped");
        flippedCardArray.push(this);

        if (flippedCardArray.length === 2) {
            isChecking = true;
            const card1 = flippedCardArray[0];
            const card2 = flippedCardArray[1];

            if (card1.getAttribute("data") !== card2.getAttribute("data")) {
                setTimeout(() => {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                    flippedCardArray = [];
                    isChecking = false;
                }, 1000);
            } else {
                setScore(10);
                correctCard.push(card1, card2);
                flippedCardArray = [];
                isChecking = false;

                if (correctCard.length === cardArray.length) {
                    clearInterval(timer);
                }
            }
        }
    }
}

function setBoard() {
    gameOver = false;
    correctCard = [];
    flippedCardArray = [];
    isChecking = false;
    board.innerHTML = "";
    resetScore();
    setUpTimer();

    cardArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data", cardArray[i]);

        let cardFront = document.createElement("div");
        cardFront.classList.add("card-face", "card-front");
        cardFront.textContent = emojiMap[cardArray[i]]; // Use emoji for display

        let cardBack = document.createElement("div");
        cardBack.classList.add("card-face", "card-back");

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener("click", cardCheck);
        board.appendChild(card);
    }
}

function gameOver() {
    clearInterval(timer);
    gameOverBool = true;
    timerText.innerHTML = "00:00";
    if (score > localStorage.getItem('highscore')){ 
        setHighScore()
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if(localStorage.getItem('highscore')) {
        highscoreText.innerHTML = localStorage.getItem('highscore');
    }
});
resetBtn.addEventListener("click", setBoard);
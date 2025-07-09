const board = document.getElementById("game-board");
const resetBtn = document.getElementById("restart");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let cardArray = [...cardValues];
let flippedCardArray = [];
let correctCard = [];
let isChecking = false;
let score = 0;
let seconds;
let timer;
let gameOver = false;

function setScore(value) {
    score += value;
    scoreText.innerHTML = score;
}

function resetScore() {
    score = 0;
    scoreText.innerHTML = score;
}

function setUpTimer() {
    seconds = 100;
    clearInterval(timer);
    timer = setInterval(updateTimer, 100);
}

function updateTimer() {
    if(seconds == 0) {
        clearInterval(timer);
        gameOver = true;
        return;
    }
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerText.innerHTML = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
}


function cardCheck() {
    if (gameOver) {
        return;
    }
    if (isChecking || flippedCardArray.includes(this) || this.classList.contains("flipped")) {
        return;
    }

    if (flippedCardArray.length < 2) {
        this.classList.add("flipped");
        flippedCardArray.push(this);

        if (flippedCardArray.length === 2) {
            isChecking = true;
            if (flippedCardArray[0].getAttribute("data") !== flippedCardArray[1].getAttribute("data")) {
                setTimeout(() => {
                    flippedCardArray[0].classList.remove("flipped");
                    flippedCardArray[1].classList.remove("flipped");
                    flippedCardArray = [];
                    isChecking = false;
                }, 1000);
            } else {
                setScore(10);
                correctCard.push(flippedCardArray[0]);
                correctCard.push(flippedCardArray[1]);
                if (correctCard.length == cardArray.length) {
                    setTimeout(() => {
                        setBoard()
                    }, 500);
                }
                flippedCardArray = [];
                isChecking = false;
            }
        }
    }
}

function setBoard() {
    gameOver = false;
    correctCard = []
    board.innerHTML = "";
    setUpTimer();
    resetScore();
    for (let i = cardArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }

    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data", cardArray[i]);
        card.appendChild(document.createTextNode(cardArray[i]));
        card.addEventListener("click", cardCheck);
        board.appendChild(card);
    }
}

// document.addEventListener("DOMContentLoaded", setBoard);
resetBtn.addEventListener("click", setBoard);
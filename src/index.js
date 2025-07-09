const board = document.getElementById("game-board");
const resetBtn = document.getElementById("restart");

const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let cardArray = [...cardValues];
let flippedCardArray = [];
let isChecking = false;

function cardCheck() {
    // Prevent clicking if already checking or card is already flipped
    if (isChecking || flippedCardArray.includes(this) || this.classList.contains("flipped")) {
        return;
    }

    if (flippedCardArray.length < 2) {
        this.classList.add("flipped");
        flippedCardArray.push(this);

        if (flippedCardArray.length === 2) {
            isChecking = true; // Lock further clicks
            if (flippedCardArray[0].getAttribute("data") !== flippedCardArray[1].getAttribute("data")) {
                // Non-matching cards: delay flip-back to allow animation
                setTimeout(() => {
                    flippedCardArray[0].classList.remove("flipped");
                    flippedCardArray[1].classList.remove("flipped");
                    flippedCardArray = [];
                    isChecking = false; // Unlock clicks
                }, 1000); // Adjust delay (1000ms = 1s) to match your CSS animation duration
            } else {
                // Matching cards: keep flipped and reset array
                flippedCardArray = [];
                isChecking = false; // Unlock clicks
            }
        }
    }
}

function start() {
    board.innerHTML = "";
    for (let i = cardArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }

    // Create card elements
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data", cardArray[i]);
        card.appendChild(document.createTextNode(cardArray[i]));
        card.addEventListener("click", cardCheck);
        board.appendChild(card);
    }
}

document.addEventListener("DOMContentLoaded", start);
resetBtn.addEventListener("click", start);
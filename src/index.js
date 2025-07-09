const board = document.getElementById("game-board")
const resetBtn = document.getElementById("restart")
const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]


function start() {
    board.innerHTML = "";
    var cardArray = cardValues;
    var flippedCardArray= [];

    for(var i = cardValues.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }

    for (var i = 0; i < cardArray.length; i++) {
        var card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data", cardArray[i]);
        card.addEventListener("click", function () {
            if (flippedCardArray.length < 2) {
                this.classList.add("flipped");
                flippedCardArray.push(this);
                if (flippedCardArray.length == 2) {
                    if (flippedCardArray[0].getAttribute("data") != flippedCardArray[1].getAttribute("data")) {
                        flippedCardArray[0].classList.remove("flipped");
                        flippedCardArray[1].classList.remove("flipped");
                        flippedCardArray= [];
                    }
                }
            }
        });
        board.appendChild(card);
    }
}

document.addEventListener("DOMContentLoaded", start);

resetBtn.addEventListener("click", start);
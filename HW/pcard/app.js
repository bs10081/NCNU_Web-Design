var cardArr = [];
var isSelected = [];
var cardPool;

window.onload = function () {
    for (let i = 0; i < 5; i++) {
        cardArr[i] = document.getElementById(i);
        cardArr[i].addEventListener("click", cardShow);
    }
    cardPool = document.getElementById("cardPool");
    start();

    document.getElementById("btnFlipAll").addEventListener("click", function () {
        var allFlipped = cardArr.every(card => card.src.includes('forward')); // Check if all cards are flipped
        cardArr.forEach((card, i) => {
            setTimeout(function () {
                if (allFlipped) {
                    cardHide.call(card); // If all cards are flipped, flip them back
                } else {
                    cardShow.call(card); // Otherwise, flip them to the front
                }
            }, i * 500); // delay = index * 500ms
        });
    }); // end of btnFlipAll
}

function start() {
    cardPool.style.display = "block";
    isSelected.fill(false);
    cardArr.forEach((card, i) => {
        card.src = "image/back/blue_back.png";
        card.style.height = "100px";
        card.addEventListener("click", cardShow);
        card.classList.add('dealing'); // add dealing class for animation
        setTimeout(() => { // remove dealing class after animation
            card.classList.remove('dealing');
        }, 500);
        var num;
        do {
            num = myRandom(1, 52);
        } while (isSelected[num])
        isSelected[num] = true;
        // Create a data attribute to hold the card value
        card.dataset.cardValue = num2Card(num);
    });
}


function stop() {
    cardPool.style.display = "none";
}

function cardShow() {
    this.removeEventListener("click", cardShow);
    this.classList.add('flip'); // Add 'flip' class to trigger flip animation
    setTimeout(() => {
        this.src = `image/forward/${this.dataset.cardValue}.png`; // Change the image after the card has flipped
    }, 250);
    this.addEventListener("click", cardHide);
    setTimeout(() => {
        this.classList.remove('flip');
    }, 500);
}

function cardHide() {
    this.removeEventListener("click", cardHide);
    this.classList.add('flip');
    setTimeout(() => {
        this.src = "image/back/blue_back.png";
    }, 250);
    this.addEventListener("click", cardShow);
    setTimeout(() => {
        this.classList.remove('flip');
    }, 500);
}
s


function myRandom(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

function num2Card(num) {
    var suit;
    var rank;
    var doc_name;

    if (num >= 1 && num <= 13) {
        suit = "S";
        rank = rankCalculation(num);
    } else if (num >= 14 && num <= 26) {
        suit = "H";
        rank = rankCalculation(num - 13);
    } else if (num >= 27 && num <= 39) {
        suit = "D";
        rank = rankCalculation(num - 26);
    } else if (num >= 40 && num <= 52) {
        suit = "C";
        rank = rankCalculation(num - 39);
    } else {
        return "";
    }

    doc_name = rank + suit;
    return doc_name;
}

function rankCalculation(num) {
    return (num === 1) ? "A" : (num === 11) ? "J" : (num === 12) ? "Q" : (num === 13) ? "K" : num;
}




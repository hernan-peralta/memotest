const $newGame = document.querySelector("#new-game");
const cards = Array.from(document.querySelectorAll('.card'));
const $container = document.querySelector(".container");
const animals = ['colibri', 'dolphin', 'elephant', 'giraffe', 'lion', 'mantis', 'polar_bear', 'rhinoceros'];
const possibleChoices = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
let randomArray = [];
let timer = 0;
let cardsFlipped = 0;
let firstFlippedCard = undefined;
let tries = 0;
let rightGuesses = 0;
let clock = undefined;


function flipCard(card){
    card.firstElementChild.setAttribute("src", "images/" + animals[randomArray[card.id]] + ".jpg");
}


function unflipCard(card){
    card.firstElementChild.setAttribute("src", "images/space.jpg");
}


function shuffle(array){
    array.forEach(item => randomArray.splice(Math.floor(Math.random()*array.length), 0, item));
    return randomArray;
}


function chrono(){
    timer++;
    document.querySelector("#chrono").innerText = timer;
}


function lock(){
    $container.classList.add("locked");
}


function unlock(){
    $container.classList.remove("locked");
}


function startTimer(){
    clock = setInterval(chrono, 1000);
}


function stopTimer(){
    clearInterval(clock);
}


function newGame(){
    stopTimer();
    unlock();
    cards.forEach(card => unflipCard(card));
    document.querySelectorAll(".card").forEach(card => card.classList.remove("hidden"));
    document.querySelector("#victory").classList.add("hidden");
    randomArray = [];
    randomArray = shuffle(possibleChoices);
    timer = 0;
    tries = 0;
    rightGuesses = 0;
    document.querySelector("#tries").innerText = tries;
    startTimer();
}


function game(card){

    flipCard(card);

    if (cardsFlipped === 1){
        lock();

        if (randomArray[card.id] === randomArray[firstFlippedCard.id]){
            firstFlippedCard.classList.remove("locked");

            setTimeout(() => {
            card.classList.add("hidden"), firstFlippedCard.classList.add("hidden")}, 1000);
 
            setTimeout(()=>{
                firstFlippedCard = undefined, unlock()}, 1010);

            cardsFlipped = 0;
            rightGuesses ++;

            if (rightGuesses === possibleChoices.length/2){
                document.querySelector("#victory").classList.remove("hidden");
                stopTimer();
                let audio = new Audio('sounds/applause.wav');
                audio.play();
                lock();
            }
            return;
        }

        if (card != firstFlippedCard){
            setTimeout(function(){
                unflipCard(card), unflipCard(firstFlippedCard)}, 1000);

            setTimeout(() => {
                firstFlippedCard = undefined, unlock()}, 1010);

            cardsFlipped = 0;
            tries++;
            firstFlippedCard.classList.remove("locked");
            document.querySelector("#tries").innerText = tries;
            return;
        }
    }

    cardsFlipped++;
    firstFlippedCard = card;
    firstFlippedCard.classList.add("locked");
}
    
cards.forEach(card => card.addEventListener("click", function(){game(card)}));

$newGame.onclick = newGame;

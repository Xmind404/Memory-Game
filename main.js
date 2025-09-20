const cardsColorTemplate = [
    'red', 'red',
    'green', 'green',
    'blue', 'blue',
    'yellow', 'yellow',
    'purple', 'purple',
    'orange', 'orange',
    'pink', 'pink',
    'cyan', 'cyan',
    'gray', 'gray'
];

let message = document.querySelector('.message');
let cards = [...document.querySelectorAll('.tile')];
let startTime;
let activeCard = '';
const activeCards = [];
let gamePairs = cards.length / 2;
let gameResult = 0;
let mistakes = 0;

const clickCard = function() {
    activeCard = this;
    if(activeCard === activeCards[0] || activeCard.classList.contains('matched')) return;
    activeCard.classList.remove('hidden');

    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
    } else {
        cards.forEach(card => card.removeEventListener('click', clickCard));
        activeCards[1] = activeCard;

        setTimeout(() => {
            if(activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add('matched'));
                gameResult++;
                if(gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = ((endTime - startTime) / 1000).toFixed(1);
                    message.textContent = `Your time is: ${gameTime} seconds.\nMistakes: ${mistakes}.\nClick to play again.`;
                    message.style.visibility = 'visible';
                    cards.forEach(card => card.removeEventListener('click', clickCard));
                    message.addEventListener('click', init, { once: true });
                    return;
                }
            } else {
                activeCards.forEach(card => card.classList.add('hidden'));
                mistakes++;
            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard));
        }, 700);
    }
};

const init = function() {
    message.style.visibility = 'hidden';
    gameResult = 0;
    mistakes = 0;
    activeCard = '';
    activeCards.length = 0;
    cards.forEach(card => {
        card.className = 'tile hidden';
    });

    let cardsColor = [...cardsColorTemplate];
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    });

    cards.forEach(card => card.classList.remove('hidden'));
    setTimeout(() => {
        cards.forEach(card => card.classList.add('hidden'));
        startTime = new Date().getTime();
        cards.forEach(card => card.addEventListener('click', clickCard));
    }, 2000);
};

init();

// Author: Franciszek Karbowniczek (aka Xmind404)

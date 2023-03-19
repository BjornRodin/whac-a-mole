// Getting the constants so we can work on them in the script

const boxes = document.querySelectorAll('.box');
const mole = document.querySelector('.mole');
const hits = document.querySelector('#hit');
const misses = document.querySelector('#miss');
const timeLeft = document.querySelector('#time');
const playButton = document.querySelector('#play');
const howToPlayButton = document.querySelector('#how-to-play');
const howToPopup = document.querySelector('#how-to-popup');
const popupClose = document.querySelector('#popup-close');

// Eventlisteners

playButton.addEventListener('click', playGame);

howToPlayButton.addEventListener('click', () => {
    howToPopup.style.display = 'flex';
});

popupClose.addEventListener('click', () => {
    howToPopup.style.display = 'none';
})

// Defining variables in the script

let result = 0;
let miss = 0;
let hitMole;
let gameTime = 60;
let timerId;

/**
 * playGame function to only start the game when the 'play' button is clicked
 * variables updated for the game
 * to clear eventual existing timers the function clearInterval is also called
 */

function playGame() {

    let gameRunning = true;

    result = 0;
    miss = 0;
    hitMole = null;
    gameTime = 60;
    hits.textContent = '0';
    misses.textContent = '0';
    timeLeft.textContent = gameTime;

    clearInterval(timerId);

    /**
     * First we remove any 'mole' in the grid,
     * then adding it in by choosing a random box to put the mole in,
     * then checking if we hit the random box the mole appear in
     * eventlistener to check for mouseclicks on existing mole and adding to hits
     * gameTime make the game only run as long as there is still time left
     */

    function randomBox() {
        if (gameTime <= 0) {
            gameRunning = false;
            return;
        }
        boxes.forEach(box => {
            box.classList.remove('mole');
        });

        let randomMole = boxes[Math.floor(Math.random() * 9)];
        randomMole.classList.add('mole');
        hitMole = randomMole.id;

        setTimeout(() => {
            if (gameTime <= 0) {
                gameRunning = false;
                return;
            }
        }, 2000);
    }

    // Display time left to play

    let timer = setInterval(() => {
        gameTime--;
        timeLeft.textContent = gameTime;
        if (gameTime <= 0) {
            clearInterval(timer);
            gameRunning = false;
        }
    }, 1000);

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!gameRunning) {
                return;
            }
            if (box.id == hitMole) {
                result++;
                hits.textContent = result;
                hitMole = null;
            } else {
                miss++;
                misses.textContent = miss;
                hitMole = null;
            }
        });
    });

    // Function to move the mole around automatically

    function moveMole() {
        let timerId = null;
        timerId = setInterval(randomBox, 2000);
    }
    moveMole();
}
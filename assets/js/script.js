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

playButton.addEventListener('click', playGame); // Start game when play button is clicked

howToPlayButton.addEventListener('click', () => { // When how to play button is clicked a popup with rules is shown
    howToPopup.style.display = 'flex';
});

popupClose.addEventListener('click', () => { // To close the popup window for the rules
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

        let randomAppear = Math.floor(Math.random() * 500) + 500;
        setTimeout(() => {
            if (gameTime <= 0) {
                gameRunning = false;
                return;
            }
        }, randomAppear);
    }

    // Display time left to play when the game is started

    function updateTimeLeft() {
        let timer = setInterval(() => {
            gameTime--;
            timeLeft.textContent = gameTime;
            if (gameTime <= 0) {
                clearInterval(timer);
                gameRunning = false;
                gameOver();
            }
        }, 1000);
    }
    updateTimeLeft();

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

    // Function to move the mole around automatically and clearing the timerId each time the play button is clicked

    function moveMole() {
        let randomAppear = Math.floor(Math.random() * 500) + 500;
        clearInterval(timerId);
        timerId = setInterval(randomBox, randomAppear);
    }
    moveMole();
}

function gameOver() {
    // Creating the scorePopup window
    const scorePopup = document.createElement('div');
    scorePopup.classList.add('score-popup');
    scorePopup.classList.add('score-content');
    scorePopup.innerHTML = `
            <h2>Game Over!</h2>
            <p>You hit <span><strong class="green">${result}</strong> moles!</span></p>
            <p>You missed <span><strong class="red">${miss}</strong> times.</span></p>
            <p>Would you like to play again?</p>
            <div>
            <button id="play-again">Play Again!</button>
            <button id="close-score">Close</button>
            </div>
            `;
    document.body.appendChild(scorePopup);

    // Creating the overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        document.body.removeChild(scorePopup);
        document.body.removeChild(overlay);
        playGame();
    });

    const closeScoreButton = document.querySelector('#close-score');
    closeScoreButton.addEventListener('click', () => {
        document.body.removeChild(scorePopup);
        document.body.removeChild(overlay);
    })
}
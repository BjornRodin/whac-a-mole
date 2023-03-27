/**
 * Getting the constants so we can work on them in the script
 */

const boxes = document.querySelectorAll('.box');
const hits = document.querySelector('#hit');
const misses = document.querySelector('#miss');
const timeLeft = document.querySelector('#time');
const playButton = document.querySelector('#play');
const howToPlayButton = document.querySelector('#how-to-play');
const howToPopup = document.querySelector('#how-to-popup');
const popupClose = document.querySelector('#popup-close');
const difficultyLevel = document.querySelector('#difficulty');

/**
 * Defining variables in the script
 */

let result = 0;
let miss = 0;
let hitMole;
let gameTime = 60;
let timerId;
let gameRunning = false;
let timer;
let randomAppear;
let randomAppearMin;
let randomAppearMax;
let difficulty = 'easy';

/**
 * Eventlisteners for:
 * Changing difficulty level
 * Start game when play button is clicked
 * When how to play button is clicked a popup with rules is shown
 * To close the popup window for the rules
 */

difficultyLevel.addEventListener('change', () => {
    difficulty = difficultyLevel.value;
});
playButton.addEventListener('click', playGame);
howToPlayButton.addEventListener('click', () => {
    howToPopup.style.display = 'flex';
});
popupClose.addEventListener('click', () => {
    howToPopup.style.display = 'none';
});

/**
 * playGame function to only start the game when the 'play' button is clicked
 * variables updated for the game
 * to clear eventual existing timers the function clearInterval is also called
 * different functions called only when the playGame function is called
 */

function playGame() {
    clearInterval(timerId);
    clearInterval(timer);
    gameRunning = true;
    result = 0;
    miss = 0;
    hitMole = null;
    selectDifficulty();
    hits.textContent = '0';
    misses.textContent = '0';
    timeLeft.textContent = gameTime;
    updateTimeLeft();
    boxes.forEach(box => {
        box.removeEventListener('click', clickHandler);
    });
    calculateScore();
    randomAppear = Math.floor(Math.random() * (randomAppearMax - randomAppearMin)) + randomAppearMin;
    moveMole();
}

/**
 * Defines how the game is affected depending on what difficulty the player choose.
 */

function selectDifficulty() {
    if (difficulty === 'easy') {
        gameTime = 60;
        randomAppearMin = 500;
        randomAppearMax = 1000;
    } else if (difficulty === 'medium') {
        gameTime = 60;
        randomAppearMin = 300;
        randomAppearMax = 600;
    } else if (difficulty === 'hard') {
        gameTime = 60;
        randomAppearMin = 200;
        randomAppearMax = 400;
    }
}

/**
 * Checks if game is running, if not, then it wont perform the code.
 * First we remove the classes 'mole' and 'hit' to remove existing moles.
 * then adding it in by choosing a random box to put the mole in,
 * then defining 'hitMole'
 * calculating a random time for mole to appear
 * gameTime make the game only run as long as there is still time left
 */

function randomBox() {
    if (gameTime <= 0) {
        gameRunning = false;
        return;
    }
    boxes.forEach(box => {
        box.classList.remove('mole');
        box.classList.remove('hit');
    });

    let randomMole = boxes[Math.floor(Math.random() * 9)];
    randomMole.classList.add('mole');
    hitMole = randomMole.id;
    randomAppear = Math.floor(Math.random() * (randomAppearMax - randomAppearMin)) + randomAppearMin;
    setTimeout(() => {
        if (gameTime <= 0) {
            gameRunning = false;
            return;
        }
    }, randomAppear);
}


/**
 * Display time left to play when the game is started
 */

function updateTimeLeft() {
    clearInterval(timer);
    timer = setInterval(() => {
        gameTime--;
        timeLeft.textContent = gameTime;
        if (gameTime <= 0) {
            clearInterval(timer);
            gameRunning = false;
            gameOver();
        }
    }, 1000);
}

/**
 * Calculating score by checking for 'click' and what to do with it in 'clickHandler' function
 */

function calculateScore() {
    boxes.forEach(box => {
        box.addEventListener('click', clickHandler);
    });
}

function clickHandler() {
    if (!gameRunning) {
        return;
    }
    if (this.id == hitMole) {
        result++;
        hits.textContent = result;
        hitMole = null;
        this.classList.add('hit'); // Adding a functionality so it is visible that you hit the mole
    } else {
        miss++;
        misses.textContent = miss;
        hitMole = null;
    }
}

/**
 * Function to move the mole around automatically and clearing the timerId each time
 */

function moveMole() {
    clearInterval(timerId);
    timerId = setInterval(randomBox, randomAppear);
}

/**
 * Creating a popup-window when game is finished with feedback, score and possibility to play again or close the window
 * Also an overlay so the player cant accidentaly press a button behind popup
 */

function gameOver() {
    const scorePopup = document.createElement('div');
    scorePopup.classList.add('score-popup');
    scorePopup.classList.add('score-content');
    let message = '';
    if (result >= 65) {
        message = 'Whacking god!';
    } else if (result >= 45) {
        message = 'You did a great job, keep it up!';
    } else if (result >= 30) {
        message = 'You did a good job!';
    } else if (result >= 20) {
        message = 'Focus up, the moles are getting away!';
    } else {
        message = 'Are you a friend of the moles? Try again!';
    }
    scorePopup.innerHTML = `
            <h2>Game Over!</h2>
            <p>${message}</p>
            <p>You hit <span><strong class="green">${result}</strong> moles!</span></p>
            <p>You missed <span><strong class="red">${miss}</strong> times.</span></p>
            <p>Would you like to play again?</p>
            <div>
            <button id="play-again">Play Again!</button>
            <button id="close-score">Close</button>
            </div>
            `;
    document.body.appendChild(scorePopup);
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    const playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
        document.body.removeChild(scorePopup);
        document.body.removeChild(overlay);
        playGame(selectDifficulty);
    });
    const closeScoreButton = document.querySelector('#close-score');
    closeScoreButton.addEventListener('click', () => {
        document.body.removeChild(scorePopup);
        document.body.removeChild(overlay);
    });
}
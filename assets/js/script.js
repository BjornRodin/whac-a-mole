// Getting the constants so we can work on them in the script

const boxes = document.querySelectorAll('.box');
const mole = document.querySelector('.mole');
const hits = document.querySelector('#hit');
const misses = document.querySelector('#miss');
const timeLeft = document.querySelector('#time');

/**
 * Telling Javascript we start at 0 hits
 * defining hitmole element
 */

let result = 0
let miss = 0
let hitMole

/**
 * First we remove any 'mole' in the grid,
 * then adding it in by choosing a random box to put the mole in,
 * then checking if we hit the random box the mole appear in
 * eventlistener to check for mouseclicks on existing mole and adding to hits
 */

function randomBox() {
    boxes.forEach(box => {
        box.classList.remove('mole')
    })

    let randomMole = boxes[Math.floor(Math.random() * 9)]
    randomMole.classList.add('mole')

    hitMole = randomMole.id
}

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.id == hitMole) {
            result++;
            hits.textContent = result;
            hitMole = null;
        } else {
            miss++;
            misses.textContent = miss;
        }
    })
})

// Function to move the mole around automatically

function moveMole() {
    let timerId = null
    timerId = setInterval(randomBox, 2000)
}
moveMole()

// CheckIfHit

function checkIfHit() {

}

// IncrementIfHit

function incrementIfHit() {

}

// IncrementIfMiss

function incrementIfMiss() {

}
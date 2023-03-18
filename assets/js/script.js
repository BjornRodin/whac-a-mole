// Getting the constants so we can work on them in the script

const boxes = document.querySelectorAll('.box');
const mole = document.querySelector('.mole');
const hits = document.querySelector('#hit');
const misses = document.querySelector('#miss');
const timeLeft = document.querySelector('#time');

// Telling javascript that we start at 0 hits
let result = 0

/**
 * First we remove any 'mole' in the grid,
 * then adding it in by choosing a random box to put the mole in
 */

function randomBox() {
    boxes.forEach(box => {
        box.classList.remove('mole')
    })

    let randomMole = boxes[Math.floor(Math.random() * 9)]
    console.log(randomMole)
}

randomBox()


// CheckIfHit

function checkIfHit() {

}

// IncrementIfHit

function incrementIfHit() {

}

// IncrementIfMiss

function incrementIfMiss() {

}
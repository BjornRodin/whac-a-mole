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
let hitMole
/**
 * First we remove any 'mole' in the grid,
 * then adding it in by choosing a random box to put the mole in,
 * then checking if we hit the random box the mole appear in
 */

function randomBox() {
    boxes.forEach(box => {
        box.classList.remove('mole')
    })

    let randomMole = boxes[Math.floor(Math.random() * 9)]
    randomMole.classList.add('mole')

    hitMole = randomBox.id
}

boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
        if (box.id == hitMole) {
            result++
            hits.textContent = result
            hitMole = null
        }
    })
})

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
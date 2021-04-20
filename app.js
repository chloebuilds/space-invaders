const elements = {
  insertCoin: document.querySelector('#insert-coin'),
  playBtn: document.querySelector('#play-btn'),
  audioPlayer: document.querySelector('audio'),
  scoreDisplay: document.querySelector('#score-display'),
  livesDisplay: document.querySelector('#lives-display'),
  coinDisplay: document.querySelector('#coin-display'),
}

const starfield = document.querySelector('.starfield')
const width = 10
const cells = []

// GLOBAL VARIABLES
let groguIndex = 94
let tieFighter = 0
let theForceIndex = 0
let darkSideIndex = 12
let intervalId = 0
let lives = 0
let direction = 1
const interval = 800
// TIE FIGHTER MOVEMENTS
const numberOfTieFightersPerRow = 8
let tieFightersIndices = [10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27] //0, 1, 2, 3, 4, 5, 6, 7,

// ADDING THE STARFIELD
for (let cellIndex = 0; cellIndex < width ** 2; cellIndex++) {
  const div = document.createElement('div')
  starfield.appendChild(div)
  cells.push(div)
  div.innerHTML = cellIndex
  // div.style.width = `${100 / width}%`
  // div.style.height = `${100 / width}%`

  // GROGU POSITION
  if (cellIndex === 94) {
    cells[groguIndex].classList.add('grogu')
  }
}
// GROGU MOVEMENTS
document.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowLeft' && groguIndex !== 90) {
    cells[groguIndex].classList.remove('grogu')
    groguIndex -= 1
    cells[groguIndex].classList.add('grogu')
  } else if (key === 'ArrowRight' && groguIndex !== width ** 2 - 1) {
    cells[groguIndex].classList.remove('grogu')
    groguIndex += 1
    cells[groguIndex].classList.add('grogu')
  }
  // SHOOTING
  else if (key === ' ') {
    event.preventDefault()
    let theForceIndex = groguIndex - width
    cells[theForceIndex].classList.add('the-force')
    // ? Interval movement of the-force
    const intervalForce = setInterval(() => {
      if (theForceIndex < width) {
        cells[theForceIndex].classList.remove('the-force')
        clearInterval(intervalForce)
        return
      }
      cells[theForceIndex].classList.remove('the-force')
      theForceIndex = theForceIndex - width
      cells[theForceIndex].classList.add('the-force')
    }, 300)
    console.log('🔫 pew pew pew!!!')
    // elements.audioPlayer.src = "./sounds/grogu-pow.wav";
    // elements.audioPlayer.play();
  }
})

// BUTTON FUNCTIONS
elements.playBtn.addEventListener('click', () => {
  if (intervalId !== 0) {
    return
  }
  elements.coinDisplay.innerHTML = ' '
  // elements.audioPlayer.src = './sounds/lightsaber-turn-on.wav' // ! change
  // elements.audioPlayer.play()

  // ? adding the tie-fighter class to each index of tie-fighter array
  tieFightersIndices.forEach((tieFighterIndex) => {
    cells[tieFighterIndex].classList.add('tie-fighter')
  })

  // TIE FIGHTER MOVEMENT
  
  // let tieFightersIndices = [10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27] //0, 1, 2, 3, 4, 5, 6, 7,
  // index in the array:       0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15

  intervalId = setInterval(() => {
    const leftWall = tieFightersIndices[0] % width === 0
    const rightWall = tieFightersIndices[tieFightersIndices.length - 1] % width === width - 1

    tieFightersIndices.forEach((tieFighterIndex, i) => {
      if (rightWall && direction === 1) {
        // Move all of them down if they hit the right wall
        if (i < numberOfTieFightersPerRow) {
          cells[tieFighterIndex].classList.remove('tie-fighter')
        }
        tieFightersIndices[i] = tieFighterIndex + width
        tieFighterIndex = tieFighterIndex + width
        cells[tieFighterIndex].classList.add('tie-fighter')
        if (i === tieFightersIndices.length - 1) {
          direction = -1
        }
        return
      }
      if (leftWall && direction === - 1) {
        // Move them all down if they hit the left wall
        if (i > numberOfTieFightersPerRow) {
          cells[tieFighterIndex].classList.remove('tie-fighter')
        }
        direction = 1
      }
      // Moving left to right
      if (direction === 1) {
        if (i % numberOfTieFightersPerRow === 0) {
          cells[tieFighterIndex].classList.remove('tie-fighter')
        }
        tieFightersIndices[i] = tieFighterIndex + 1
        tieFighterIndex = tieFighterIndex + 1
        cells[tieFighterIndex].classList.add('tie-fighter')
      }
      // Moving right to left
      if (direction === -1) {
        if (i % numberOfTieFightersPerRow === numberOfTieFightersPerRow - 1) {
          cells[tieFighterIndex].classList.remove('tie-fighter')
        }
        tieFightersIndices[i] = tieFighterIndex - 1
        tieFighterIndex = tieFighterIndex - 1
        cells[tieFighterIndex].classList.add('tie-fighter')
      }
    })
  }, interval)
})

// ? Interval movement of dark-side laser
const intervalDark = setInterval(() => {
  // console.log('hello')

  //clearInterval(intervalDark);

  cells[darkSideIndex].classList.remove('dark-side')
  darkSideIndex = darkSideIndex + width
  cells[darkSideIndex].classList.add('dark-side')
  if (darkSideIndex > 90) {
    console.log('button')
    cells[darkSideIndex].classList.remove('dark-side')
    clearInterval(intervalDark)
  }
  //elements.audioPlayer.src = "./sounds/tie-laser.mp3";
  //elements.audioPlayer.play();
}, 800)

// INSERT COIN BUTTON
elements.insertCoin.addEventListener('click', () => {
  if (lives === 3) {
    elements.audioPlayer.src = './sounds/not-today.wav'
    elements.audioPlayer.play()
    elements.coinDisplay.innerHTML = "You've already inserted a coin. <br> Press Play."
    return
  }
  elements.audioPlayer.src = './sounds/penny-drop2.wav'
  elements.audioPlayer.play()
  lives = 3
  livesDisplay()
  //const livesAdded = setTimeout(, 20)
  //livesAdded =
  elements.coinDisplay.innerHTML = '3 lives loaded. <br> May the force be with you!'
  // ! want the message to timeout OR I just want it to clear on press of play button
  return
})

// ? GAME FUNCTIONS
// function tieFighterAttack() {
// }
// tieFighterAttack()

// ? LIVES DISPLAY
// to populate dom with heart images, make function that loops as many times as there are lives and add img to dom for each life
function livesDisplay() {
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('img')
    heart.src = './images/pixel-heart.png'
    heart.classList.add('heart')
    elements.livesDisplay.appendChild(heart)
  }
}

function fireTieLaser() {
  return tieFightersIndices[Math.floor(Math.random() * tieFightersIndices.length)]
}
console.log(fireTieLaser())

//COLLISION DETECTION

//function collisionDetection() {}

// if ((leftWall && direction === -1) || (rightWall && direction === 1)) {

//   // ? Needs to move down one row and reverse direction
//   // ? Removes the alien from current position
//   for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//     //cells[tieFightersIndices[i]].classList.remove("tie-fighter")
//     console.log(cells[tieFightersIndices[i]])

//     // ? Moves back or forward one index depending on direction
//     for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//       tieFightersIndices[i] += width
//     }

//     for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//       cells[tieFightersIndices[i]].classList.add("tie-fighter")
//     }
//     // ? Performs check on current direction of travel and reverses it
//     if (direction === 1) {
//       direction = -1
//     } else if (direction === -1) {
//       direction = 1
//     }
//     // ? As above - removes alien from current position, moves back or forward one cell
//     // ? and updates new position with alien
//   }
//   for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//     console.log(cells[tieFightersIndices[i]])
//     cells[tieFightersIndices[i]].classList.remove("tie-fighter")
//   }
//   for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//     tieFightersIndices[i] += direction
//   }
//   for (let i = 0; i <= tieFightersIndices.length - 1; i++) {
//     cells[tieFightersIndices[i]].classList.add("tie-fighter")
//   }
// }

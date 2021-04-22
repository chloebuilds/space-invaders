const elements = {
insertCoin: document.querySelector('#insert-coin'),
  playBtn: document.querySelector('#play-btn'),
  restartBtn: document.querySelector('#restart-btn'),
  audioPlayer: document.querySelector('audio'),
  scoreDisplay: document.querySelector('#score-display'),
  livesDisplay: document.querySelector('#lives-display'),
  coinDisplay: document.querySelector('#coin-display'),
  starfield: document.querySelector('.starfield'),
  closeBtns: document.querySelectorAll('.close-button')
}

const width = 10
const cells = []

// GLOBAL VARIABLES
let groguIndex = 94
let tieFighter = 0
let theForceIndex = 0
let intervalId = 0
let lives = 0
let score = 0
// TIE FIGHTER MOVEMENTS
let direction = 1
const interval = 1000
const intervalForceShooting = 200
const intervalDarkShooting = 300
const numberOfTieFightersPerRow = 8
let tieFightersIndices = [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17] //20, 21, 22, 23, 24, 25, 26, 27


// ADDING THE STARFIELD
for (let cellIndex = 0; cellIndex < width ** 2; cellIndex++) {
  const div = document.createElement('div')
  elements.starfield.appendChild(div)
  cells.push(div)
  // div.style.width = `${100 / width}%`
  // div.style.height = `${100 / width}%`
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
    // Interval movement of the-force
    const intervalForce = setInterval(() => {
      if (theForceIndex < width) {
        cells[theForceIndex].classList.remove('the-force')
        clearInterval(intervalForce)
        return
      }
      cells[theForceIndex].classList.remove('the-force')
      theForceIndex = theForceIndex - width
      cells[theForceIndex].classList.add('the-force')
        // TIE FIGHTER COLLISION DETECTION 
        // does it contain class of 'tiefighter' if so then EXPLODE, then remove the tiefighter class and =+ 10 points
      if (cells[theForceIndex].classList.contains('tie-fighter')) {
        
        // elements.audioPlayer.src = "./sounds/explosion.wav";
        // elements.audioPlayer.volume = 0.20
        // elements.audioPlayer.play();

        cells[theForceIndex].classList.remove('tie-fighter')
        cells[theForceIndex].classList.remove('the-force')
        cells[theForceIndex].classList.add('explosion')
        tieFightersIndices = tieFightersIndices.filter(tieFighterIndex => tieFighterIndex !== theForceIndex)
        if (tieFightersIndices.length === 0) {
          elements.scoreDisplay.innerHTML = score += 100
          gameWon()
        }
        // to remove the explosion
        setTimeout(() => {
          cells[theForceIndex].classList.remove('explosion')
        }, 300);
        clearInterval(intervalForce)
        elements.scoreDisplay.innerHTML = score += 10 
        return 
      }
    }, intervalForceShooting)
    // Force shooting sound
    console.log('🔫 pew pew pew!!!')
    elements.audioPlayer.src = "./sounds/grogu-pow.wav";
    elements.audioPlayer.volume = 0.1
    elements.audioPlayer.play();
  }
})

// BUTTON FUNCTIONS
// RESTART BUTTON
elements.restartBtn.addEventListener('click', () => {
  resetGame()
})



// PLAY BUTTON
elements.playBtn.addEventListener('click', () => {
  if (intervalId !== 0) {
    return
  }
if (lives !== 3) {
  elements.coinDisplay.innerHTML = "You need to insert a coin to play.."
  elements.audioPlayer.src = './sounds/not-today.wav' 
  elements.audioPlayer.volume = 0.50
  elements.audioPlayer.play()
  return
}
if (!Array.from(document.querySelectorAll('div.game-over')).every(div => div.classList.contains('hidden'))) {
  return
  }
  elements.coinDisplay.innerHTML = ' '
  elements.audioPlayer.src = './sounds/lightsaber-turn-on.wav'
  elements.audioPlayer.volume = 0.30
  elements.audioPlayer.play()

  // ADD GROGU POSITION
  cells[groguIndex].classList.add('grogu')
  
  // adding the tie-fighter class to each index of tie-fighter array
  tieFightersIndices.forEach((tieFighterIndex) => {
    cells[tieFighterIndex].classList.add('tie-fighter')
  })

  // TIE FIGHTER MOVEMENT
  let counter = 0
  intervalId = setInterval(() => {
    const leftWall = tieFightersIndices.some(tieFighterIndex => tieFighterIndex % width === 0) 
    const rightWall = tieFightersIndices.some(tieFighterIndex => tieFighterIndex % width === width - 1) 
    counter++

    if ((rightWall && direction === 1) || leftWall && direction === - 1) {
      tieFightersIndices.forEach(tieFighterIndex => cells[tieFighterIndex].classList.remove('tie-fighter'))
      tieFightersIndices = tieFightersIndices.map(tieFighterIndex => tieFighterIndex + width)
      tieFightersIndices.forEach(tieFighterIndex => cells[tieFighterIndex].classList.add('tie-fighter'))
      if (direction === 1) {
        direction = -1
      } else {
        direction = 1
      }
    } else {
      tieFightersIndices.forEach(tieFighterIndex => cells[tieFighterIndex].classList.remove('tie-fighter'))
      tieFightersIndices = tieFightersIndices.map(tieFighterIndex => tieFighterIndex + direction)
      tieFightersIndices.forEach(tieFighterIndex => cells[tieFighterIndex].classList.add('tie-fighter'))
    }
    // Remove class from ALL cells with tiefighters at the end 
    if (tieFightersIndices.some((tieFighterIndex) => tieFighterIndex  >= cells.length - width)) {
      // stop the interval running
      clearInterval(intervalId)
      gameLost()
    }
    // Firing a TIE laser every 4th interval
    if (counter % 4 === 0) {
      fireTieLaser()
    }
  }, interval)
})

// INSERT COIN BUTTON
elements.insertCoin.addEventListener('click', () => {
  if (lives === 3) {
    elements.audioPlayer.src = './sounds/not-today.wav'
    elements.audioPlayer.play()
    elements.coinDisplay.innerHTML = "You've already inserted a coin. <br> Press Play."
    return
  }
  elements.audioPlayer.src = './sounds/penny-drop2.wav'
  elements.audioPlayer.volume = 0.30
  elements.audioPlayer.play()


  lives = 3
  livesDisplay()
  elements.coinDisplay.innerHTML = '3 lives loaded. <br> May the force be with you!'
  return
})

// CLOSE BUTTON for hidden divs
elements.closeBtns.forEach(button => button.addEventListener('click', (event) => {
  const parentDiv = event.target.parentElement
  parentDiv.classList.add('hidden')
}))


// ? GAME FUNCTIONS
// LIVES DISPLAY
// to populate dom with heart images, make function that loops as many times as there are lives and add img to dom for each life
function livesDisplay() {
  elements.livesDisplay.innerHTML = ''
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('img')
    heart.src = './images/pixel-heart.png'
    heart.classList.add('heart')
    elements.livesDisplay.appendChild(heart)
  }
}

const laserArray = [] 
// RANDOM TIE LASER FIRING
function fireTieLaser() {
let randomLaser = tieFightersIndices[Math.floor(Math.random() * tieFightersIndices.length)]

  const laserInterval = setInterval(() => {

    // to randomly fire a tie laser
    if (randomLaser > cells.length - width) {
      cells[randomLaser].classList.remove('laser') // ! error with this in console
      clearInterval(laserInterval)
      return
    }
    cells[randomLaser].classList.remove('laser')
    randomLaser = randomLaser + width
    // if cells at random laser has classList grogu then {apply explosion class, return after this and clear interval and lose a life}
    if (cells[randomLaser].classList.contains('grogu')) {
      elements.audioPlayer.src = './sounds/grogu-hit.wav'
      elements.audioPlayer.volume = 0.50
      elements.audioPlayer.play()
      // cells[groguIndex].classList.remove('grogu')
      cells[groguIndex].classList.add('grogu-hit')
      const currentIndex = groguIndex
      setTimeout(() => {
        cells[currentIndex].classList.remove('grogu-hit') //time out on grogu-hit class
      }, 400);
      lives = lives - 1
      livesDisplay()
      if (lives === 0) { 
        gameLost()
      }
      return 
      
    }
    cells[randomLaser].classList.add('laser')
  }, intervalDarkShooting)
  elements.audioPlayer.src = './sounds/tie-laser.mp3'
  elements.audioPlayer.volume = 0.30
  elements.audioPlayer.play()
  laserArray.push(laserInterval)
}

function gameWon() {
  gameOver() 
  document.getElementById('game-won').classList.remove('hidden')
  document.getElementById('final-score-won').innerHTML = `Your final score is ${score}`
  elements.audioPlayer.src = './sounds/game-won.wav'
  elements.audioPlayer.volume = 0.30
  elements.audioPlayer.play()
}

function gameLost() {
  gameOver()
  document.getElementById('game-lost').classList.remove('hidden')
  document.getElementById('final-score-lost').innerHTML = `Your final score is ${score}`
  elements.audioPlayer.src = './sounds/game-lost.wav'
  elements.audioPlayer.volume = 0.30
  elements.audioPlayer.play()
}

function gameOver() {
  laserArray.forEach(laserInterval => clearInterval(laserInterval))
  cells[groguIndex].classList.remove('grogu')
  cells[groguIndex].classList.remove('grogu-hit')
  clearInterval(intervalId)
  // Remove all tie fighters from starfield
  tieFightersIndices.forEach(tieFighterIndex => cells[tieFighterIndex].classList.remove('tie-fighter')) 
  // Reset positions
  groguIndex = 94
  intervalId = 0
  tieFightersIndices = [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17] // 20, 21, 22, 23, 24, 25, 26, 27
  direction = 1
}
function resetGame() {
  location.reload()
}


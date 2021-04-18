const elements = {
  insertCoin: document.querySelector('#insert-coin'),
  playBtn: document.querySelector('#play-btn'),
  audioPlayer: document.querySelector('audio'),
  scoreDisplay: document.querySelector('#score-display'),
  livesDisplay: document.querySelector('#lives-display'),
  lifeHeart: document.querySelector('.heart'),
  img: document.querySelector('img'), //not sure if this is right
}


const starfield = document.querySelector('.starfield')
const width = 10
const cells = []

// GLOBAL VARIABLES
let grogu = 94
let tieFighter = 0
let theForce = 94
let intervalId = 0


for (let cellIndex = 0; cellIndex < width ** 2; cellIndex++) {
  const div = document.createElement('div')
  starfield.appendChild(div)
  cells.push(div)
  div.innerHTML = cellIndex
  // div.style.width = `${100 / width}%`
  // div.style.height = `${100 / width}%`
  if (cellIndex === 94) {
  cells[grogu].classList.add('grogu')
  }
}

//tieFighter = 0
cellIndex = 0

// ! Trying to add more tie fighters with an array...not working
// let tieFighterPosition = cells[0, 1, 2, 3, 4, 5]
// console.dir(tieFighterPosition)
// tieFighterPosition.forEach((cell) => {
//   cell.classList.add('tie-fighter')
// })

// if (cellIndex === 0) {
//   cells[tieFighter].classList.add('tie-fighter')
//   tieFighter++
//   }

setInterval(() => {
  if (tieFighter >= 0 && tieFighter < (width * (width - 1)) - 1) {
      cells[tieFighter].classList.remove('tie-fighter')
      tieFighter = tieFighter + 1
      cells[tieFighter].classList.add('tie-fighter')
  }
  if (tieFighter === 89) {
      cells[tieFighter].classList.remove('tie-fighter')
    }
    // ! trying to speed the movement as it gets to end of row 3
    setInterval(() => {
    if (tieFighter === 29) {
        cells[tieFighter].classList.remove('tie-fighter')
      }
    }, 200)
  }, 800)

  

// // GAME FUNCTIONS
// function tieFighterAttack() {
//   console.log('trying to add a tie fighter')
//   tieFighter = 1
//   cellIndex = 0
//   if (cellIndex === 0) {
//     cells[tieFighter].classList.add('tie-fighter')
//     tieFighter++
//     }
// }
// tieFighterAttack()


// GROGU MOVEMENTS
document.addEventListener('keydown', (event) => {
  // ? Get the keyboard character typed from event.key
  const key = event.key

  // ? 'arrowLeft' moves grogu left
  if (key === 'ArrowLeft' && grogu !== 90) {
    cells[grogu].classList.remove('grogu')
    grogu -= 1
    cells[grogu].classList.add('grogu')
  // ? 'arrowRight' moves grogu right
  } else if (key === 'ArrowRight' && grogu !== (width ** 2) - 1) {
    cells[grogu].classList.remove('grogu')
    grogu += 1
    cells[grogu].classList.add('grogu')
  // ? 'spacebar' shoots the force
  } else if (key === ' ') {
    event.preventDefault();
    let theForce = grogu - width
    cells[theForce].classList.add('the-force')
    const intervalForce = setInterval(() => {
      if (theForce < width) {
        cells[theForce].classList.remove('the-force')
        clearInterval(intervalForce)
        return
      }
        cells[theForce].classList.remove('the-force')
        theForce = theForce - width
        cells[theForce].classList.add('the-force')
      }, 500)
  console.log('pew pew pew!!!')
  elements.audioPlayer.src = './sounds/grogu-pow.wav'
    elements.audioPlayer.play()
  }
    
})


// BUTTON FUNCTIONS
// // ? Add a click event to my start button
elements.playBtn.addEventListener('click', () => {
  elements.audioPlayer.src = './sounds/lightsaber-turn-on.wav'
  elements.audioPlayer.play()
  elements.img.src = './images/pixel-heart.png'
  elements.livesDisplay.append('heart')

  // // ? This stops you from creating multiple set intervals
  // if (intervalId !== 0) {
  //   return
  // }
})

// INSERT COIN BUTTON
elements.insertCoin.addEventListener('click', () => {
  elements.audioPlayer.src = './sounds/penny-drop.wav'
  elements.audioPlayer.play()
  // elements.lifeHeart
  return
})


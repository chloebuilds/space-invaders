# Project 1: Space Invaders

## Overview

This was my first project on the General Assembly Software Engineering Immersive. After 3 weeks of learning HTML, CSS and JavaScript we were presented with the brief for our first project; a grid-based game rendered in the browser utilising ‘vanilla’ JavaScript, HTML and CSS. 

We were given a selection of classic arcade games to choose from that included Space Invaders, Pac Man, Snake, Frogger and a few more. I decided on Space Invaders and came up with a Star Wars’ Mandalorian inspired theme; featuring Grogu (more famously known as Baby Yoda). 

I wanted it to have an old-school 8-bit arcade game vibe to it with pixel art and an “insert coin to play” feature. I combined my new learnings in JavaScript with HTML/CSS and DOM interaction to build a fun and visually aesthetic game. 

[Play here! 👾](url 'https://chloebuilds.github.io/space-invaders/')

## Table of Contents

## The Brief

- **Render a game in the browser**.
- **Design logic for winning** & **visually display which player won**.
- **Include separate HTML / CSS / JavaScript files**.
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles.
- Use **Javascript** for **DOM manipulation**.
- **Deploy your game online**, where the rest of the world can access it.
- Use **semantic markup** for HTML and CSS (adhere to best practices).

## 

## Technologies used

- JavaScript (ES6)
- HTML
- CSS

Dev Tools
- Git & GitHub
- VS Code
- Google Fonts

## The Grid

The grid sits as the building block of the game as a 10 x 10 square and is created using JavaScript and HTML. Using a for loop; HTML divs are created and appended as children of the grid (which I named 'starfield').

```javascript
const starfield = document.querySelector('.starfield')
const width = 10
const cells = []

// ADDING THE STARFIELD
for (let cellIndex = 0; cellIndex < width ** 2; cellIndex++) {
  const div = document.createElement('div')
  elements.starfield.appendChild(div)
  cells.push(div)
} 
```
The grid is visually demonstrated here with a white border:

IMAGE WITH GRID LINES


## DOM elements
For easy reference, I created an object called `elements` that contained all of the elements from the `document` and accessed them with `querySelector`.

```javascript
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
```

## Insert Coin to Play
* Since I wanted to create more of an actual arcade game vibe, I created a feature so that the 3 lives wouldn't be loaded until you had clicked the icon button to 'insert a coin'. 
* I also added functionality so that the play button could not be pressed until the coin had been inserted and 3 lives had been loaded by checking `if (lives !==3)`. 
* I appended messages to a div named `coinDisplay` for clear feedback and instruction to the user.
* I added sounds effects of a coin dropping and for the lives loading for added feedback to the user.


IMAGE FOR INSERT COIN here

## Play Button
The play button executes a function with a 'click' eventListener that triggers the appending of Grogu and the TIE Fighters and the many movement functions in the game. 


## Movement
### Grogu
Grogu's movement is managed by `keydown` events and uses logic to determine the edges of the grid. Each time either the left or right key is pressed; Grogu moves by both removing and appending the class of `grogu` – depending on the direction.
```javascript
document.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowLeft' && groguIndex !== 90) {
    cells[groguIndex].classList.remove('grogu')
    groguIndex -= 1 // move grogu's position by removing 1
    cells[groguIndex].classList.add('grogu')
  } else if (key === 'ArrowRight' && groguIndex !== width ** 2 - 1) {
    cells[groguIndex].classList.remove('grogu')
    groguIndex += 1 // move grogu's position by adding 1
    cells[groguIndex].classList.add('grogu')
  }
```
Along with Grogu's movements are the lasers fired by Grogu. The laser is fired on key

### TIE Fighters
This was tricky to get. I needed to add all the TIE Fighters to the grid and then have them move left to right, detecting whether or not they had hit the 'sides' and moving them down a row if so. 
Additionally I created a function `fireTieLaser()` where a laser set at and interval is fired by a random TIE Fighter.

```javascript
function fireTieLaser() {
let randomLaser = tieFightersIndices[Math.floor(Math.random() * tieFightersIndices.length)]

  const laserInterval = setInterval(() => {

    // to randomly fire a tie laser
    if (randomLaser > cells.length - width) {
      cells[randomLaser].classList.remove('laser') 
      clearInterval(laserInterval)
      return
    }
    cells[randomLaser].classList.remove('laser')
    randomLaser = randomLaser + width
    
    if (cells[randomLaser].classList.contains('grogu')) {
      elements.audioPlayer.src = './sounds/grogu-hit.wav'
      elements.audioPlayer.volume = 0.50
      elements.audioPlayer.play()
      
      cells[groguIndex].classList.add('grogu-hit')
      const currentIndex = groguIndex
      setTimeout(() => {
        cells[currentIndex].classList.remove('grogu-hit')
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
```

## Collision Detection
### Grogu hit & TIE Fighter hit
This all takes place in the function `fireTieLaser()` as seen in the code above. Both when Grogu is hit by a laser from a TIE Fighter and when a TIE Fighter is hit by Grogu's laser; there is audio and visual feedback for the user where the class for the image of either Grogu or the TIE Fighter is updated to an image of a broken heart 💔 (in the case of Grogu) or an explosion of the destroyed TIE Fighter. 

Grogu being hit results in a life lost and a heart is removed from the array that is storing and displaying lives. There is also a `setTimeout()` to remove the `grogu-hit` class

A TIE Fighter being hit results in it being removed from the grid and adding 10 points to the score.

### Wall detection
The TIE Fighters when hitting the walls needed to shift down a row on the grid. I found this really challenging and ended up with many bugs to fix here! But the learning was worth the panic of initially having a grid filled with TIE Fighters!
 ```javascript
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
 ```



## Challenges
* This project, as my first on the immersive, *really* challenged me. It took everything that we had learned over the first 3 weeks and put in all into practice. I had to consider many aspects of programming to put it all together, including: working with arrays, control flow, intervals, functions, working with DOM interaction.
* The part I found the most challenging was figuring out how to write the logic for the collision detection and the movement of the TIE Fighters. I had a few bugs where the TIE fighters ended up duplicating and filling the grid rather than detecting the 'edges' of the grid.  
* A fair bit of the logic was done with nudges and guidance from the instructional team. The logic was without a doubt where I felt the most challenged. I did find though, that asking for assitance helped me in being able to talk more about the issues I was facing and through talking the issue outloud; often I was able to give myself the clues on how to resolve the issue. In hindsight, I would have also referred to places like Stack Overflow with the aim to get a deeper understanding and to be able to further articulate the challenges I was facing.

## Wins
* **CSS:** I found myself much more enthusiastic about planning and implementing the styling and the UX of the game. Because of this I made a start on the layout, css, graphics and sounds first. I am really happy with the look and feel of the game. I had decided on a theme before I started and I feel this helped me to bring it all together. 
* **Game play features:** Getting the insert coin feature to work, lives to show, the score to update and adding the modal for game won or lost was relatively straight forward for me and demonstrated to myself how much I had learned about working with the DOM.
* **Planning:** I used Trello to organise myself for the project. I separated tasks into: Styling & CSS, Game Play functionality, Logic for Grogu, Logic for TIE Fighters, Collision Detection. Breaking it down in this way helped (mostly) to prevent me from feeling overwhelmed and gave me a pace to work to. I found if I could complete the tasks that came easier to me that I was more motivated by the progress I was making. 
* **Audio:** Discovering the `.volume` property on the audio player was a huge win – there are many sounds and it was all very overwhelming and loud before adding this!
* **Grogu's movements:** I found it relatively easy to get Grogu on the grid and to get him moving - showing myself a good understanding of using event listeners.

## Learning
It is very easy for me to say that this project challenged me a lot but also gave me such a huge sense of achievement on completion. Starting from a blank canvas and watching it shape up to the final product confirmed why I made the choice to do the Software Engineering Immersive – it felt amazing to see the end product of all the hours, challenges and wins that I had over the week!

I also learned how important is is to plan and structure your code. I tried to keep it clean and dry and refactored where I could. However, there are many lines and I am sure that there is much space for me to go back and refactor. And finally, I learned the importance of having clear, semantic and defined variable, function and element names. 

## Ideas for future developments
* Currently, upon winning level 1, the second round adds an extra layer of TIE Fighters. I would like to add further levels of difficulty to the game by increasing the interval and speed at which the TIE Fighters move, the frequency of lasers fired by them and adding more rows of TIE Fighters. 
* Adding in a high-score board that uses local storage. 
* I would also like to make the game mobile responsive.

### Credits
* [Giphy.com](http://www.giphy.com) for the Grogu gifs of game over
* [Mixkit](https://mixkit.co/free-sound-effects) for the audio files



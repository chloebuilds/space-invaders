# Project 1: Space Invaders

## Overview

This was my first project on the General Assembly Software Engineering Immersive. After 3 weeks of learning HTML, CSS and JavaScript we were presented with the brief for our first project; a grid-based game rendered in the browser utilising ‘vanilla’ JavaScript, HTML and CSS. 

We were given a selection of classic arcade games to choose from that included Space Invaders, Pac Man, Snake, Frogger and a few more. I decided on Space Invaders and came up with a Star Wars’ Mandalorian inspired theme; featuring Grogu (more famously known as Baby Yoda). 

I wanted it to have an old-school 8-bit arcade game vibe to it with pixel art and an “insert coin to play” feature. I combined my new learnings in JavaScript with HTML/CSS and DOM interaction to build a fun and visually aesthetic game. 

[Play here! 👾](url 'https://chloebuilds.github.io/space-invaders/')

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

<img src="" height="100" alt="The grid">


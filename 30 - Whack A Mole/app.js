const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('button')

const min = 200 // minimum time in miliseconds
const max = 1000 // maximum time in miliseconds

let lashHole;
let timeUp = false;
let score = 0;

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomHole = (holes) => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lashHole) {
    return randomHole(holes);
  }
  lashHole = hole;
  return hole;
}

const peep = () => {
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep()
    } else {
      title.textContent = 'Your score is'
    }
  }, time);
}

const startGame= () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
} 

const bonk = function(e) {
  if (!e.isTrusted) return;

  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
moles.forEach(mole => mole.addEventListener('touchstart', bonk))

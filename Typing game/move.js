const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'high',
    'superman',
    'quince',
    'eight',
    'feeble',
    'admit',
    'right',
    'eight',
    'loving',
    'stupid',
    'quince',
    'worcechester',

];

//initilaizing words
let randomWord;

//Initializing Score
let score = 0;

//Initilaizing Time
let time = 10;

//Setting difficulty
let difficulty = 
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

//Setting difficulty set value
difficultySelect.value = 
    localStorage.getItem('difficulty') !== null
        ?localStorage.getItem('difficulty')
        : 'medium';

//Focus on text once start
Text.focus();

//countdown

const timeInterval = setInterval(updateTime, 100);

//Generate randowm word from Array
function getRandomWord(){
    return word[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }
  
  // Update score
  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }
  
  // Update time
  function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
  
    if (time === 0) {
      clearInterval(timeInterval);
      // end game
      gameOver();
    }
  }
  
  // Game over, show end screen
  function gameOver() {
    endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;
  
    endgameEl.style.display = 'flex';
  }
  
  addWordToDOM();
  
  // Event listeners
  
  // Typing
  text.addEventListener('input', e => {
    const insertedText = e.target.value;
  
    if (insertedText === randomWord) {
      addWordToDOM();
      updateScore();
  
      // Clear
      e.target.value = '';
  
      if (difficulty === 'hard') {
        time += 2;
      } else if (difficulty === 'medium') {
        time += 3;
      } else {
        time += 5;
      }
  
      updateTime();
    }
  });
  
  // Settings btn click
  settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
  
  // Settings select
  settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  });
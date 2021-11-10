
var game = {
  score: 0,
  lifes: 10,
}

var word = data[getRandomInt(0, data.length)]['country'];
createHiddenWordField(word);
document.getElementById("numberOfLives").innerHTML = game.lifes;
document.getElementById("score").innerHTML = game.score;

document.getElementById("close-button").onclick = function() {
  document.getElementById("modal").classList.add('closed');
  document.getElementById("open-modal").classList.remove('closed');
};

document.getElementById("open-modal").onclick = function() {
  document.getElementById("modal").classList.remove('closed');
  document.getElementById("open-modal").classList.add('closed');
};

function checkLetter(letter) {
  disableLetterButton(letter);
  if (!word.includes(letter)) {
    game.lifes--;
    document.getElementById("numberOfLives").innerHTML = game.lifes;
  } else {
    while (word.includes(letter)) {
      fillBlankBlock(letter);
      word = word.toLowerCase().replace(letter, "#");
      game.score += 100;
      document.getElementById("score").innerHTML = game.score;
    }
  }
  checkLose();
  checkWin();
}

function disableLetterButton(letter) {
  alreadyChecked.push(letter);
  alreadyChecked.forEach(letter => {
    document.getElementById(letter).disabled = true;
  });
}

function checkLose() {
  if (game.lifes === 0) {
    alert("You lose!");
  }
}

function checkWin() {
  var wordWithoutSpaces = word.split(" ").join('');
  var regexp = new RegExp('#{' + wordWithoutSpaces.length + '}');
  if (regexp.test(wordWithoutSpaces)) {
    alert("You win!!");
  }
}

function fillBlankBlock(letter) {
  var letterPosition = word.toLowerCase().indexOf(letter);
  document.getElementById('letter-' + letterPosition).innerText = letter;
}

function createHiddenWordField(word) {
  var wordLength = word.length;
  var gameArea = document.getElementById("guess-word");
  var row = createGuessWordRow();
  for (var i = 0; i < wordLength; i++) {
    if (word[i] === ' ') {
      gameArea.appendChild(row);
      row = createGuessWordRow();
    } else {
      row.appendChild(createBlankBlock(i));
    }
    gameArea.appendChild(row);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function createBlankBlock(id) {
  var blankBlock = document.createElement('div');
  blankBlock.id = 'letter-' + id;
  blankBlock.classList.add('blank-block');
  return blankBlock;
}

function createGuessWordRow() {
  var row = document.createElement('div');
  row.classList.add('row');
  return row;
}

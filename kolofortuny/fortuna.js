
var game = {
  zdobyte: 0,
  lifes: 5,
}

var word = data[getRandomInt(0, data.length)]['country'];
createHiddenWordField(word);
document.getElementById("numberOfLives").innerHTML = game.lifes;

function checkLetter(letter) {
  if (!word.includes(letter)) {
    game.lifes--;
    document.getElementById("numberOfLives").innerHTML = game.lifes;
  } else {
    while (word.includes(letter)) {
      fillBlankBlock(letter);
      word = word.toLowerCase().replace(letter, "#");
    }
  }
  checkLose();
  checkWin();
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
  var gameArea = document.getElementById("game-area");
  for (var i = 0; i < wordLength; i++) {
    if (word[i] === ' ') {
      gameArea.innerHTML = gameArea.innerHTML + "<div class='spacebar-block'></div>"
    } else {
      gameArea.innerHTML = gameArea.innerHTML + "<div id='letter-" + i + "' class='blank-block'></div>";
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

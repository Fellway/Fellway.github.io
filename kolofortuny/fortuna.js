
var game = {
  zdobyte: 0,
  lifes: 1,
}

var word = data[0]['country'];
console.log(word);
// alert(data[0]['country']);

// alert(data.length);
// alert(data[0]['country'][2]);

//  for (var i = 0; i < data[0]['country'].length; i += 1) {
//     alert(data[0]['country'][i]);  
//   }
createHiddenWordField(word);
addElement("wrap");
//LISTENERS

document.getElementById("graj").addEventListener("click", Sprawdz_Litery);
document.getElementById("numberOfLives").innerHTML = game.lifes;


//FUNKCJE
function Sprawdz_Litery() {
  var letter = document.getElementById("wpisz_litere").value;
  if (word.includes(letter)) {
    fillBlankBlock(letter);
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
    gameArea.innerHTML = gameArea.innerHTML + "<div id='letter-" + i + "' class='blank-block'></div>";
  }
}


function addElement(mydiv) {

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

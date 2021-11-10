var qwerty = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

var alreadyChecked = [];

window.onload = function () {
    var keyboardBox = document.getElementById('keyboard');
    var row = createRow();
    qwerty.forEach(letter => {
        const letterButton = createLetterButton(letter);
        if (letter === 'p' || letter === 'l' || letter === 'm') {
            row.appendChild(letterButton);
            keyboardBox.appendChild(row);
            row = createRow();
        } else {
            row.appendChild(letterButton);
        }
    });
}


function createRow() {
    var row = document.createElement('div');
    row.classList.add('keyboard-row');
    return row;
}

function createLetterButton(letter) {
    var button = document.createElement('button');
    button.innerHTML = letter;
    button.classList.add('button-letter');
    button.id = letter;
    button.onclick = () => checkLetter(letter);
    return button;
}
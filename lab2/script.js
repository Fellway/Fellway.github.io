var canvasWidth = 800;
var canvasHeight = 600;
/** @type {CanvasRenderingContext2D} */
var context;
var bullets = [];

const direction = {
    LEFT: "left",
    RIGHT: "right",
    STAY: "stay"
}

const keys = {
    isSpacebarPressed: false,
    isRightArrowPressed: false,
    isLeftArrowPressed: false
}

class Bullet {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 3;
    }

}

const player = {
    color: '#f44334',
    height: 20,
    width: 100,
    position: {
        x: canvasWidth / 2 - 50,
        y: canvasHeight - 60
    },
    moveSpeed: 2,
    shoot: {
        frequently: 500,
        lastShoot: Date.now()
    }
}

function initGameArea(width, height) {
    context = document.getElementById("gameArea").getContext("2d");
    context.canvas.width = width;
    context.canvas.height = height;
}

function drawPlayerRectangle() {
    context.fillStyle = player.color;
    context.fillRect(player.position.x, player.position.y, player.width, player.height);
    context.closePath();
}

function drawBullets() {
    bullets.forEach(bullet => {
        context.fillStyle = 'black';
        bullet.y = bullet.y -= bullet.speed;
        context.beginPath();
        context.arc(bullet.x + player.width / 2, bullet.y , 5, 0, 2 * Math.PI);
        context.fill();
        context.moveTo(bullet.x, bullet.y);
    });

    bullets = bullets.filter(function(bullet){
        return bullet.y > 0;
    })
}

function setDirection(e, isPressed) {
    var key = e.keyCode;
    switch (key) {
        case (37):
            isPressed ? keys.isLeftArrowPressed = true : keys.isLeftArrowPressed = false;
            break;
        case (39):
            isPressed ? keys.isRightArrowPressed = true : keys.isRightArrowPressed = false;
            break;
        case (32):
            isPressed ? keys.isSpacebarPressed = true : keys.isSpacebarPressed = false;
            break;
    }
}

function canShoot() {
    return new Date(Date.now() - player.shoot.frequently) > player.shoot.lastShoot
}

function refreshGameArea() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    refreshPlayerPosition();
    drawPlayerRectangle();
    drawBullets();
}

function refreshPlayerPosition() {
    if(keys.isLeftArrowPressed && !keys.isRightArrowPressed) {
        player.position.x -= player.moveSpeed;
    } else if (keys.isRightArrowPressed && !keys.isLeftArrowPressed) {
        player.position.x += player.moveSpeed;
    } 

    if (keys.isSpacebarPressed && canShoot()) {
        bullets.push(new Bullet(player.position.x, player.position.y));
        player.shoot.lastShoot = Date.now();
    }

    if(player.position.x <= 0) {
        player.position.x = 0;
    } else if (player.position.x >= canvasWidth - player.width) {
        player.position.x = canvasWidth - player.width;
    }
}

function initKeyListeners() {
    window.addEventListener('keydown', (e) => this.setDirection(e, true), false);
    window.addEventListener('keyup', (e) => this.setDirection(e, false), false);
}


initKeyListeners();
initGameArea(canvasWidth, canvasHeight);
setInterval(refreshGameArea, 5);
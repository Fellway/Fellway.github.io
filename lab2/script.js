var canvasWidth = 800;
var canvasHeight = 600;
/** @type {CanvasRenderingContext2D} */
var context;

const direction = {
    LEFT: "left",
    RIGHT: "right",
    STAY: "stay"
}

const player = {
    color: '#f44334',
    height: 20,
    width: 100,
    position: {
        x: canvasWidth / 2 - 50,
        y: canvasHeight - 60
    },
    move: {
        speed: 2,
        direction: direction.STAY
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

function setDirection(e) {
    var key = e.keyCode;
    switch (key) {
        case (37):
            player.move.direction = direction.LEFT;
            break;
        case (39):
            player.move.direction = direction.RIGHT;
            break;
        default:
            player.move.direction = direction.STAY;
    }
}

function stopPlayer() {
    player.move.direction = direction.STAY;
}

function refreshGameArea() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    refreshPlayerPosition();
    drawPlayerRectangle();
}

function refreshPlayerPosition() {
    switch (player.move.direction) {
        case (direction.LEFT):
            player.position.x -= player.move.speed;
            break;
        case (direction.RIGHT):
            player.position.x += player.move.speed;
            break;
    }

    if(player.position.x <= 0) {
        player.position.x = 0;
    } else if (player.position.x >= canvasWidth - player.width) {
        player.position.x = canvasWidth - player.width;
    }
}

function initKeyListeners() {
    window.addEventListener('keydown', this.setDirection, false);
    window.addEventListener('keyup', this.stopPlayer, false);
}


initKeyListeners();
initGameArea(canvasWidth, canvasHeight);
setInterval(refreshGameArea, 5);
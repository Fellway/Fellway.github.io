var canvasWidth = 800;
var canvasHeight = 600;
/** @type {CanvasRenderingContext2D} */
var context;

const player = {
    height: 20,
    width: 100,
    position: {
        x: canvasWidth / 2 - 50,
        y: canvasHeight - 60
    }
}

function initGameArea(width, height) {
     context = document.getElementById("gameArea").getContext("2d");
     context.canvas.width = width;
     context.canvas.height = height;
}

function drawPlayerRectangle(width, height, color) {
    context.fillStyle = color;
    context.beginPath();
    context.fillRect(player.position.x, player.position.y, width, height);
    context.stroke(); 
}

initGameArea(canvasWidth, canvasHeight);
drawPlayerRectangle(player.width, player.height, '#f44336');
var canvasWidth = 800;
var canvasHeight = 600;
var context;

function initGameArea(width, height) {
     /** @type {CanvasRenderingContext2D} */
     context = document.getElementById("gameArea").getContext("2d");
     context.canvas.width = width;
     context.canvas.height = height;
}

initGameArea(canvasWidth, canvasHeight);
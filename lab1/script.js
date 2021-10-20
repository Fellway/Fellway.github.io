var canvasWidth = 800;
var canvasHeight = 600;
var circleRadius = 150;
var jumpSpeed = 3;
var circleCenterY = canvasHeight / 2;
var ctx = gameArea(canvasWidth, canvasHeight);
var jumpDirection = false;
var gradientProgress = 0;

function gameArea(width, height) {
    /** @type {CanvasRenderingContext2D} */
    var context = document.getElementById("gameArea").getContext("2d");
    context.canvas.width = width;
    context.canvas.height = height;
    return context;
}

function gradient() {
    gradientProgress += 1;
    if (gradientProgress > 100) {
        gradientProgress = 0;
    }
    var offset = -ctx.canvas.width * 2 * gradientProgress / 100;
    grad = ctx.createLinearGradient(offset, 0, ctx.canvas.width * 3 + offset, 0);
    grad.addColorStop('0', 'blue');
    grad.addColorStop('0.33', 'green');
    grad.addColorStop('0.66', 'blue');
    grad.addColorStop('1', 'green');
    ctx.fillStyle = grad;
    ctx.fill();
    window.requestAnimationFrame(gradient);
}

function drawCircle() {
    var middleOfGameArea = canvasWidth / 2;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.arc(middleOfGameArea, circleCenterY, circleRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 0;
    ctx.fill();
    ctx.moveTo(middleOfGameArea, circleCenterY);
    window.requestAnimationFrame(drawCircle);
}

function jump() {
    if (jumpDirection) {
        circleCenterY -= jumpSpeed;
    } else {
        circleCenterY += jumpSpeed;
    }

    if (circleCenterY + circleRadius >= canvasHeight) {
        jumpDirection = true;
    } else if (circleCenterY <= canvasHeight / 2) {
        jumpDirection = false;
    }
    window.requestAnimationFrame(jump);
}

function animate() {
    window.requestAnimationFrame(drawCircle);
    window.requestAnimationFrame(jump);
    window.requestAnimationFrame(gradient);
}

animate();
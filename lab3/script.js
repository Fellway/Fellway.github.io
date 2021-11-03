const keyMap = {
    isRightArrowPressed: false,
    isLeftArrowPressed: false
}

var ctx;

class Game2D {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

}

class Car {

    constructor() {
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height - 200;
        this.speed = 2;
        this.drawCar();
    }

    drawCar() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, 50, 100);
        ctx.closePath();
        ctx.fill();
    }

    move() {
        if (keyMap.isLeftArrowPressed && !keyMap.isRightArrowPressed) {
            this.x -= this.speed;
        } else if (keyMap.isRightArrowPressed && !keyMap.isLeftArrowPressed) {
            this.x += this.speed;
        }
    }

}

class Road {

    ROAD_TYPE = {
        STRAIGHT: "straight",
        LEFT: "left",
        RIGHT: "right",
        STRONG_LEFT: "strong_left",
        STRONG_RIGHT: "strong_right"
    };

    drawRoad() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.fillRect(width / 2 - 250, 0, 500, height);
        ctx.closePath();
    }

    drawLine() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(width / 2 - 10, 0, 20, 50);
        ctx.closePath();
    }

}

function initContext() {
    /** @type {CanvasRenderingContext2D} */
    ctx = document.getElementById("gameArea").getContext("2d");
    ctx.canvas.width = 800;
    ctx.canvas.height = 600;
}

function initKeyListeners() {
    window.addEventListener('keydown', (e) => this.setDirection(e, true), false);
    window.addEventListener('keyup', (e) => this.setDirection(e, false), false);
}

function setDirection(e, isPressed) {
    var key = e.keyCode;
    switch (key) {
        case (37):
            isPressed ? keyMap.isLeftArrowPressed = true : keyMap.isLeftArrowPressed = false;
            break;
        case (39):
            isPressed ? keyMap.isRightArrowPressed = true : keyMap.isRightArrowPressed = false;
            break;
    }
}


initContext();
var game = new Game2D(800, 600);
var road = new Road();
var car = new Car();
setInterval(refreshGameArea, 6);
initKeyListeners(car);

function refreshGameArea() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    road.drawRoad();
    road.drawLine();
    car.move();
    car.drawCar();
}


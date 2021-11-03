const keyMap = {
    isRightArrowPressed: false,
    isLeftArrowPressed: false
}

var ctx;
var obstacles = [];

const config = {

    carSpeed: 5,
    roadWidth: 500,
    obstacle: {
        width: 50,
        height: 20
    },
    car: {
        width: 50,
        height: 75
    }

}

class Game2D {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

}

class Car {

    constructor() {
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height - 100;
        this.width = config.car.width;
        this.height = config.car.height;
        this.drawCar();
    }

    drawCar() {
        var carImg = document.getElementById("car");
        ctx.drawImage(carImg, this.x, this.y);
        ctx.closePath();
        ctx.fill();
    }

    move() {
        if (keyMap.isLeftArrowPressed && !keyMap.isRightArrowPressed) {
            this.x -= config.carSpeed;
        } else if (keyMap.isRightArrowPressed && !keyMap.isLeftArrowPressed) {
            this.x += config.carSpeed;
        }
    }

}

class Road {

    lineHeight = 50;
    lineWidth = 10;
    sectionWidth = 50;

    constructor() {
        this.y = 0;
    }

    drawRoad() {
        this.#drawGrass();
        this.#drawAsphalt();
        this.#drawLines();
        this.#drawSections();
    }

    #drawAsphalt() {
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.fillRect(ctx.canvas.width / 2 - config.roadWidth / 2, 0, config.roadWidth, ctx.canvas.height);
        ctx.closePath();
    }

    #drawGrass() {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
    }

    #drawLines() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        for (let i = -ctx.canvas.height; i < height; i += this.lineHeight * 2) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(width / 2 - 10, i + this.y, this.lineWidth, this.lineHeight);
            ctx.closePath();
        }
    }

    #drawSections() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        for (let i = -ctx.canvas.height; i < height; i += this.lineHeight * 2) {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(width / 2 + config.roadWidth / 2 - this.sectionWidth, i + this.y, this.sectionWidth, this.lineHeight);
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(width / 2 - config.roadWidth / 2, i + this.y, this.sectionWidth, this.lineHeight);
            ctx.closePath();
        }

        for (let i = -ctx.canvas.height - this.lineHeight; i < height; i += this.lineHeight * 2) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(width / 2 + config.roadWidth / 2 - this.sectionWidth, i + this.y, this.sectionWidth, this.lineHeight);
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(width / 2 - config.roadWidth / 2, i + this.y, this.sectionWidth, this.lineHeight);
            ctx.closePath();
        }
    }

    move() {
        this.y += config.carSpeed;
        if (this.y >= ctx.canvas.height) {
            this.y = 0;
        }
    }

}

class Obstacle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = config.obstacle.width;
        this.height = config.obstacle.height;
    }

    drawObstacle() {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

    move() {
        this.y += config.carSpeed;
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

function spawnObstacle() {
    const canvasWidth = ctx.canvas.width;
    obstacles.push(new Obstacle(getRandomInt(canvasWidth / 2 - config.roadWidth / 2, canvasWidth / 2 + config.roadWidth / 2), -100));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function colisionDetection() {
    var o1 = car;
    var leftLimit = ctx.canvas.width / 2 - config.roadWidth / 2;
    var rightLimit = ctx.canvas.width / 2 - config.roadWidth / 2 + config.roadWidth - o1.width;
    if ((o1.x < leftLimit) || o1.x > rightLimit) {
        gameOver();
    }
    obstacles.forEach(o2 => {
        if (o1.x < o2.x + o2.width &&
            o1.x + o1.width > o2.x &&
            o1.y < o2.y + o2.height &&
            o1.height + o1.y > o2.y) {
            gameOver();
        }
    });
}

function gameOver() {
    config.carSpeed = 0;
}

initContext();
var game = new Game2D(800, 600);
var road = new Road();
var car = new Car();
setInterval(spawnObstacle, 1000);
setInterval(refreshGameArea, 15);
setInterval(colisionDetection, 15);
initKeyListeners(car);

function refreshGameArea() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    road.move();
    road.drawRoad();
    car.move();
    car.drawCar();
    obstacles.forEach(obstacle => {
        obstacle.move();
        obstacle.drawObstacle();
        if (obstacle.y > ctx.canvas.height) {
            obstacles = obstacles.filter(function (obstacle) {
                return obstacle.y < ctx.canvas.height;
            })
        }
    });
}


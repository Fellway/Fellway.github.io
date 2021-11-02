class Game2D {

    constructor(width, height, gameDivId) {
        this.width = width;
        this.height = height;
        /** @type {CanvasRenderingContext2D} */
        this.context = document.getElementById(gameDivId).getContext("2d");
        this.#initContext();
    }

    #initContext() {
        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;
    }

}

class Car {

    constructor(gameContext) {
        this.#drawCar(gameContext);
    }

    #drawCar(gameContext) {
        gameContext.fillStyle = 'black';
        gameContext.fillRect(gameContext.canvas.width / 2 - 50, gameContext.canvas.width / 2, 30, 60);
        gameContext.closePath();
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

    constructor(gameContext) {
        this.#drawRoad(gameContext);
    }

    #drawRoad(gameContext) {
        const width = gameContext.canvas.width;
        const height = gameContext.canvas.height;
        gameContext.fillStyle = 'grey';
        gameContext.beginPath();
        // gameContext.fillRect(width / 2 - 250,  0, 500, height);
        gameContext.arc(width / 2 , height / 2, 100, 90, 2 * Math.PI);
        gameContext.fill();
        gameContext.stroke();
        // gameContext.closePath();
    }

}

var game = new Game2D(800, 600, "gameArea");
var road = new Road(game.context);
var car = new Car(game.context);


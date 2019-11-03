feather.replace();

let img_bg;
let img_player;
let img_shield;
let game = null;

function preload() {
    img_bg = loadImage('assets/desert.jpg');
    img_player = loadImage('assets/adventurer.png');
    img_shield = loadImage('assets/shield.png');
}

function setup() {
    let myCanvas = createCanvas(500, 500);
    frameRate(60);
    myCanvas.parent('canvasDiv');
    let player = createSprite(62, 130);
    player.addImage(img_player);
    player.scale = 0.7;
    let shield = createSprite(182, 396);
    shield.addImage(img_shield);
    shield.scale = 0.6;
    shield.position.x = 182 + (Math.floor(Math.random() * 3 + 1) - 1) * 120;
    background(img_bg);
    game = new GameEngine(player, shield);
}

function draw() {
    background(img_bg);
    drawSprites();
}

class GameEngine {

    constructor(player, shield) {
        this.player = player;
        this.shield = shield;
        this.queue = [];
        this.execCounter = 0;
        this.stmtCounter = 0;
        this.solution = [];
        this.running = false;
        this.animT = null;
        this.process = 0;
        this.offset = 0;
        this.factor = 1;
        this.resizeStack = [];
    }

    resize(size, continuous) {
        if (continuous) {
            size = this.resizeStack.pop();
        }

        if (width !== size) {
            resizeCanvas(size, size);
            this.offset = (500 - size) / 2;
            this.factor = 1 / (500 / size);
            this.player.position.x = this.offset + 62 * this.factor;
            this.player.position.y = this.offset + 130 * this.factor;
            this.player.scale = 0.7 * this.factor;
            this.shield.position.x = this.offset + 182 * this.factor + (Math.floor(Math.random() * 3 + 1) - 1) * 120 * this.factor;
            this.shield.position.y = this.offset + 396 * this.factor;
            this.shield.scale = 0.6 * this.factor;
            loop();
        }
        if (continuous) {
            this.resizeStack = [];
        }
    }

    execute() {
        try {
            let code = Blockly.JavaScript.workspaceToCode(ws);
            let exec = new Function("exec", code);
            this.generateLevel();
            exec();
        } catch (e) {
            alert("Error! Please reset!");
        }
    }

    generateLevel() {
        let shieldSpawn = Math.floor(Math.random() * 3 + 1);
        this.shield.position.x = this.offset + 182 * this.factor + (shieldSpawn - 1) * 120 * this.factor;
        this.solution.push("down", "down", "right");
        for (let i = 1; i <= 3; i++) {
            if (i === shieldSpawn) {
                this.solution.push("pickup");
            } else {
                this.solution.push("right");
            }
        }
        this.solution.push("up", "up");
    }

    move(direction) {
        this.queue.push(direction);
        this.start();
    }

    isShieldNearby() {
        return this.solution[this.stmtCounter] === "pickup";
    }

    pickup() {
        this.queue.push("pickup");
        this.start();
    }

    run() {
        if (this.queue.length > 0) {
            let command = this.queue.shift();
            if (command === this.solution[this.execCounter]) {
                switch (command) {
                    case "down":
                        this.animate(0, 100 * this.factor);
                        break;
                    case "right":
                        this.animate(120 * this.factor, 0);
                        break;
                    case "up":
                        this.animate(0, -100 * this.factor);
                        break;
                    case "pickup":
                        if (this.isShieldNearby) {
                            this.shield.position.y -= 46 * this.factor;
                        }
                        break;
                }
                this.execCounter++;
            } else {
                this.stop();
                this.displayMessage("Die Aktion ist ungültig!\nBitte zurücksetzen! ", '#f22b29');
            }
        } else {
            this.stop();
            if (this.execCounter === this.solution.length) {
                document.getElementById("exercise").classList.add("d-none");
                document.getElementById("exercise_won").classList.remove("d-none");
                this.displayMessage("Level geschafft!", '#7bc950');
            }
        }
    }

    displayMessage(msg, color) {
        noLoop();
        setTimeout(() => {
            filter(BLUR, 3);
            filter(GRAY);
            textFont('Arial');
            textSize(Math.floor(40 * this.factor));
            textStyle(BOLD);
            fill(color);
            textAlign(CENTER, CENTER);
            text(msg, 0, 0, width, height);
        }, 50);
    }

    animate(x, y) {
        let velX = x / 24;
        let velY = y / 24;
        if (game.player.overlap(game.shield)) {
            this.shield.setVelocity(velX, velY);
        }
        this.player.setVelocity(velX, velY);
        this.animT = setTimeout(() => {
            this.player.setVelocity(0, 0);
            this.shield.setVelocity(0,0);
            this.animT = null;
        }, 400);

    }

    start() {
        this.stmtCounter++;
        if (!this.running) {
            this.running = true;
            this.process = setInterval(this.run.bind(this), 500);
        }
    }

    stop() {
        if (this.running) {
            clearInterval(this.process);
            this.running = false;
            this.queue = [];
        }
        if (this.animT !== null) {
            clearTimeout(this.animT);
            this.player.setVelocity(0, 0);
            this.shield.setVelocity(0, 0);
        }
    }

    reset() {
        loop();
        this.stop();
        this.solution = [];
        this.execCounter = 0;
        this.stmtCounter = 0;
        this.player.position.x = this.offset + 62 * this.factor;
        this.player.position.y = this.offset + 130 * this.factor;
        this.shield.position.x = this.offset + 182 * this.factor + (Math.floor(Math.random() * 3 + 1) - 1) * 120 * this.factor;
        this.shield.position.y = this.offset + 396 * this.factor;
    }
}

let blockStyles = {
    "custom_control_blocks": {
        "colourPrimary": "#377771",
        "colourSecondary": "#377771",
        "colourTertiary": "#377771"
    },
    "custom_loop_blocks": {
        "colourPrimary": "#5e99d1",
        "colourSecondary": "#5e99d1",
        "colourTertiary": "#5e99d1"
    },
    "custom_game_blocks": {
        "colourPrimary": "#c75000",
        "colourSecondary": "#c75000",
        "colourTertiary": "#c75000"
    }
};

let categoryStyles = {
    "custom_control_category": {
        "colour": "#377771"
    },
    "custom_loop_category": {
        "colour": "#5e99d1"
    },
    "custom_game_category": {
        "colour": "#c75000"
    }
};

function reColour(block, style) {
    const oldInit = block.init;
    block.init = function () {
        oldInit.call(this);
        this.setStyle(style);
    }
}

let ws = Blockly.inject(document.getElementById('blocklyDiv'), {
    toolbox: Blockly.Xml.textToDom(document.getElementById('toolbox').outerHTML),
    maxBlocks: 10,
    sounds: false,
    theme: new Blockly.Theme(blockStyles, categoryStyles)
});

reColour(Blockly.Blocks["controls_if"], "custom_control_blocks");
reColour(Blockly.Blocks["controls_repeat_ext"], "custom_loop_blocks");
reColour(Blockly.Blocks["math_number"], "custom_loop_blocks");

function onResize() {
    let div = document.getElementById('blocklyDiv');
    div.style.left = "0px";
    div.style.top = "0px";
    let winWidth = window.innerWidth;
    if (winWidth >= 1200) {
        div.style.width = "540px";
        div.style.height = "500px";
        if (game !== null) {
            game.resize(500);
        }
    } else if (winWidth >= 992) {
        div.style.width = "450px";
        div.style.height = "450px";
        if (game !== null) {
            game.resize(450);
        }
    } else if (winWidth >= 768) {
        div.style.width = "350px";
        div.style.height = "350px";
        if (game !== null) {
            game.resize(350);
        }
    } else if (winWidth >= 576) {
        div.style.width = "500px";
        div.style.height = "500px";
        if (game !== null) {
            game.resize(500);
        }
    } else {
        div.style.width = winWidth - 30 + "px";
        div.style.height = "350px";
        if (game !== null) {
            if (game.resizeStack.length === 0) {
                setTimeout(() => {
                    game.resize(null, true);
                }, 500);
            }
            game.resizeStack.push(winWidth - 30);
        }
    }
    Blockly.svgResize(ws);
}

window.addEventListener('resize', onResize, false);
setTimeout(function () {
    onResize();
}, 250);

document.getElementById('btn_Run').onclick = function () {
    game.reset();
    game.execute();
};

document.getElementById('btn_Reset').onclick = function () {
    game.reset();
};
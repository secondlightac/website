//initialize icons
feather.replace();

//check if client is on mobile device
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let img_bg;
let img_player;
let img_shield;
let game = null;

//load images
function preload() {
    img_bg = loadImage('assets/desert.jpg');
    img_player = loadImage('assets/adventurer.png');
    img_shield = loadImage('assets/shield.png');
}

//setup canvas
function setup() {
    let myCanvas = createCanvas(500, 500);
    if (isMobile) {
        frameRate(30);
    } else {
        frameRate(60);
    }
    myCanvas.parent('canvasDiv');
    //add sprites
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

//draw-loop
function draw() {
    background(img_bg);
    drawSprites();
}

class GameEngine {

    constructor(player, shield) {
        this.player = player;
        this.shield = shield;
        this.queue = [];
        this.holdingShield = false;
        this.dfa = new GameDFA(states, 'qInit', 'qWin');
        this.running = false;
        this.started = false;
        this.animT = null;
        this.process = 0;
        this.offset = 0;
        this.factor = 1;
        this.resizeStack = [];
    }

    //resize the canvas. set continuous to true if dragging browser
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

    //main function to execute the code
    execute() {
        try {
            let code = Blockly.JavaScript.workspaceToCode(ws);
            let exec = new Function('exec', code);
            this.generateLevel();
            exec(); //simulate DFA
            this.dfa.reset();
            this.start(); // run DFA and animations
        } catch (e) {
            alert('Error! Please reset!');
        }
    }

    //generates the level by placing the shield and adjusting the corresponding state in the DFA
    generateLevel() {
        let shieldSpawn = Math.floor(Math.random() * 3 + 1);
        this.dfa.reset(true);
        let shieldState = 'qPf' + (3 + shieldSpawn);
        this.dfa.states[shieldState].transitions['pickup'] = shieldState;
        this.shield.position.x = this.offset + 182 * this.factor + (shieldSpawn - 1) * 120 * this.factor;
    }

    move(direction) {
        this.queue.push(direction);
        this.dfa.readWord(direction);
    }

    isShieldNearby() {
        return this.dfa.states[this.dfa.currentState].transitions.hasOwnProperty('pickup');
    }

    pickup() {
        this.queue.push('pickup');
        this.dfa.readWord('pickup');
    }

    //called automatically every 500ms
    run() {
        if (this.queue.length > 0) {
            let command = this.queue.shift();
            //verify if the command is valid using the DFA
            if (this.dfa.readWord(command)) {
                switch (command) {
                    case 'down':
                        this.animate(0, 100 * this.factor);
                        break;
                    case 'right':
                        this.animate(120 * this.factor, 0);
                        break;
                    case 'up':
                        this.animate(0, -100 * this.factor);
                        break;
                    case 'pickup':
                        this.holdingShield = true;
                        this.shield.position.y -= 46 * this.factor;
                        break;
                }
            } else {
                game.lose();
            }
        } else {
            if (this.dfa.currentState === this.dfa.winState && this.holdingShield) {
                game.win();
            } else {
                this.stop();
            }
        }
    }

    //display a message on the center of the canvas
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

    //animate manually by setting and clearing velocity over 400ms
    animate(x, y) {
        let FR = isMobile ? 30 : 60;
        let velX = x / (FR * 0.4);
        let velY = y / (FR * 0.4);
        if (game.player.overlap(game.shield)) {
            this.shield.setVelocity(velX, velY);
        }
        this.player.setVelocity(velX, velY);
        this.animT = setTimeout(() => {
            this.player.setVelocity(0, 0);
            this.shield.setVelocity(0, 0);
            this.animT = null;
        }, 400);

    }

    win() {
        this.stop();
        document.getElementById('exercise').classList.add('d-none');
        document.getElementById('exercise_won').classList.remove('d-none');
        window.scrollTo(0, 0);
        this.displayMessage('Level geschafft!', '#7bc950');
    }

    lose() {
        this.stop();
        this.displayMessage('Das war leider falsch!\nBitte zurücksetzen! ', '#f22b29');
    }

    //start process
    start() {
        this.running = true;
        this.process = setInterval(this.run.bind(this), 500);
        setBtnIcon('rotate-ccw');
        game.started = true;
    }

    //stop process and animation
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

    //reset game and sprites
    reset() {
        loop();
        this.stop();
        setBtnIcon('play');
        this.started = false;
        this.holdingShield = false;
        this.player.position.x = this.offset + 62 * this.factor;
        this.player.position.y = this.offset + 130 * this.factor;
        this.shield.position.x = this.offset + 182 * this.factor + (Math.floor(Math.random() * 3 + 1) - 1) * 120 * this.factor;
        this.shield.position.y = this.offset + 396 * this.factor;
    }
}

let blockStyles = {
    'custom_control_blocks': {
        'colourPrimary': '#377771',
        'colourSecondary': '#377771',
        'colourTertiary': '#377771'
    },
    'custom_loop_blocks': {
        'colourPrimary': '#5e99d1',
        'colourSecondary': '#5e99d1',
        'colourTertiary': '#5e99d1'
    },
    'custom_game_blocks': {
        'colourPrimary': '#c75000',
        'colourSecondary': '#c75000',
        'colourTertiary': '#c75000'
    }
};

function restyleBlock(block, style) {
    const oldInit = block.init;
    block.init = function () {
        oldInit.call(this);
        this.setMutator(null);
        this.setStyle(style);
    }
}

restyleBlock(Blockly.Blocks['controls_if'], 'custom_control_blocks');
restyleBlock(Blockly.Blocks['controls_repeat_ext'], 'custom_loop_blocks');
restyleBlock(Blockly.Blocks['math_number'], 'custom_loop_blocks');

Blockly.Scrollbar.scrollbarThickness = 15;

let ws = Blockly.inject(document.getElementById('blocklyDiv'), {
    toolbox: Blockly.Xml.textToDom(document.getElementById('toolbox').outerHTML),
    sounds: false,
    trashcan: true,
    scrollbars: true,
    zoom: {
        controls: false,
        wheel: false,
        startScale: 1,
        maxScale: 1,
        minScale: 0.7
    },
    theme: new Blockly.Theme(blockStyles, {})
});

function loadWorkspace(id) {
    Blockly.Xml.domToWorkspace(document.getElementById(id), ws);
}

if (parseInt(new URL(window.location).searchParams.get('solution'))) {
    loadWorkspace('solutionBlocks');
} else {
    loadWorkspace('startBlocks');
}

function onResize() {
    let div = document.getElementById('blocklyDiv');
    div.style.left = '0px';
    div.style.top = '0px';
    let winWidth = window.innerWidth;
    let safeZone = 50;
    let newScale = 1;
    if (isMobile) {
        winWidth = screen.width;
        safeZone = 30;
    }
    if (winWidth >= 1200) {
        div.style.width = '540px';
        div.style.height = '500px';
        btnAction.style['left'] = 540 + 45 + 'px';
        if (game !== null) {
            game.resize(500);
        }
    } else if (winWidth >= 992) {
        div.style.width = '450px';
        div.style.height = '450px';
        btnAction.style['left'] = 450 + 45 + 'px';
        if (game !== null) {
            game.resize(450);
        }
    } else if (winWidth >= 768) {
        div.style.width = '350px';
        div.style.height = '350px';
        btnAction.style['left'] = 350 + 45 + 'px';
        if (game !== null) {
            game.resize(350);
        }
        newScale = 0.8;
    } else if (winWidth >= 576) {
        div.style.width = '500px';
        div.style.height = '500px';
        btnAction.style['left'] = '15px';
        if (game !== null) {
            game.resize(500);
        }
        newScale = 0.9;
    } else {
        div.style.width = winWidth - safeZone + 'px';
        div.style.height = '350px';
        btnAction.style['left'] = '15px';
        //working with a stack because resizing takes time. Last size from event will be used
        if (game !== null) {
            if (game.resizeStack.length === 0) {
                setTimeout(() => {
                    game.resize(null, true);
                }, 500);
            }
            game.resizeStack.push(winWidth - safeZone);
        }
        newScale = 0.75;
    }
    Blockly.svgResize(ws);
    ws.setScale(newScale);
    scaleTrashcan(newScale);
    ws.scroll(5, 5);
}

function scaleTrashcan(factor) {
    let attr = ws.trashcan.svgGroup_.getAttribute('transform');
    let xTranslate = parseInt(attr.substring(attr.indexOf('(') + 1, attr.indexOf(',')));
    let yTranslate = parseInt(attr.substring(attr.indexOf(',') + 1, attr.indexOf(')')));
    let newAttr = 'translate(' + Math.floor(xTranslate + 1 / factor * 15) + ',' + Math.floor(yTranslate + 1 / factor * 15) + ')' + ' scale(' + factor + ',' + factor + ')';
    ws.trashcan.svgGroup_.setAttribute('transform', newAttr);
}

let icons = {};

function loadIcons(iconNames) {
    const parser = new DOMParser();
    iconNames.forEach(function (icon) {
        icons[icon] = parser.parseFromString(feather.icons[icon].toSvg(), 'image/svg+xml').documentElement;
    });
}

loadIcons(['play', 'rotate-ccw']);

function setBtnIcon(iconName) {
    btnAction.childNodes[1].replaceWith(icons[iconName]);
    let text = '';
    switch (iconName) {
        case 'play':
            text = 'Play';
            break;
        case 'rotate-ccw':
            text = 'Reset';
    }
    document.getElementById('text_btnAction').innerHTML = text;
}

window.addEventListener('resize', onResize, false);
window.onload = function (e) {
    setTimeout(() => {
        onResize();
    }, 300);
};

let btnAction = document.getElementById('btn_Action');
btnAction.onclick = function () {
    if (game.started) {
        game.reset();
    } else {
        game.execute();
    }
};

//level encoded as DFA qPfx represents platform x
const states = {
    'qInit': {transitions: {'down': 'qPf2'}},
    'qPf2': {transitions: {'down': 'qPf3', 'up': 'qInit'}},
    'qPf3': {transitions: {'right': 'qPf4', 'up': 'qPf2'}},
    'qPf4': {transitions: {'right': 'qPf5'}},
    'qPf5': {transitions: {'right': 'qPf6'}},
    'qPf6': {transitions: {'up': 'qPf7'}},
    'qPf7': {transitions: {'up': 'qWin', 'down': 'qPf6'}},
    'qWin': {transitions: {'down': 'qPf7'}},
};

class GameDFA {
    constructor(states, initial, win) {
        this.resetStates = states;
        this.states = states;
        this.initialState = initial;
        this.winState = win;
        this.currentState = initial;
    }

    readWord(w) {
        if (this.states[this.currentState].transitions.hasOwnProperty(w)) {
            this.currentState = this.states[this.currentState].transitions[w];
            return true;
        } else {
            return false;
        }
    }

    reset(hard) {
        this.currentState = this.initialState;
        if (hard === true) {
            this.states = JSON.parse(JSON.stringify(this.resetStates));
        }
    }
}
//TO KNOW IF THE CLICK IS PRESSED
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//VARIABLES
// DEFAULT VARIABLES
const INITIAL_COLOR = '#000000';
const INITIAL_MODE = 'color';

//CHANGING VARIABLES
let actualColor = INITIAL_COLOR;
let actualMode = INITIAL_MODE;
let actualSize = 36;

//DOM ELEMENTS//
//WHITE BOARD (GRID CONTAINER)
const whiteboard = document.getElementById('board-container');

//COLOR INPUT
const colorInput = document.getElementById('color-selector');
//RADIO BUTTONS FOR MODE SELECTION
const colorMode = document.getElementById('color');
const shadowMode = document.getElementById('shadow');
const rainbowMode = document.getElementById('rainbow');
const eraserMode = document.getElementById('eraser');

const modes = Array.from(document.querySelectorAll('[type = radio]'));

//BUTTONS
//CLEAR BUTTON
const clearBtn = document.getElementById('clear');
//SIZING BUTTONS
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');

const sizingBtns = Array.from(document.querySelectorAll('.size-changer'))

//SIZE DIV
let sizeDiv = document.getElementById('size');
sizeDiv.innerText = `${actualSize} X ${actualSize}`


//LISTENER EVENTS
colorInput.addEventListener('input', changeColor(colorInput.value));
modes.forEach(mode => mode.addEventListener('click', changeMode));
plusBtn.addEventListener('click', increaseSize);
minusBtn.addEventListener('click', decreaseSize);
clearBtn.addEventListener('click', resetBoard);

//FUNCTIONS
//SMALL FUNCTIONS TO MODIFY CHANGING VARIABLES//
function changeColor(color) {
    actualColor = color;
}

function changeMode() {
    if (colorMode.checked) {
        actualMode = 'color';
    } else if (shadowMode.checked) {
        actualMode = 'shadow';
    } else if (rainbowMode.checked) {
        actualMode = 'rainbow';
    } else if (eraserMode.checked) {
        actualMode = 'eraser';
    }
    console.log(actualMode);
}

//FUNCTION TO CREATE THE GRIDS
function createGrid(actualSize) {
    whiteboard.style.gridTemplateColumns = `repeat(${actualSize}, 1fr)`;
    whiteboard.style.gridTemplateRows = `repeat(${actualSize}, 1fr)`;

    for (let i = 0; i < actualSize**2; i++) {
        const pixel = document.createElement('div');
        pixel.addEventListener('mouseenter', paint);
        pixel.addEventListener('mousedown', paint);
        pixel.classList.add('grid');
        
        whiteboard.appendChild(pixel);
    }
}

//SIZING FUNCTIONS
function increaseSize() {
    if (actualSize >= 64) {
        alert('THIS IS THE HIGHEST RESOLUTION')
    } else {
        actualSize+=4
        clearBoard();
        createGrid(actualSize);
    }
    sizeDiv.innerText = `${actualSize} X ${actualSize}`
}
function decreaseSize() {
    if (actualSize <= 8) {
        alert('THIS IS THE LOWEST RESOLUTION')
    } else {
        actualSize-=4
        clearBoard();
        createGrid(actualSize);
    }
    sizeDiv.innerText = `${actualSize} X ${actualSize}`
}

//CLEAR AND RESET THE BOARD
function clearBoard() {
    whiteboard.innerHTML = '';
}
function resetBoard() {
    clearBoard();
    createGrid(actualSize);
}

function paint(e) {
    if (e.type === 'mouseenter' && !mouseDown) return;
    if (actualMode === 'color') {
        e.target.style.backgroundColor = colorInput.value;
    } else if (actualMode === 'shadow') {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
    } else if (actualMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    } else if (actualMode === 'rainbow') {
        const R = Math.floor(Math.random()*255);
        const G = Math.floor(Math.random()*255);
        const B = Math.floor(Math.random()*255);
        const ALPHA = Math.floor(Math.random()*255);
        e.target.style.backgroundColor =  `rgba(${R}, ${G}, ${B}, ${ALPHA})`;
    }
}

createGrid(actualSize);
// getting the grid container
const gridContainer = document.getElementById('board-container');

// getting and changing the color value
let color = '#000000'
const colorInput = document.getElementById('color-selector');
colorInput.addEventListener('input', (e) => {
    color = e.target.value;
})

console.log(color)

console.log(color)

//setting default size
let sizeDiv = document.getElementById('size');
let size = 16;

// Check if mouse is Up or Down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function paintig(color) {
    
}

//Getting the size buttons
const increment = document.getElementById('plus-btn');
const decrease = document.getElementById('minus-btn');
//Setting the button to increment the grid size by 4 up to 64
increment.addEventListener('click', () => {
    coloring = false;
    if (size >= 64) {
        alert('This is the highest resolution');
    } else {
        size += 4;
        clearBoard()
        createGrid(size);
        sizeDiv.textContent = `${size} X ${size}`
    }
})
//Setting the button to decrease the grid sizeby 4
//down to 8
decrease.addEventListener('click', () => {
    coloring = false;
    if (size <= 8) {
        alert('This is the lowest resolution');
    } else {
        size -= 4;
        clearBoard()
        createGrid(size);
        sizeDiv.textContent = `${size} X ${size}`
    }
})


//creating the child grids
function createGrid(size) {
    for (let i = 0; i < size ** 2; i++) {
        gridContainer.style.gridTemplateRows = (`repeat(${size}, 1fr)`)
        gridContainer.style.gridTemplateColumns = (`repeat(${size}, 1fr)`)

        const childGrid = document.createElement('div');
        childGrid.classList.add('grid');
        paintig();       
        gridContainer.appendChild(childGrid);
    }
}


const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', resetBoard);

function clearBoard() {
    gridContainer.innerHTML = '';
}

function resetBoard() {
    const pixels = document.querySelectorAll('.grid');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
    })
}

// function changeColorMode(e) {
//     let opacity = 0.2;
//     //Getting the radio-buttons
//     const blackMode = document.getElementById('black');
//     const shadowMode = document.getElementById('shadow');
//     const multicolorMode = document.getElementById('colors');
//     if (e.type === 'mousenter' && !mouseDown) return;
//     if(coloring) {
//         if (blackMode.checked) {
//             e.target.style.backgroundColor = 'black';
//         } else if(shadowMode.checked){
//             e.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
//         } else if(multicolorMode.checked) {
//             const R = Math.floor(Math.random()*256);
//             const G = Math.floor(Math.random()*256);
//             const B = Math.floor(Math.random()*256);
//             e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
//         } else if(eraser.checked) {
//             e.target.style.backgroundColor = 'white';
//         } else return;
//     }
// }

createGrid(size);
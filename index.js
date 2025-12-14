const body = document.querySelector('body')

const inputBtn = document.createElement('button')
inputBtn.className = 'inputBtn'
inputBtn.textContent = 'Change Grid Size'

const clearBtn = document.createElement('button')
clearBtn.className = 'inputBtn'
clearBtn.textContent = 'Clear Grid'

const btnContainer = document.createElement('div')
btnContainer.className = 'btnContainer'
btnContainer.appendChild(inputBtn)
btnContainer.appendChild(clearBtn)

body.appendChild(btnContainer)

const container = document.createElement('div')
container.className = 'container'
body.appendChild(container)

let inputSize = 16
let gridSize = inputSize ** 2
let gridColor = 'black'

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const grid = document.createElement('div')
        grid.className = 'grid'
        grid.style.width = `calc(100% / ${inputSize})`
        container.appendChild(grid)
    }
}

function clearGrid() {
    const grids = document.querySelectorAll('.grid')
    grids.forEach((grid) => {
        grid.remove()
    })
    createGrid()
}

function paintGridOnHover() {
    container.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('grid')) {
            event.target.style.background = gridColor
        }
    })
}

function etch() {
    inputBtn.addEventListener('click', (event) => {
        event.stopPropagation()
        let userInput
        do {
            userInput = parseInt(prompt('Enter a grid size (1 - 100)'))
        } while (userInput < 1 || userInput > 100)
        
        inputSize = parseInt(userInput)
        gridSize = inputSize ** 2
        clearGrid()
        paintGridOnHover()
    })

    clearBtn.addEventListener('click', clearGrid)
    createGrid()
    paintGridOnHover()
}

etch()
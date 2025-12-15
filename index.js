const body = document.querySelector('body')

const inputBtn = document.createElement('button')
inputBtn.className = 'inputBtn'
inputBtn.textContent = 'Change Grid Size'

const clearBtn = document.createElement('button')
clearBtn.className = 'clearBtn'
clearBtn.textContent = 'Clear Grid'

const btnContainer = document.createElement('div')
btnContainer.className = 'btnContainer'

const rgbBtn = document.createElement('button')
rgbBtn.className = 'rgbBtn'
rgbBtn.textContent = 'RGB Paint'

const shadeBtn = document.createElement('button')
shadeBtn.className = 'shadeBtn'
shadeBtn.textContent = 'Shading'

const lightBtn = document.createElement('button')
lightBtn.className = 'lightBtn'
lightBtn.textContent = 'Lightening'

btnContainer.appendChild(inputBtn)
btnContainer.appendChild(clearBtn)
btnContainer.appendChild(rgbBtn)
btnContainer.appendChild(shadeBtn)
btnContainer.appendChild(lightBtn)

body.appendChild(btnContainer)

const container = document.createElement('div')
container.className = 'container'
body.appendChild(container)

let inputSize = 16
let gridSize = inputSize ** 2
let mode = 'default'

function setupEtch() {
    mode = 'default'
    clearGrid()
    createGrid()
}

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const grid = document.createElement('div')
        grid.className = 'grid'
        grid.style.width = `calc(100% / ${inputSize})`
        container.appendChild(grid)
    }
}

function clearGrid() {
    mode = 'default'
    const grids = document.querySelectorAll('.grid')
    grids.forEach((grid) => {
        grid.remove()
    })
}

function rgbPaint(element) {
    let o = Math.round, r = Math.random, s = 255;
    let newRgb = 'rgba(' 
    + o(r()*s) 
    + ',' 
    + o(r()*s) 
    + ',' 
    + o(r()*s) 
    + ',' 
    + r().toFixed(1) 
    + ')';
    element.style.background = newRgb
}

function shadePaint(element) {
    let background = element.style.background

    if (background === '') {
        element.style.background = 'rgba(0, 0, 0, 0.1)'
    } else {
        let opacity = parseFloat(background.slice(5, -1).split(',').at(-1))
        let newOpacity = Number(opacity.toFixed(2)) + 0.1
        let newRgba = background.replace(/[\d.]+\)$/g, `${newOpacity})`)
        element.style.background = newRgba
    }
}

function lightPaint(element) {
    let background = element.style.background
    let rgbaCheck = background.slice(0, 4)

    if (rgbaCheck !== 'rgba') {
        background = background.replace('rgb', 'rgba')
        background = background.replace(/\)/i,',1)');
    }
    
    let opacity = parseFloat(background.slice(5, -1).split(',').at(-1))
    let newOpacity = Number(opacity.toFixed(2)) - 0.1
    let newRgba = background.replace(/[\d.]+\)$/g, `${newOpacity})`)
    element.style.background = newRgba
}

function etch() {
    inputBtn.addEventListener('click', (event) => {
        let userInput
        do {
            userInput = parseInt(prompt('Enter a grid size (1 - 100)'))
        } while (userInput < 1 || userInput > 100 || !userInput)
        
        inputSize = parseInt(userInput)
        gridSize = inputSize ** 2

        setupEtch()
    })

    clearBtn.addEventListener('click', () => {
        setupEtch()
    })

    rgbBtn.addEventListener('click', () => {
        mode = 'rgb'
    })

    shadeBtn.addEventListener('click', () => {
        mode = 'shade'
    })

    lightBtn.addEventListener('click', () => {
        mode = 'light'
    })

    container.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('grid')) {
            switch (mode) {
                case 'default':
                    event.target.style.background = 'rgba(0, 0, 0, 1.0)'
                    break
                case 'rgb':
                    rgbPaint(event.target)
                    break
                case 'shade':
                    shadePaint(event.target)
                    break
                case 'light':
                    lightPaint(event.target)
                    break
            }
        }
    })

    setupEtch()
}

etch()
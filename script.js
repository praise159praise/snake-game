

let gridArea = 30

let w
let grid = Array(gridArea).fill().map(item => Array(gridArea).fill(null))
let player
let up, down, left, right
let prize
let diff = 5

document.addEventListener("keydown", function (event) {
    event.which == 37 && player.moving != 'right' ? [up, down, left, right] = [false, false, true, false] : null
    event.which == 38 && player.moving != 'down' ? [up, down, left, right] = [true, false, false, false] : null
    event.which == 39 && player.moving != 'left' ? [up, down, left, right] = [false, false, false, true] : null
    event.which == 40 && player.moving != 'up' ? [up, down, left, right] = [false, true, false, false] : null
})
let incTrail = document.querySelector('.add')

const genPrize = () => {
    return [floor(random(1, gridArea - 1)), floor(random(1, gridArea - 1))]
}


function setup() {
    createCanvas(500, 500)
    w = height / 30
    playing = true

    player = new Player(floor(random(1, gridArea - 1)), floor(random(1, gridArea - 1)))
    prize = genPrize()

}
function draw() {
    background(51)
    stroke(255, 0)
    noFill()
    frameRate(diff)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j, w)
            grid[i][j].show()
        }
    }

    fill(255, 255, 0)
    rect(prize[0] * w, prize[1] * w, w, w)
    
    if (player.head[0] == prize[0] && player.head[1] == prize[1]) {
        player.points += 1
        prize = genPrize()
        diff += 1
        console.log('win')
    }

    
    player.moving ? player.trail.push([...player.head]) : null

    if (right && player.moving != 'left') player.moveRight()
    if (left && player.moving != 'right') player.moveLeft()
    if (up && player.moving != 'down') player.moveUp()
    if (down && player.moving != 'up') player.moveDown()
    if (player.head[0] <= 0 || player.head[0] >= gridArea - 1 || player.head[1] <= 0 || player.head[1] >= gridArea - 1) noLoop()
    player.drawAtCurrPos()
}

function Player(startX, startY) {
    this.points = 0
    this.head = [startX, startY]
    this.trail = []
    this.moving = null

    this.drawAtCurrPos = () => {
        fill(255, 255, 255, 50)
        rect(this.head[0] * w, this.head[1] * w, w, w)
        if(this.trail.length > 0){
            for(let i = 1; i<=this.points; i++){
                fill(255, 0,0)
                rect(this.trail[this.trail.length-i][0]*w, this.trail[this.trail.length-i][1]*w, w, w)
            }
        }
    }
    this.moveDown = () => {
        this.head[1] += 1
        this.moving = 'down'
    }
    this.moveUp = () => {
        this.head[1] -= 1
        this.moving = 'up'
    }
    this.moveRight = () => {
        this.head[0] += 1
        this.moving = 'right'
    }
    this.moveLeft = () => {
        this.head[0] -= 1
        this.moving = 'left'
    }




}
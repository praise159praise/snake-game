let gridArea
let w
let grid
let player
let up, down, left, right
let prize, lives
let diff
let ctx
let blur

function checkMovementDir(event) {
    event.which == 37 && player.moving != 'right' ? [up, down, left, right] = [false, false, true, false] : null
    event.which == 38 && player.moving != 'down' ? [up, down, left, right] = [true, false, false, false] : null
    event.which == 39 && player.moving != 'left' ? [up, down, left, right] = [false, false, false, true] : null
    event.which == 40 && player.moving != 'up' ? [up, down, left, right] = [false, true, false, false] : null
    if (event.which == 80) {
        [up, down, left, right] = [false, false, false, false]
        player.moving = 'stopped'
    }

}

document.addEventListener("keydown", checkMovementDir)

const genPrize = () => {
    return [floor(random(1, gridArea - 1)), floor(random(1, gridArea - 1))]
}

function resetGame() {
    ctx = document.getElementById('defaultCanvas0').getContext('2d')
    gridArea = 30
    grid = Array(gridArea).fill().map(item => Array(gridArea).fill(null))
    diff = parseFloat(document.getElementById('diff').value)
    w = height / 30
    playing = true
    lives = 3
    [up, down, left, right] = Array(4).fill(undefined)
    console.log([up, down, left, right])
    player = new Player(floor(random(1, gridArea - 1)), floor(random(1, gridArea - 1)))
    prize = genPrize()
    blur = 0
}

function setup() {
    createCanvas(500, 500)
    resetGame()
}
function draw() {
    background(73, 65, 109)
    stroke(224, 239, 222, 0)
    noFill()
    diff = parseFloat(document.getElementById('diff').value)
    frameRate(diff)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            noFill()

            if (i == 0 || j == 0 || i == gridArea - 1 || j == gridArea - 1) {
                fill(51)
            }
            grid[i][j] = new Cell(i, j, w)
            grid[i][j].show()

        }
    }

    fill(224, 141, 121)
    ctx.shadowColor = 'white'
    if (blur < 20) {
        blur = blur + 5
        ctx.shadowBlur = blur
    } else {
        blur = blur - 20
        ctx.shadowBlur = blur
    }
    rect(prize[0] * w, prize[1] * w, w, w)
    ctx.shadowColor = 'red'
    ctx.shadowBlur = 0

    if (player.head[0] == prize[0] && player.head[1] == prize[1]) {
        player.points += 1
        prize = genPrize()
    }

    if (player.moving) {
        player.trail.push([...player.head])
        player.trail.unshift()
    }


    if (right && player.moving != 'left') player.moveRight()
    if (left && player.moving != 'right') player.moveLeft()
    if (up && player.moving != 'down') player.moveUp()
    if (down && player.moving != 'up') player.moveDown()

    if (player.head[0] <= 0 || player.head[0] >= gridArea - 1 || player.head[1] <= 0 || player.head[1] >= gridArea - 1 || player.checkSelfCollision()) {

        resetGame()
    }

    player.drawAtCurrPos()
}

function Player(startX, startY) {
    this.points = 0
    this.head = [startX, startY]
    this.trail = []
    this.moving = null

    this.drawAtCurrPos = () => {
        fill(255, 255, 255)
        rect(this.head[0] * w, this.head[1] * w, w, w)
        if (this.trail.length > 0) {
            for (let i = 1; i <= this.points; i++) {
                fill(168, 130, 221)
                rect((this.trail[this.trail.length - i][0] * w) + (i / 3), (this.trail[this.trail.length - i][1] * w) + (i / 3), w - (i / 3), w - (i / 3))
            }
        }
    }

    this.checkSelfCollision = () => {
        if (this.trail.length > 0) {
            for (let i = 1; i <= this.points; i++) {
                if (this.trail[this.trail.length - i][0] == this.head[0] && this.trail[this.trail.length - i][1] == this.head[1]) return true
            }
        }
        return false
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
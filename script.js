function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`
}
function gameOver (winner){
    write( winner + ' wins')
    $('gui').innerHTML = winner + ' wins'
    running = false
}

let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = 800
let height = 600
let fps = 60
let playerSpeed = 7
let playersWidth = 10
let playerSize = 180
let ballsize = 18
let ballSpeed = 7

let running = true

canvas.width = width
canvas.height = height

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'

let mouse = {
    x: width/2,
    y: height/2,
    z: false
}
canvas.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x
    mouse.y = event.y
})
canvas.addEventListener( 'mousedown', ()=>{
    mouse.z = true
})
canvas.addEventListener( 'mouseup', ()=>{
    mouse.z = false
})

class Player {
    
    constructor(side) {
        
        this.side = side;
        this.size = playerSize;
        this.y = height/2 - this.size/2;
        this.direction = 0
        this.style = '#eef'
        this.score = 0


        this.render = ()=>{
            c.fillStyle = this.style;
            if( this.side == 'right' ){
                c.fillRect( 0, this.y, playersWidth, this.size);
            }
            if( this.side == 'left' ){
                c.fillRect( width - playersWidth, this.y, width, this.size);
            }
        }

        this.update = ()=>{
            if ( this.direction > 0 & this.y + this.size < height ){
                this.y += playerSpeed
            }
            if ( this.direction < 0 & this.y > 0 ){
                this.y -= playerSpeed
            }
        }
    }
}


class Ball {
        
        constructor(x, y, raduis) {
            
            this.x = x;
            this.y = y;
    
            this.vx = rdm(1)?ballSpeed:-ballSpeed;
            this.vy = rdm(1)?ballSpeed:-ballSpeed;
    
            this.raduis = raduis;
    
            this.style = '#eef'
            
            this.render = ()=>{
                c.fillStyle = this.style;
                c.beginPath();
                c.arc(this.x, this.y, this.raduis, 0, 8, false);
                c.fill();
            }
    
            this.update = ()=>{
                if ( this.y + this.raduis > height ) {
                    this.vy *= -1
                    while ( this.y + this.raduis > height ){
                        this.y -= 1
                    }
                }
                if ( this.y - this.raduis < 0 ) {
                    this.vy *= -1
                    while ( this.y - this.raduis < 0 ){
                        this.y += 1
                    }
                }
                if ( this.x + this.raduis + playersWidth > width ){
                    if( this.y > player2.y & this.y < player2.y + player2.size ){
                        this.vx *= -1
                        if( player2.direction != 0 ){
                            this.vy *= player2.direction
                        }
                        player2.score++
                    } else gameOver('player1')
                }
                if ( this.x < this.raduis + playersWidth ){
                    if( this.y + this.raduis > player1.y & this.y < player1.y + player1.size + this.raduis ){
                        this.vx *= -1
                        if( player1.direction != 0 ){
                            this.vy *= player1.direction
                        }
                        player1.score++
                    } else gameOver('player2')
                }
                this.x += this.vx
                this.y += this.vy

            }
        }
    }
    

function loop(){

//     --loop--

    setTimeout(() => {
        if ( running ) requestAnimationFrame(loop)
    }, 1000 / fps);
    c.clearRect( 0, 0, width, height)

//   --updates--

    player1.direction = input
    player2.direction = input

    player1.update()
    player2.update()
    ball.update()

//   --rendering--

    player1.render()
    player2.render()
    ball.render()
    c.fillText( player1.score, 10, 10)
    c.fillText( player2.score, width-10, 10)

}


let player1 = new Player('right')
let input = 0

let player2 = new Player('left')


let ball = new Ball( width/2, height/2, ballsize)

window.addEventListener( 'keydown', (key)=>{
    if (key.key == 'w' ) input = -1
    if (key.key == 's' ) input = 1
})
window.addEventListener( 'keyup', (key)=>{
    if (key.key == 'w' & input == -1 ) input = 0
    if (key.key == 's' & input == 1 ) input = 0
})
window.addEventListener( 'keypress', (key)=>{
    if (key.key == 'r') location.reload()
})




loop()
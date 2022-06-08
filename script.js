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

const canvas = $('canvas')
const c = canvas.getContext('2d')
const width = window.innerWidth
const height = window.innerHeight
const fps = 60
const speed = 5
const playersWidth = 10
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
    
    constructor( side, size) {
        
        this.side = side;
        this.size = size != undefined ? size : 150;
        this.y = height/2 - this.size/2;

        this.render = ()=>{
            c.fillStyle = 'white';
            if( this.side == 'right' ){
                c.fillRect( 0, this.y, playersWidth, this.size);
            }
            if( this.side == 'left' ){
                c.fillRect( width - playersWidth, this.y, width, this.size);
            }
        }

        this.move = (dir)=>{
            if ( dir > 0 & this.y + this.size < height ){
                this.y += speed
            }
            if ( dir < 0 & this.y > 0 ){
                this.y -= speed
            }
        }
    }
}


class Ball {
        
        constructor(x, y, raduis) {
            
            this.x = x;
            this.y = y;
    
            this.vx = 12;
            this.vy = 10;
    
            this.raduis = raduis;
    
            this.render = ()=>{
                c.fillStyle = 'white';
                c.beginPath();
                c.arc(this.x, this.y, this.raduis, 0, 8, false);
                c.fill();
            }
    
            this.update = ()=>{

                this.x += this.vx
                this.y += this.vy

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
                if ( this.x > width ){
                    if( this.y > player2.y & this.y < player2.y + player2.size ){
                        this.vx *= -1
                    } else gameOver('player1')
                    while ( this.x > width ){
                        this.x -= 1
                    }
                }
                if ( this.x < playersWidth ){
                    if( this.y > player1.y & this.y < player1.y + player1.size ){
                        this.vx *= -1
                    } else gameOver('player2')
                    while ( this.x < 0 ){
                        this.x += 1
                    }
                }

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

    player1.move(input)
    ball.update()

//   --rendering--

    player1.render()
    player2.render()
    ball.render()

}


let player1 = new Player('right')
let input = 0

let player2 = new Player('left')


let ball = new Ball( width/2, height/2, 20)

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
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

let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
let fps = 60
let speed = 5

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
        this.size = size != undefined ? size : 200;
        this.y = height/2 - this.size/2;

        this.render = ()=>{
            c.fillStyle = 'white';
            if( side == 'right' ){
                c.fillRect( 0, this.y, 10, this.size);
            }
            if( side == 'left' ){
                c.fillRect( width-10, this.y, width, this.size);
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
    
            this.vx = 10;
            this.vy = 8;
    
            this.raduis = raduis;
    
            this.render = ()=>{
                c.strokeStyle = 'white';
                c.fillStyle = 'white';
                c.beginPath();
                c.arc(this.x, this.y, this.raduis, 0, 8, false);
                c.fill();
                c.stroke();
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


                this.x += this.vx
                this.y += this.vy
            }
        }
    }
    

function loop(){

//     --loop--

    setTimeout(() => {
        requestAnimationFrame(loop)
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




loop()
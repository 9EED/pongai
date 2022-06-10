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

let gameCanvas = $('canvas')
let c = gameCanvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
let fps = 60
let playerSpeed = 9
let playersWidth = 10
let playerSize = 180
let ballsize = 18
let ballSpeed = 7
let maxBallSpeed = 13
let friction = 5

let running = true

gameCanvas.width = 800
gameCanvas.height = 600

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'

class Player {
    
    constructor(side, height, width) {
        
        this.side = side;
        this.size = playerSize;
        this.y = height/2 - this.size/2;
        this.direction = 0
        this.style = '#eef'
        this.score = 0


        this.render = (context, height, width)=>{
            context.fillStyle = this.style;
            if( this.side == 'right' ){
                context.fillRect( 0, this.y, playersWidth, this.size);
            }
            if( this.side == 'left' ){
                context.fillRect( width - playersWidth, this.y, this.size, this.size);
            }
        }

        this.update = ( height, width)=>{
            if ( this.direction == 1 & this.y + this.size < height ){
                this.y += playerSpeed
            }
            if ( this.direction == -1 & this.y > 0 ){
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
            
            this.render = (context)=>{
                context.fillStyle = 'white'
                context.beginPath();
                context.arc(this.x, this.y, this.raduis, 0, 3.1415, false);
                context.fill();
                context.fillStyle = 'red'
                context.beginPath();
                context.arc(this.x, this.y, this.raduis, 3.1415, 6.283, false);
                context.fill();
                context.fillStyle = 'black'
                context.beginPath();
                context.arc(this.x, this.y, this.raduis/2, 0, 8, false);
                context.fill();
                context.fillStyle = 'white'
                context.beginPath();
                context.arc(this.x, this.y, this.raduis/2.5, 0, 8, false);
                context.fill();
            }
    
            this.update = ( player1, player2, height, width)=>{
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
                            this.vy += player2.direction * friction
                        }
                        player2.score++
                    } else {
                        write('player1')
                        return 'player1'
                    }
                }
                if ( this.x < this.raduis + playersWidth ){
                    if( this.y + this.raduis > player1.y & this.y < player1.y + player1.size + this.raduis ){
                        this.vx *= -1
                        if( player1.direction != 0 ){
                            this.vy += player1.direction * friction
                        }
                        player1.score++
                    } else {
                        write('player2')
                        return 'player2'
                    }
                }
                while( this.vy > maxBallSpeed ){
                    this.vy--
                }
                while( this.vy < -maxBallSpeed ){
                    this.vy++
                }
                this.x += this.vx
                this.y += this.vy

            }
        }
}

class Game{
    constructor( height, width){

        this.running = true
        this.winner = null
        
        this.input1 = 0
        this.input2 = 0

        this.height = height
        this.width = width

        this.player1 = new Player( 'right', this.height, this.width)
        this.player2 = new Player( 'left', this.height, this.width)
        this.ball = new Ball( this.width/2, this.height/2, ballsize)
        this.update = ()=>{
            if(this.running){
                this.player1.direction = this.input1
                this.player2.direction = this.input2

                this.player1.update( this.height, this.width)
                this.player2.update( this.height, this.width)
                
                this.winner = this.ball.update( this.player1, this.player2, this.height, this.width)
                this.running = !this.winner
            } else {
                return this.winner
            }
        }
        this.render = (context)=>{
            if(this.running){
                context.clearRect( 0, 0, this.width, this.height)
                this.player1.render(context, this.height, this.width)
                this.player2.render(context, this.height, this.width)
                this.ball.render(context, this.height, this.width)
            }
        }
    }
}

let step = 0

function loop(){

//     --loop--

    setTimeout(() => {
        if ( running ) requestAnimationFrame(loop)
    }, 1000 / fps);
    if( !running ){
        setTimeout( ()=>{
            location.reload()
        }, 500)
    }
    step++

//   --updates--

    games.forEach( game => {
        game.update()
    });

//   --rendering--

    games[0].render(c)

}

let games = []
for ( let i = 0 ; i < 5 ; i++ ) games.push( new Game( 600, 800))

/*
let game = new Game( 600, 800)
let game1 = new Game( 600, ( window.innerWidth - 800 ) / 2 - 20)
let game2 = new Game( 600, ( window.innerWidth - 800 ) / 2 - 20)

   // key board input 0 and 2
window.addEventListener( 'keydown', (key)=>{
    if (key.key == 'w' ) game2.input1 = -1
    if (key.key == 'w' ) game.input1 = -1
    if (key.key == 's' ) game2.input1 = 1
    if (key.key == 's' ) game.input1 = 1
    if (key.key == '8' ) game2.input2 = -1
    if (key.key == '8' ) game.input2 = -1
    if (key.key == '5' ) game2.input2 = 1
    if (key.key == '5' ) game.input2 = 1
})
window.addEventListener( 'keyup', (key)=>{
    if (key.key == 'w' & game2.input1 == -1 ) game2.input1 = 0
    if (key.key == 'w' & game.input1 == -1 ) game.input1 = 0
    if (key.key == 's' & game2.input1 == 1 ) game2.input1 = 0
    if (key.key == 's' & game.input1 == 1 ) game.input1 = 0
    if (key.key == '8' & game2.input2 == -1 ) game2.input2 = 0
    if (key.key == '8' & game.input2 == -1 ) game.input2 = 0
    if (key.key == '5' & game2.input2 == 1 ) game2.input2 = 0
    if (key.key == '5' & game.input2 == 1 ) game.input2 = 0
})
*/

window.addEventListener( 'keypress', (key)=>{
    if (key.key == 'r') location.reload()
    if (!running) location.reload()
})
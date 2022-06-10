
let aiWidth = ( window.innerWidth - 800 ) / 2 - 20
let aiHeight = 600

let aiCanvas1 = $('canvas1')
let c1 = aiCanvas1.getContext('2d')

let aiCanvas2 = $('canvas2')
let c2 = aiCanvas2.getContext('2d')

aiCanvas1.height = aiHeight
aiCanvas2.height = aiHeight
aiCanvas1.width = aiWidth
aiCanvas2.width = aiWidth

let NodeTypesList = [ 'input', 'calc', 'output']

class Nodes{
    constructor(type){
        this.type = type
        this.links = []
    }
}

class Brain{
    constructor(){
        this.Nodes = []
    }
}

function aiLoop(){
    
    // loop

    setTimeout( ()=>{
        requestAnimationFrame(aiLoop)
    }, 100)

    // AI this acyually is going to be a 100 times harder than i thought going in

    games.forEach( game => {
        if ( game.ball.y > game.player2.y + game.player2.size/2 ) game.input2 = 1
        else game.input2 = -1    
        if ( game.ball.y > game.player1.y + game.player1.size/2 ) game.input1 = 1
        else game.input1 = -1
    });

}


aiLoop()
loop()
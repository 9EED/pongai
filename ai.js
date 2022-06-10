
let aiWidth = ( window.innerWidth - 800 ) / 2 - 20
let aiHeight = 600

let aiCanvas1 = $('aiCanvas1')
let c1 = aiCanvas1.getContext('2d')

let aiCanvas2 = $('aiCanvas2')
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

    // AI

    input2 = random( -1, 1, 1) // AI :trollFace:

}

loop()
aiLoop()
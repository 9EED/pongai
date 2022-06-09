
let aiWidth = ( window.innerWidth - width ) / 2 - 50
let aiHeight = 600

let aiCanvas1 = $('aiCanvas1')
let c1 = aiCanvas1.getContext('2d')

let aiCanvas2 = $('aiCanvas2')
let c2 = aiCanvas2.getContext('2d')

aiCanvas1.height = aiHeight
aiCanvas2.height = aiHeight
aiCanvas1.width = aiWidth
aiCanvas2.width = aiWidth

function aiLoop(){
    
    // loop

    setTimeout( ()=>{
        requestAnimationFrame(aiLoop)
    }, 1000/ 10)
    
    if( !running ){
        setTimeout( ()=>{
            location.reload()
        }, 300)
    }

    //


}

aiLoop()
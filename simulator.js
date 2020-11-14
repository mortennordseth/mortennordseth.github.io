let queue = simulationData.simulationData;
let t0, counter, width, height;
let startButton = document.getElementById('startButton').addEventListener("click", () => {
    loop();
});
let stopButton = document.getElementById('stopButton').addEventListener("click", () => {
    noLoop();
    t0 = Date.now();
    counter = 0;
});

function setup() {
    width = Math.floor(windowWidth);
    height = Math.floor(windowHeight-56);
    
    createCanvas(width, height);
    t0 = Date.now();
    counter = 0;
    noLoop();
}

function drawPortals(){
    for(let i = 0; i < queue[counter].portals.length; i++){
        stroke(1000);
        fill('black')
        rect(30+i*60, 50, 40, 5)
    }
}

function drawPassengers(){
    let passengers = queue[counter].queueLength;
    let column = 0;
    
    for(let i = 0; i < passengers; i++){
        //Draw queue
        let red = i*15;
        if(red > 255) red = 255;
        let blue = 254-i*15;
        if(blue < 0) blue = 0;
        let c = color(red, blue, 1);
        fill(c);
        if(i === 0){
            square(50, 235, 10);
        }else{
            square(50+column*15, 250, 10);
            column++;
        }
    }

    queue[counter].portals.forEach((numberOfPassengers, portalNumber) => {
        for(let i = 0; i < numberOfPassengers; i++){
            //Draw passengers in portal
            fill(color('#32a852'));
            square(25+portalNumber*60 + 20, 55 + i*15, 10);
        }
    });
}

function draw() {
    background('white');

    drawPortals();
    let t1 = Date.now();
    
    let timeSinceStart = t1-t0;
    timeSinceStart = timeSinceStart*500;
    fill(color('black'));
    textSize(24);
    textAlign(CENTER);
    text('Elapsed time: ' + Math.floor(timeSinceStart/1000) + ' seconds', width/2, height-200);
    text('Current time: ' + new Date(timeSinceStart/1000 * 1000).toISOString().substr(11, 8), width/2, height-150)
    if(timeSinceStart >= queue[counter].timeSinceStart){
        if(counter < queue.length) counter++;
    }
    drawPassengers();
}


